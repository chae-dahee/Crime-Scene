import type { Scenario } from '../types';

export const mansion: Scenario = {
  title: '백야장 독살 사건',
  intro: [
    '폭우가 사흘째 그치지 않는 산속 저택, 백야장.',
    '유일한 다리가 무너지면서 저택은 바깥과 끊겼다.',
    '오늘 밤, 저택 주인 한도윤이 서재에서 숨진 채 발견되었다. 내일 새 유언장을 공개할 예정이었다.',
    '경찰이 도착하려면 비가 그쳐야 한다. 그때까지 진실을 밝혀낼 사람은 당신뿐이다.',
  ],
  start: 'study',

  clues: {
    tea_cup: { name: '반쯤 남은 홍차', icon: 'cup', desc: '서재 책상의 홍차. 반쯤 남아 있고 특별한 냄새는 없다.' },
    pillbox: { name: '한도윤의 약통', icon: 'pill', desc: '30알이어야 할 약이 29알. 한 알만 크기가 조금 다르고, 바닥에 녹색 가루가 묻어 있다.' },
    will_draft: { name: '새 유언장 초안', icon: 'doc', desc: '한서진의 몫을 다시 정하고 최은우에게도 재산 일부를 남긴다는 메모가 있다. 마지막 장에는 "부속 문서 별첨"이라고 적혀 있지만 문서는 없다.' },
    teapot: { name: '찻주전자 메모', icon: 'pot', desc: '한 주전자로 세 잔을 따랐다. 주인님, 서진 아가씨, 집사 몫이다.' },
    med_record: { name: '수정된 투약 기록', icon: 'doc', desc: '지난달 투약 용량이 수정액으로 지워지고 다른 숫자가 덧쓰여 있다.' },
    empty_capsules: { name: '빈 캡슐', icon: 'pill', desc: '의무실 선반에 있던 빈 캡슐 몇 개. 한도윤이 먹던 약과 크기가 같다.' },
    poison_plant: { name: '꺾인 흰종꽃', icon: 'plant', desc: '잎과 꽃에 강한 독이 있어 소량으로도 심장이 멎는다. 줄기 몇 개가 최근에 꺾였다.' },
    footprint: { name: '붉은 진흙 발자국', icon: 'foot', desc: '온실 바닥의 붉은 진흙 발자국. 남성 구두 크기다.' },
    debt_letters: { name: '빚 독촉장', icon: 'doc', desc: '한서진 앞으로 온 독촉장 여러 장. 기한은 이번 달 말이다.' },
    muddy_shoes: { name: '진흙 묻은 구두', icon: 'shoe', desc: '윤재호의 구두. 밑창에 붉은 진흙이 말라붙어 있다.' },
    old_photo: { name: '오래된 사진', icon: 'photo', desc: '젊은 한도윤과 한 여성이 함께 찍힌 사진. 여성은 최은우를 닮았다.' },
    maid_testimony: { name: '집사의 증언', icon: 'voice', desc: '집사는 약에 손대지 않는다고 했다. 빈 캡슐을 보고는 저녁에 윤재호가 약통을 채울 때 같은 캡슐을 들고 있었다고 말했다.' },
    maid_greenhouse: { name: '온실 목격담', icon: 'voice', desc: '어제 저녁 집사가 윤재호의 젖은 구두를 닦아 주려 했지만 윤재호가 사양했다. 윤재호는 온실 쪽 문으로 들어왔다.' },
    annex: { name: '유언장 부속 문서', icon: 'doc', desc: '윤재호의 투약 실수로 한도윤의 병세가 악화되었다는 기록. 내일 공개될 예정이었다.' },
    secret: { name: '은우의 비밀', icon: 'voice', desc: '최은우는 한도윤의 혼외 딸이다. 그 사실을 확인하려고 비서로 들어왔다.' },
    dismissal: { name: '해고 통보서', icon: 'doc', desc: '한도윤이 박미령에게 보낸 해고 통보서. 30년 근속 끝에 사흘 전 받았다.' },
    maid_secret: { name: '집사가 숨긴 과거', icon: 'voice', desc: '박미령은 오래전부터 은우의 어머니와 한도윤의 관계를 알고 있었다. 한도윤의 부탁으로 서진과 은우 모두에게 비밀로 했다.' },
  },

  locations: [
    {
      id: 'study', name: '서재', art: 'study',
      desc: '한도윤이 쓰러져 있던 방이다. 책상 위에 홍차 잔과 약통이 그대로 놓여 있다.',
      spots: [
        { id: 'cup', label: '홍차 잔', x: 30, y: 71, clue: 'tea_cup', text: '홍차가 반쯤 남아 있다. 이미 식었다. 코를 대 보았지만 특별한 냄새는 나지 않는다.' },
        { id: 'pills', label: '약통', x: 43, y: 73, clue: 'pillbox', text: '한도윤의 지병 약이다. 라벨에는 30알이라고 적혀 있는데 29알뿐이다. 한 알은 다른 것보다 조금 크고, 통 바닥에 녹색 가루가 묻어 있다.' },
        { id: 'drawer', label: '유언장 초안', x: 61, y: 80, medium: true, clue: 'will_draft', text: '책상 위에 새 유언장 초안이 있다. 한서진의 몫을 다시 정하고 최은우에게도 재산 일부를 남긴다는 메모가 있다. 마지막 장에는 "부속 문서 별첨"이라고 적혀 있지만, 부속 문서는 어디에도 없다.' },
        { id: 'shelf', label: '책장', x: 88, y: 38, large: true, text: '의학 서적과 식물 도감이 빽빽하다. 식물 도감 한 권이 거꾸로 꽂혀 있다. 누군가 급하게 넣은 것 같다.' },
      ],
    },
    {
      id: 'kitchen', name: '주방', art: 'kitchen',
      desc: '저녁 설거지가 끝난 주방이다. 찻주전자가 행주 위에 놓여 있다.',
      spots: [
        { id: 'teapot', label: '찻주전자', x: 37, y: 64, clue: 'teapot', text: '주전자 옆에 집사의 메모가 있다. "주인님, 서진 아가씨, 내 몫까지 세 잔." 같은 주전자의 차를 세 명이 마셨다는 뜻이다.' },
        { id: 'cups', label: '찻잔 건조대', x: 56, y: 67, text: '씻어 엎어 둔 찻잔이 세 개 있다. 모두 깨끗하다.' },
        { id: 'trash', label: '쓰레기통', x: 80, y: 64, text: '찻잎 찌꺼기와 포장지뿐이다. 특별한 것은 없다.' },
      ],
    },
    {
      id: 'infirmary', name: '의무실', art: 'infirmary',
      desc: '주치의가 쓰는 작은 진료실이다. 소독약 냄새가 난다.',
      spots: [
        { id: 'ledger', label: '투약 기록 장부', x: 29, y: 80, clue: 'med_record', text: '한도윤의 투약 기록이다. 지난달 몇 줄이 수정액으로 지워지고 다른 용량이 덧쓰여 있다.' },
        { id: 'cabinet', label: '약품 선반', x: 80, y: 34, clue: 'empty_capsules', text: '약병이 가지런하다. 그런데 선반 구석에 빈 캡슐이 몇 개 놓여 있다. 한도윤이 먹던 약과 크기가 같다.' },
        { id: 'sign', label: '벽의 적십자', x: 43, y: 20, text: '오래된 적십자 표지판이다. 먼지가 앉아 있다.' },
      ],
    },
    {
      id: 'greenhouse', name: '온실', art: 'greenhouse',
      desc: '한도윤이 아끼던 유리 온실이다. 빗소리가 유리를 두드린다.',
      spots: [
        { id: 'plant', label: '흰종꽃 화분', x: 50, y: 64, clue: 'poison_plant', text: '명패에 "흰종꽃: 잎과 꽃에 강한 독. 소량으로도 심장이 멎는다."라고 적혀 있다. 줄기 몇 개가 최근에 꺾였다.' },
        { id: 'floor', label: '바닥', x: 74, y: 82, clue: 'footprint', text: '붉은 진흙 발자국이 출입구 쪽으로 이어져 있다. 남성 구두 크기다. 저택에서 이 흙이 있는 곳은 온실뿐이다.' },
        { id: 'fern', label: '고사리 화분', x: 11, y: 63, text: '잘 손질된 고사리다. 최근에 물을 준 흔적이 있다.' },
      ],
    },
    {
      id: 'rooms', name: '2층 객실', art: 'hallway',
      desc: '가족과 손님이 머무는 2층 복도다. 문 네 개가 나란히 있다.',
      spots: [
        { id: 'seojin', label: '한서진의 방', x: 16, y: 90, clue: 'debt_letters', text: '문 앞 바닥에 빚 독촉장이 흩어져 있다. 모두 한서진 앞으로 왔고 기한은 이번 달 말이다.' },
        { id: 'jaeho', label: '윤재호의 방', x: 34, y: 76, clue: 'muddy_shoes', text: '문 옆에 구두가 놓여 있다. 밑창에 붉은 진흙이 말라붙어 있다.' },
        { id: 'miryeong', label: '박미령의 방', x: 71, y: 41, clue: 'dismissal', text: '30년 근속 감사패가 걸려 있다. 그 아래 서랍에 한도윤의 서명이 든 해고 통보서가 있다. 날짜는 사흘 전이다.' },
        { id: 'eunwoo', label: '최은우의 방', x: 96, y: 39, clue: 'old_photo', text: '벽에 오래된 가족사진이 걸려 있다. 젊은 한도윤 옆에 선 여성이 최은우와 놀랍도록 닮았다.' },
      ],
    },
  ],

  suspects: [
    {
      id: 'seojin', name: '한서진', role: '한도윤의 장녀',
      portrait: { image: 'assets/scenario1/characters/seojin.png', hair: 'long', hairColor: '#1a1414', skin: '#f0d2bc', clothes: '#4a1f2a', bg: '#4a2a30', extras: ['necklace'], browTilt: 92 },
      intro: '날카로운 눈빛의 장녀다. 팔짱을 낀 채 당신을 노려본다.',
      talk: '아버지와 저녁 먹고 같이 홍차를 마셨어요. 나는 멀쩡하잖아요? 차에 뭐가 들었으면 나도 죽었겠죠.',
      reactions: {
        debt_letters: { text: '빚 있는 건 맞아요. 그런데 집사님이 그걸 아버지께 말한 뒤 유언장이 바뀌었어요. 그분이 내 몫까지 빼앗은 거예요.' },
        will_draft: { text: '최은우요? 들어온 지 1년밖에 안 된 비서한테 왜 재산을 줘요? 그 여자가 뭔데 내 몫을 깎고 자기 이름을 넣어요! 아버지를 홀린 거예요. 저 말고 그 여자부터 조사하세요.' },
        old_photo: { text: '은우 방에서 왜 아버지 사진이 나와요? 집사님은 이 사진을 본 적 있어요. 둘 다 뭘 숨기는 거죠?' },
        secret: { text: '은우가 아버지 딸이라고요? 그래서 새 유언장에 이름이 있었군요. 그 애가 아버지에게 접근한 이유가 이제야 분명해졌네요.' },
        maid_secret: { text: '집사님은 은우 어머니까지 알고 있었어요? 30년 동안 우리 집에서 일하면서 나만 속인 거예요? 아버지와 유언장 이야기를 당신도 숨겼잖아요.' },
        maid_testimony: { text: '윤 선생님이 약통을요? …그 집사 말을 믿어요? 30년 동안 아버지 귀에 남 얘기만 속삭이던 사람이에요.' },
        dismissal: { text: '아버지가 사흘 전에 집사님을 내보내기로 하셨죠. 30년을 모셨는데 원망 안 했을 리가 없잖아요. 그날 차를 우린 사람도 집사님이에요.' },
        teapot: { text: '봐요, 나도 그 주전자 차를 마셨다니까요.' },
        tea_cup: { text: '식은 차예요. 아버지는 늘 반쯤 남기셨어요.' },
      },
      fallback: '그건 나랑 상관없어요.',
      pressed: '또 그거예요? 지금 날 범인으로 몰고 싶은 거죠?',
    },
    {
      id: 'jaeho', name: '윤재호', role: '주치의',
      portrait: { image: 'assets/scenario1/characters/jaeho.png', hair: 'short', hairColor: '#5a5048', skin: '#e8c8b0', clothes: '#2a2e38', bg: '#2a3440', extras: ['glasses', 'tie'] },
      intro: '10년째 한도윤을 돌본 주치의다. 지나치게 침착하다.',
      talk: '심장이 약하셨습니다. 이런 날씨엔 흔한 일이에요. 사망 시각은 제가 기록해 두겠습니다.',
      reactions: {
        debt_letters: { text: '유언장이 공개되기 전에 한도윤 씨가 돌아가시면 서진 씨에게 유리했겠군요. 빚이 급했다면 충분한 동기 아닙니까?' },
        will_draft: { text: '서진 씨는 상속을 잃을까 두려워했고, 최은우 씨는 새 상속인이 될 수 있었죠. 두 사람 모두 제게 화살을 돌리기 전에 설명할 게 있겠네요.' },
        old_photo: { text: '오래된 사진 한 장으로 무슨 결론을 내리시려는 겁니까? 그 집안의 비밀을 알고 있던 사람은 집사도 마찬가지죠.' },
        secret: { text: '최은우 씨가 한도윤 씨의 딸이라면 유언장에 이해관계가 생깁니다. 그 사실을 숨긴 채 비서로 일한 이유부터 설명해야겠군요.' },
        maid_secret: { text: '집사도 오래전부터 알고 있었다고요? 침묵을 지켜 준 대가로 무엇을 받았는지 물어보셨습니까?' },
        pillbox: { text: '제가 매주 채우는 통입니다. 한 알쯤 흘리셨겠죠. 이건 제가 보관하겠습니다.' },
        teapot: { text: '차는 집사가 우렸다죠. 저라면 그쪽부터 보겠습니다.' },
        muddy_shoes: { text: '비 오기 전에 산책을 했을 뿐입니다.' },
        footprint: { text: '정원 흙이 다 그렇죠.' },
        poison_plant: { text: '온실 식물이요? 저는 식물에 관심이 없습니다.' },
        med_record: { text: '단순한 기재 실수를 고친 겁니다. 기록을 바로잡는 건 의사의 의무예요.', again: '…몇 번을 보셔도 기재 실수입니다.' },
        empty_capsules: { text: '약을 나눠 담으려고 둔 겁니다. 의무실에 캡슐이 있는 게 이상한가요?' },
        annex: { text: '…회장님은 늘 과장이 심하셨어요. 저는 최선을 다한 의사였습니다.' },
        maid_greenhouse: { text: '미령 씨가 요즘 눈이 침침하다고 하던데요.' },
      },
      fallback: '의학적으로 보면 의미 없는 겁니다.',
      pressed: '같은 질문을 반복하시는군요. 저를 의심하신다면 근거를 말씀하시죠.',
    },
    {
      id: 'miryeong', name: '박미령', role: '집사',
      portrait: { image: 'assets/scenario1/characters/miryeong.png', hair: 'bun', hairColor: '#8a8580', skin: '#e6c6ae', clothes: '#1e1e26', bg: '#3a3428', extras: ['apron', 'wrinkles'] },
      intro: '30년 동안 백야장을 지켜 온 집사다. 손이 떨리고 있다.',
      talk: '제가 차를 준비했어요. 하지만 맹세코 아무것도 넣지 않았습니다. 30년을 모신 분이에요.',
      reactions: {
        debt_letters: { text: '제가 한도윤께 말씀드린 건 맞습니다. 서진 아가씨는 그 뒤로 제가 자기 몫을 빼앗으려 했다며 원망했어요.' },
        will_draft: { text: '초안을 본 서진 아가씨가 제게 은우 아가씨 몫을 누가 정했냐고 따졌습니다. 저는 두 아가씨 사이에 끼고 싶지 않았어요.' },
        old_photo: { text: '…주인님 젊으실 적이네요. 옆 분은… 오래전 이 집에 잠시 머무셨던 분입니다. 은우 씨 앞에서는 제가 이 사진을 봤다고 하지 말아 주세요.', gives: 'maid_secret' },
        secret: { text: '네, 오래전부터 알고 있었습니다. 주인님이 두 따님을 위해 비밀로 해 달라고 하셨어요. 하지만 이제는 서진 아가씨도 알아야겠지요.', gives: 'maid_secret' },
        maid_secret: { text: '제가 숨긴 건 맞습니다. 은우 아가씨를 외면한 게 아니라, 두 아가씨가 서로를 원망하게 될까 두려웠어요. 하지만 결국 더 큰 오해를 만들었네요.' },
        pillbox: { text: '약에는 손대지 않습니다. 제 일이 아니라서요. 오늘 저녁에도… 아닙니다.' },
        empty_capsules: { text: '그 캡슐… 저녁에 윤 선생님이 약통을 채우실 때 들고 계시던 거랑 같네요.', gives: 'maid_testimony' },
        teapot: { text: '네, 같은 주전자로 아가씨와 저도 마셨어요. 보시다시피 저희는 멀쩡합니다.' },
        tea_cup: { text: '그 차는 제가 우렸어요. 아가씨와 저도 같은 차를 마셨습니다.' },
        footprint: { text: '온실은 주인님만 드나드셨어요. 저는 그쪽에 가지 않습니다.' },
        dismissal: { text: '…보셨군요. 30년을 모셨는데, 종이 한 장이었어요. 그렇다고 주인님을 해칠 리가 있나요.', again: '그만하세요. 저도 아직 받아들이지 못했어요.' },
        muddy_shoes: { text: '어제 구두를 닦아 드리려 했는데 괜찮다고 하셨어요. 온실 쪽 문으로 들어오시면서요.', gives: 'maid_greenhouse' },
      },
      fallback: '잘 모르겠습니다.',
      pressed: '…저를 의심하시는 건가요. 30년을 모신 분입니다.',
    },
    {
      id: 'eunwoo', name: '최은우', role: '비서',
      portrait: { image: 'assets/scenario1/characters/eunwoo.png', hair: 'bob', hairColor: '#2a1e18', skin: '#f2d6c2', clothes: '#3a4a5a', bg: '#2a3a44', extras: ['ribbon'] },
      intro: '입사 1년 차 비서다. 말수가 적고 시선을 피한다.',
      talk: '유언장 정리를 도왔어요. 내용은 말씀드릴 수 없습니다.',
      reactions: {
        will_draft: { text: '타이핑은 제가 했지만 내용은 말씀드릴 수 없어요. 주인님이 내일까지 아무에게도 보이지 말라고 하셨어요. 상속 조항은 저도 몰랐는데, 서진 씨는 제 이름을 보자마자 제가 돈을 노린다고 하더군요.' },
        debt_letters: { text: '서진 씨는 빚 독촉장이 알려진 뒤 집사님부터 의심했어요. 그런데 새 유언장에 제 이름이 있는 걸 보고는 저를 상속을 노린 사람처럼 몰아붙였죠.' },
        old_photo: { text: '주인님이 아끼던 사진이에요. 정리하다 제 방에 둔 것뿐이에요. 이 집 사진이라면 집사님이 저보다 잘 아시겠죠.' },
        secret: { text: '제가 아버지의 딸이라는 걸 알고 나서 서진 씨가 제게 유언장에 이름을 넣으려고 온 거냐고 했어요. 저는 제 출생을 확인하러 왔지, 상속을 요구하러 온 게 아니에요.' },
        maid_secret: { text: '집사님도 어머니를 알고 있었군요. 제가 이 집에 온 뒤에도 모른 척했어요. …네, 주인님은 제 아버지셨어요. 그걸 확인하러 왔을 뿐, 해치지는 않았어요.', gives: 'secret' },
        med_record: { text: '…이 숫자, 제가 타이핑한 표에 있었어요. 주인님이 이것 때문에 며칠을 못 주무셨어요. 이제 숨길 이유가 없네요. 보여 드릴게요.', gives: 'annex' },
      },
      fallback: '드릴 말씀이 없어요.',
      pressed: '왜 자꾸 그걸 보여 주세요? 제가 뭘 했다고 생각하시는 거예요?',
    },
  ],

  accusation: {
    code: 'BAEKYAJANG · CASE 01',
    intro: '한도윤의 죽음에 대한 결론을 기록하세요. 범인과 수법, 동기를 모두 특정해야 합니다.',
    questions: [
      { key: 'culprit', label: '범인', options: [
        { id: 'seojin', label: '한서진' }, { id: 'jaeho', label: '윤재호' }, { id: 'miryeong', label: '박미령' }, { id: 'eunwoo', label: '최은우' },
      ] },
      { key: 'method', label: '수법', options: [
        { id: 'tea', label: '홍차에 독을 탔다' }, { id: 'swap', label: '약을 독 캡슐로 바꿔치기했다' }, { id: 'inject', label: '주사로 독을 넣었다' },
      ] },
      { key: 'motive', label: '동기', options: [
        { id: 'inherit', label: '상속을 지키려고' }, { id: 'malpractice', label: '의료 과실을 숨기려고' }, { id: 'grudge', label: '해고당한 원한 때문에' }, { id: 'secret', label: '출생의 비밀 때문에' },
      ] },
    ],
    answer: { culprit: 'jaeho', method: 'swap', motive: 'malpractice' },
  },

  endings: {
    success: [
      '윤재호는 한참을 침묵하다가 고개를 떨궜다.',
      '지난달 투약 실수로 한도윤의 병세가 악화되었다. 한도윤은 그 사실을 유언장 부속 문서로 공개하려 했다.',
      '윤재호는 온실의 흰종꽃을 갈아 빈 캡슐에 채웠다. 그리고 저녁에 약통을 채우면서 한 알을 바꿔 넣었다.',
      '서진의 빚과 새 유언장, 은우의 출생, 미령의 침묵은 서로를 의심하게 했지만 독이 든 약통과 온실의 흔적은 재호를 가리켰다.',
      '홍차는 처음부터 미끼에 불과했다. 비가 그친 새벽, 경찰이 다리를 건너왔다.',
    ],
    fail: [
      '진실은 빗속에 묻혔다.',
      '비가 그친 뒤 도착한 경찰은 사건을 심장마비로 처리했다. 주치의의 소견서가 결정적이었다.',
      '백야장의 서재에는 아무도 다시 들어가지 않았다.',
    ],
  },
};
