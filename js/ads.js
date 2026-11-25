// 게임 코드는 showRewardedAd()만 호출한다. 모바일 앱에서는 이 파일만 AdMob으로 교체한다.
// 실제 광고 단위가 생기기 전까지 GPT 공식 샘플의 테스트 경로를 쓴다.
const AD_UNIT = '/22639388115/rewarded_web_example';

// 보상을 받으면 true, 광고를 닫거나 불러오지 못하면 false,
// 보상형 광고를 지원하지 않는 환경(PC 브라우저 등)이면 null로 끝난다.
function showRewardedAd() {
  const gt = window.googletag;
  // 광고 차단 등으로 GPT가 로드되지 않으면 cmd 큐가 실행되지 않는다.
  if (!gt?.apiReady) return Promise.resolve(false);
  return new Promise((resolve) => {
    gt.cmd.push(() => {
      const slot = gt.defineOutOfPageSlot(AD_UNIT, gt.enums.OutOfPageFormat.REWARDED);
      if (!slot) return resolve(null);
      const pubads = gt.pubads();
      let granted = false;
      const handlers = {
        rewardedSlotReady: (e) => e.makeRewardedVisible(),
        rewardedSlotGranted: () => { granted = true; },
        rewardedSlotClosed: () => done(granted),
        slotRenderEnded: (e) => { if (e.isEmpty) done(false); },
      };
      const listeners = Object.entries(handlers).map(([type, fn]) => [type, (e) => { if (e.slot === slot) fn(e); }]);
      function done(result) {
        listeners.forEach(([type, fn]) => pubads.removeEventListener(type, fn));
        gt.destroySlots([slot]);
        resolve(result);
      }
      listeners.forEach(([type, fn]) => pubads.addEventListener(type, fn));
      slot.addService(pubads);
      gt.enableServices();
      gt.display(slot);
    });
  });
}
