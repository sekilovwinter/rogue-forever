/* Macro: big-picture decision making, plus the game's /macro system with copy buttons. */
(function () {
  const esc = RF.esc;
  let sec = 'game', pick = 'rotation', mq = '';
  function gameView() {
    const list = RF.guide.macroGame, s = list.find(x => x.id === pick) || list[0];
    return `<div class="split" style="grid-template-columns:268px minmax(0,1fr)"><div class="pane col"><div class="ablist">${list.map(x => `<div class="row click tk-r ${x.id === s.id ? 'on' : ''}" data-mg="${x.id}">${RF.img(x.icon, 28)}<div class="grow"><div class="t">${esc(x.title)}</div></div></div>`).join('')}</div></div>
      <div class="pane col"><div class="abhead">${RF.img(s.icon, 44)}<div><h2>${esc(s.title)}</h2><div class="dim" style="max-width:860px">${esc(s.sum)}</div></div></div>
      <div class="ab-body"><div class="grid2" style="gap:8px">${s.points.map(p => `<div class="card"><h3>${esc(p[0])}</h3><p class="dim" style="font-size:12.5px">${esc(p[1])}</p></div>`).join('')}</div>
      <div class="why" style="margin-top:12px"><b>Why this matters</b>${esc(s.why)}</div></div></div></div>`;
  }
  async function macroView() {
    const data = await RF.load('macros');
    const secs = data.sections;
    const q = mq.toLowerCase();
    const body = secs.map(s => {
      const groups = s.groups.map(g => {
        const ms = (g.macros || []).filter(m => !q || (m.name + m.code + (m.what || '')).toLowerCase().includes(q));
        if (!ms.length) return '';
        return `<details class="fold" ${q || s.key === 'rogue' ? 'open' : ''}><summary>${esc(g.title || '')}<span class="chip">${ms.length}</span></summary><div class="in">${ms.map(mRow).join('')}</div></details>`;
      }).join('');
      return groups ? `<div class="cap" style="margin:12px 0 6px">${esc(s.title)}</div>${groups}` : '';
    }).join('');
    return `<div style="flex:1;min-height:0;display:grid;grid-template-columns:320px minmax(0,1fr);gap:12px;padding:0 16px 14px"><div class="pane col"><div class="ab-body" style="padding:12px">
        <div class="cap" style="margin-bottom:6px">How macros work here</div>
        ${data.basics.map(b => `<details class="fold"><summary>${esc(b.title)}</summary><div class="in prose" style="font-size:12.5px">${b.html}</div></details>`).join('')}
      </div></div>
      <div class="pane col"><div style="padding:9px 12px;border-bottom:1px solid var(--line)"><input class="input" id="mq" value="${esc(mq)}" placeholder="Filter macros, for example Sap or Kick..." style="width:100%"></div><div class="ab-body" id="mlistb" style="padding:0 12px 12px">${body}</div></div></div>`;
  }
  function mRow(m) {
    return `<div class="card" style="margin-bottom:7px;padding:10px 12px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:5px"><div style="font-weight:600;flex:1;min-width:0">${esc(m.name)}</div><span class="mut" style="font-size:10.5px">${m.len || m.code.length}/255</span><button class="btn sm" data-act="copy" data-text="${esc(m.code)}">Copy</button></div>
      <div class="code">${esc(m.code)}</div>
      <div class="dim" style="font-size:12px;margin-top:6px"><b style="color:var(--txt)">What:</b> ${esc(m.what || '')}</div>
      ${m.how ? `<div class="dim" style="font-size:12px;margin-top:3px"><b style="color:var(--txt)">How:</b> ${esc(m.how)}</div>` : ''}
      ${m.why ? `<div class="dim" style="font-size:12px;margin-top:3px"><b style="color:var(--txt)">Why:</b> ${esc(m.why)}</div>` : ''}
      ${(m.notes || []).length ? `<ul class="mut" style="font-size:11px;margin:4px 0 0;padding-left:15px">${m.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}</div>`;
  }
  async function draw(view) {
    const box = view.querySelector('#mbody');
    box.innerHTML = sec === 'game' ? gameView() : await macroView();
    view.querySelectorAll('#msec button').forEach(b => b.classList.toggle('on', b.dataset.v === sec));
    const mqEl = box.querySelector('#mq');
    if (mqEl) mqEl.addEventListener('input', async e => { mq = e.target.value; const pos = e.target.selectionStart; await draw(view); const n = view.querySelector('#mq'); n.focus(); n.setSelectionRange(pos, pos); });
  }
  RF.pages.macro = {
    crumb: () => 'Macro',
    async enter(view, p) {
      if (p[0]) sec = p[0];
      view.innerHTML = `<div class="head" style="align-items:center"><div style="flex:1"><h1>Macro</h1><p>Two things share this name, so both are here: big-picture play, and the game's own macro commands.</p></div><div class="seg" id="msec"><button data-v="game" class="on">Big-picture play</button><button data-v="ingame">In-game macros</button></div></div><div id="mbody" class="col" style="flex:1;min-height:0"></div>`;
      await draw(view);
      view.addEventListener('click', e => {
        const b = e.target.closest('#msec button');
        if (b) { sec = b.dataset.v; draw(view); }
        const g = e.target.closest('[data-mg]');
        if (g) { pick = g.dataset.mg; draw(view); }
      });
    }
  };
})();
