// 이미지 파일 없이 SVG 문자열로 그리는 장면·인물·아이콘 에셋
const ART = (() => {
  let svgSeq = 0;
  const svg = (body, view = '0 0 800 450') => {
    const id = `paper${svgSeq++}`;
    return `<svg viewBox="${view}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><pattern id="${id}" width="23" height="23" patternUnits="userSpaceOnUse"><circle cx="3" cy="5" r="0.8" fill="#f5dca8"/><circle cx="17" cy="13" r="0.6" fill="#f5dca8"/><path d="M8 20h2" stroke="#f5dca8" stroke-width="0.6"/></pattern></defs>
      ${body}<rect width="100%" height="100%" fill="url(#${id})" opacity="0.12" pointer-events="none"/>
    </svg>`;
  };

  const books = (x, y, w, h) => {
    const colors = ['#6b2b2b', '#2f4a3a', '#3a3f6b', '#7a5a2a', '#4b2f4f', '#5a3a26'];
    let out = '';
    let cx = x;
    let i = 0;
    while (cx < x + w - 10) {
      const bw = 10 + ((i * 7) % 9);
      const bh = h - ((i * 11) % 14);
      out += `<rect x="${cx}" y="${y + h - bh}" width="${bw}" height="${bh}" fill="${colors[i % colors.length]}"/>`;
      cx += bw + 2;
      i++;
    }
    return out;
  };

  const windowRain = (x, y, w, h, frame) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#142233"/>
    <path d="M${x + w * 0.2} ${y + 10} l-12 40 M${x + w * 0.5} ${y + 30} l-12 40 M${x + w * 0.8} ${y + 15} l-12 40 M${x + w * 0.35} ${y + h * 0.6} l-12 40 M${x + w * 0.7} ${y + h * 0.65} l-12 40"
      stroke="#5f7a99" stroke-width="2" opacity="0.6"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${frame}" stroke-width="10"/>
    <line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${frame}" stroke-width="6"/>
    <line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" stroke="${frame}" stroke-width="6"/>`;

  const scenes = {
    study: svg(`
      <defs>
        <linearGradient id="st-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b2a20"/><stop offset="1" stop-color="#1e1510"/></linearGradient>
        <radialGradient id="st-glow"><stop offset="0" stop-color="#ffd27a" stop-opacity="0.45"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="450" fill="url(#st-wall)"/>
      <rect y="365" width="800" height="85" fill="#24170f"/>
      <ellipse cx="410" cy="410" rx="300" ry="30" fill="#5a1f22" opacity="0.7"/>
      <rect x="40" y="50" width="200" height="315" fill="#2b1c13" stroke="#4a3122" stroke-width="6"/>
      ${books(48, 60, 184, 60)}${books(48, 135, 184, 60)}${books(48, 210, 184, 60)}${books(48, 285, 184, 60)}
      <rect x="40" y="120" width="200" height="6" fill="#4a3122"/><rect x="40" y="195" width="200" height="6" fill="#4a3122"/><rect x="40" y="270" width="200" height="6" fill="#4a3122"/>
      ${windowRain(560, 50, 170, 190, '#5a4030')}
      <rect x="540" y="40" width="30" height="230" fill="#6b1f24"/><rect x="720" y="40" width="30" height="230" fill="#6b1f24"/>
      <rect x="370" y="80" width="120" height="90" fill="#1a120c" stroke="#8a6a3a" stroke-width="5"/>
      <path d="M385 160 L420 115 L445 140 L460 125 L478 160 Z" fill="#3a4a3a"/>
      <circle cx="300" cy="230" r="170" fill="url(#st-glow)"/>
      <rect x="390" y="225" width="60" height="70" rx="6" fill="#3a2418"/>
      <rect x="250" y="290" width="320" height="22" fill="#6a4630"/>
      <rect x="262" y="312" width="296" height="60" fill="#4a2f1f"/>
      <rect x="450" y="322" width="90" height="24" fill="#5a3a26" stroke="#2a1a10" stroke-width="2"/>
      <circle cx="495" cy="334" r="4" fill="#c9a45c"/>
      <path d="M290 290 L290 250 M270 250 L310 250 L300 220 L280 220 Z" stroke="#c9a45c" stroke-width="4" fill="#c9a45c"/>
      <ellipse cx="330" cy="287" rx="24" ry="5" fill="#e8e0d0"/>
      <path d="M316 270 L344 270 L340 287 L320 287 Z" fill="#f4eee2"/>
      <path d="M344 274 q10 2 0 10" stroke="#f4eee2" stroke-width="3" fill="none"/>
      <rect x="410" y="268" width="20" height="22" rx="3" fill="#c07a2a"/><rect x="408" y="262" width="24" height="8" rx="2" fill="#eee"/>
      <rect x="360" y="282" width="40" height="6" fill="#d8ccb0" transform="rotate(-6 380 285)"/>
    `),
    kitchen: svg(`
      <defs>
        <linearGradient id="kt-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34433a"/><stop offset="1" stop-color="#1c2620"/></linearGradient>
        <pattern id="kt-tile" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="none" stroke="#2a3630" stroke-width="2"/></pattern>
      </defs>
      <rect width="800" height="450" fill="url(#kt-wall)"/>
      <rect width="800" height="300" fill="url(#kt-tile)"/>
      ${windowRain(330, 50, 140, 140, '#d8d0bc')}
      <path d="M560 40 L560 90 M620 40 L620 80 M680 40 L680 95" stroke="#555" stroke-width="2"/>
      <circle cx="560" cy="105" r="18" fill="#7a4a2a"/><circle cx="620" cy="92" r="14" fill="#8a8a8a"/><circle cx="680" cy="112" r="20" fill="#6a3a22"/>
      <rect y="300" width="800" height="150" fill="#3e3024"/>
      <rect y="292" width="800" height="14" fill="#9a8a72"/>
      <rect x="60" y="230" width="170" height="70" fill="#222"/><circle cx="105" cy="250" r="14" fill="#333" stroke="#555"/><circle cx="185" cy="250" r="14" fill="#333" stroke="#555"/>
      <rect x="250" y="285" width="110" height="12" fill="#eae4d6"/>
      <ellipse cx="300" cy="262" rx="36" ry="26" fill="#d9d2c0"/>
      <path d="M334 258 q24 -6 26 -22" stroke="#d9d2c0" stroke-width="7" fill="none"/>
      <path d="M266 252 q-22 4 -6 22" stroke="#d9d2c0" stroke-width="6" fill="none"/>
      <ellipse cx="300" cy="238" rx="18" ry="5" fill="#c4bca8"/><circle cx="300" cy="231" r="5" fill="#c4bca8"/>
      <path d="M390 288 l8 -18 h18 l8 18 Z M430 288 l8 -18 h18 l8 18 Z M470 288 l8 -18 h18 l8 18 Z" fill="#efe9dc"/>
      <rect x="610" y="320" width="80" height="100" rx="4" fill="#555c60"/><rect x="602" y="312" width="96" height="12" rx="3" fill="#6a7276"/>
      <path d="M630 312 l10 -14 h20 l8 14" fill="#bba" opacity="0.8"/>
    `),
    infirmary: svg(`
      <defs>
        <linearGradient id="in-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4650"/><stop offset="1" stop-color="#1f262c"/></linearGradient>
        <radialGradient id="in-glow"><stop offset="0" stop-color="#cfe8ff" stop-opacity="0.35"/><stop offset="1" stop-color="#cfe8ff" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="450" fill="url(#in-wall)"/>
      <rect y="370" width="800" height="80" fill="#1a1f23"/>
      <rect x="300" y="70" width="70" height="70" rx="6" fill="#e8ecef"/><rect x="326" y="82" width="18" height="46" fill="#b33"/><rect x="312" y="96" width="46" height="18" fill="#b33"/>
      <circle cx="230" cy="200" r="190" fill="url(#in-glow)"/>
      <rect x="80" y="300" width="320" height="18" fill="#7a8890"/>
      <rect x="95" y="318" width="12" height="60" fill="#5a666e"/><rect x="373" y="318" width="12" height="60" fill="#5a666e"/>
      <path d="M170 296 L220 286 L270 296 L270 280 L220 270 L170 280 Z" fill="#efe9da" stroke="#8a7a5a" stroke-width="2"/>
      <line x1="220" y1="270" x2="220" y2="286" stroke="#8a7a5a" stroke-width="2"/>
      <rect x="200" y="281" width="14" height="4" fill="#fff"/>
      <path d="M300 300 L300 230 M285 230 L315 230" stroke="#9aa6ae" stroke-width="4"/>
      <rect x="520" y="70" width="220" height="250" fill="#2a3238" stroke="#7a8890" stroke-width="6"/>
      <line x1="630" y1="70" x2="630" y2="320" stroke="#7a8890" stroke-width="4"/>
      <rect x="520" y="150" width="220" height="5" fill="#7a8890"/><rect x="520" y="235" width="220" height="5" fill="#7a8890"/>
      <g fill="#c07a2a"><rect x="540" y="110" width="18" height="38" rx="3"/><rect x="570" y="118" width="16" height="30" rx="3"/><rect x="650" y="105" width="20" height="43" rx="3"/></g>
      <g fill="#6aa0b8"><rect x="600" y="115" width="18" height="33" rx="3"/><rect x="690" y="120" width="16" height="28" rx="3"/><rect x="545" y="195" width="20" height="38" rx="3"/></g>
      <g fill="#efe9da"><ellipse cx="600" cy="228" rx="8" ry="4"/><ellipse cx="616" cy="230" rx="8" ry="4"/><ellipse cx="660" cy="228" rx="8" ry="4"/></g>
      <rect x="680" y="190" width="40" height="43" rx="3" fill="#c07a2a"/>
      <rect x="520" y="70" width="220" height="250" fill="#9ec4dc" opacity="0.08"/>
    `),
    greenhouse: svg(`
      <defs>
        <linearGradient id="gh-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1d2a"/><stop offset="1" stop-color="#1d3330"/></linearGradient>
        <radialGradient id="gh-glow"><stop offset="0" stop-color="#e8f0ff" stop-opacity="0.3"/><stop offset="1" stop-color="#e8f0ff" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="450" fill="url(#gh-sky)"/>
      <path d="M0 120 Q400 -40 800 120" stroke="#6a7a70" stroke-width="6" fill="none"/>
      <g stroke="#4a5a52" stroke-width="3"><line x1="100" y1="80" x2="100" y2="380"/><line x1="250" y1="40" x2="250" y2="380"/><line x1="400" y1="30" x2="400" y2="380"/><line x1="550" y1="40" x2="550" y2="380"/><line x1="700" y1="80" x2="700" y2="380"/><line x1="0" y1="220" x2="800" y2="220"/></g>
      <g fill="#2f5a3a"><path d="M40 380 q20 -120 60 -150 q-10 60 20 150Z"/><path d="M150 380 q-10 -90 40 -130 q10 70 10 130Z"/><path d="M620 380 q10 -140 70 -170 q-20 80 0 170Z"/><path d="M710 380 q30 -100 70 -110 q-20 50 -10 110Z"/></g>
      <g fill="#3f7a4a"><ellipse cx="90" cy="300" rx="40" ry="16" transform="rotate(-30 90 300)"/><ellipse cx="680" cy="280" rx="44" ry="16" transform="rotate(25 680 280)"/><ellipse cx="200" cy="320" rx="36" ry="12" transform="rotate(20 200 320)"/></g>
      <circle cx="400" cy="280" r="160" fill="url(#gh-glow)"/>
      <rect y="372" width="800" height="78" fill="#3a3530"/>
      <g stroke="#2a2622" stroke-width="2"><line x1="0" y1="405" x2="800" y2="405"/><line x1="160" y1="372" x2="140" y2="450"/><line x1="400" y1="372" x2="400" y2="450"/><line x1="640" y1="372" x2="660" y2="450"/></g>
      <path d="M360 350 L440 350 L430 300 L370 300 Z" fill="#8a4a2a"/><rect x="364" y="294" width="72" height="10" fill="#9a5a34"/>
      <g stroke="#3f7a4a" stroke-width="4" fill="none"><path d="M400 296 Q395 240 380 210"/><path d="M400 296 Q405 230 425 200"/><path d="M400 296 Q400 250 400 190"/><path d="M402 260 l14 -6" stroke-dasharray="3 3"/></g>
      <g fill="#f4f2ea"><path d="M374 214 q6 -10 12 0 l-2 10 h-8z"/><path d="M420 204 q6 -10 12 0 l-2 10 h-8z"/><path d="M394 194 q6 -10 12 0 l-2 10 h-8z"/><path d="M386 236 q6 -10 12 0 l-2 10 h-8z"/></g>
      <rect x="372" y="320" width="56" height="14" fill="#efe9da"/>
      <g fill="#7a2a1a" opacity="0.85"><ellipse cx="560" cy="430" rx="9" ry="5"/><ellipse cx="585" cy="415" rx="9" ry="5"/><ellipse cx="612" cy="425" rx="9" ry="5"/><ellipse cx="640" cy="410" rx="9" ry="5"/><ellipse cx="668" cy="420" rx="9" ry="5"/></g>
    `),
    hallway: svg(`
      <defs>
        <pattern id="hw-paper" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#3a2830"/><path d="M15 5 q6 10 0 20 q-6 -10 0 -20" fill="#4a3440"/></pattern>
        <radialGradient id="hw-glow"><stop offset="0" stop-color="#ffcf7a" stop-opacity="0.5"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="450" fill="url(#hw-paper)"/>
      <rect y="350" width="800" height="100" fill="#23171a"/>
      <path d="M200 450 L320 350 L480 350 L600 450 Z" fill="#6b1f24"/>
      <path d="M220 450 L326 356 L474 356 L580 450" fill="none" stroke="#c9a45c" stroke-width="2"/>
      ${[130, 310, 490, 670].map((x) => `
        <rect x="${x - 58}" y="135" width="116" height="215" fill="#2a1a12"/>
        <rect x="${x - 50}" y="143" width="100" height="207" fill="#5a3a26"/>
        <rect x="${x - 40}" y="158" width="80" height="80" fill="none" stroke="#3e2818" stroke-width="4"/>
        <rect x="${x - 40}" y="255" width="80" height="80" fill="none" stroke="#3e2818" stroke-width="4"/>
        <circle cx="${x + 34}" cy="250" r="5" fill="#c9a45c"/>
        <rect x="${x - 24}" y="114" width="48" height="14" fill="#c9a45c"/>`).join('')}
      ${[220, 400, 580].map((x) => `
        <circle cx="${x}" cy="110" r="70" fill="url(#hw-glow)"/>
        <rect x="${x - 4}" y="105" width="8" height="24" fill="#8a6a3a"/>
        <path d="M${x - 10} 105 L${x + 10} 105 L${x + 6} 88 L${x - 6} 88 Z" fill="#ffdf9a"/>`).join('')}
    `),
    interrogation: svg(`
      <defs>
        <radialGradient id="iq-spot" cx="0.5" cy="0.35" r="0.6"><stop offset="0" stop-color="#5a4636"/><stop offset="1" stop-color="#120d0a"/></radialGradient>
      </defs>
      <rect width="800" height="450" fill="url(#iq-spot)"/>
      ${windowRain(80, 70, 120, 160, '#3a2a20')}
      ${windowRain(600, 70, 120, 160, '#3a2a20')}
      <rect y="380" width="800" height="70" fill="#1a110c"/>
    `),
    mansion: svg(`
      <defs><linearGradient id="ms-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0f18"/><stop offset="1" stop-color="#26303f"/></linearGradient></defs>
      <rect width="800" height="450" fill="url(#ms-sky)"/>
      <path d="M560 0 l-30 90 l25 0 l-40 110" stroke="#d8e4ff" stroke-width="3" fill="none" opacity="0.7"/>
      <path d="M0 450 L0 360 Q200 330 400 350 Q600 330 800 360 L800 450Z" fill="#0d1210"/>
      <path d="M200 360 L200 200 L260 150 L320 200 L320 170 L400 110 L480 170 L480 200 L540 150 L600 200 L600 360 Z" fill="#141820"/>
      <rect x="390" y="70" width="18" height="50" fill="#141820"/>
      <g fill="#e8b85a"><rect x="230" y="240" width="22" height="30"/><rect x="380" y="200" width="22" height="30"/><rect x="420" y="260" width="22" height="30"/></g>
      <g fill="#2a3040"><rect x="270" y="240" width="22" height="30"/><rect x="510" y="240" width="22" height="30"/><rect x="550" y="240" width="22" height="30"/><rect x="380" y="260" width="22" height="30"/></g>
    `),
    office: svg(`
      <rect width="800" height="450" fill="#0e1116"/>
      <rect x="280" y="40" width="240" height="410" fill="#1a1e26"/>
      ${Array.from({ length: 12 }, (_, r) => Array.from({ length: 5 }, (_, c) =>
        `<rect x="${296 + c * 44}" y="${60 + r * 32}" width="30" height="18" fill="${r === 4 && c === 2 ? '#d8e88a' : '#252a34'}"/>`).join('')).join('')}
    `),
    lighthouse: svg(`
      <defs><linearGradient id="lh-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1018"/><stop offset="1" stop-color="#1c2a38"/></linearGradient></defs>
      <rect width="800" height="450" fill="url(#lh-sky)"/>
      <path d="M0 350 Q100 330 200 350 T400 350 T600 350 T800 350 L800 450 L0 450Z" fill="#0f1c28"/>
      <path d="M300 360 L420 330 L500 360 Z" fill="#1a1a1a"/>
      <path d="M380 340 L395 140 L425 140 L440 340 Z" fill="#c8c0b0"/>
      <path d="M384 290 L436 290 L438 310 L382 310 Z M389 220 L431 220 L433 240 L387 240 Z" fill="#8a2a2a"/>
      <rect x="390" y="110" width="40" height="30" fill="#222"/><path d="M384 110 L410 85 L436 110 Z" fill="#8a2a2a"/>
    `),
    tower: svg(`
      <defs>
        <linearGradient id="tw-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e3640"/><stop offset="1" stop-color="#151a20"/></linearGradient>
        <radialGradient id="tw-glow"><stop offset="0" stop-color="#ffd27a" stop-opacity="0.35"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="450" fill="url(#tw-wall)"/>
      <g stroke="#232a32" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${30 + i * 40}" x2="800" y2="${30 + i * 40}"/>`).join('')}</g>
      <rect y="370" width="800" height="80" fill="#1a1d20"/>
      <rect x="300" y="138" width="200" height="10" fill="#555c60"/>
      <path d="M340 138 L350 50 L450 50 L460 138 Z" fill="#1c2630" stroke="#6a7276" stroke-width="3"/>
      <ellipse cx="400" cy="92" rx="36" ry="40" fill="#2a3a44" stroke="#8a9aa4" stroke-width="2"/>
      <g stroke="#6a7a84" stroke-width="1.5"><line x1="370" y1="78" x2="430" y2="78"/><line x1="366" y1="92" x2="434" y2="92"/><line x1="370" y1="106" x2="430" y2="106"/></g>
      <circle cx="455" cy="128" r="6" fill="#8a2a2a"/>
      ${windowRain(230, 140, 70, 100, '#4a5560')}
      <circle cx="205" cy="270" r="120" fill="url(#tw-glow)"/>
      <rect x="120" y="300" width="180" height="12" fill="#5a4030"/><rect x="132" y="312" width="10" height="60" fill="#3a2a20"/><rect x="278" y="312" width="10" height="60" fill="#3a2a20"/>
      <path d="M170 300 L205 294 L240 300 L240 286 L205 280 L170 286 Z" fill="#e8dcc0" stroke="#7a6a4a"/>
      <line x1="205" y1="280" x2="205" y2="294" stroke="#7a6a4a"/>
      <path d="M207 281 l4 3 l-3 3 l4 3 l-3 3" stroke="#a89878" fill="none"/>
      <rect x="258" y="276" width="16" height="24" fill="#c9a45c"/>
      ${Array.from({ length: 11 }, (_, i) => `<rect x="${520 + i * 20}" y="${362 - i * 22}" width="60" height="8" fill="#4a5058"/>`).join('')}
      <g stroke="#8a9098" stroke-width="4" fill="none"><path d="M540 330 L610 253 L600 282"/><path d="M640 220 L740 110"/></g>
      <ellipse cx="420" cy="405" rx="70" ry="14" fill="#5a4a1a" opacity="0.85"/>
      <rect x="470" y="380" width="30" height="40" fill="#8a3a2a" transform="rotate(70 485 400)"/>
      <g fill="#3a3010"><ellipse cx="340" cy="425" rx="8" ry="4"/><ellipse cx="300" cy="415" rx="8" ry="4"/><ellipse cx="260" cy="428" rx="8" ry="4"/></g>
    `),
    dock: svg(`
      <defs><linearGradient id="dk-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1220"/><stop offset="1" stop-color="#1a2838"/></linearGradient></defs>
      <rect width="800" height="450" fill="url(#dk-sky)"/>
      <path d="M90 230 L98 120 L114 120 L122 230 Z" fill="#2a3440"/><rect x="100" y="106" width="12" height="14" fill="#1a2028"/>
      <rect y="220" width="800" height="120" fill="#0f1c28"/>
      <path d="M0 250 q40 -10 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0" stroke="#3a5a70" stroke-width="2" fill="none"/>
      <path d="M630 270 L750 270 L735 295 L645 295 Z" fill="#5a6a7a"/><line x1="690" y1="270" x2="690" y2="215" stroke="#8a9aa4" stroke-width="3"/>
      <path d="M0 330 L800 300 L800 450 L0 450 Z" fill="#3a2e24"/>
      <g stroke="#2a2018" stroke-width="2"><line x1="0" y1="370" x2="800" y2="345"/><line x1="0" y1="410" x2="800" y2="390"/></g>
      <rect x="292" y="300" width="16" height="40" fill="#2a2420"/>
      <path d="M300 304 Q250 280 210 300" stroke="#4a7ab0" stroke-width="4" fill="none"/>
      <g fill="none" stroke="#4a7ab0" stroke-width="5"><ellipse cx="300" cy="365" rx="40" ry="12"/><ellipse cx="300" cy="361" rx="28" ry="8"/></g>
      ${[525, 555, 585].map((x) => `<rect x="${x}" y="335" width="26" height="40" rx="2" fill="#b0402a"/><rect x="${x + 4}" y="348" width="18" height="8" fill="#e8e0cc"/>`).join('')}
      <path d="M515 345 L520 325 L615 318 L622 340 Z" fill="#2a3a2a"/>
    `),
    chiefHouse: svg(`
      <defs><linearGradient id="ch-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e3428"/><stop offset="1" stop-color="#1e1812"/></linearGradient></defs>
      <rect width="800" height="450" fill="url(#ch-wall)"/>
      <rect y="360" width="800" height="90" fill="#2a2018"/>
      <rect x="170" y="70" width="170" height="120" fill="#e8e0cc" stroke="#6a4a2a" stroke-width="6"/>
      <rect x="178" y="140" width="154" height="44" fill="#6aa0c0"/>
      <rect x="225" y="95" width="60" height="50" fill="#c8a070"/><rect x="235" y="105" width="10" height="10" fill="#6aa0c0"/><rect x="265" y="105" width="10" height="10" fill="#6aa0c0"/>
      <rect x="300" y="290" width="200" height="12" fill="#6a4a30"/><rect x="310" y="302" width="10" height="60" fill="#4a3424"/><rect x="480" y="302" width="10" height="60" fill="#4a3424"/>
      <rect x="370" y="280" width="50" height="10" fill="#e8e0cc"/>
      <rect x="600" y="150" width="120" height="220" fill="#4a3424"/><circle cx="705" cy="260" r="5" fill="#c9a45c"/>
      ${[630, 670].map((x) => `<path d="M${x} 340 L${x + 20} 340 L${x + 20} 385 L${x + 38} 385 L${x + 38} 398 L${x} 398 Z" fill="#1a1a1a"/><ellipse cx="${x + 18}" cy="398" rx="18" ry="3" fill="#8a7a3a" opacity="0.6"/>`).join('')}
    `),
    workshop: svg(`
      <defs><linearGradient id="ws-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34404a"/><stop offset="1" stop-color="#1a2026"/></linearGradient></defs>
      <rect width="800" height="450" fill="url(#ws-wall)"/>
      <rect y="370" width="800" height="80" fill="#22282c"/>
      <rect x="140" y="60" width="200" height="140" fill="#0f1c28" stroke="#5a6670" stroke-width="8"/>
      <path d="M232 150 L238 90 L248 90 L254 150 Z" fill="#2a3440"/>
      <path d="M200 175 l10 -8 l12 8 Z M270 178 l8 -6 l10 6 Z" fill="#05080c"/>
      <rect x="150" y="290" width="200" height="12" fill="#6a5a48"/><rect x="160" y="302" width="10" height="68" fill="#4a3e32"/><rect x="330" y="302" width="10" height="68" fill="#4a3e32"/>
      <rect x="222" y="268" width="14" height="22" rx="4" fill="#222"/><rect x="244" y="268" width="14" height="22" rx="4" fill="#222"/><rect x="234" y="274" width="12" height="6" fill="#333"/>
      ${[620, 680, 740].map((x) => `<path d="M${x - 18} 120 L${x + 18} 120 L${x + 14} 230 L${x - 14} 230 Z" fill="#111"/><circle cx="${x}" cy="114" r="4" fill="#888"/>`).join('')}
      <circle cx="520" cy="330" r="28" fill="#e06a2a"/>
      <path d="M555 330 Q575 320 600 330 L595 375 L560 375 Z" fill="none" stroke="#a8a090" stroke-width="2" stroke-dasharray="4 3"/>
    `),
    minbak: svg(`
      <defs><linearGradient id="mb-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3430"/><stop offset="1" stop-color="#1e1a18"/></linearGradient></defs>
      <rect width="800" height="450" fill="url(#mb-wall)"/>
      <rect y="370" width="800" height="80" fill="#2a221c"/>
      ${windowRain(540, 70, 160, 150, '#6a5a48')}
      <path d="M600 210 L606 150 L614 150 L620 210 Z" fill="#2a3440"/>
      <g stroke="#555" stroke-width="3"><line x1="620" y1="240" x2="590" y2="370"/><line x1="620" y1="240" x2="650" y2="370"/><line x1="620" y1="240" x2="620" y2="370"/></g>
      <rect x="610" y="230" width="20" height="10" fill="#444"/>
      <rect x="200" y="300" width="250" height="60" fill="#d8d0c0"/><rect x="195" y="355" width="260" height="15" fill="#5a4030"/>
      <rect x="210" y="290" width="60" height="18" rx="6" fill="#efe9dc"/>
      <rect x="300" y="282" width="40" height="26" rx="3" fill="#222"/><circle cx="320" cy="295" r="9" fill="#444" stroke="#888"/>
      <path d="M95 370 L95 320 Q120 300 145 320 L145 370 Z" fill="#3a5a4a"/>
    `),
    islandRoom: svg(`
      <defs>
        <radialGradient id="ir-spot" cx="0.5" cy="0.35" r="0.6"><stop offset="0" stop-color="#3a4650"/><stop offset="1" stop-color="#0a0e12"/></radialGradient>
      </defs>
      <rect width="800" height="450" fill="url(#ir-spot)"/>
      ${windowRain(80, 70, 120, 160, '#2a3440')}
      ${windowRain(600, 70, 120, 160, '#2a3440')}
      <rect y="380" width="800" height="70" fill="#10161a"/>
    `),
  };

  const paintedScenes = {
    lighthouse: 'assets/scenario3/backgrounds/lighthouse.png',
    tower: 'assets/scenario3/backgrounds/tower.png',
    dock: 'assets/scenario3/backgrounds/dock.png',
    chiefHouse: 'assets/scenario3/backgrounds/chief-house.png',
    workshop: 'assets/scenario3/backgrounds/workshop.png',
    minbak: 'assets/scenario3/backgrounds/minbak.png',
    islandRoom: 'assets/scenario3/backgrounds/interrogation.png',
    study: 'study',
    interrogation: 'interrogation',
    kitchen: 'kitchen',
    infirmary: 'infirmary',
    greenhouse: 'greenhouse',
    hallway: 'hallway-clues',
    mansion: 'mansion',
    theater: 'assets/scenario2/backgrounds/dressing-room.png',
    stage: 'assets/scenario2/backgrounds/stage.png',
    backstage: 'assets/scenario2/backgrounds/backstage.png',
    booth: 'assets/scenario2/backgrounds/control-room.png',
    lobbyHall: 'assets/scenario2/backgrounds/lobby.png',
    theaterRoom: 'assets/scenario2/backgrounds/interrogation.png',
  };
  Object.entries(paintedScenes).forEach(([scene, file]) => {
    const src = file.startsWith('assets/') ? file : `assets/scenario1/backgrounds/${file}.png`;
    scenes[scene] = `<img src="${src}" alt="" draggable="false">`;
  });

  let portraitSeq = 0;
  const portrait = (o) => {
    if (o.image) {
      return `<img src="${o.image}" alt="" draggable="false">`;
    }
    const id = `pt${portraitSeq++}`;
    const hairBack = o.hair === 'long'
      ? `<path d="M50 105 Q46 40 100 42 Q154 40 150 105 L156 200 L44 200 Z" fill="${o.hairColor}"/>` : '';
    const hairFront = {
      long: `<path d="M58 100 Q56 52 100 50 Q144 52 142 100 Q128 70 104 66 Q96 84 58 100Z" fill="${o.hairColor}"/>`,
      short: `<path d="M58 98 Q54 50 100 50 Q146 50 142 98 Q132 70 100 68 Q68 70 58 98Z" fill="${o.hairColor}"/>`,
      bun: `<circle cx="100" cy="50" r="20" fill="${o.hairColor}"/><path d="M58 98 Q56 56 100 56 Q144 56 142 98 Q130 74 100 72 Q70 74 58 98Z" fill="${o.hairColor}"/>`,
      bob: `<path d="M54 128 Q46 50 100 50 Q154 50 146 128 L136 128 Q138 82 100 74 Q62 82 64 128 Z" fill="${o.hairColor}"/>`,
    }[o.hair];
    const extra = (o.extras || []).map((e) => ({
      glasses: '<g fill="none" stroke="#c9c2b0" stroke-width="3"><circle cx="82" cy="106" r="11"/><circle cx="118" cy="106" r="11"/><line x1="93" y1="106" x2="107" y2="106"/></g>',
      necklace: '<path d="M80 168 Q100 186 120 168" stroke="#e8d08a" stroke-width="3" fill="none"/><circle cx="100" cy="181" r="4" fill="#e8d08a"/>',
      tie: '<path d="M96 168 L104 168 L108 200 L100 214 L92 200 Z" fill="#6b1f24"/>',
      apron: '<path d="M84 168 L100 182 L116 168 L116 240 L84 240 Z" fill="#e8e4dc"/>',
      ribbon: '<path d="M88 166 L100 176 L112 166 L112 180 L100 176 L88 180 Z" fill="#2a2a3a"/>',
      wrinkles: '<path d="M74 92 q8 -4 14 0 M112 92 q8 -4 14 0" stroke="#8a6a58" stroke-width="2" fill="none"/>',
    }[e])).join('');
    return svg(`
      <defs><radialGradient id="${id}-bg" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="${o.bg}"/><stop offset="1" stop-color="#0e0b0a"/></radialGradient></defs>
      <rect width="200" height="240" fill="url(#${id}-bg)"/>
      ${hairBack}
      <path d="M30 240 Q34 176 100 166 Q166 176 170 240 Z" fill="${o.clothes}" stroke="#17120f" stroke-width="3"/>
      <path d="M48 240 Q54 190 87 174 L100 188 L113 174 Q148 190 152 240Z" fill="#f0dfc5" opacity="0.16"/>
      <path d="M52 227 Q72 194 85 188 M148 227 Q128 194 115 188" fill="none" stroke="#f0dfc5" stroke-width="2" opacity="0.32"/>
      <rect x="88" y="140" width="24" height="30" fill="${o.skin}"/>
      <ellipse cx="100" cy="105" rx="44" ry="52" fill="#1b1512" opacity="0.28"/>
      <ellipse cx="100" cy="103" rx="42" ry="50" fill="${o.skin}" stroke="#5e4235" stroke-width="1.5"/>
      <ellipse cx="76" cy="122" rx="9" ry="5" fill="#ce8576" opacity="0.2"/><ellipse cx="124" cy="122" rx="9" ry="5" fill="#ce8576" opacity="0.2"/>
      <ellipse cx="82" cy="108" rx="4" ry="5" fill="#2a1e1a"/><ellipse cx="118" cy="108" rx="4" ry="5" fill="#2a1e1a"/>
      <circle cx="83" cy="106" r="1.3" fill="#fff2d7"/><circle cx="119" cy="106" r="1.3" fill="#fff2d7"/>
      <path d="M74 96 L90 ${o.browTilt || 96} M110 ${o.browTilt || 96} L126 96" stroke="#3a2a22" stroke-width="3"/>
      <path d="M100 112 L97 126 L103 126" stroke="#b08a74" stroke-width="2" fill="none"/>
      <path d="M90 136 Q100 ${o.smile ? 142 : 136} 110 136" stroke="#7a4a40" stroke-width="3" fill="none"/>
      ${hairFront}
      <path d="M66 78 Q82 54 109 57" fill="none" stroke="#f2d9b4" stroke-width="3" opacity="0.16"/>
      ${extra}
    `, '0 0 200 240');
  };

  const icons = {
    cup: '<path d="M5 8h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z M16 10h2a2 2 0 0 1 0 4h-2 M4 21h14"/>',
    pill: '<rect x="3" y="9" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.5 7.5l5 8"/>',
    doc: '<path d="M6 3h9l4 4v14H6z M15 3v4h4 M9 12h7 M9 16h7"/>',
    plant: '<path d="M12 21v-9 M12 12c0-4-3-6-7-6 0 4 3 6 7 6z M12 14c0-4 3-6 7-6 0 4-3 6-7 6z"/>',
    foot: '<ellipse cx="9" cy="8" rx="3" ry="4.5"/><ellipse cx="15" cy="16" rx="3" ry="4.5"/>',
    shoe: '<path d="M3 16v-6l5 1 3 3 8 1a2 2 0 0 1 2 2v1H3z"/>',
    photo: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="11" r="3"/><path d="M6 19l4-4 4 4"/>',
    voice: '<path d="M4 5h16v10H9l-5 4z"/>',
    pot: '<path d="M6 10h12l-1 9H7z M5 10h14 M9 6c2 1 4 1 6 0"/>',
    rope: '<ellipse cx="12" cy="14" rx="8" ry="4"/><ellipse cx="12" cy="12" rx="5" ry="2.5"/><path d="M20 14V6"/>',
    can: '<path d="M7 6h8l3 3v12H7z M9 3h4v3 M10 13h5"/>',
    lamp: '<path d="M9 4h6v3H9z M7 7h10l-1 9H8z M10 20h4 M12 16v4"/>',
    camera: '<rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 7l2-3h4l2 3"/>',
    lens: '<circle cx="7" cy="15" r="4"/><circle cx="17" cy="15" r="4"/><path d="M7 11V6h3v5 M17 11V6h-3v5 M10 9h4"/>',
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0z M7 6H4a3 3 0 0 0 3 4 M17 6h3a3 3 0 0 1-3 4 M12 14v4 M8 21h8"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 18h4"/>',
    glove: '<path d="M7 21v-8L5 9a1.5 1.5 0 0 1 2.5-1.5L9 10V4a1.5 1.5 0 0 1 3 0v5V3a1.5 1.5 0 0 1 3 0v6V5a1.5 1.5 0 0 1 3 0v9a7 7 0 0 1-2 5v2z"/>',
  };
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.doc}</svg>`;

  const candle = `<svg viewBox="0 0 24 40"><path class="flame" d="M12 2 C16 9 15 13 12 14 C9 13 8 9 12 2Z" fill="#ffcf6a"/><rect x="8" y="15" width="8" height="22" rx="1" fill="#efe6d2"/><line x1="12" y1="14" x2="12" y2="16" stroke="#333"/></svg>`;
  const lock = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`;

  return { scenes, portrait, icon, candle, lock };
})();
