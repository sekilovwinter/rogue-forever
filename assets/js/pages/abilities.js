/* Abilities: searchable list on the left, a focused detail pane on the right. No page scroll, only the pane. */
(function () {
  const esc = RF.esc;
  const TABS = ['All', 'Assassination', 'Combat', 'Subtlety', 'Poisons', 'Lockpicking'];
  const TK = { Assassination: 'tk-r', Combat: 'tk-a', Subtlety: 'tk-v', Poisons: 'tk-g', Lockpicking: 'tk-n' };
  let state = { tab: 'All', q: '', sel: null, view: 'guide' };
  let list = [], videos = {};

  const firstLevel = a => { const r = (a.ranks || []).find(x => x.lv); return r ? r.lv : null; };
  const rankAt = (a, lv) => {
    const rs = (a.ranks || []).filter(x => x.lv == null || x.lv <= lv);
    return rs.length ? rs[rs.length - 1] : (a.ranks || [])[0];
  };

  function row(a) {
    const g = RF.guide.abilities[a.id] || {};
    const fl = firstLevel(a), lvl = RF.prefs.level, lock = fl && fl > lvl;
    return `<div class="row click ${TK[a.tab] || 'tk-n'} ${state.sel === a.id ? 'on' : ''}" data-ab="${a.id}" style="${lock ? 'opacity:.55' : ''}">
      ${RF.img(a.icon, 28)}
      <div class="grow"><div class="t">${esc(a.name)}</div><div class="s">${esc(g.one || '')}</div></div>
      <div class="end">${a.talent ? '<span class="chip v">T</span>' : ''}${fl ? `<span title="Learned at level ${fl}">${fl}</span>` : ''}</div></div>`;
  }
  function drawList() {
    const q = state.q.toLowerCase();
    const shown = list.filter(a => (state.tab === 'All' || a.tab === state.tab) && (!q || a.name.toLowerCase().includes(q) || (RF.guide.abilities[a.id] || {}).one?.toLowerCase().includes(q)));
    const el = document.getElementById('ablist');
    if (el) el.innerHTML = shown.map(row).join('') || '<div class="empty">No ability matches.</div>';
  }

  const clsChip = k => {
    const c = RF.guide.classes[k];
    return `<a class="chip" style="color:${c.color};cursor:pointer" href="#/matchups/${k}">${RF.img(c.icon, 20)}&nbsp;${c.name}</a>`;
  };
  function counterList(items, tk) {
    if (!items || !items.length) return '<p class="mut" style="font-size:12px">None worth planning around.</p>';
    return items.map(([k, t]) => `<div class="row tk-${tk}" style="align-items:flex-start">${RF.img(RF.guide.classes[k].icon, 24)}<div class="grow" style="white-space:normal"><a class="t" style="color:${RF.guide.classes[k].color}" href="#/matchups/${k}">${RF.guide.classes[k].name}</a><div class="dim" style="font-size:12px;line-height:1.45;white-space:normal">${esc(t)}</div></div></div>`).join('');
  }

  function video(a) {
    const v = videos[a.id];
    if (a.tab === 'Lockpicking' || v === null) { }
    if (!v) return `<div class="videobox" style="display:flex;align-items:center;justify-content:center;aspect-ratio:auto;padding:22px;text-align:center"><div class="mut" style="font-size:12px">${esc((RF.guide.noVideo || {})[a.id] || 'No clip for this ability. It has no visible animation of its own.')}</div></div>`;
    return `<div class="videobox"><video src="${v.src}" poster="${v.poster || ''}" controls loop muted autoplay preload="metadata" playsinline></video></div>
      <div class="clipnote"><span class="chip ${v.era ? 'a' : 'g'}">${esc(v.era || 'Forever footage')}</span> ${esc(v.note || '')}</div>
      <div class="src" style="margin-top:4px">How we know it is this ability: ${esc(v.proof || '')}${v.channel ? ` · Footage: ${esc(v.channel)}` : ''}${v.url ? ` · <a class="link" href="${v.url}" target="_blank" rel="noopener">source video</a>` : ''}</div>`;
  }

  function detail(a) {
    const g = RF.guide.abilities[a.id] || {};
    const lvl = RF.prefs.level, r = rankAt(a, lvl) || {}, last = (a.ranks || [])[a.ranks.length - 1] || {};
    const facts = [r.cost, r.range, r.cast, r.cd].filter(Boolean).map(x => `<span class="chip">${esc(x)}</span>`).join('');
    const rankInfo = a.ranks && a.ranks.length > 1 ? `<span class="chip g">Rank ${r.r || a.ranks.indexOf(r) + 1} at level ${lvl}</span>` : '';
    const tab = state.view;
    const tabs = [['guide', 'Guide'], ['counter', 'Counters'], ['ranks', a.ranks && a.ranks.length > 1 ? `Ranks (${a.ranks.length})` : 'Details']];
    let body = '';
    if (tab === 'guide') {
      const t = g.tips || {};
      body = `<div class="twocol"><div>
          <div class="prose"><p>${esc(g.what || '')}</p></div>
          <div class="why"><b>Why it matters</b>${esc(g.why || '')}</div>
          ${tier('New to rogue', 'var(--green)', t.b)}${tier('Getting comfortable', 'var(--amber)', t.i)}${tier('Advanced play', 'var(--red)', t.a)}
          ${g.note ? `<div class="note">${esc(g.note)}</div>` : ''}
        </div><div>
          ${video(a)}
          <div class="cap" style="margin:14px 0 6px">The tooltip in Forever</div>
          <div class="card" style="padding:9px 11px;white-space:pre-wrap;font-size:12px;color:var(--txt2)">${esc(r.text || last.text || '')}</div>
          ${pair(g)}
          ${change(a)}
        </div></div>`;
    } else if (tab === 'counter') {
      body = `<div class="grid2"><div><div class="cap" style="margin-bottom:7px;color:#ff8d96">What stops this</div>${g.note && !g.counteredBy?.length ? `<div class="note">${esc(g.note)}</div>` : ''}${counterList(g.counteredBy, 'r')}</div>
        <div><div class="cap" style="margin-bottom:7px;color:#6fe9c6">Where this wins</div>${counterList(g.counters, 'g')}</div></div>
        <p class="mut" style="margin-top:10px;font-size:12px">Each reason comes from the abilities those classes have in the ${esc('1.60.1.70790')} spellbook. See <a class="link" href="#/matchups">Class matchups</a> for the whole-fight view.</p>`;
    } else {
      body = (a.ranks || []).length ? `<table class="ranktbl"><thead><tr><th>Rank</th><th>Level</th><th>Cost</th><th>Cooldown</th><th>Train</th><th>Tooltip</th></tr></thead><tbody>${a.ranks.map((x, i) => `<tr style="${x === r ? 'background:#25252a' : ''}"><td>${x.r || i + 1}</td><td>${x.lv || 'Talent'}</td><td>${esc(x.cost || '-')}</td><td>${esc(x.cd || '-')}</td><td>${x.gold ? RF.money(x.gold) : '-'}</td><td style="white-space:pre-wrap;color:var(--txt2)">${esc(x.text || '')}</td></tr>`).join('')}</tbody></table>` : '';
    }
    return `<div class="abhead">${RF.img(a.icon, 56)}
        <div style="min-width:0;flex:1"><h2>${esc(a.name)}</h2><div class="dim" style="margin-top:1px">${esc(g.one || '')}</div>
        <div class="factbar"><span class="chip ${a.tab === 'Combat' ? 'a' : a.tab === 'Assassination' ? 'r' : a.tab === 'Subtlety' ? 'v' : 'g'}">${esc(a.tab)}</span>${g.role ? `<span class="chip">${esc(g.role)}</span>` : ''}${a.talent ? '<span class="chip v">Talent</span>' : ''}${a.status === 'new' ? '<span class="chip g">New in Forever</span>' : a.status === 'changed' ? '<span class="chip a">Changed in Forever</span>' : ''}${firstLevel(a) ? `<span class="chip">Level ${firstLevel(a)}</span>` : ''}${rankInfo}${facts}</div></div></div>
      <div class="tabs" id="abtabs">${tabs.map(t => `<button data-v="${t[0]}" class="${tab === t[0] ? 'on' : ''}">${t[1]}</button>`).join('')}</div>
      <div class="ab-body">${body}</div>`;
  }
  function tier(name, color, arr) { if (!arr || !arr.length) return ''; return `<div class="tier" style="--tk:${color}"><h4>${name}</h4><ul>${arr.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`; }
  function pair(g) {
    if (!g.pair || !g.pair.length) return '';
    return `<div class="cap" style="margin:14px 0 6px">Works well with</div><div class="flow">${g.pair.map(id => { const x = list.find(a => a.id === id); return x ? `<a class="st" href="#/abilities/${id}">${RF.img(x.icon, 20)}${esc(x.name)}</a>` : ''; }).join('')}</div>`;
  }
  function change(a) {
    const u = a.updates || [];
    if (!u.length) return '';
    return `<div class="cap" style="margin:14px 0 6px">Recent changes</div>${u.slice(-4).reverse().map(x => `<div class="row tk-${x.kind === 'buff' ? 'g' : x.kind === 'nerf' ? 'r' : 'n'}" style="align-items:flex-start;min-height:0"><div class="grow" style="white-space:normal;font-size:12px"><span class="mut">${esc(x.date || '')}</span> ${esc(x.note || '')}</div></div>`).join('')}`;
  }
  function drawDetail() {
    const el = document.getElementById('abdetail');
    if (!el) return;
    const a = list.find(x => x.id === state.sel);
    el.innerHTML = a ? detail(a) : `<div class="empty"><div>Pick an ability on the left.</div></div>`;
    const v = el.querySelector('video');
    if (v) v.play().catch(() => { });
  }

  RF.pages.abilities = {
    crumb: p => { const a = list.find(x => x.id === p[0]); return a ? 'Abilities / ' + a.name : 'Abilities'; },
    async enter(view, p) {
      const [abilities, vids] = await RF.loadAll(['abilities', 'videos']);
      const order = { Assassination: 0, Combat: 1, Subtlety: 2, Poisons: 3, Lockpicking: 4 };
      list = abilities.slice().sort((a, b) => order[a.tab] - order[b.tab]);
      videos = vids;
      state.sel = p[0] && list.find(a => a.id === p[0]) ? p[0] : (state.sel || 'eviscerate');
      view.innerHTML = `<div class="head"><div><h1>Abilities</h1><p>Every rogue ability in the launch client: what it does, how to use it at each skill level, why it matters, and who counters it.</p></div></div>
        <div class="split"><div class="pane col">
          <div style="padding:8px 8px 0"><input class="input" id="abq" placeholder="Filter abilities..." style="width:100%;margin-bottom:6px" value="${esc(state.q)}">
          <div class="seg" id="abseg" style="width:100%">${TABS.map(t => `<button data-v="${t}" class="${state.tab === t ? 'on' : ''}">${t === 'Assassination' ? 'Assass.' : t === 'Lockpicking' ? 'Locks' : t}</button>`).join('')}</div></div>
          <div class="ablist" id="ablist" style="flex:1"></div></div>
          <div class="pane col" id="abdetail" style="min-height:0"></div></div>`;
      drawList(); drawDetail();
      view.querySelector('#abq').addEventListener('input', e => { state.q = e.target.value; drawList(); });
      view.querySelector('#abseg').addEventListener('click', e => { if (e.target.dataset.v) { state.tab = e.target.dataset.v; view.querySelectorAll('#abseg button').forEach(b => b.classList.toggle('on', b === e.target)); drawList(); } });
      view.addEventListener('click', e => {
        const r = e.target.closest('[data-ab]');
        if (r) { location.hash = '#/abilities/' + r.dataset.ab; return; }
        const t = e.target.closest('#abtabs button');
        if (t) { state.view = t.dataset.v; drawDetail(); }
      });
    },
    update(p) {
      if (p[0] && p[0] !== state.sel) { state.sel = p[0]; state.view = 'guide'; drawList(); drawDetail(); const el = document.querySelector('#ablist .on'); if (el) el.scrollIntoView({ block: 'nearest' }); }
    }
  };
})();
