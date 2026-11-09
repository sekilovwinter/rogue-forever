/* Class matchups: whole-fight views per class plus an ability-by-class matrix built from the ability guide. */
(function () {
  const esc = RF.esc;
  const VERD = { favored: ['g', 'You are favored'], even: ['a', 'Even'], counter: ['r', 'They counter you'], mirror: ['v', 'Mirror'] };
  let sel = 'warrior', view2 = 'class', abil = [];
  const C = () => RF.guide.classes, O = () => RF.guide.classOrder;

  function classRow(k) {
    const c = C()[k], v = VERD[c.verdict];
    return `<a class="row click tk-${v[0]} ${sel === k && view2 === 'class' ? 'on' : ''}" href="#/matchups/${k}">${RF.img(c.icon, 28)}<div class="grow"><div class="t" style="color:${c.color}">${c.name}</div><div class="s">${esc(c.label)}</div></div></a>`;
  }
  function listBlock(title, rows, tk) {
    return `<div class="cap" style="margin:0 0 7px">${title}</div>${rows.map(r => `<div class="row tk-${tk}" style="align-items:flex-start"><div class="grow" style="white-space:normal"><div class="t" style="white-space:normal">${esc(r[0])}</div><div class="dim" style="font-size:12px;line-height:1.45">${esc(r[1])}</div></div></div>`).join('')}`;
  }
  function classView(k) {
    const c = C()[k], v = VERD[c.verdict];
    const abilityRows = abil.map(a => {
      const g = RF.guide.abilities[a.id] || {};
      const by = (g.counteredBy || []).find(x => x[0] === k), to = (g.counters || []).find(x => x[0] === k);
      return (by || to) ? { a, by, to } : null;
    }).filter(Boolean);
    return `<div class="abhead">${RF.img(c.icon, 56)}<div style="flex:1;min-width:0"><h2 style="color:${c.color}">${c.name}</h2><div class="dim" style="margin-top:1px;max-width:900px">${esc(c.sum)}</div><div class="factbar"><span class="chip ${v[0]}">${esc(v[1])}</span></div></div></div>
      <div class="ab-body"><div class="grid2" style="grid-template-columns:1fr 1fr;gap:16px">
        <div>${listBlock('What they have that hurts you', c.threats, 'r')}</div>
        <div>${listBlock('What you have that hurts them', c.yours, 'g')}</div>
      </div>
      <div style="height:12px"></div>
      <div class="grid2" style="gap:16px">
        <div><div class="cap" style="margin-bottom:7px">How to play the fight</div><ol class="dim" style="margin:0;padding-left:18px">${c.plan.map(p => `<li style="margin-bottom:5px">${esc(p)}</li>`).join('')}</ol>
          <div class="cap" style="margin:11px 0 6px">Avoid</div><ul class="dim" style="margin:0;padding-left:16px">${c.avoid.map(p => `<li style="margin-bottom:4px">${esc(p)}</li>`).join('')}</ul></div>
        <div><div class="cap" style="margin-bottom:7px">Items and tools that change this fight</div><ul class="dim" style="margin:0 0 11px;padding-left:16px">${c.items.map(p => `<li style="margin-bottom:4px">${esc(p)}</li>`).join('')}</ul>
          <div class="cap" style="margin-bottom:7px">Ability by ability</div>
          ${abilityRows.map(r => `<a class="row click tk-${r.by && r.to ? 'a' : r.by ? 'r' : 'g'}" style="align-items:flex-start" href="#/abilities/${r.a.id}">${RF.img(r.a.icon, 24)}<div class="grow" style="white-space:normal"><div class="t">${esc(r.a.name)}</div><div class="dim" style="font-size:12px;line-height:1.4">${r.by ? `<span class="bad">They stop it:</span> ${esc(r.by[1])}` : ''}${r.by && r.to ? '<br>' : ''}${r.to ? `<span class="good">It wins:</span> ${esc(r.to[1])}` : ''}</div></div></a>`).join('')}
        </div></div></div>`;
  }
  function matrixView() {
    const o = O();
    return `<div class="abhead"><div><h2>Ability against class</h2><div class="dim" style="margin-top:1px">Green means the ability is strong against that class. Red means that class has a direct answer. Amber is both. Hover a cell for the reason. Click a row to open the ability.</div></div></div>
      <div class="ab-body" style="padding:8px 12px"><table class="matrix"><thead><tr><th></th>${o.map(k => `<th title="${C()[k].name}">${RF.img(C()[k].icon, 20)}</th>`).join('')}</tr></thead><tbody>
      ${abil.filter(a => { const g = RF.guide.abilities[a.id] || {}; return (g.counters || []).length || (g.counteredBy || []).length; }).map(a => {
      const g = RF.guide.abilities[a.id] || {};
      return `<tr><th data-open="${a.id}" style="left:0">${RF.img(a.icon, 20).replace('class="ic ic20', 'style="display:inline-block;vertical-align:-5px;margin-right:6px" class="ic ic20')}${esc(a.name)}</th>${o.map(k => {
        const by = (g.counteredBy || []).find(x => x[0] === k), to = (g.counters || []).find(x => x[0] === k);
        const cl = by && to ? 'm-b' : by ? 'm-x' : to ? 'm-c' : '';
        const t = [to ? '<b class="n good">Strong</b>' + esc(to[1]) : '', by ? '<b class="n bad">Answered</b>' + esc(by[1]) : ''].filter(Boolean).join('<br>');
        return `<td class="${cl}" ${t ? `data-tip="${esc(t)}"` : ''}>${by && to ? '±' : by ? '−' : to ? '+' : ''}</td>`;
      }).join('')}</tr>`;
    }).join('')}</tbody></table></div>`;
  }
  function draw() {
    const d = document.getElementById('mdetail'), l = document.getElementById('mlist');
    if (l) l.innerHTML = O().map(classRow).join('') + `<a class="row click tk-n ${view2 === 'matrix' ? 'on' : ''}" href="#/matchups/matrix" style="margin-top:8px"><div class="grow"><div class="t">Ability against class</div><div class="s">The whole picture on one grid</div></div></a>`;
    if (d) d.innerHTML = view2 === 'matrix' ? matrixView() : classView(sel);
  }
  RF.pages.matchups = {
    crumb: () => view2 === 'matrix' ? 'Matchups / Matrix' : 'Matchups / ' + C()[sel].name,
    async enter(view, p) {
      abil = await RF.load('abilities');
      if (p[0] === 'matrix') view2 = 'matrix'; else if (p[0] && C()[p[0]]) { sel = p[0]; view2 = 'class'; }
      view.innerHTML = `<div class="head"><div><h1>Class matchups</h1><p>What each class has, why it does or does not beat you, and how to play it. Read against the launch client's spellbooks. The verdicts assume equal gear and level.</p></div></div>
        <div class="split" style="grid-template-columns:268px minmax(0,1fr)"><div class="pane col"><div class="ablist" id="mlist"></div></div><div class="pane col" id="mdetail"></div></div>`;
      draw();
      view.addEventListener('click', e => { const o = e.target.closest('[data-open]'); if (o) location.hash = '#/abilities/' + o.dataset.open; });
    },
    update(p) { if (p[0] === 'matrix') view2 = 'matrix'; else if (p[0] && C()[p[0]]) { sel = p[0]; view2 = 'class'; } draw(); RF.setCrumb(this.crumb()); }
  };
})();
