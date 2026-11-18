const LOBBY = [
  { id: 'mansion', title: '백야장 독살 사건', tag: '저택 · 용의자 4명', art: 'mansion', desc: '폭우로 고립된 저택. 새 유언장 공개 전날 밤, 주인이 서재에서 숨진 채 발견된다.' },
  { id: 'theater', title: '커튼콜', tag: '소극장 · 용의자 4명', art: 'theater', desc: '폐관 공연의 마지막 밤, 분장실에서 극단 대표가 숨진 채 발견된다.' },
  { id: 'lighthouse', title: '마지막 불빛', tag: '섬 · 용의자 4명', art: 'lighthouse', desc: '폭풍 치는 밤 등대 불이 꺼졌다. 다음 날 아침, 등대지기가 계단 아래에서 발견된다.' },
];
const MAX_LIVES = 3;

const $ = (id) => document.getElementById(id);
const state = { scenario: null, clues: new Set(), inspected: new Set(), presented: new Set(), lives: MAX_LIVES, view: null, presenting: false };
let selectedId = null;
let typing = null;

// 화면 전환
function show(screenId) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('active', s.id === screenId));
}

// 로비
function renderLobby() {
  const cards = $('cards');
  LOBBY.forEach((s) => {
    const card = document.createElement('article');
    card.className = `card${s.locked ? ' locked' : ''}`;
    card.innerHTML = `
      <div class="card-art">${ART.scenes[s.art]}${s.locked ? `<div class="lock">${ART.lock}<span>잠김</span></div>` : ''}</div>
      <div class="card-body"><div class="tag">${s.tag}</div><h2>${s.title}</h2><p>${s.desc}</p></div>`;
    if (!s.locked) {
      card.addEventListener('click', () => {
        document.querySelectorAll('.card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedId = s.id;
        $('start').disabled = false;
      });
    }
    cards.appendChild(card);
  });
}

// 도입부
function startScenario(id) {
  const sc = SCENARIOS[id];
  Object.assign(state, { scenario: sc, clues: new Set(), inspected: new Set(), presented: new Set(), lives: MAX_LIVES, view: null, presenting: false });
  $('intro-title').textContent = sc.title;
  $('intro-text').innerHTML = sc.intro.map((p, i) => `<p style="animation-delay:${0.4 + i * 1.1}s">${p}</p>`).join('');
  $('intro-next').style.animationDelay = `${0.4 + sc.intro.length * 1.1}s`;
  show('intro');
}

function enterPlay() {
  const sc = state.scenario;
  $('play-title').textContent = sc.title;
  renderNav();
  renderLives();
  renderNotebook();
  show('play');
  openLocation(sc.locations.find((l) => l.id === sc.start));
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

function enterScene(html) {
  const scene = $('scene');
  scene.innerHTML = html;
  scene.classList.remove('enter');
  void scene.offsetWidth;
  scene.classList.add('enter');
}

// 장소 탐색
function openLocation(loc) {
  state.view = { type: 'location', loc };
  markNav('loc', loc.id);
  enterScene(`<div class="scene-art">${ART.scenes[loc.art]}</div><div class="scene-name">${loc.name}</div>`);
  loc.spots.forEach((spot) => {
    const key = `${loc.id}:${spot.id}`;
    const hs = document.createElement('button');
    hs.className = `hotspot${spot.large ? ' hotspot-large' : ''}${spot.medium ? ' hotspot-medium' : ''}${state.inspected.has(key) ? ' done' : ''}`;
    hs.style.left = `${spot.x}%`;
    hs.style.top = `${spot.y}%`;
    hs.innerHTML = `<span class="hs-label">${spot.label}</span>`;
    hs.addEventListener('click', () => {
      const firstInspection = !state.inspected.has(key);
      state.inspected.add(key);
      hs.classList.add('done');
      say(spot.label, spot.text, () => {
        if (spot.clue) gainClue(spot.clue);
        if (firstInspection) showInvestigationToast();
      });
    });
    $('scene').appendChild(hs);
  });
  say('', loc.desc);
}

// 심문
function openSuspect(sus) {
  state.view = { type: 'suspect', sus };
  markNav('sus', sus.id);
  enterScene(`<div class="scene-art dim">${ART.scenes[state.scenario.interrogation || 'interrogation']}</div>
    <div class="portrait">${ART.portrait(sus.portrait)}</div>
    <div class="nameplate"><b>${sus.name}</b><small>${sus.role}</small></div>`);
  say('', sus.intro, null, suspectChoices(sus));
}

function suspectChoices(sus) {
  return [
    { label: '이야기를 듣는다', run: () => say(sus.name, sus.talk, null, suspectChoices(sus)) },
    { label: '단서를 제시한다', run: () => openNotebook(true) },
  ];
}

function present(clueId) {
  const sus = state.view.sus;
  const r = sus.reactions[clueId];
  closeNotebook();
  const portrait = $('scene').querySelector('.portrait');
  portrait.classList.remove('shaken');
  void portrait.offsetWidth;
  if (r) portrait.classList.add('shaken');
  const key = `${sus.id}:${clueId}`;
  const again = r && state.presented.has(key);
  state.presented.add(key);
  const text = !r ? sus.fallback : again ? (r.again || sus.pressed || r.text) : r.text;
  const gives = r && (again ? r.againGives : r.gives);
  say(sus.name, text, () => { if (gives) gainClue(gives); }, suspectChoices(sus));
}

// 대사창 (타자 효과)
function say(speaker, text, onDone, choices = []) {
  // 타자 도중 다른 대사로 넘어가도 앞 대사의 단서 획득은 유지한다
  if (typing) {
    clearInterval(typing.timer);
    if (typing.onDone) typing.onDone();
    typing = null;
  }
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
      b.addEventListener('click', (e) => { e.stopPropagation(); c.run(); });
      $('dialog-choices').appendChild(b);
    });
    if (onDone) onDone();
  };
  typing = { finish, onDone, timer: setInterval(() => { out.textContent = text.slice(0, ++i); if (i >= text.length) finish(); }, 24) };
  $('dialog').classList.add('typing');
}

// 단서와 수첩
function showInvestigationToast() {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = '<span class="toast-icon">✦</span><span><small>조사 완료</small><b>주변을 살펴보았습니다.</b></span>';
  $('toasts').appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function gainClue(id) {
  if (state.clues.has(id)) return;
  state.clues.add(id);
  renderNotebook();
}

function renderNotebook() {
  const ids = [...state.clues];
  $('clue-count').textContent = ids.length;
  $('notebook-list').innerHTML = ids.length
    ? ids.map((id) => {
      const c = state.scenario.clues[id];
      return `<li class="clue" data-clue="${id}"><span class="clue-icon">${ART.icon(c.icon)}</span><span><b>${c.name}</b><small>${c.desc}</small></span></li>`;
    }).join('')
    : '<li class="empty">아직 기록한 단서가 없다.</li>';
  document.querySelectorAll('[data-clue]').forEach((li) =>
    li.addEventListener('click', () => { if (state.presenting) present(li.dataset.clue); }));
}

function openNotebook(presenting = false) {
  state.presenting = presenting;
  $('notebook').classList.toggle('presenting', presenting);
  $('notebook-title').textContent = presenting ? `${state.view.sus.name}에게 제시할 단서` : '수첩';
  $('notebook').classList.add('open');
}

function closeNotebook() {
  state.presenting = false;
  $('notebook').classList.remove('open');
}

// 고발
function renderLives() {
  $('lives').innerHTML = Array.from({ length: MAX_LIVES }, (_, i) =>
    `<span class="candle${i < state.lives ? '' : ' out'}">${ART.candle}</span>`).join('');
}

function openAccuse() {
  const acc = state.scenario.accusation;
  $('report-clue-count').textContent = state.clues.size;
  $('accuse-questions').innerHTML = acc.questions.map((q) => `
    <fieldset><legend>${q.label}</legend>
      ${q.options.map((o) => `<label class="chip"><input type="radio" name="${q.key}" value="${o.id}"><span>${o.label}</span></label>`).join('')}
    </fieldset>`).join('');
  $('accuse-msg').textContent = `현재 추리 기회 ${state.lives}회입니다.`;
  $('accuse-modal').classList.add('open');
}

function submitAccuse() {
  const acc = state.scenario.accusation;
  const picks = Object.fromEntries(acc.questions.map((q) => [q.key, document.querySelector(`input[name="${q.key}"]:checked`)?.value]));
  if (Object.values(picks).some((v) => !v)) {
    $('accuse-msg').textContent = '범인, 수법, 동기를 모두 선택하세요.';
    return;
  }
  const correct = acc.questions.filter((q) => picks[q.key] === acc.answer[q.key]).length;
  if (correct === acc.questions.length) return showEnding(true);
  state.lives--;
  renderLives();
  if (state.lives === 0) return showEnding(false);
  const box = $('accuse-box');
  box.classList.remove('shake');
  void box.offsetWidth;
  box.classList.add('shake');
  $('accuse-msg').textContent = `추리가 맞지 않습니다. 단서와 다시 대조하세요. (${correct}/${acc.questions.length} 일치) 촛불 ${state.lives}개가 남았습니다.`;
}

function showEnding(success) {
  $('accuse-modal').classList.remove('open');
  closeNotebook();
  const ending = $('ending');
  ending.classList.toggle('fail', !success);
  $('stamp').textContent = success ? '사건 해결' : '미해결';
  $('ending-text').innerHTML = state.scenario.endings[success ? 'success' : 'fail']
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
$('notebook-btn').addEventListener('click', () => openNotebook(false));
$('notebook-close').addEventListener('click', closeNotebook);
$('accuse-btn').addEventListener('click', openAccuse);
$('accuse-submit').addEventListener('click', submitAccuse);
$('accuse-cancel').addEventListener('click', () => $('accuse-modal').classList.remove('open'));
$('to-lobby').addEventListener('click', () => show('lobby'));
$('ending-lobby').addEventListener('click', () => show('lobby'));
document.querySelectorAll('.modal').forEach((m) =>
  m.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('open'); }));
setTimeout(lightning, 3000);
