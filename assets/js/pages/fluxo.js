const curriculum = {
  1: [
    {code:"DCC199",name:"Algoritmos",credits:6,prereqs:[]},
    {code:"FIS122",name:"Lab Ciências Físicas",credits:2,prereqs:[]},
    {code:"MAT154",name:"Cálculo I",credits:4,prereqs:[]},
    {code:"MAT155",name:"Geometria Analítica",credits:4,prereqs:[]},
    {code:"QUI125",name:"Química Fundamental",credits:4,prereqs:[]},
    {code:"QUI126",name:"Lab Química",credits:2,prereqs:[]},
    {code:"CEL064",name:"Int Eng Elétrica",credits:2,prereqs:[]},
  ],
  2: [
    {code:"EST028",name:"Introdução à Estatística",credits:4,prereqs:["MAT154"]},
    {code:"FIS073",name:"Física I",credits:4,prereqs:["MAT154"]},
    {code:"FIS077",name:"Lab Física I",credits:2,prereqs:["FIS122"]},
    {code:"MAT156",name:"Cálculo II",credits:4,prereqs:["MAT154","MAT155"]},
    {code:"MAT158",name:"Álgebra Linear",credits:4,prereqs:["MAT155"]},
    {code:"ESA002",name:"Ecologia",credits:2,prereqs:["QUI125"]},
  ],
  3: [
    {code:"FIS074",name:"Física II",credits:4,prereqs:["FIS073","MAT156"]},
    {code:"MAT029",name:"Eq Diferenciais I",credits:4,prereqs:["MAT156"]},
    {code:"MAT157",name:"Cálculo III",credits:4,prereqs:["MAT156"]},
    {code:"CEL032",name:"Circuitos Lógicos",credits:4,prereqs:["DCC199"]},
    {code:"ENE045",name:"Lab Eletrotécnica",credits:2,prereqs:["FIS077","QUI126"]},
    {code:"ENE131",name:"Exp Gráfica Eng Elét.",credits:2,prereqs:[]},
  ],
  4: [
    {code:"DCC008",name:"Cálculo Numérico",credits:4,prereqs:["DCC199","MAT156"]},
    {code:"FIS075",name:"Física III",credits:4,prereqs:["FIS074","MAT157"]},
    {code:"FIS081",name:"Fenôm Transporte",credits:4,prereqs:["FIS074"]},
    {code:"MAT030",name:"Eq Diferenciais II",credits:4,prereqs:["MAT029"]},
    {code:"CEL033",name:"Circuitos Lineares I",credits:4,prereqs:["MAT158","MAT029"]},
    {code:"EPD097",name:"Engenharia e Sociedade",credits:2,prereqs:[]},
  ],
  5: [
    {code:"FIS076",name:"Física IV",credits:4,prereqs:["FIS075"]},
    {code:"CEL034",name:"Circuitos Lineares II",credits:4,prereqs:["CEL033","MAT030"]},
    {code:"CEL065",name:"Eletromagnetismo",credits:4,prereqs:["FIS075","MAT030"]},
    {code:"CEL066",name:"Sinais e Sistemas",credits:4,prereqs:["MAT030"]},
    {code:"CEL117",name:"Fund Sist Trifásicos",credits:2,prereqs:["CEL033"]},
    {code:"CEL040",name:"Eletrônica Analógica I",credits:4,prereqs:["CEL033","MAT030"]},
  ],
  6: [
    {code:"CEL035",name:"Eletrônica Digital",credits:4,prereqs:["CEL032","CEL040"]},
    {code:"CEL068",name:"Princ Comunicações",credits:4,prereqs:["CEL066","CEL040"]},
    {code:"CEL101",name:"Eletromag Aplicado",credits:4,prereqs:["EST028","CEL065"]},
    {code:"CEL112",name:"Controle Sist Din I",credits:4,prereqs:["CEL034","CEL066"]},
    {code:"ENE083",name:"Fund Resist Materiais",credits:2,prereqs:["DCC008","FIS073"]},
    {code:"ENE140",name:"Prog para Engenharia",credits:2,prereqs:["DCC199"]},
    {code:"CEL115",name:"Eletrônica Analógica II",credits:4,prereqs:["CEL034","CEL040"]},
  ],
  7: [
    {code:"CEL113",name:"Controle Sist Din II",credits:2,prereqs:["CEL112"]},
    {code:"ENE125",name:"Fund Conv Energia",credits:4,prereqs:["CEL117","CEL065"]},
    {code:"CEL069",name:"Microproc – Arq e Prog",credits:4,prereqs:["CEL035"]},
    {code:"CEL071",name:"Lab Prototipagem",credits:2,prereqs:["CEL035","ENE140"]},
    {code:"CEL073",name:"Redes de Comunicação I",credits:4,prereqs:["CEL115","CEL035"]},
    {code:"CEL100",name:"Processam Sinais I",credits:4,prereqs:["CEL035","CEL066"]},
    {code:"ENE143",name:"Prog Avançada",credits:4,prereqs:["CEL066","CEL035"]},
  ],
  8: [
    {code:"CEL039",name:"Eletrônica Potência I",credits:4,prereqs:["ENE125","CEL040"]},
    {code:"CEL078",name:"Instrumentação Eletrônica",credits:4,prereqs:["CEL069"]},
    {code:"CEL080",name:"Soft Embarcado",credits:4,prereqs:["CEL069"]},
    {code:"CEL110",name:"Disp Lógicos Programáveis",credits:4,prereqs:["CEL069"]},
    {code:"CEL118",name:"Projetos de C.I.",credits:4,prereqs:["CEL115"]},
  ],
  9: [
    {code:"ENE084",name:"Análise de Investimentos",credits:4,prereqs:["MAT156"]},
    {code:"CEL116",name:"Eletrônica Potência II",credits:4,prereqs:["CEL039","CEL040"]},
    {code:"ENE082",name:"Instalações Elétricas",credits:4,prereqs:["CEL117","ENE131"]},
    {code:"ENE081",name:"Otimização",credits:4,prereqs:["DCC008","CEL033"]},
    {code:"EXT014",name:"Proj Ext em Sist Eletr",credits:4,prereqs:["CEL069","CEL071"]},
  ],
  10: [
    {code:"ENE064",name:"Estágio Eng Elétrica",credits:6,prereqs:[]},
    {code:"TCC",name:"Trabalho de Conclusão",credits:6,prereqs:[]},
  ],
};

// flatten
const allDiscs = {};
Object.entries(curriculum).forEach(([p, discs]) => {
  discs.forEach(d => { allDiscs[d.code] = {...d, period: +p}; });
});

// build unlocks map
const unlocks = {};
Object.values(allDiscs).forEach(d => {
  d.prereqs.forEach(pre => {
    if (!unlocks[pre]) unlocks[pre] = [];
    unlocks[pre].push(d.code);
  });
});

let selectedCode = null;
let showArrows = true;
let mode = 'navigate'; // 'navigate' | 'mark'
const doneStorageKey = 'helpieee-flow-done';
let doneSet = new Set(JSON.parse(localStorage.getItem(doneStorageKey) || '[]'));

const totalDiscs = Object.values(allDiscs).length;
const totalCredits = Object.values(allDiscs).reduce((s,d) => s+d.credits, 0);

// ── BUILD DOM ─────────────────────────────────────────────────────────
function build() {
  const grid = document.getElementById('flow-grid');
  // remove old period cols (keep svg)
  grid.querySelectorAll('.period-col').forEach(e => e.remove());

  for (let p = 1; p <= 10; p++) {
    const col = document.createElement('div');
    col.className = 'period-col';
    col.dataset.period = p;

    const label = document.createElement('div');
    label.className = 'period-label';
    label.textContent = p < 10 ? `${p}º per.` : '10º per.';
    col.appendChild(label);

    (curriculum[p] || []).forEach(d => {
      const card = document.createElement('div');
      card.className = 'disc';
      card.id = `disc-${d.code}`;
      card.dataset.code = d.code;
      card.innerHTML = `
        <div class="disc-done-check">✓</div>
        <div class="disc-code">${d.code}</div>
        <div class="disc-name">${d.name}</div>
        <div class="disc-credits">${d.credits} cr.</div>
      `;
      card.addEventListener('click', () => handleClick(d.code));
      card.addEventListener('mouseenter', e => showTooltip(e, d.code));
      card.addEventListener('mousemove', e => moveTooltip(e));
      card.addEventListener('mouseleave', hideTooltip);
      col.appendChild(card);
    });

    grid.appendChild(col);
  }

  applyStates();
  updateProgress();
  if (showArrows) drawArrows();
}

// ── INTERACTION ───────────────────────────────────────────────────────
function handleClick(code) {
  if (mode === 'mark') {
    if (doneSet.has(code)) doneSet.delete(code);
    else doneSet.add(code);
    localStorage.setItem(doneStorageKey, JSON.stringify([...doneSet]));
    applyStates();
    updateProgress();
    return;
  }

  // navigate mode
  if (selectedCode === code) {
    selectedCode = null;
    document.getElementById('info-bar').textContent = 'Clique em uma disciplina';
  } else {
    selectedCode = code;
    const d = allDiscs[code];
    const pre = d.prereqs.filter(c => allDiscs[c]);
    const unl = (unlocks[code] || []).filter(c => allDiscs[c]);
    document.getElementById('info-bar').textContent =
      `${d.name} · ${pre.length} pré-req · desbloqueia ${unl.length}`;
  }
  applyStates();
  if (showArrows) drawArrows();
}

function applyStates() {
  const prereqSet = selectedCode ? new Set(allDiscs[selectedCode].prereqs) : new Set();
  const unlockSet = selectedCode ? new Set(unlocks[selectedCode] || []) : new Set();

  document.querySelectorAll('.disc').forEach(el => {
    const code = el.dataset.code;
    el.classList.remove('active','prereq','unlocks','done');
    if (doneSet.has(code)) el.classList.add('done');
    if (code === selectedCode) el.classList.add('active');
    else if (prereqSet.has(code)) el.classList.add('prereq');
    else if (unlockSet.has(code)) el.classList.add('unlocks');
  });
}

// ── ARROWS ────────────────────────────────────────────────────────────
function drawArrows() {
  const svg = document.getElementById('arrows-svg');
  svg.innerHTML = '';

  const grid = document.getElementById('flow-grid');
  const gridRect = grid.getBoundingClientRect();
  const scrollLeft = grid.closest('.flow-scroll').scrollLeft;
  const scrollTop  = grid.closest('.flow-scroll').scrollTop;

  const prereqSet = selectedCode ? new Set(allDiscs[selectedCode].prereqs) : new Set();
  const unlockSet = selectedCode ? new Set(unlocks[selectedCode] || []) : new Set();

  // collect all edges
  const edges = [];
  Object.values(allDiscs).forEach(d => {
    d.prereqs.forEach(pre => {
      if (!allDiscs[pre]) return;
      edges.push({from: pre, to: d.code});
    });
  });

  const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');

  ['default','prereq','unlocks'].forEach(type => {
    const color = type === 'prereq' ? '#F59200' : type === 'unlocks' ? '#1A8C5B' : 'rgba(0,133,202,0.3)';
    const marker = document.createElementNS('http://www.w3.org/2000/svg','marker');
    marker.setAttribute('id', `arrow-${type}`);
    marker.setAttribute('viewBox','0 0 10 10');
    marker.setAttribute('refX','8');
    marker.setAttribute('refY','5');
    marker.setAttribute('markerWidth','5');
    marker.setAttribute('markerHeight','5');
    marker.setAttribute('orient','auto-start-reverse');
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d','M2 2L8 5L2 8');
    path.setAttribute('fill','none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width','1.5');
    path.setAttribute('stroke-linecap','round');
    marker.appendChild(path);
    defs.appendChild(marker);
  });
  svg.appendChild(defs);

  edges.forEach(({from, to}) => {
    const fromEl = document.getElementById(`disc-${from}`);
    const toEl   = document.getElementById(`disc-${to}`);
    if (!fromEl || !toEl) return;

    const isPrereq  = selectedCode && prereqSet.has(from) && to === selectedCode;
    const isUnlocks = selectedCode && from === selectedCode && unlockSet.has(to);
    const isDimmed  = selectedCode && !isPrereq && !isUnlocks;

    const fr = fromEl.getBoundingClientRect();
    const tr = toEl.getBoundingClientRect();

    const x1 = fr.right  - gridRect.left + scrollLeft;
    const y1 = fr.top    + fr.height/2 - gridRect.top  + scrollTop;
    const x2 = tr.left   - gridRect.left + scrollLeft - 2;
    const y2 = tr.top    + tr.height/2 - gridRect.top  + scrollTop;

    const cx1 = x1 + (x2-x1)*0.5;
    const cx2 = x2 - (x2-x1)*0.5;

    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d', `M${x1},${y1} C${cx1},${y1} ${cx2},${y2} ${x2},${y2}`);

    let cls = 'arrow-line';
    let markerType = 'default';

    if (isPrereq)       { cls += ' highlight-prereq';   markerType = 'prereq'; }
    else if (isUnlocks) { cls += ' highlight-unlocks';  markerType = 'unlocks'; }
    else if (isDimmed)  { cls += ' dimmed'; }

    path.setAttribute('class', cls);
    path.setAttribute('marker-end', `url(#arrow-${markerType})`);
    svg.appendChild(path);
  });
}

// ── TOOLTIP ───────────────────────────────────────────────────────────
function showTooltip(e, code) {
  const d = allDiscs[code];
  const pre = d.prereqs.filter(c => allDiscs[c]).map(c => allDiscs[c].name);
  const unl = (unlocks[code]||[]).filter(c => allDiscs[c]).map(c => allDiscs[c].name);
  const tt = document.getElementById('tooltip');
  tt.innerHTML = `
    <div class="tooltip-title">${d.name}</div>
    <div class="tooltip-row">Código: <span>${d.code}</span></div>
    <div class="tooltip-row">Créditos: <span>${d.credits}</span></div>
    ${pre.length ? `<div class="tooltip-row">Pré-req: <span>${pre.join(', ')}</span></div>` : ''}
    ${unl.length ? `<div class="tooltip-row">Desbloqueia: <span>${unl.slice(0,3).join(', ')}${unl.length>3?'…':''}</span></div>` : ''}
    ${mode==='mark' ? `<div class="tooltip-row tooltip-row--marking">Clique para ${doneSet.has(code)?'desmarcar':'marcar como cursada'}</div>` : ''}
  `;
  tt.classList.add('show');
  moveTooltip(e);
}

function moveTooltip(e) {
  const tt = document.getElementById('tooltip');
  const x = e.clientX + 14, y = e.clientY - 10;
  const overRight = x + 250 > window.innerWidth;
  tt.style.left = (overRight ? e.clientX - 260 : x) + 'px';
  tt.style.top  = y + 'px';
}

function hideTooltip() {
  document.getElementById('tooltip').classList.remove('show');
}

// ── PROGRESS ─────────────────────────────────────────────────────────
function updateProgress() {
  const n = doneSet.size;
  const cr = [...doneSet].reduce((s,c) => s + (allDiscs[c]?.credits||0), 0);
  document.getElementById('done-count').textContent = n;
  document.getElementById('total-count').textContent = totalDiscs;
  document.getElementById('credits-done').textContent = `${cr} / ${totalCredits} créditos`;
  document.getElementById('progress-fill').style.width = (n/totalDiscs*100) + '%';
}

function resetDone() {
  doneSet.clear();
  localStorage.removeItem(doneStorageKey);
  applyStates();
  updateProgress();
  if (showArrows) drawArrows();
}

// ── CONTROLS ─────────────────────────────────────────────────────────
function toggleArrows() {
  showArrows = !showArrows;
  const btn = document.getElementById('btn-arrows');
  btn.textContent = showArrows ? 'Ativado' : 'Desativado';
  btn.classList.toggle('active', showArrows);
  if (showArrows) drawArrows();
  else document.getElementById('arrows-svg').innerHTML = '';
}

function setMode(m) {
  mode = m;
  document.getElementById('btn-mode-nav').classList.toggle('active', m==='navigate');
  document.getElementById('btn-mode-mark').classList.toggle('active', m==='mark');
  if (m === 'navigate') {
    document.getElementById('info-bar').textContent = 'Clique em uma disciplina';
  } else {
    selectedCode = null;
    applyStates();
    document.getElementById('info-bar').textContent = 'Clique para marcar disciplinas cursadas';
    if (showArrows) drawArrows();
  }
}

// ── RESIZE / SCROLL ───────────────────────────────────────────────────
let rafId;
function redrawArrows() {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => { if (showArrows) drawArrows(); });
}

function bindControls() {
  document.getElementById('btn-arrows')?.addEventListener('click', toggleArrows);
  document.getElementById('btn-mode-nav')?.addEventListener('click', () => setMode('navigate'));
  document.getElementById('btn-mode-mark')?.addEventListener('click', () => setMode('mark'));
  document.getElementById('btn-reset')?.addEventListener('click', resetDone);
}

window.addEventListener('resize', redrawArrows);
document.querySelector('.flow-scroll') && document.querySelector('.flow-scroll').addEventListener('scroll', redrawArrows);

// ── INIT ──────────────────────────────────────────────────────────────
bindControls();
build();

