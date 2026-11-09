/* Codex: race choice, professions, leveling path, legacy perks and sourcing. */
(function () {
  const esc = RF.esc;
  let tab = 'races', race = null;
  const TABS = [['races', 'Race'], ['leveling', 'Leveling path'], ['professions', 'Professions'], ['leatherworking', 'Leatherworking'], ['legacy', 'Legacy perks'], ['sources', 'Sources and honesty']];
  function verdict() {
    const V = RF.guide.raceVerdict, f = RF.prefs.faction;
    const top = i => Math.max(...V.table.map(r => r[i]));
    const cell = (r, i) => `<td style="text-align:right;font-variant-numeric:tabular-nums;${r[i] === top(i) ? 'color:#6fe9c6;font-weight:600' : ''}">+${r[i].toFixed(1)}%</td>`;
    const rows = V.table.map(r => `<tr style="${f !== 'any' && r[1] !== f ? 'opacity:.45' : ''}"><td style="white-space:nowrap"><span class="chip ${r[1] === 'Horde' ? 'r' : 'b'}" style="margin-right:6px">${r[1][0]}</span>${esc(r[0])}</td>${cell(r, 2)}${cell(r, 3)}${cell(r, 4)}</tr>`).join('');
    return `<div class="abhead">${RF.img('spell_shadow_raisedead', 44)}<div><h2>${esc(V.title)}</h2><div class="dim">${esc(V.lead)}</div></div></div>
      <div class="ab-body"><div class="grid2" style="gap:14px;align-items:start">
        <div><div class="cap" style="margin-bottom:6px">How much each race is worth, as damage, at level 60</div>
          <table class="ranktbl"><thead><tr><th>Race</th><th style="text-align:right">Dungeons</th><th style="text-align:right">PvP</th><th style="text-align:right">Leveling</th></tr></thead><tbody>${rows}</tbody></table>
          <div class="cap" style="margin:12px 0 6px">What each race breaks</div>${V.breaks.map(x => `<div class="row tk-${x[1] === 'No race' ? 'n' : 'g'}" style="min-height:28px"><div class="grow"><div class="t" style="font-size:12px">${esc(x[0])}</div></div><span class="end" style="font-size:12px">${esc(x[1])}</span></div>`).join('')}</div>
        <div>${V.why.map(x => `<div class="why"><b>${esc(x[0])}</b>${esc(x[1])}</div>`).join('')}
          <details class="fold"><summary>How it was worked out</summary><div class="in dim" style="font-size:12px">${esc(V.how)}</div></details>
          <details class="fold"><summary>How sure this is</summary><div class="in dim" style="font-size:12px">${esc(V.sure)}</div></details></div>
      </div></div>`;
  }
  function races(R) {
    const f = RF.prefs.faction;
    const list = R.filter(r => f === 'any' || r.faction === f);
    const r = race === 'best' || !race ? null : list.find(x => x.id === race) || null;
    race = r ? r.id : 'best';
    const w = r ? RF.guide.raceWhy[r.race] || {} : {};
    const cd = n => RF.guide.racialCd[n] ? ` <span class="chip" style="font-weight:500">${esc(RF.guide.racialCd[n])}</span>` : '';
    const head = `<div class="row click tk-g ${!r ? 'on' : ''}" data-race="best">${RF.img('spell_shadow_raisedead', 28)}<div class="grow"><div class="t">Which race is best</div><div class="s">Undead, then Human</div></div></div>`;
    const right = !r ? verdict() : `<div class="abhead">${RF.img(r.icon, 44)}<div><h2>${esc(r.race)}</h2><div class="dim">${esc(w.best || '')}</div><div class="factbar"><span class="chip ${r.faction === 'Horde' ? 'r' : 'b'}">${esc(r.faction)}</span></div></div></div>
      <div class="ab-body"><div class="grid2" style="margin-bottom:12px"><div class="why" style="margin:0"><b>For PvE and leveling</b>${esc(w.pve || '')}</div><div class="why" style="margin:0"><b>For PvP</b>${esc(w.pvp || '')}</div></div>
      <div class="cap" style="margin-bottom:7px">Racial abilities in Forever</div>${r.abilities.map(a => `<div class="row tk-${a.change === 'added' ? 'g' : a.change === 'modified' ? 'a' : 'n'}" style="align-items:flex-start">${RF.img(a.icon, 28)}<div class="grow" style="white-space:normal"><div class="t">${esc(a.name)}${a.change === 'added' ? ' <span class="chip g">New</span>' : a.change === 'modified' ? ' <span class="chip a">Changed</span>' : ''}${cd(a.name)}</div><div class="dim" style="font-size:12px;white-space:pre-wrap">${esc(a.text)}</div></div></div>`).join('')}
      <p class="mut" style="font-size:11.5px;margin-top:8px">Cooldowns are read from the Forever client. <a class="link" data-race="best">See how the races compare</a>.</p></div>`;
    return `<div class="split" style="grid-template-columns:268px minmax(0,1fr)"><div class="pane col"><div class="ablist">${head}${list.map(x => `<div class="row click tk-${x.faction === 'Horde' ? 'r' : 'b'} ${r && x.id === r.id ? 'on' : ''}" data-race="${x.id}">${RF.img(x.icon, 28)}<div class="grow"><div class="t">${esc(x.race)}</div><div class="s">${esc((RF.guide.raceWhy[x.race] || {}).best || '')}</div></div></div>`).join('')}</div></div>
      <div class="pane col">${right}</div></div>`;
  }
  function leveling() {
    return `<div class="pane col" style="margin:0 16px 14px;flex:1;min-height:0"><div class="ab-body"><div class="grid3">${RF.guide.leveling.map(l => `<div class="card"><div style="display:flex;gap:8px;align-items:center;margin-bottom:5px"><span class="chip ${l.tk}">Level ${l.lv}</span><b style="font-weight:600">${esc(l.title)}</b></div><p class="dim" style="font-size:12.5px;margin-bottom:6px">${esc(l.text)}</p><p class="mut" style="font-size:11.5px">${esc(l.zones)}</p></div>`).join('')}</div>
      <div class="why" style="margin-top:12px"><b>Why this order</b>Each band is built around when a major tool arrives. Energy tools and control come first, because they change every fight, and damage talents later. Use the World map's zone list to see which zones fit your level.</div>
      <div class="grid2" style="margin-top:4px"><a class="row click tk-g" href="#/talents"><div class="grow"><div class="t">Open talents</div><div class="s">Scrub any build by level</div></div></a><a class="row click tk-g" href="#/map"><div class="grow"><div class="t">Open the map</div><div class="s">Zones, flights, quest givers</div></div></a></div></div></div>`;
  }
  function professions() {
    return `<div class="pane col" style="margin:0 16px 14px;flex:1;min-height:0"><div class="ab-body"><div class="grid2">${RF.guide.professions.map(p => {
      const lw = p.name === 'Leatherworking' || p.name === 'Skinning';
      return `<${lw ? 'a href="#/codex/leatherworking"' : 'div'} class="row ${lw ? 'click' : ''} tk-${p.tk}" style="align-items:flex-start;padding-top:9px;padding-bottom:9px">${RF.img(p.icon, 36)}<div class="grow" style="white-space:normal"><div class="t">${esc(p.name)} <span class="mut" style="font-weight:400;font-size:11px">${esc(p.when)}</span></div><div class="dim" style="font-size:12.5px">${esc(p.why)}${lw ? ' <span class="link">Open the full path</span>' : ''}</div></div></${lw ? 'a' : 'div'}>`;
    }).join('')}</div>
      <div class="why" style="margin-top:12px"><b>The short version</b>Engineering is the strongest for PvP, since it gives you effects with no Energy cost and no shared cooldown with your abilities. Leatherworking and Skinning are the most natural for leveling, and they make several of the best pieces on your level 20 list. First Aid and Cooking are not optional, because you have no self-heal.</div></div></div>`;
  }
  function legacyTab(rows) {
    const byName = Object.fromEntries(rows.map(r => [r.n, r]));
    const trees = [...new Set(rows.map(r => r.tree))];
    return `<div class="pane col" style="margin:0 16px 14px;flex:1;min-height:0"><div class="ab-body"><p class="dim" style="margin-bottom:10px;max-width:900px">${esc(RF.guide.legacyNote)}</p>
      <div class="grid3" style="margin-bottom:14px">${RF.guide.legacyPlans.map(pl => `<div class="card"><h3>${esc(pl.title)}</h3>${pl.perks.map(q => { const r = byName[q[0]] || {}; return `<div class="row tk-${pl.tk}" style="align-items:flex-start">${RF.img(r.ic, 24)}<div class="grow" style="white-space:normal"><div class="t">${esc(q[0])} <span class="mut" style="font-weight:400">${q[1]} of ${r.max || q[1]}</span></div><div class="dim" style="font-size:12px">${esc(q[2])}</div></div></div>`; }).join('')}<div class="mut" style="font-size:11px;margin-top:4px">${pl.perks.reduce((a, q) => a + q[1], 0)} of 16 points</div></div>`).join('')}</div>
      ${trees.map(t => `<div class="cap" style="margin:10px 0 6px">${esc(t)}</div><div class="grid2">${rows.filter(r => r.tree === t).map(r => `<div class="row tk-n" style="align-items:flex-start">${RF.img(r.ic, 24)}<div class="grow" style="white-space:normal"><div class="t">${esc(r.n)} <span class="mut" style="font-weight:400">max ${r.max || 1}</span></div><div class="dim" style="font-size:12px">${esc(r.txt)}</div></div></div>`).join('')}</div>`).join('')}</div></div>`;
  }
  function sources() {
    return `<div class="pane col" style="margin:0 16px 14px;flex:1;min-height:0"><div class="ab-body"><p class="dim" style="margin-bottom:10px;max-width:880px">This game launched today, so some facts do not exist yet in any source. Rather than guessing, everything on this site says where it came from. Green means straight from the game's data. Amber means carried over from Classic or partial, and may change.</p>
      ${RF.guide.sources.map(s => `<div class="row tk-${s.s === 'good' ? 'g' : s.s === 'warn' ? 'a' : 'b'}" style="align-items:flex-start;padding-top:8px;padding-bottom:8px"><div class="grow" style="white-space:normal"><div class="t">${esc(s.t)}</div><div class="dim" style="font-size:12.5px">${esc(s.d)}</div></div></div>`).join('')}
      <div class="cap" style="margin:12px 0 6px">Credit</div><p class="dim" style="font-size:12.5px">Data and images come from <a class="link" href="https://foreverchanges.pro" target="_blank" rel="noopener">foreverchanges.pro</a>, <a class="link" href="https://foreverdb.net" target="_blank" rel="noopener">foreverdb.net</a>, <a class="link" href="https://wowforevermap.com" target="_blank" rel="noopener">wowforevermap.com</a> and <a class="link" href="https://www.icy-veins.com/wow-forever" target="_blank" rel="noopener">Icy Veins</a>. Ability clips are cut from player videos, credited on each clip. Game data, names and art belong to Blizzard Entertainment. This is a private, personal study site.</p></div></div>`;
  }
  async function draw(view) {
    const b = view.querySelector('#cbody');
    if (tab === 'races') b.innerHTML = races(await RF.load('races'));
    else if (tab === 'leveling') b.innerHTML = leveling();
    else if (tab === 'professions') b.innerHTML = professions();
    else if (tab === 'leatherworking') await RF.lw.render(b);
    else if (tab === 'legacy') b.innerHTML = legacyTab(await RF.load('legacy'));
    else b.innerHTML = sources();
    view.querySelectorAll('#ctabs button').forEach(x => x.classList.toggle('on', x.dataset.v === tab));
  }
  RF.pages.codex = {
    crumb: () => 'Race, skills and more',
    async enter(view, p) {
      if (p[0] && TABS.find(t => t[0] === p[0])) tab = p[0];
      view.innerHTML = `<div class="head" style="align-items:center"><div style="flex:1"><h1>Race, skills and more</h1><p>The parts of being a good rogue that are not a button on your bar.</p></div><div class="seg" id="ctabs">${TABS.map(t => `<button data-v="${t[0]}">${t[1]}</button>`).join('')}</div></div><div id="cbody" class="col" style="flex:1;min-height:0"></div>`;
      await draw(view);
      view.addEventListener('click', e => {
        const t = e.target.closest('#ctabs button');
        if (t) { tab = t.dataset.v; draw(view); return; }
        const r = e.target.closest('[data-race]');
        if (r) { race = r.dataset.race; draw(view); }
      });
    },
    async update(p) { if (p[0] && TABS.find(t => t[0] === p[0])) { tab = p[0]; const v = document.getElementById('view'); await draw(v); } }
  };
})();
