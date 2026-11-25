const LOBBY = [
  { id: 'mansion', title: '백야장 독살 사건', tag: '저택 · 용의자 4명', art: 'mansion', desc: '폭우로 고립된 저택. 새 유언장 공개 전날 밤, 주인이 서재에서 숨진 채 발견된다.' },
  { id: 'theater', title: '커튼콜', tag: '소극장 · 용의자 4명', art: 'theater', desc: '폐관 공연의 마지막 밤, 분장실에서 극단 대표가 숨진 채 발견된다.' },
  { id: 'lighthouse', title: '마지막 불빛', tag: '섬 · 용의자 4명', art: 'lighthouse', desc: '폭풍 치는 밤 등대 불이 꺼졌다. 다음 날 아침, 등대지기가 계단 아래에서 발견된다.' },
  { id: 'train', title: '종착역', tag: '야간열차 · 용의자 4명', art: 'train', desc: '폭설로 멈춘 침대열차. 잠긴 객실에서 출판사 대표가 숨진 채 발견된다.', locked: true, ad: true },
];
const API_BASE = location.hostname === 'localhost'
  ? 'http://localhost:8787'
  : 'https://crime-scene-server.crime-scene-server.workers.dev';

const $ = (id) => document.getElementById(id);
const state = { session: null, scenario: null, clues: new Map(), inspected: new Set(), lives: 0, view: null };
let selectedId = null;
let typing = null;

async function api(path, body) {
  document.body.classList.add('loading');
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } finally {
    document.body.classList.remove('loading');
  }
}

const act = (action, body) => api(`/sessions/${state.session}/${action}`, body);
window.addEventListener('unhandledrejection', () => alert('서버와 연결할 수 없습니다.'));

// 화면 전환
function show(screenId) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.id === screenId));
}

// 로비
// 사파리 사생활 보호 모드 등에서는 localStorage 접근이 예외를 던진다.
const unlockKey = (id) => `unlocked:${id}`;
function isUnlocked(id) {
  try { return localStorage.getItem(unlockKey(id)) === '1'; } catch { return false; }
}
function saveUnlock(id) {
  try { localStorage.setItem(unlockKey(id), '1'); } catch {}
}

function renderLobby() {
  const cards = $('cards');
  LOBBY.forEach((s) => {
    const card = document.createElement('article');
    const select = () => {
      document.querySelectorAll('.card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedId = s.id;
      $('start').disabled = false;
    };
    const locked = s.locked && !(s.ad && isUnlocked(s.id));
    card.className = `card${locked ? ' locked' : ''}${locked && s.ad ? ' ad' : ''}`;
    card.innerHTML = `
      <div class="card-art">${ART.scenes[s.art]}${locked ? `<div class="lock">${ART.lock}<span>${s.ad ? '광고 보고 열기' : '잠김'}</span></div>` : ''}</div>
      <div class="card-body"><div class="tag">${s.tag}</div><h2>${s.title}</h2><p>${s.desc}</p></div>`;
    if (!locked) {
      card.addEventListener('click', select);
    } else if (s.ad) {
      card.addEventListener('click', async () => {
        if (!card.classList.contains('locked')) return select();
        let watched = await showRewardedAd();
        // PC 브라우저는 보상형 광고를 지원하지 않아 개발용 localhost에서만 바로 연다.
        if (watched === null && location.hostname === 'localhost') watched = true;
        if (watched === null) return alert('이 시나리오는 모바일 브라우저에서 광고를 보고 열 수 있습니다.');
        if (!watched) return alert('광고를 끝까지 봐야 시나리오가 열립니다.');
        saveUnlock(s.id);
        card.classList.remove('locked', 'ad');
        card.querySelector('.lock').remove();
        select();
      });
    }
    cards.appendChild(card);
  });
}

// 도입부
async function startScenario(id) {
  const sc = await api('/sessions', { scenario: id });
  Object.assign(state, { session: sc.session, scenarioId: id, scenario: sc, clues: new Map(), inspected: new Set(), lives: sc.lives, view: null });
  $('intro-title').textContent = sc.title;
  $('intro-text').innerHTML = sc.intro.map((p, i) => `<p style="animation-delay:${0.4 + i * 1.1}s">${p}</p>`).join('');
  $('intro-next').style.animationDelay = `${0.4 + sc.intro.length * 1.1}s`;
  show('intro');
}

const currentMap = () => MAPS[state.scenarioId];

function enterPlay() {
  const sc = state.scenario;
  const map = currentMap();
  $('play-title').textContent = sc.title;
  $('play').classList.toggle('has-map', Boolean(map));
  renderNav();
  renderLives();
  renderClues();
  $('hint-btn').disabled = false;
  show('play');
  if (map) {
    Minimap.init(state.scenarioId, sc.locations, (id) => openLocation(sc.locations.find((l) => l.id === id)));
    openMap();
  } else {
    openLocation(sc.locations.find((l) => l.id === sc.start));
  }
}

// 탐색 맵
function openMap() {
  state.view = { type: 'map' };
  setTarget(null);
  $('dialog').classList.remove('shown');
  $('leave-room').hidden = true;
  enterScene('<div class="map-stage"></div>', true);
  Minimap.render($('scene').querySelector('.map-stage'));
}

// 좌측 내비게이션
function renderNav() {
  const sc = state.scenario;
  $('nav-locations').innerHTML = sc.locations.map((l) => `<button class="nav-btn" data-loc="${l.id}">${l.name}</button>`).join('');
  $('nav-suspects').innerHTML = sc.suspects.map((s) =>
    `<button class="nav-suspect" data-sus="${s.id}"><span class="mini">${ART.portrait(s.portrait)}</span><span><b>${s.name}</b><small>${s.role}</small></span></button>`).join('');
  document.querySelectorAll('[data-loc]').forEach((b) =>
    b.addEventListener('click', () => openLocation(sc.locations.find((l) => l.id === b.dataset.loc))));
  document.querySelectorAll('[data-sus]').forEach((b) =>
    b.addEventListener('click', () => openSuspect(sc.suspects.find((s) => s.id === b.dataset.sus))));
}

function markNav(key, id) {
  document.querySelectorAll('.nav-btn, .nav-suspect').forEach((b) => b.classList.toggle('active', b.dataset[key] === id));
}

function enterScene(html, mapMode = false) {
  const scene = $('scene');
  scene.innerHTML = html;
  scene.classList.toggle('map-mode', mapMode);
  scene.classList.remove('enter');
  void scene.offsetWidth;
  scene.classList.add('enter');
}

// 장소 탐색
function openLocation(loc) {
  state.view = { type: 'location', loc };
  setTarget(null);
  const map = currentMap();
  $('leave-room').hidden = !map;
  markNav('loc', loc.id);
  enterScene(`<div class="scene-art">${ART.scenes[loc.art]}</div><div class="scene-name">${loc.name}</div>`);
  loc.spots.forEach((spot) => {
    const key = `${loc.id}:${spot.id}`;
    const hs = document.createElement('button');
    hs.className = `hotspot${spot.large ? ' hotspot-large' : ''}${spot.medium ? ' hotspot-medium' : ''}${state.inspected.has(key) ? ' done' : ''}`;
    hs.style.left = `${spot.x}%`;
    hs.style.top = `${spot.y}%`;
    hs.innerHTML = `<span class="hs-label">${spot.label}</span>`;
    hs.addEventListener('click', async () => {
      const r = await act('inspect', { location: loc.id, spot: spot.id });
      const firstInspection = !state.inspected.has(key);
      state.inspected.add(key);
      hs.classList.add('done');
      say(spot.label, r.text, () => {
        if (r.clue) gainClue(r.clue);
        if (firstInspection) showInvestigationToast();
      });
    });
    $('scene').appendChild(hs);
  });
  if (map) {
    state.scenario.suspects.filter((s) => map.suspects[s.id] === loc.id).forEach((sus) => {
      const fig = document.createElement('button');
      fig.className = 'room-suspect';
      fig.style.left = `${map.stand[sus.id]}%`;
      fig.innerHTML = `${ART.portrait(sus.portrait)}<span class="tag">${sus.name}</span>`;
      fig.addEventListener('click', () => talkInRoom(sus, fig));
      $('scene').appendChild(fig);
    });
  }
  say('', loc.desc);
}

// 맵 시나리오는 별도 심문 화면 없이 방 안에서 대화한다.
function talkInRoom(sus, fig) {
  if (state.view.sus) return;
  state.view.sus = sus;
  setTarget(sus);
  Minimap.meet(sus);
  fig.classList.add('active');
  $('scene').classList.add('talking');
  say('', sus.intro, null, suspectChoices(sus));
}

function stepBack(sus) {
  state.view.sus = null;
  setTarget(null);
  $('scene').classList.remove('talking');
  const fig = $('scene').querySelector('.room-suspect.active');
  fig.classList.remove('active');
  fig.blur();
  say('', `${sus.name}에게서 물러났다.`);
}

// 심문
function openSuspect(sus) {
  state.view = { type: 'suspect', sus };
  setTarget(sus);
  markNav('sus', sus.id);
  enterScene(`<div class="scene-art dim">${ART.scenes[state.scenario.interrogation || 'interrogation']}</div>
    <div class="portrait">${ART.portrait(sus.portrait)}</div>
    <div class="nameplate"><b>${sus.name}</b><small>${sus.role}</small></div>`);
  say('', sus.intro, null, suspectChoices(sus));
}

function suspectChoices(sus) {
  const choices = [
    { label: '이야기를 듣는다', run: () => say(sus.name, sus.talk, null, suspectChoices(sus)) },
  ];
  if (currentMap()) choices.push({ label: '물러난다', key: 'Esc', run: () => stepBack(sus) });
  return choices;
}

async function present(clueId) {
  const sus = state.view.sus;
  const r = await act('present', { suspect: sus.id, clue: clueId });
  const portrait = $('scene').querySelector('.portrait, .room-suspect.active');
  portrait.classList.remove('shaken');
  void portrait.offsetWidth;
  if (r.reacted) portrait.classList.add('shaken');
  say(sus.name, r.text, () => { if (r.clue) gainClue(r.clue); }, suspectChoices(sus));
}

// 대사창 (타자 효과)
function say(speaker, text, onDone, choices = []) {
  // 타자 도중 다른 대사로 넘어가도 앞 대사의 단서 획득은 유지한다
  if (typing) {
    clearInterval(typing.timer);
    if (typing.onDone) typing.onDone();
    typing = null;
  }
  $('dialog').classList.remove('hint');
  $('dialog-speaker').textContent = speaker;
  $('dialog-speaker').hidden = !speaker;
  $('dialog-choices').innerHTML = '';
  const out = $('dialog-text');
  out.textContent = '';
  let i = 0;
  const finish = () => {
    clearInterval(typing.timer);
    typing = null;
    out.textContent = text;
    $('dialog').classList.remove('typing');
    (choices || []).forEach((c) => {
      const b = document.createElement('button');
      b.className = 'choice';
      b.textContent = c.label;
      if (c.key) b.dataset.key = c.key;
      b.addEventListener('click', (e) => { e.stopPropagation(); c.run(); });
      $('dialog-choices').appendChild(b);
    });
    if (onDone) onDone();
  };
  typing = { finish, onDone, timer: setInterval(() => { out.textContent = text.slice(0, ++i); if (i >= text.length) finish(); }, 24) };
  $('dialog').classList.add('typing');
}

// 단서
function showInvestigationToast() {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = '<span class="toast-icon">✦</span><span><small>조사 완료</small><b>주변을 살펴보았습니다.</b></span>';
  $('toasts').appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function gainClue(clue) {
  if (state.clues.has(clue.id)) return;
  state.clues.set(clue.id, clue);
  renderClues();
}

function renderClues() {
  const clues = [...state.clues.values()];
  $('clue-count').textContent = clues.length;
  $('clue-list').innerHTML = clues.length
    ? clues.map((c) =>
      `<li><button class="clue" data-clue="${c.id}"><span class="clue-icon">${ART.icon(c.icon)}</span><b>${c.name}</b></button></li>`).join('')
    : '<li class="empty">아직 모은 단서가 없다.</li>';
  $('clue-list').querySelectorAll('[data-clue]').forEach((b) =>
    b.addEventListener('click', () => pickClue(state.clues.get(b.dataset.clue))));
}

function pickClue(clue) {
  if (state.view.sus) return present(clue.id);
  $('dialog').classList.add('shown');
  say(clue.name, clue.desc);
}

function setTarget(sus) {
  $('clue-panel').classList.toggle('presenting', Boolean(sus));
  $('clue-head').textContent = sus ? `${sus.name}에게 제시할 단서` : '단서';
}

// 힌트 광고: 서버가 티켓을 발급한 뒤 광고를 보여 주고, 시청 시간을 확인한 서버가 힌트를 준다.
function narrate(text) {
  $('dialog').classList.add('shown');
  say('✦ 힌트', text, null, state.view.sus ? suspectChoices(state.view.sus) : []);
  $('dialog').classList.add('hint');
}

async function requestHint() {
  try {
    await act('hint-ticket', {});
    const watched = await showRewardedAd();
    if (watched === null) return narrate('광고 힌트는 모바일 브라우저에서만 받을 수 있다.');
    if (!watched) return narrate('광고를 끝까지 보지 않아 힌트를 받지 못했다.');
    narrate((await act('hint', {})).text);
  } catch (e) {
    if (e.message === '409') {
      $('hint-btn').disabled = true;
      narrate('더 줄 힌트가 없다. 모은 단서로 범인을 밝혀 보자.');
    } else if (e.message === '429') {
      narrate('광고를 끝까지 봐야 힌트를 받을 수 있다.');
    } else {
      throw e;
    }
  }
}

// 고발
function renderLives() {
  $('lives').innerHTML = Array.from({ length: state.scenario.maxLives }, (_, i) =>
    `<span class="candle${i < state.lives ? '' : ' out'}">${ART.candle}</span>`).join('');
}

function openAccuse() {
  const acc = state.scenario.accusation;
  $('report-code').textContent = acc.code;
  $('report-intro').textContent = acc.intro;
  $('report-clue-count').textContent = state.clues.size;
  $('accuse-questions').innerHTML = acc.questions.map((q) => `
    <fieldset><legend>${q.label}</legend>
      ${q.options.map((o) => `<label class="chip"><input type="radio" name="${q.key}" value="${o.id}"><span>${o.label}</span></label>`).join('')}
    </fieldset>`).join('');
  $('accuse-msg').textContent = `현재 추리 기회 ${state.lives}회입니다.`;
  $('accuse-modal').classList.add('open');
}

async function submitAccuse() {
  const questions = state.scenario.accusation.questions;
  const picks = Object.fromEntries(questions.map((q) => [q.key, document.querySelector(`input[name="${q.key}"]:checked`)?.value]));
  if (Object.values(picks).some((v) => !v)) {
    $('accuse-msg').textContent = '모든 항목을 선택하세요.';
    return;
  }
  const r = await act('accuse', { picks });
  state.lives = r.lives;
  renderLives();
  if (r.ending) return showEnding(r.ending);
  const box = $('accuse-box');
  box.classList.remove('shake');
  void box.offsetWidth;
  box.classList.add('shake');
  $('accuse-msg').textContent = `추리가 맞지 않습니다. 단서와 다시 대조하세요. (${r.correct}/${r.total} 일치) 촛불 ${state.lives}개가 남았습니다.`;
}

function showEnding({ success, text }) {
  $('accuse-modal').classList.remove('open');
  const ending = $('ending');
  ending.classList.toggle('fail', !success);
  $('stamp').textContent = success ? '사건 해결' : '미해결';
  $('ending-text').innerHTML = text
    .map((p, i) => `<p style="animation-delay:${1 + i * 0.9}s">${p}</p>`).join('');
  show('ending');
}

// 연출: 클릭 파문, 번개
document.addEventListener('pointerdown', (e) => {
  const r = document.createElement('span');
  r.className = 'ripple';
  r.style.left = `${e.clientX}px`;
  r.style.top = `${e.clientY}px`;
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 600);
});

function lightning() {
  const f = $('flash');
  f.classList.remove('on');
  void f.offsetWidth;
  f.classList.add('on');
  setTimeout(lightning, 8000 + Math.random() * 10000);
}

// 이벤트 연결
renderLobby();
$('start').addEventListener('click', () => startScenario(selectedId));
$('help').addEventListener('click', () => $('help-modal').classList.add('open'));
$('help-close').addEventListener('click', () => $('help-modal').classList.remove('open'));
$('intro-next').addEventListener('click', enterPlay);
$('dialog').addEventListener('click', () => { if (typing) typing.finish(); });
$('accuse-btn').addEventListener('click', openAccuse);
$('hint-btn').addEventListener('click', requestHint);
$('leave-room').addEventListener('click', openMap);
const narrow = matchMedia('(max-width: 860px)');
const placeClues = () => (narrow.matches ? $('scene').before($('clue-panel')) : $('accuse-btn').parentElement.before($('clue-panel')));
narrow.addEventListener('change', placeClues);
placeClues();
// Esc는 대화 → 방 → 맵 순으로 한 단계씩 물러난다.
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || !currentMap() || !$('play').classList.contains('active')) return;
  if (document.querySelector('.modal.open')) return;
  if (state.view.sus) stepBack(state.view.sus);
  else if (state.view.type === 'location') openMap();
});
$('accuse-submit').addEventListener('click', submitAccuse);
$('accuse-cancel').addEventListener('click', () => $('accuse-modal').classList.remove('open'));
$('to-lobby').addEventListener('click', () => $('leave-modal').classList.add('open'));
$('leave-cancel').addEventListener('click', () => $('leave-modal').classList.remove('open'));
$('leave-confirm').addEventListener('click', () => {
  $('leave-modal').classList.remove('open');
  show('lobby');
});
$('ending-lobby').addEventListener('click', () => show('lobby'));
window.addEventListener('beforeunload', (e) => { if ($('play').classList.contains('active')) e.preventDefault(); });
document.querySelectorAll('.modal').forEach((m) =>
  m.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('open'); }));
setTimeout(lightning, 3000);
