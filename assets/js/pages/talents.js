/* Talents: interactive trees with presets. Left click adds a point, right click removes. */
(function () {
  const esc = RF.esc;
  let T, trees, spent = {}, cur = null, focus = null;
  const key = (tr, n) => tr + '|' + n;
  const pts = (tr, n) => spent[key(tr, n)] || 0;
  const treeTotal = tr => Object.entries(spent).filter(([k]) => k.startsWith(tr + '|')).reduce((a, [, v]) => a + v, 0);
  const total = () => Object.values(spent).reduce((a, b) => a + b, 0);

  function can(tr, t) {
    if (t.tier * 5 > treeTotal(tr.name)) return false;
    if (t.prereq) { const p = tr.talents.find(x => x.name === t.prereq); if (p && pts(tr.name, p.name) < p.max) return false; }
    return total() < 51 && pts(tr.name, t.name) < t.max;
  }
  function removable(tr, t) {
    const n = pts(tr.name, t.name); if (!n) return false;
    const save = spent[key(tr.name, t.name)];
    spent[key(tr.name, t.name)] = n - 1;
    let ok = true;
    for (const o of tr.talents) {
      const c = pts(tr.name, o.name);
      if (!c) continue;
      const below = tr.talents.filter(x => x.tier < o.tier).reduce((a, x) => a + pts(tr.name, x.name), 0);
      if (below < o.tier * 5) ok = false;
      if (o.prereq === t.name && n - 1 < t.max) ok = false;
    }
    spent[key(tr.name, t.name)] = save;
    return ok;
  }
  function treeHtml(tr) {
    const cells = tr.talents.map(t => {
      const n = pts(tr.name, t.name), c = can(tr, t);
      const rankTxt = (t.ranks && (t.ranks[Math.max(n, 1)] || t.ranks[String(t.max)])) || '';
      const tip = `<b class="n">${esc(t.name)}</b><div class="mut" style="font-size:11px">Rank ${n}/${t.max}${t.tier ? `, needs ${t.tier * 5} points in ${esc(tr.name)}` : ''}${t.prereq ? `, needs ${esc(t.prereq)}` : ''}</div><div style="margin-top:4px">${esc(rankTxt)}</div>${RF.guide.talentWhy[t.name] ? `<div style="margin-top:5px;color:#ff9aa3">${esc(RF.guide.talentWhy[t.name])}</div>` : ''}`;
      return `<div class="tal ${n ? 'has' : ''} ${n === t.max ? 'max' : ''} ${c ? 'can' : ''}" style="grid-column:${t.col + 1};grid-row:${t.tier + 1}" data-t="${esc(tr.name)}|${esc(t.name)}" data-tip="${esc(tip)}"><img src="${RF.iconSrc(t.icon)}" alt="" loading="lazy" onerror="this.src='assets/img/noicon.svg'"><span>${n}/${t.max}</span></div>`;
    }).join('');
    return `<div class="pane col" style="padding:10px;min-width:0"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">${RF.img(tr.icon, 24)}<b style="font-weight:600">${esc(tr.name)}</b><span class="mut" style="margin-left:auto">${treeTotal(tr.name)}</span></div><div class="tree" style="flex:1">${cells}</div></div>`;
  }
  function focusHtml() {
    if (!focus) {
      const b = RF.guide.builds.find(x => x.id === cur);
      if (b) return `<div class="cap" style="margin-bottom:5px">${esc(b.name)}</div><div class="why"><b>Why this build</b>${esc(b.why)}</div><div class="dim" style="font-size:12.5px"><b style="color:var(--txt);font-weight:600">How it plays.</b> ${esc(b.plays)}</div>`;
      return `<div class="mut" style="font-size:12px">Pick a build, or hover and click any talent.</div>`;
    }
    const [trn, n] = focus.split('|');
    const tr = trees.find(t => t.name === trn), t = tr.talents.find(x => x.name === n);
    return `<div style="display:flex;gap:10px;align-items:center;margin-bottom:6px">${RF.img(t.icon, 36)}<div><div style="font-weight:600">${esc(t.name)}</div><div class="mut" style="font-size:11px">${esc(trn)}, max ${t.max} ${t.change === 'new' ? '· New in Forever' : ''}</div></div></div><div class="dim" style="font-size:12.5px;margin-bottom:7px">${esc((t.ranks && t.ranks[String(t.max)]) || '')}</div>${RF.guide.talentWhy[t.name] ? `<div class="why"><b>Why take it</b>${esc(RF.guide.talentWhy[t.name])}</div>` : ''}${t.summary ? `<div class="mut" style="font-size:11.5px">Change from Classic: ${esc(t.summary)}</div>` : ''}`;
  }
  function load(b, upto) {
    spent = {};
    cur = b ? b.id : null;
    if (!b) return;
    const order = [];
    for (const tr of trees) {
      const want = b.pts[tr.name] || {};
      for (const t of tr.talents) if (want[t.name]) for (let i = 0; i < want[t.name]; i++) order.push([tr.name, t.name, t.tier]);
    }
    const main = b.spec;
    order.sort((a, c) => (a[0] === main ? 0 : 1) - (c[0] === main ? 0 : 1) || a[2] - c[2]);
    const n = upto == null ? order.length : Math.max(0, Math.min(order.length, upto));
    order.slice(0, n).forEach(([tr, name]) => { spent[key(tr, name)] = (spent[key(tr, name)] || 0) + 1; });
  }
  function draw(view) {
    view.querySelector('#ttrees').innerHTML = trees.map(treeHtml).join('');
    view.querySelector('#tfocus').innerHTML = focusHtml();
    view.querySelector('#tcount').textContent = `${total()} / 51 · ${trees.map(t => treeTotal(t.name)).join(' / ')}`;
    view.querySelectorAll('[data-build]').forEach(r => r.classList.toggle('on', r.dataset.build === cur));
  }
  RF.pages.talents = {
    crumb: () => 'Talents and builds',
    async enter(view, p) {
      T = await RF.load('talents');
      trees = T.trees;
      const start = RF.guide.builds.find(b => b.id === p[0]) || RF.guide.builds.find(b => b.spec === RF.prefs.spec && b.mode === 'PvE');
      load(start);
      view.innerHTML = `<div class="head" style="align-items:center"><div style="flex:1"><h1>Talents and builds</h1><p>The live talent trees from the launch client. Pick a build, then scrub it by level, or click to make your own.</p></div></div>
      <div style="display:grid;grid-template-columns:286px minmax(0,1fr);gap:12px;flex:1;min-height:0;padding:0 16px 14px">
        <div class="pane col"><div class="scroll" style="flex:1;padding:8px">
          <div class="cap" style="margin:2px 2px 6px">Recommended at 60</div>
          ${RF.guide.builds.map(b => `<div class="row click tk-${b.tk}" data-build="${b.id}"><div class="grow"><div class="t">${esc(b.name)}</div><div class="s">${esc(b.spec)} · ${esc(b.mode)}</div></div></div>`).join('')}
          <div class="cap" style="margin:12px 2px 6px">At what level?</div>
          <input type="range" class="slider" min="10" max="60" value="60" id="tlv"><div class="mut" style="font-size:11.5px" id="tlvt">Level 60</div>
          <p class="mut" style="font-size:11.5px;margin:8px 2px">${esc(RF.guide.levelingNote)}</p>
          <button class="btn sm" id="treset" style="margin-top:4px">Clear points</button>
          <div class="card" id="tfocus" style="margin-top:10px;padding:10px 11px"></div>
        </div></div>
        <div class="col" style="min-height:0"><div class="mut" style="font-size:12px;margin-bottom:6px" id="tcount"></div><div id="ttrees" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;flex:1;min-height:0"></div></div>
      </div>`;
      draw(view);
      view.addEventListener('click', e => {
        const b = e.target.closest('[data-build]');
        if (b) { load(RF.guide.builds.find(x => x.id === b.dataset.build)); focus = null; view.querySelector('#tlv').value = 60; view.querySelector('#tlvt').textContent = 'Level 60'; draw(view); return; }
        if (e.target.id === 'treset') { load(null); focus = null; draw(view); return; }
        const t = e.target.closest('[data-t]');
        if (t) {
          const [trn, n] = t.dataset.t.split('|'); const tr = trees.find(x => x.name === trn), o = tr.talents.find(x => x.name === n);
          focus = t.dataset.t; cur = null;
          if (can(tr, o)) spent[key(trn, n)] = pts(trn, n) + 1;
          RF.hideTip(); draw(view);
        }
      });
      view.addEventListener('contextmenu', e => {
        const t = e.target.closest('[data-t]');
        if (!t) return;
        e.preventDefault();
        const [trn, n] = t.dataset.t.split('|'); const tr = trees.find(x => x.name === trn), o = tr.talents.find(x => x.name === n);
        if (removable(tr, o)) { spent[key(trn, n)] = pts(trn, n) - 1; if (!spent[key(trn, n)]) delete spent[key(trn, n)]; }
        cur = null; RF.hideTip(); draw(view);
      });
      view.querySelector('#tlv').addEventListener('input', e => {
        const lv = +e.target.value;
        view.querySelector('#tlvt').textContent = `Level ${lv}: ${lv - 9} points`;
        const b = RF.guide.builds.find(x => x.id === cur) || start;
        const keep = b.id; load(b, lv - 9); cur = keep; draw(view);
      });
    }
  };
})();
