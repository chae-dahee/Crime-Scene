# 힌트 광고 구현 설계

로드맵 4단계의 보상형 힌트 광고를 코드로 옮기기 위한 설계 문서다. 무료 힌트는 그대로 두고, 플레이어가 원할 때 광고를 보고 더 구체적인 힌트를 받는 경로를 추가한다.

## 원칙

무료 힌트는 같은 용의자에게 반응 없는 단서를 두 번 제시해야 나오고 조사할 장소만 가리킨다(`server/src/game.ts:74`). 광고 힌트는 이 조건 없이 즉시 받을 수 있고, 다음 단서를 얻는 구체적인 방법을 알려준다. 광고 없이도 완주할 수 있어야 하므로 무료 힌트의 동작은 바꾸지 않는다.

힌트 문구는 지금처럼 서버에만 둔다. 클라이언트가 문구를 미리 받으면 광고 없이 소스에서 읽을 수 있기 때문이다.

## 데이터 구조

광고 힌트는 용의자 단위가 아니라 시나리오 단위로 둔다. 무료 힌트는 용의자의 말로 전달되지만, 광고 힌트는 해설자의 안내로 다음 단서를 짚어 주므로 특정 용의자에 묶일 이유가 없다.

```ts
// server/src/types.ts
export interface Scenario {
  // ...
  // 풀이 순서대로 나열한다. 아직 얻지 않은 첫 단서의 문구를 보여준다.
  adHints: { clue: string; text: string }[];
}

export interface SessionState {
  // ...
  hintTicket?: number; // 광고 시작 시각(ms)
  adHints: number;     // 받은 광고 힌트 수, 3단계 측정용
}
```

- `clue`는 조사로 얻는 단서와 제시 반응으로 얻는 단서를 모두 포함한다.
- `text`는 장소와 조사 지점, 또는 누구에게 어떤 단서를 제시할지를 구체적으로 적는다.
- 결정적 증거까지 모두 얻은 뒤에는 남은 힌트가 없다. 이때는 고발 화면으로 유도하는 문구를 따로 두지 않고 힌트 버튼을 비활성화한다.

## 서버 흐름

광고 시청 시간을 서버가 확인할 수 있도록 요청을 두 단계로 나눈다.

1. `POST /sessions/:id/hint-ticket`: 남은 광고 힌트가 있는지 확인한다. 없으면 409를 돌려주어 플레이어가 보상 없이 광고를 보지 않게 한다. 있으면 `state.hintTicket`에 현재 시각을 저장한다.
2. 클라이언트가 광고를 재생한다.
3. `POST /sessions/:id/hint`: 티켓이 없으면 403, 발급 후 `AD_MIN_MS`(7초)가 지나지 않았으면 429를 돌려준다. 통과하면 티켓을 지우고 `adHints`를 1 늘린 뒤 힌트 문구를 돌려준다.

7초는 Ad Manager 웹 보상형 광고가 보상 지급 전에 요구하는 최소 노출 시간이다. `hint-ticket`과 `hint`는 `ACTIONS`에 추가하고 `Session.act`에서 분기한다.

```ts
// server/src/game.ts
const AD_MIN_MS = 7000;

function nextAdHint(state: SessionState) {
  return scenarioOf(state).adHints.find((h) => !state.clues.includes(h.clue));
}

export function hintTicket(state: SessionState, now: number) {
  assertPlaying(state);
  if (!nextAdHint(state)) throw new GameError(409);
  state.hintTicket = now;
  return {};
}

export function hint(state: SessionState, now: number) {
  assertPlaying(state);
  if (state.hintTicket === undefined) throw new GameError(403);
  if (now - state.hintTicket < AD_MIN_MS) throw new GameError(429);
  state.hintTicket = undefined;
  state.adHints++;
  return { text: nextAdHint(state)?.text };
}
```

`now`는 `Session`에서 `Date.now()`로 넘긴다. 시간을 인자로 받으면 판정 함수가 순수하게 유지된다.

### 검증의 한계

웹 보상형 광고의 보상 이벤트는 브라우저에서 발생하고, 서버가 광고 시청을 직접 검증하는 방법은 확인하지 못했다(uncertain). 따라서 이 설계가 강제하는 것은 "티켓 발급 후 7초 대기"뿐이며, 클라이언트를 조작하면 광고 없이 7초만 기다려 힌트를 받을 수 있다. 힌트 우회의 손실은 광고 1회분이라 이 수준으로 둔다. 모바일에서는 AdMob의 서버 측 보상 검증(SSV)으로 교체해 티켓 대신 AdMob 콜백으로 보상을 확정한다.

## 클라이언트 흐름

광고 SDK는 `js/ads.js` 한 파일에 감싼다. 게임 코드는 `showRewardedAd()`만 호출하므로 모바일에서 AdMob으로 바꿀 때 이 파일만 교체한다.

```js
// js/ads.js
// 보상을 받으면 true, 광고를 닫거나 불러오지 못하면 false로 끝난다.
function showRewardedAd() { /* ... */ }
```

웹 구현은 Google Publisher Tag(GPT)의 보상형 슬롯을 쓴다.

- `googletag.defineOutOfPageSlot(AD_UNIT, googletag.enums.OutOfPageFormat.REWARDED)`로 슬롯을 만든다. `null`이 돌아오면 해당 환경이 보상형 광고를 지원하지 않는 것이므로 `false`로 끝낸다.
- 웹 보상형 광고는 확대·축소가 중립인 모바일 최적화 페이지에서만 지원되어 PC 브라우저에서는 슬롯이 `null`이다. `index.html:5`의 viewport 설정은 이미 이 조건을 맞추며, PC에서는 광고 힌트를 쓸 수 없다는 안내를 띄운다.
- `rewardedSlotReady`에서 `event.makeRewardedVisible()`을 호출해 광고를 띄운다. 옵트인 확인은 게임 쪽 힌트 버튼이 대신하므로 바로 호출한다.
- `rewardedSlotGranted`에서 보상 플래그를 세우고, `rewardedSlotClosed`에서 슬롯을 제거하고 플래그 값으로 끝낸다.
- 광고 단위 ID가 없는 동안에는 GPT 공식 샘플의 테스트 경로 `/22639388115/rewarded_web_example`을 `AD_UNIT`으로 쓴다.

게임 화면에는 단서 목록 근처에 힌트 버튼을 둔다. 버튼 동작은 다음 순서를 따른다.

1. `act('hint-ticket')`을 호출한다. 409면 "더 줄 힌트가 없다"는 안내를 띄우고 끝낸다.
2. `showRewardedAd()`를 호출한다. `false`면 아무것도 지급하지 않고 끝낸다.
3. `act('hint')`를 호출하고 받은 문구를 해설자 대사로 `say()`에 넘긴다.

`api()`는 응답이 실패하면 예외를 던지고 `unhandledrejection`에서 서버 연결 오류로 안내한다(`js/game.js:31`). 409와 429는 정상 흐름이므로 힌트 버튼에서는 상태 코드를 구분해 처리해야 한다.

## 변경 대상

- `server/src/types.ts`: `Scenario.adHints`, `SessionState.hintTicket`·`adHints`를 추가한다.
- `server/src/game.ts`: `hintTicket`, `hint`를 추가하고 `newState`에서 `adHints: 0`으로 초기화한다.
- `server/src/session.ts`, `server/src/index.ts`: 두 액션을 라우팅한다.
- `server/src/scenarios/*.ts`: 시나리오별 `adHints` 문구를 작성한다. 결정적 증거까지 이어지는 풀이 순서를 기준으로 삼는다.
- `js/ads.js`(신규): 보상형 광고 래퍼를 둔다.
- `js/game.js`, `index.html`: 힌트 버튼과 GPT 스크립트 로드를 추가한다.

## 미결 사항

- 실제 광고 단위 ID가 필요하다. 다음 순서로 준비한다.
  1. AdSense에 사이트 없이 가입한다.
  2. 프론트엔드를 Cloudflare Pages로 옮긴 뒤 `프로젝트.pages.dev`를 AdSense 사이트로 등록한다.
  3. Ad Manager에 가입하고 Inventory → Ad units에서 보상형 광고 단위를 만든다. 코드에 넣는 값은 `/네트워크코드/광고단위코드` 형식이다.
- 기존 진행 중 세션은 `adHints` 필드가 없으므로, 배포 시 `state.adHints ?? 0`으로 읽을지 기존 세션을 무시할지 정해야 한다.
- 세션당 광고 힌트 횟수 상한은 두지 않는다. 남은 힌트 수가 곧 상한이며, 3단계 데이터에서 남용이 보이면 다시 정한다.
