// 시나리오별 탐색 맵. 좌표는 ART.floorplan의 viewBox 단위다.
const MAPS = {
  mansion: {
    size: [360, 460],
    start: [180, 400],
    // 탐정 중심점이 지나갈 수 있는 영역: 1층 복도와 각 방의 문틈
    walkable: [[150, 170, 60, 240], [110, 203, 40, 14], [210, 203, 40, 14], [110, 343, 40, 14], [210, 343, 40, 14]],
    // 탭 이동 경로망. 장소 id와 같은 이름의 지점이 그 장소의 탭 이동 목적지다.
    nodes: {
      entry: [180, 400], hallB: [180, 350], hallA: [180, 210],
      study: [130, 210], kitchen: [230, 210], greenhouse: [130, 350], infirmary: [230, 350], rooms: [180, 188],
    },
    edges: [
      ['entry', 'hallB'], ['hallB', 'hallA'], ['hallA', 'rooms'], ['hallA', 'study'], ['hallA', 'kitchen'],
      ['hallB', 'greenhouse'], ['hallB', 'infirmary'],
    ],
    // area: 그림 위 장소 영역, trigger: 들어서면 장소로 전환되는 영역(없으면 area), exit: 장소에서 나온 위치
    rooms: {
      study: { area: [20, 160, 120, 120], exit: [164, 210] },
      kitchen: { area: [220, 160, 120, 120], exit: [196, 210] },
      greenhouse: { area: [20, 280, 120, 140], exit: [164, 350] },
      infirmary: { area: [220, 280, 120, 140], exit: [196, 350] },
      // 2층은 따로 걷지 않고 계단을 오르면 바로 2층 객실로 들어간다.
      rooms: { area: [60, 20, 240, 110], trigger: [140, 160, 80, 34], exit: [180, 232] },
    },
    suspects: { miryeong: 'kitchen', jaeho: 'infirmary', seojin: 'study', eunwoo: 'rooms' },
    // 방 장면에서 용의자 초상이 서는 가로 위치(%). 조사 지점을 가리지 않는 자리다.
    stand: { miryeong: 92, jaeho: 90, seojin: 9, eunwoo: 90 },
  },
  theater: {
    size: [360, 460],
    start: [140, 420],
    walkable: [
      [86, 386, 108, 44], [194, 400, 16, 14], [86, 64, 18, 322], [104, 196, 190, 48],
      [86, 26, 248, 38], [66, 35, 20, 14], [306, 64, 28, 192], [262, 60, 24, 14],
    ],
    nodes: {
      foyer: [140, 408], lobby: [210, 408], spLow: [95, 408], spMid: [95, 225], front: [205, 225], stage: [205, 195],
      spTop: [95, 45], dressing: [72, 42], backstage: [200, 45], wing: [274, 45], stairsTop: [320, 45], booth: [320, 256],
    },
    edges: [
      ['foyer', 'lobby'], ['foyer', 'spLow'], ['spLow', 'spMid'], ['spMid', 'front'], ['front', 'stage'],
      ['spMid', 'spTop'], ['spTop', 'dressing'], ['spTop', 'backstage'], ['backstage', 'stairsTop'], ['stairsTop', 'booth'],
      ['backstage', 'wing'], ['wing', 'stage'],
    ],
    rooms: {
      stage: { area: [110, 70, 190, 130], exit: [205, 225] },
      dressing: { area: [20, 20, 60, 130], exit: [92, 42] },
      backstage: { area: [80, 20, 260, 50], exit: [200, 45], passage: true },
      booth: { area: [220, 250, 120, 80], exit: [320, 236] },
      lobby: { area: [200, 340, 140, 100], exit: [180, 408] },
    },
    suspects: { sera: 'stage', taemin: 'backstage', seunghee: 'booth', yujin: 'stage' },
    stand: { sera: 12, taemin: 12, seunghee: 91, yujin: 92 },
  },
  lighthouse: {
    size: [360, 460],
    start: [180, 400],
    walkable: [[168, 110, 24, 300], [168, 92, 24, 30], [118, 173, 56, 14], [118, 333, 56, 14], [186, 183, 56, 14], [186, 338, 56, 14]],
    nodes: {
      entry: [180, 400], low: [180, 342], high: [180, 185],
      tower: [180, 98], workshop: [125, 180], dock: [125, 340], chief: [235, 190], minbak: [235, 345],
    },
    edges: [
      ['entry', 'low'], ['low', 'dock'], ['low', 'minbak'], ['low', 'high'], ['high', 'workshop'], ['high', 'chief'], ['high', 'tower'],
    ],
    rooms: {
      tower: { area: [120, 16, 120, 90], exit: [180, 130] },
      workshop: { area: [30, 140, 100, 80], exit: [178, 180] },
      dock: { area: [20, 300, 110, 90], exit: [178, 340] },
      chief: { area: [230, 150, 100, 80], exit: [182, 190] },
      minbak: { area: [230, 300, 100, 90], exit: [182, 345] },
    },
    suspects: { hanul: 'tower', deokbae: 'chief', jeonghui: 'workshop', seojun: 'minbak' },
    stand: { hanul: 92, deokbae: 14, jeonghui: 88, seojun: 88 },
  },
};

const Minimap = (() => {
  const SPEED = 110; // viewBox 단위/초
  const STEP_GAP = 12;
  const KEY_DIR = {
    KeyW: [0, -1], ArrowUp: [0, -1], KeyS: [0, 1], ArrowDown: [0, 1],
    KeyA: [-1, 0], ArrowLeft: [-1, 0], KeyD: [1, 0], ArrowRight: [1, 0],
  };
  const keys = new Set();
  const met = new Map();
  const visited = new Set();
  let map = null;
  let id = null;
  let names = {};
  let onEnter = null;
  let pos = null;
  let here = null;
  let path = [];
  let goal = null;
  let stick = [0, 0];
  let root = null;
  const act = document.getElementById('act-btn');

  const inside = ([x, y], [rx, ry, w, h]) => x >= rx && x <= rx + w && y >= ry && y <= ry + h;
  const walkable = (p) => map.walkable.some((r) => inside(p, r));
  const passageAt = (p) => Object.keys(map.rooms).find((r) => map.rooms[r].passage && inside(p, map.rooms[r].area));
  const roomAt = (p) => Object.keys(map.rooms).find((r) => !map.rooms[r].passage && inside(p, map.rooms[r].trigger || map.rooms[r].area));
  const pct = (v, axis) => `${(v / map.size[axis]) * 100}%`;
  const place = (el, [x, y]) => {
    el.style.left = pct(x, 0);
    el.style.top = pct(y, 1);
  };

  function init(scenarioId, locations, enter) {
    id = scenarioId;
    map = MAPS[id];
    names = Object.fromEntries(locations.map((l) => [l.id, l.name]));
    onEnter = enter;
    pos = [...map.start];
    here = null;
    path = [];
    met.clear();
    visited.clear();
  }

  function input() {
    if (document.querySelector('.modal.open')) return [0, 0];
    let [x, y] = stick;
    keys.forEach((k) => {
      x += KEY_DIR[k][0];
      y += KEY_DIR[k][1];
    });
    const len = Math.hypot(x, y);
    return len > 1 ? [x / len, y / len] : [x, y];
  }

  function clear(a, b) {
    const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 2);
    for (let i = 1; i <= n; i++) {
      if (!walkable([a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n])) return false;
    }
    return true;
  }

  function walkTo(room) {
    // 다른 장소 지점에서 출발하면 그 장소로 다시 들어가 버리므로 통로 지점에서만 출발한다.
    const byDistance = Object.keys(map.nodes).filter((n) => n === room || !map.rooms[n] || map.rooms[n].passage)
      .sort((a, b) => Math.hypot(...map.nodes[a].map((v, i) => v - pos[i])) - Math.hypot(...map.nodes[b].map((v, i) => v - pos[i])));
    const from = byDistance.find((n) => clear(pos, map.nodes[n])) || byDistance[0];
    const prev = { [from]: null };
    const queue = [from];
    while (queue.length) {
      const n = queue.shift();
      if (n === room) break;
      map.edges.forEach(([a, b]) => {
        const next = a === n ? b : b === n ? a : null;
        if (next && !(next in prev)) {
          prev[next] = n;
          queue.push(next);
        }
      });
    }
    path = [];
    for (let n = room; n; n = prev[n]) path.unshift(map.nodes[n]);
    goal = room;
  }

  function enter(room) {
    here = room;
    visited.add(room);
    path = [];
    goal = null;
    onEnter(room);
  }

  function updateAct() {
    const passage = passageAt(pos);
    act.disabled = !passage;
    act.textContent = passage ? `${names[passage]} 살펴보기` : '살펴보기';
  }

  function dropStep() {
    const step = document.createElement('span');
    step.className = 'mm-step';
    place(step, pos);
    step.addEventListener('animationend', () => step.remove());
    root.appendChild(step);
  }

  function loop(own) {
    let last = performance.now();
    let walked = 0;
    const detective = own.querySelector('.mm-detective');
    const tick = (now) => {
      if (own !== root || !own.isConnected) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      let [dx, dy] = input();
      let dist = Infinity;
      if (dx || dy) {
        path = [];
        goal = null;
      } else if (path.length) {
        const [tx, ty] = path[0];
        dist = Math.hypot(tx - pos[0], ty - pos[1]);
        if (dist < 0.5) path.shift();
        else [dx, dy] = [(tx - pos[0]) / dist, (ty - pos[1]) / dist];
      } else if (goal && map.rooms[goal].passage) {
        // 통로를 목적지로 탭했으면 도착하자마자 들어간다.
        enter(goal);
        return;
      }
      const moving = Boolean(dx || dy);
      own.classList.toggle('walking', moving);
      if (moving) {
        const s = Math.min(SPEED * dt, dist);
        const before = [...pos];
        if (walkable([pos[0] + dx * s, pos[1]])) pos[0] += dx * s;
        if (walkable([pos[0], pos[1] + dy * s])) pos[1] += dy * s;
        place(detective, pos);
        walked += Math.hypot(pos[0] - before[0], pos[1] - before[1]);
        if (walked >= STEP_GAP) {
          walked = 0;
          dropStep();
        }
        const room = roomAt(pos);
        if (room) {
          enter(room);
          return;
        }
        updateAct();
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function bindStick(el) {
    const knob = el.firstElementChild;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      let x = (e.clientX - r.left) / (r.width / 2) - 1;
      let y = (e.clientY - r.top) / (r.height / 2) - 1;
      const len = Math.hypot(x, y);
      if (len > 1) [x, y] = [x / len, y / len];
      stick = len < 0.2 ? [0, 0] : [x, y];
      knob.style.transform = `translate(${x * 75}%, ${y * 75}%)`;
    };
    const end = () => {
      stick = [0, 0];
      knob.style.transform = '';
    };
    el.addEventListener('pointerdown', (e) => {
      el.setPointerCapture(e.pointerId);
      move(e);
    });
    el.addEventListener('pointermove', (e) => { if (el.hasPointerCapture(e.pointerId)) move(e); });
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  function suspectIcon(sus) {
    const room = map.suspects[sus.id];
    const [x, y, w, h] = map.rooms[room].area;
    const index = [...met.keys()].filter((sid) => map.suspects[sid] === room).indexOf(sus.id);
    const icon = document.createElement('span');
    icon.className = 'mm-suspect';
    icon.title = sus.name;
    icon.innerHTML = ART.portrait(sus.portrait);
    place(icon, [x + w - 20 - index * 34, y + h - 20]);
    root.appendChild(icon);
  }

  function render(container) {
    if (here) {
      pos = [...map.rooms[here].exit];
      here = null;
    }
    path = [];
    goal = null;
    stick = [0, 0];
    act.hidden = !Object.values(map.rooms).some((r) => r.passage);
    updateAct();
    const [W, H] = map.size;
    container.innerHTML = `<div class="minimap" style="aspect-ratio: ${W} / ${H}">${ART.floorplan[id]}
      ${Object.entries(map.rooms).map(([room, { area: [x, y, w, h] }]) => `<button class="mm-room${visited.has(room) ? ' visited' : ''}" data-room="${room}" title="${names[room]}"
        style="left:${pct(x, 0)};top:${pct(y, 1)};width:${pct(w, 0)};height:${pct(h, 1)}"></button>`).join('')}
      <div class="mm-detective">${ART.detective}</div></div>
      <p class="mm-hint"><span class="hint-key">WASD·방향키로 이동 · 방을 누르면 자동 이동 · Space 살펴보기 · Esc 뒤로</span><span class="hint-touch">스틱으로 이동 · 방을 탭하면 자동 이동</span></p>`;
    root = container.querySelector('.minimap');
    place(root.querySelector('.mm-detective'), pos);
    met.forEach(suspectIcon);
    root.querySelectorAll('.mm-room').forEach((b) => b.addEventListener('click', () => walkTo(b.dataset.room)));
    loop(root);
  }

  // 한 번 만난 용의자만 맵에 위치를 표시한다.
  function meet(sus) {
    met.set(sus.id, sus);
  }

  const inspect = () => {
    const passage = root?.isConnected && passageAt(pos);
    if (passage) enter(passage);
  };

  window.addEventListener('keydown', (e) => {
    if (!root?.isConnected || document.querySelector('.modal.open')) return;
    if (e.code === 'Space') {
      // 포커스가 남은 방 버튼이 Space로 눌리지 않게 한다.
      document.activeElement?.blur();
      e.preventDefault();
      inspect();
      return;
    }
    if (!KEY_DIR[e.code]) return;
    keys.add(e.code);
    e.preventDefault();
  });
  act.addEventListener('click', inspect);
  window.addEventListener('keyup', (e) => keys.delete(e.code));
  window.addEventListener('blur', () => keys.clear());
  bindStick(document.getElementById('stick'));

  return { init, render, meet };
})();
