/* Gear: one optimizer-built pick per slot for every spec, mode, level and faction (tools/build_gear_plan.py),
   the stat values behind it, and what counters your gear. */
(function () {
  const esc = RF.esc;
  const MILES = [10, 20, 30, 40, 50, 60];
  const EV = { seen: ['g', 'Seen in Forever'], client: ['b', 'In Forever client'], classic: ['a', 'Classic data'] };
  const SPEC = { combat: 'Combat', assassination: 'Assassination', subtlety: 'Subtlety' };
  let st = { tab: 'list', spec: null, mode: 'pve', lv: 60, pslot: 'mh' };
  let PL = null, side = 'h';
  const evOf = k => EV[k] || EV.classic;
  const sideOf = () => RF.prefs.faction === 'Alliance' ? 'a' : 'h';
  const sideName = s => s === 'a' ? 'Alliance' : 'Horde';
  const ctx = () => PL.ctx[`${st.spec}/${st.mode}/${st.lv}`];
  const pit = id => { const a = PL.items[String(id)]; if (a) RF.regItem(a); return a; };

  function planRow(s) {
    const a = s.i && pit(s.i);
    const on = st.pslot === s.slot;
    if (!a) return `<div class="row slotrow tk-n ${on ? 'on' : ''} click" data-pslot="${s.slot}"><span class="ic ic28" style="display:block;background:#222"></span><div class="grow"><div class="s">${esc(s.label)}</div><div class="t mut">Nothing obtainable yet</div></div></div>`;
    const close = s.judged ? ' <span class="chip v" style="height:15px;font-size:9px">hand-picked</span>' : s.close && s.close.length ? ' <span class="chip a" style="height:15px;font-size:9px">close call</span>' : '';
    return `<div class="row click ${on ? 'on' : ''} tk-${evOf(a.tag)[0]}" data-pslot="${s.slot}" data-itemref="${a.i}">${RF.img(a.ic, 28, a.q >= 2 ? 'bq' + a.q : '')}<div class="grow"><div class="s">${esc(s.label)}${close}</div><div class="t q${a.q ?? 1}">${esc(a.n)}</div></div></div>`;
  }
  const planWhere = b => { const o = (b.src || [])[0]; return o ? `${o.k}: ${o.t}` : 'Source unknown'; };
  function planCard(s) {
    const a = s.i && pit(s.i);
    if (!a) return '<div class="note">No item for this slot can be obtained at this level yet.</div>';
    const tg = evOf(a.tag), unit = RF.guide.planNotes.unit[st.mode];
    const src = (a.src || []).map(o => `<div style="font-size:12.5px;margin-bottom:4px;display:flex;gap:7px;align-items:baseline"><span class="chip ${evOf(o.ev)[0]}" style="flex:none">${esc(evOf(o.ev)[1])}</span><span><b style="font-weight:600">${esc(o.k)}:</b> <span class="dim">${esc(o.t)}</span>${o.lw ? ' <a class="link" href="#/codex/leatherworking">Leatherworking path</a>' : ''}</span></div>`).join('') || '<div class="mut">Where it comes from is not known yet.</div>';
    const tip = (a.x || []).map(l => `<div style="font-size:12px${/^(Equip|Use|Chance on hit)/.test(l) ? ';color:#6fe9c6' : ''}" class="${/^(Equip|Use|Chance on hit)/.test(l) ? '' : 'dim'}">${esc(l).replace('\t', ' · ')}</div>`).join('');
    const alts = (s.alts || []).map(x => {
      const b = pit(x.i); if (!b) return '';
      return `<div class="loot" data-itemref="${b.i}" style="align-items:flex-start;cursor:default">${RF.img(b.ic, 24, b.q >= 2 ? 'bq' + b.q : '')}<div style="flex:1;min-width:0"><div class="q${b.q ?? 1}">${esc(b.n)}</div><div class="mut" style="font-size:11.5px">${esc(planWhere(b))}</div><div class="dim" style="font-size:11.5px">${x.loss < 0 ? 'Stronger, but see Why this one. ' : ''}The pick has ${esc(x.diff)}.</div></div><span class="pct" title="How much ${x.loss < 0 ? 'stronger' : 'weaker'} the whole set is with this item instead, as a share of your ${unit}">${x.loss < 0 ? '+' : '−'}${Math.abs(x.loss).toFixed(1)}%</span></div>`;
    }).join('');
    const close = (s.close || []).map(c => { const b = pit(c.i); return b ? `<p class="dim" style="font-size:12px;margin-top:6px">Close call: ${esc(c.w)}, <b class="q${b.q ?? 1}" data-itemref="${b.i}">${esc(b.n)}</b> would win here.</p>` : ''; }).join('');
    const meta = [a.l ? 'Item level ' + a.l : '', a.r ? 'Requires level ' + a.r : '', a.b === 1 ? 'Binds when picked up' : a.b === 2 ? 'Binds when equipped' : ''].filter(Boolean).join(' · ');
    return `<div class="card" style="padding:11px 13px;margin-bottom:9px" data-itemref="${a.i}"><div style="display:flex;align-items:center;gap:10px">${RF.img(a.ic, 40, a.q >= 2 ? 'bq' + a.q : '')}<div style="min-width:0;flex:1"><div class="q${a.q ?? 1}" style="font-weight:600;font-size:15px">${esc(a.n)}</div><div class="mut" style="font-size:11px">${esc(meta)}</div></div><span class="chip ${tg[0]}">${tg[1]}</span></div>
        <div style="margin:8px 0 2px;padding:7px 10px;background:#141417;border-radius:6px">${tip}</div></div>
      <div class="cap" style="margin:4px 0 5px">How to get it</div><div style="margin-bottom:10px">${src}</div>
      ${(a.cav || []).length ? `<div class="note"><b>Check first:</b> ${a.cav.map(esc).join(' ')}</div>` : ''}
      <div class="why"><b>Why this one</b>${esc(s.why || '')}</div>
      <details class="fold"><summary>How this was checked</summary><div class="in"><p class="dim" style="font-size:12px;margin-bottom:6px">Every item a ${sideName(side)} Rogue can get by this level was tried in this slot with the rest of the set unchanged. These came closest. The number is how much weaker the whole set is with that item instead, as a share of your ${unit}${s.judged ? '; a plus means stronger' : ''}.</p>${alts || '<p class="mut">No other item comes close.</p>'}${close}</div></details>`;
  }
  function chips(P) {
    const S = P.stats, m = st.mode;
    const miss = { pve: 'Abilities miss the boss', pvp: 'Abilities miss players', lvl: 'Abilities miss mobs' }[m];
    const c = [];
    if (m !== 'pve') c.push(['Health', S.hp]);
    c.push(['Agility', S.agi]);
    if (m !== 'pve') c.push(['Stamina', S.sta]);
    c.push(['Attack Power', S.ap], ['Crit', S.crit.toFixed(1) + '%'], ['Hit', S.hit.toFixed(0) + '%'], [miss, S.ymiss.toFixed(1) + '%']);
    if (m !== 'pvp') c.push([m === 'pve' ? 'Boss dodges' : 'Mobs dodge', S.dodge.toFixed(1) + '%']);
    c.push(['Damage per second', Math.round(S.dps)]);
    return c;
  }
  function planView() {
    const P = ctx(), n = RF.guide.planNotes;
    if (!P) return `<div class="note" style="margin:0 16px">No plan for this level yet.</div>`;
    if (!P.slots.some(s => s.slot === st.pslot)) st.pslot = 'mh';
    const cur = P.slots.find(s => s.slot === st.pslot);
    const b = (RF.guide.builds || []).find(x => x.id === P.build);
    const rot = P.rot || {};
    const rotTxt = [rot.builder, rot.rupture ? 'Rupture' : '', 'Eviscerate', rot.deathmark ? 'Death Mark' : ''].filter(Boolean).join(', ');
    const bn = n.buildNote[`${st.spec}/${st.mode}`];
    const anyNote = RF.prefs.faction === 'any' ? ' <a class="link" href="#" data-act="profile">Set your faction</a> in your profile to switch; Horde is shown.' : '';
    return `<div style="display:grid;grid-template-columns:320px minmax(0,1fr);gap:12px;flex:1;min-height:0;padding:0 16px 14px">
      <div class="pane col"><div class="scroll" style="padding:8px;flex:1">${P.slots.map(planRow).join('')}</div></div>
      <div class="pane col"><div class="abhead" style="padding:11px 14px;display:block"><div class="cap" style="color:#ff8d96">${esc(n.title(st.lv, sideName(side), SPEC[st.spec], st.mode))}</div>
          <div class="dim" style="font-size:12.5px;margin-top:3px;max-width:900px">${esc(P.lead)}${anyNote}</div>
          <div class="dim" style="font-size:12px;margin-top:3px">Talents: ${b ? `<a class="link" href="#/talents/${esc(b.id)}">${esc(b.name)}</a>` : esc(P.build)}, ${P.pts} point${P.pts === 1 ? '' : 's'} at this level${bn ? ` (${esc(bn)})` : ''}. Rotation in the model: ${esc(rotTxt)}.</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:7px">${chips(P).map(x => `<span class="chip" style="height:20px;font-size:11px">${esc(x[0])} <b style="color:var(--txt)">${x[1]}</b></span>`).join('')}<span class="mut" style="font-size:11px;align-self:center">with the whole set on, no buffs or enchants</span></div></div>
        <div class="ab-body" style="padding:11px 14px">
          <div class="cap" style="margin-bottom:6px">${esc(cur.label)}</div>
          ${planCard(cur)}
          <details class="fold" style="margin-top:10px"><summary>How the plan was made</summary><div class="in">${n.how(st.mode, sideName(side)).map(t => `<p class="dim" style="font-size:12px;margin-bottom:6px">${esc(t)}</p>`).join('')}<p class="dim" style="font-size:12px;margin-bottom:6px">${esc(n.judged)}</p><p class="mut" style="font-size:11.5px">Value of +10 of each stat in this set, with 10 Agility = 1: ${Object.entries(P.marg).filter(([k]) => n.statName[k]).map(([k, v]) => `${n.statName[k]} ${v.toFixed(2)}`).join(' · ')}.</p></div></details>
          <details class="fold"><summary>Not in this plan yet</summary><div class="in">${n.later.map(t => `<p class="dim" style="font-size:12px;margin-bottom:6px">${esc(t)}</p>`).join('')}</div></details>
        </div></div></div>`;
  }
  function statsView() {
    const P = ctx(), w = P ? P.marg : {}, n = RF.guide.planNotes;
    const order = [['hit', 'Hit rating'], ['exp', 'Expertise rating'], ['agi', 'Agility'], ['crit', 'Crit rating'], ['haste', 'Haste rating'], ['str', 'Strength'], ['ap', 'Attack Power'], ['sta', 'Stamina'], ['armor', 'Armor (per 100)']];
    const max = Math.max(...order.map(o => Math.max(0, w[o[0]] || 0)), 0.01);
    return `<div style="display:grid;grid-template-columns:minmax(0,1.4fr) minmax(280px,1fr);gap:12px;flex:1;min-height:0;padding:0 16px 14px">
      <div class="pane col"><div class="ab-body">${RF.guide.stats.map(s => `<details class="fold" ${s.rank <= 2 ? 'open' : ''}><summary><span class="chip ${s.tk}">#${s.rank}</span>${esc(s.name)}<span class="mut" style="font-weight:400;font-size:11px">${esc(s.cap)}</span></summary><div class="in"><p class="dim" style="margin-bottom:6px">${esc(s.what)}</p><div class="why" style="margin-bottom:6px"><b>Why it ranks here</b>${esc(s.why)}</div><p class="mut" style="font-size:12px">${esc(s.how)}</p></div></details>`).join('')}</div></div>
      <div class="pane col"><div class="ab-body"><div class="cap" style="margin-bottom:7px">${esc(SPEC[st.spec])} ${esc(n.goal[st.mode])}: stat values at level ${st.lv}</div>
        ${order.map(o => `<div style="margin-bottom:7px"><div style="display:flex;font-size:12px;margin-bottom:2px"><span>${o[1]}</span><span style="margin-left:auto;font-variant-numeric:tabular-nums">${(w[o[0]] || 0).toFixed(2)}</span></div><div class="statbar"><i style="width:${Math.max(0, w[o[0]] || 0) / max * 100}%"></i></div></div>`).join('')}
        <p class="mut" style="font-size:11.5px;margin:7px 0">Value of +10 of each on top of this level's ${sideName(side)} set from the Best in slot tab, with 10 Agility = 1 (armor per 100). Hit and expertise are worth nothing past their cap, so these numbers change with the gear.</p>
        <div class="card" style="padding:9px 11px;margin-bottom:9px"><div style="font-weight:600;font-size:12px;margin-bottom:3px">1% of each, in Agility</div><div class="dim" style="font-size:12px">1% hit = ${(10 * (w.hit || 0)).toFixed(1)} Agility · 1% expertise = ${(10 * (w.exp || 0)).toFixed(1)} · 1% crit = ${(14 * (w.crit || 0)).toFixed(1)} · 1% haste = ${(10 * (w.haste || 0)).toFixed(1)}</div></div>
        ${RF.guide.statNotes.map(t => `<p class="dim" style="font-size:12px;margin-bottom:6px">${esc(t)}</p>`).join('')}
        <div class="card" style="padding:9px 11px"><div style="font-weight:600;font-size:12px;margin-bottom:3px">Weapons for ${esc(st.spec)}</div><div class="dim" style="font-size:12px">${esc(RF.guide.weaponRules[st.spec])}</div></div>
        <details class="fold" style="margin-top:9px"><summary>What the model assumes</summary><div class="in">${n.how(st.mode, sideName(side)).map(t => `<p class="dim" style="font-size:12px;margin-bottom:6px">${esc(t)}</p>`).join('')}</div></details>
      </div></div></div>`;
  }
  function counterView() {
    return `<div class="pane col" style="margin:0 16px 14px;flex:1;min-height:0"><div class="ab-body"><div class="grid2" style="gap:12px">${RF.guide.itemCounters.map(g => `<div class="card"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">${RF.img(g.icon, 24)}<h3 style="margin:0">${esc(g.title)}</h3></div>${g.rows.map(r => `<div class="row tk-${g.tk}" style="align-items:flex-start"><div class="grow" style="white-space:normal"><div class="t" style="white-space:normal">${esc(r[0])}</div><div class="dim" style="font-size:12px;line-height:1.45">${esc(r[1])}</div></div></div>`).join('')}</div>`).join('')}
      <div class="card"><h3>What to carry</h3>${RF.guide.consumables.map(c => `<div class="row tk-g" style="align-items:flex-start"><div class="grow" style="white-space:normal"><div class="t">${esc(c[0])}</div><div class="dim" style="font-size:12px">${esc(c[1])}</div></div></div>`).join('')}</div></div></div></div>`;
  }
  async function ensurePlan() {
    side = sideOf();
    PL = await RF.load('gearplan_' + side);
  }
  function draw(view) {
    const b = view.querySelector('#gbody');
    b.innerHTML = st.tab === 'list' ? planView() : st.tab === 'stats' ? statsView() : counterView();
    view.querySelectorAll('#gtabs button').forEach(x => x.classList.toggle('on', x.dataset.v === st.tab));
    view.querySelectorAll('#gspec button').forEach(x => x.classList.toggle('on', x.dataset.v === st.spec));
    view.querySelectorAll('#gmode button').forEach(x => x.classList.toggle('on', x.dataset.v === st.mode));
    view.querySelectorAll('#gmile button').forEach(x => x.classList.toggle('on', +x.dataset.v === st.lv));
    view.querySelectorAll('#gside button').forEach(x => x.classList.toggle('on', x.dataset.v === sideName(side)));
    const g = view.querySelector('#gctl'); if (g) g.style.display = st.tab === 'counter' ? 'none' : 'flex';
  }
  RF.pages.gear = {
    crumb: () => 'Gear and stats',
    async enter(view, p) {
      await ensurePlan();
      st.spec = st.spec || (SPEC[(RF.prefs.spec || '').toLowerCase()] ? RF.prefs.spec.toLowerCase() : 'combat');
      if (!st.modeSet && ['pve', 'pvp', 'lvl'].includes(RF.prefs.mode)) st.mode = RF.prefs.mode;
      st.lv = MILES.filter(m => m >= RF.prefs.level)[0] || 60;
      view.innerHTML = `<div class="head" style="align-items:center;flex-wrap:wrap;gap:10px"><div style="flex:1;min-width:260px"><h1>Gear and stats</h1><p>The best gear you can get at each level, one piece per slot, why it wins, and what came close. Every set is built by the same optimizer from every item in the Forever client.</p></div>
        <div class="seg" id="gtabs"><button data-v="list" class="on">Best in slot</button><button data-v="stats">Stats and why</button><button data-v="counter">What counters you</button></div></div>
        <div id="gctl" style="display:flex;gap:8px;padding:0 16px 10px;flex-wrap:wrap;align-items:center;flex:none">
          <div class="seg" id="gspec"><button data-v="combat">Combat</button><button data-v="assassination">Assassination</button><button data-v="subtlety">Subtlety</button></div>
          <div class="seg" id="gmode"><button data-v="pve">PvE</button><button data-v="pvp">PvP</button><button data-v="lvl">Leveling</button></div>
          <div class="seg" id="gmile">${MILES.map(m => `<button data-v="${m}">Level ${m}</button>`).join('')}</div>
          <div class="seg" id="gside" title="Your faction; this also changes your profile"><button data-v="Horde">Horde</button><button data-v="Alliance">Alliance</button></div>
          <span style="margin-left:auto;display:flex;gap:5px"><span class="chip g">Seen in Forever</span><span class="chip b">In client</span><span class="chip a">Classic data</span></span></div>
        <div id="gbody" class="col" style="flex:1;min-height:0"></div>`;
      draw(view);
      view.addEventListener('click', async e => {
        let t;
        if ((t = e.target.closest('[data-act="profile"]'))) { e.preventDefault(); RF.openProfile(); return; }
        if ((t = e.target.closest('#gtabs button'))) { st.tab = t.dataset.v; draw(view); return; }
        if ((t = e.target.closest('#gspec button'))) { st.spec = t.dataset.v; draw(view); return; }
        if ((t = e.target.closest('#gmode button'))) { st.mode = t.dataset.v; st.modeSet = true; draw(view); return; }
        if ((t = e.target.closest('#gmile button'))) { st.lv = +t.dataset.v; draw(view); return; }
        if ((t = e.target.closest('#gside button'))) { RF.prefs.faction = t.dataset.v; RF.save(); await ensurePlan(); draw(view); return; }
        if ((t = e.target.closest('[data-pslot]'))) { st.pslot = t.dataset.pslot; draw(view); }
      });
    }
  };
})();
