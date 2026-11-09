/* Dungeon atlas: list by level, then one screen per instance with a pan-zoom map, bosses, loot, abilities and quests. */
(function () {
  const esc = RF.esc;
  let index = [], cur = null, st = { floor: 0, boss: null, tab: 'bosses', view: { s: 1, x: 0, y: 0 }, q: '', kind: 'all' };

  const mapSrc = f => f.origin === 'fc' ? `assets/dungeons/maps/fc/${f.src.split('/').pop()}` : `assets/dungeons/maps/fdb/${f.src.split('/').slice(-2).join('_')}`;
  const face = d => `assets/dungeons/faces/${d}.webp`;
  const artSrc = a => `assets/dungeons/art/${a}`;
  const loaded = {};

  function listRow(d) {
    const lv = RF.prefs.level, fit = d.levels && lv >= d.levels[0] - 1 && lv <= d.levels[1] + 1;
    return `<a class="row click ${d.pending ? 'tk-n' : fit ? 'tk-g' : d.status === 'new' || d.status === 'forever' ? 'tk-v' : 'tk-n'} ${cur && cur.id === d.id ? 'on' : ''}" href="#/dungeons/${d.id}" style="${d.pending ? 'opacity:.6' : ''}">
      <div class="grow"><div class="t">${esc(d.name)}${d.status === 'new' ? ' <span class="chip g">New</span>' : ''}</div><div class="s">${esc(d.zone || (d.kind === 'raid' ? 'Raid' : ''))}</div></div>
      <div class="end">${d.levels ? (d.levels[0] === d.levels[1] ? d.levels[0] : d.levels.join('-')) : ''}</div></a>`;
  }
  function drawList() {
    const q = st.q.toLowerCase(), f = RF.prefs.faction;
    const rows = index.filter(d => (st.kind === 'all' || d.kind === st.kind) && (!q || d.name.toLowerCase().includes(q) || (d.zone || '').toLowerCase().includes(q)));
    const el = document.getElementById('dlist');
    if (el) el.innerHTML = rows.map(listRow).join('');
  }

  /* map pan and zoom */
  function drawMap() {
    const box = document.getElementById('dmap');
    if (!box || !cur) return;
    const floors = cur.floors || [];
    if (!floors.length) {
      box.innerHTML = `<div class="empty" style="height:100%"><div style="max-width:420px">${esc(cur.name)} has no map in the launch data yet. Blizzard has announced it, but its instance map and bosses are not in the client. Its entrance marker is on the <a class="link" href="#/map">world map</a>.</div></div>`;
      return;
    }
    const f = floors[st.floor] || floors[0];
    box.innerHTML = `<div class="stage" id="dstage"><img id="dimg" src="${mapSrc(f)}" width="${f.w || ''}" height="${f.h || ''}" alt="Map of ${esc(cur.name)}" draggable="false">${(f.pins || []).map((p, i) => pin(p, i)).join('')}</div>`;
    const img = box.querySelector('#dimg');
    const fit = () => {
      const w = img.naturalWidth || f.w, h = img.naturalHeight || f.h, bw = box.clientWidth, bh = box.clientHeight;
      if (!w || !bw) return;
      const s = Math.min(bw / w, bh / h);
      st.view = { s, x: (bw - w * s) / 2, y: (bh - h * s) / 2, min: s };
      apply();
    };
    if (img.complete) fit(); else img.onload = fit;
    let drag = null;
    box.onwheel = e => {
      e.preventDefault();
      const r = box.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top, v = st.view;
      const ns = Math.max(v.min * .9, Math.min(v.min * 8, v.s * (e.deltaY < 0 ? 1.18 : 1 / 1.18)));
      v.x = mx - (mx - v.x) * ns / v.s; v.y = my - (my - v.y) * ns / v.s; v.s = ns; apply();
    };
    box.onmousedown = e => { if (e.target.closest('.pin')) return; drag = { x: e.clientX, y: e.clientY, vx: st.view.x, vy: st.view.y }; box.style.cursor = 'grabbing'; };
    window.onmousemove = e => { if (drag) { st.view.x = drag.vx + e.clientX - drag.x; st.view.y = drag.vy + e.clientY - drag.y; apply(); } };
    window.onmouseup = () => { drag = null; if (box) box.style.cursor = 'grab'; };
    box.ondblclick = fit;
  }
  function apply() {
    const s = document.getElementById('dstage'); if (!s) return;
    const v = st.view;
    s.style.transform = `translate(${v.x}px,${v.y}px) scale(${v.s})`;
    s.querySelectorAll('.pin').forEach(p => { p.style.transform = `translate(-50%,-50%) scale(${1 / v.s})`; });
  }
  function pin(p, i) {
    const style = `left:${p.x}%;top:${p.y}%`;
    if (p.kind === 'entrance') return `<div class="pin ent" style="${style}" data-tip="${esc('Entrance')}">E</div>`;
    if (p.kind === 'quest') return `<div class="pin q" style="${style}" data-tip="${esc((p.before || '') + (p.title || '') + (p.after || ''))}" data-pquest="${esc(String(p.quest || '').replace('#quest-', ''))}">!</div>`;
    const bg = p.face ? `background-image:url(${face(p.face)})` : '';
    return `<div class="pin ${st.boss === p.boss ? 'on' : ''}" style="${style};${bg}" data-boss="${esc(p.boss || '')}" data-tip="${esc((p.num ? p.num + '. ' : '') + (p.label || ''))}">${p.face ? '' : (p.num || '')}</div>`;
  }

  const ICONKEY = a => a.icon || a.ic;
  function bossCard(b) {
    const rog = rogueNote(b);
    const imm = b.imm ? [...(b.imm.mc || []), ...(b.imm.im || [])] : [];
    return `<details class="fold" id="b-${b.slug}" ${st.boss === b.slug ? 'open' : ''}><summary data-bossrow="${b.slug}">
        ${b.display ? `<span class="bossface" style="width:34px;height:34px;background-image:url(${face(b.display)})"></span>` : '<span class="bossface" style="width:34px;height:34px"></span>'}
        <span style="min-width:0"><span style="display:block">${esc(b.name)}</span><span class="mut" style="font-size:11px;font-weight:400">${b.kind === 'rare' ? 'Rare' : b.kind === 'trash' ? 'Trash' : b.kind === 'object' ? 'Object' : 'Boss'}${b.level ? ', level ' + b.level : ''} · ${(b.items || []).length} drops · ${(b.abilities || []).length} abilities</span></span>
      </summary><div class="in">
        ${rog ? `<div class="note" style="margin-top:4px">${rog}</div>` : ''}
        ${imm.length ? `<div class="factbar" style="margin:0 0 8px">${imm.map(i => `<span class="chip ${/bleed|Nature|stun/i.test(i) ? 'r' : ''}">Immune: ${esc(i)}</span>`).join('')}${b.imm.src === 'classic' ? '<span class="chip">Classic data</span>' : '<span class="chip g">Seen by players</span>'}</div>` : ''}
        ${(b.abilities || []).length ? `<div class="cap" style="margin:4px 0 5px">What it does</div>${b.abilities.map(a => `<div class="row tk-${(a.flags || []).includes('important') ? 'r' : 'n'}" style="align-items:flex-start">${RF.img(ICONKEY(a), 24)}<div class="grow" style="white-space:normal"><div class="t" style="white-space:normal">${esc(a.name || '')}</div><div class="dim" style="font-size:12px">${esc(a.text || '')}</div>${a.timing || a.dispel ? `<div class="mut" style="font-size:11px">${[a.timing, a.dispel ? 'Dispel: ' + a.dispel : '', a.school].filter(Boolean).map(esc).join(' · ')}</div>` : ''}</div></div>`).join('')}` : ''}
        ${tipBlock(b)}
        ${(b.items || []).length ? `<div class="cap" style="margin:9px 0 5px">Drops</div>${b.items.map(lootRow).join('')}` : ''}
      </div></details>`;
  }
  function tipBlock(b) {
    const t = b.tips || {};
    const all = Object.entries(t).flatMap(([k, v]) => (Array.isArray(v) ? v : [v]).map(x => [k, x]));
    if (!all.length) return '';
    return `<div class="cap" style="margin:9px 0 5px">Fight notes</div><ul class="dim" style="margin:0;padding-left:16px;font-size:12px">${all.map(x => `<li><span class="mut">${esc(x[0])}:</span> ${esc(x[1])}</li>`).join('')}</ul>`;
  }
  function rogueNote(b) {
    const imm = b.imm;
    if (!imm) return '';
    const mc = (imm.mc || []).map(s => s.toLowerCase()), im = (imm.im || []);
    const n = [];
    if (mc.includes('bleeding')) n.push('Bleeds do nothing here, so Rupture, Garrote and Hemorrhage lose their value.');
    if (im.includes('Nature')) n.push('Nature immune: poisons do nothing, so use a sharpening stone and Instant-free damage.');
    if (mc.includes('stunned')) n.push('Stun immune: Kidney Shot and Cheap Shot will not land.');
    return n.length ? `<b>For rogues.</b> ${n.join(' ')}` : '';
  }
  const lootIcon = it => it.k || it.ic;
  function lootRow(it) {
    RF.regItem(it);
    const rogueOk = it.x && !it.x.some(l => /\t(Plate|Mail|Cloth)$|Shield|Polearm|Staff|Wand|Idol|Totem|Libram/.test(l)) ;
    const tag = it.t === 'new' ? 'g' : it.t === 'changed' ? 'a' : '';
    return `<div class="loot" data-itemref="${it.i}">${RF.img(lootIcon(it), 24, it.q >= 2 ? 'bq' + it.q : '')}<div style="min-width:0;flex:1"><div class="q${it.q ?? 1}" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12.5px">${esc(it.n)}</div><div class="mut" style="font-size:10.5px">${esc([it.s, it.r ? 'Requires ' + it.r : ''].filter(Boolean).join(' · '))}${rogueOk && it.c !== 9 && /Leather|Dagger|Sword|Axe|Fist|Mace|Ring|Finger|Neck|Back|Trinket/.test(JSON.stringify(it.x || '')) ? ' · <span class="good">Rogue can use</span>' : ''}</div></div><span class="pct">${it.z != null ? it.z + '%' : ''}</span></div>`;
  }
  function questRow(q) {
    const giver = Array.isArray(q.giver) ? q.giver : [];
    return `<details class="fold"><summary><span class="chip ${q.side === 'a' ? 'b' : q.side === 'h' ? 'r' : ''}">${q.side === 'a' ? 'Alliance' : q.side === 'h' ? 'Horde' : 'Both'}</span><span style="min-width:0">${esc(q.title)} <span class="mut" style="font-weight:400;font-size:11px">Level ${q.level || '?'}${q.min ? ', from ' + q.min : ''}</span>${q.new ? ' <span class="chip g">New</span>' : ''}</span></summary><div class="in">
      ${giver[0] ? `<div class="row tk-a" style="min-height:0"><div class="grow" style="white-space:normal"><div class="t">Starts: ${esc(giver[0])}</div><div class="s">${esc(giver[1] || '')}</div></div></div>` : ''}
      ${q.where ? `<p class="dim" style="font-size:12.5px;margin:5px 0">${esc(q.where)}</p>` : ''}
      ${q.text ? `<p class="dim" style="font-size:12.5px;margin:5px 0">${esc(q.text)}</p>` : ''}
      ${(q.need || []).length ? `<div class="cap" style="margin:8px 0 4px">You need</div>${q.need.map(n => `<div class="loot">${RF.img(n.k, 20)}<div style="min-width:0;flex:1;font-size:12px">${n.c > 1 ? n.c + ' ' : ''}${esc(n.n)}<div class="mut" style="font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${(n.from || []).slice(0, 3).map(esc).join(', ')}</div></div></div>`).join('')}` : ''}
      ${(q.choice || []).length ? `<div class="cap" style="margin:8px 0 4px">Reward, choose one</div>${q.choice.map(lootRow).join('')}` : ''}
      ${(q.given || []).length ? `<div class="cap" style="margin:8px 0 4px">Reward</div>${q.given.map(lootRow).join('')}` : ''}
      ${q.id ? `<a class="btn sm" data-quest="${q.id}" style="margin-top:7px">Full quest text</a>` : ''}
    </div></details>`;
  }
  function drawSide() {
    const el = document.getElementById('dside'); if (!el || !cur) return;
    const tabs = [['bosses', `Bosses (${(cur.bosses || []).filter(b => b.kind === 'boss' || b.kind === 'rare').length})`], ['loot', 'All loot'], ['quests', `Quests (${(cur.quests || []).length})`], ['info', 'Getting there']];
    let body = '';
    if (st.tab === 'bosses') body = (cur.bosses || []).map(bossCard).join('') || `<div class="empty">Boss data for ${esc(cur.name)} is not in the launch data yet.</div>`;
    if (st.tab === 'loot') {
      const items = (cur.bosses || []).flatMap(b => (b.items || []).map(i => ({ ...i, _b: b.name })));
      const rg = items.filter(i => i.x && /Leather|Dagger|Sword|Axe|Fist|Mace|Neck|Finger|Trinket|Back/.test(JSON.stringify(i.x)) && !/Plate|Mail|\tCloth/.test(JSON.stringify(i.x)));
      const show = st.rogueOnly ? rg : items;
      body = `<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px"><label class="lay" style="margin:0;flex:1"><input type="checkbox" id="rogueOnly" ${st.rogueOnly ? 'checked' : ''}><span>Only items a rogue can use</span><span class="n">${rg.length} of ${items.length}</span></label></div>
      ${show.sort((a, b) => (b.q || 0) - (a.q || 0) || (b.l || 0) - (a.l || 0)).map(i => `<div class="loot" data-itemref="${i.i}">${(RF.regItem(i), RF.img(lootIcon(i), 24, i.q >= 2 ? 'bq' + i.q : ''))}<div style="min-width:0;flex:1"><div class="q${i.q ?? 1}" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12.5px">${esc(i.n)}</div><div class="mut" style="font-size:10.5px">${esc(i._b)}</div></div><span class="pct">${i.z != null ? i.z + '%' : ''}</span></div>`).join('')}`;
    }
    if (st.tab === 'quests') body = (cur.quests || []).map(questRow).join('') || '<div class="empty">No quests listed for this instance yet.</div>';
    if (st.tab === 'info') {
      const ent = (cur.location || {}).entrances || [], fl = (cur.location || {}).flight || [];
      body = `${cur.summary ? `<p class="dim" style="margin-bottom:9px">${esc(cur.summary)}</p>` : ''}
        <div id="dungeonMapLink" style="margin-bottom:8px"></div>
        ${cur.entrance ? `<div class="row tk-g" style="align-items:flex-start;min-height:0"><div class="grow" style="white-space:normal"><div class="t">Entrance</div><div class="dim" style="font-size:12px">${esc(cur.entrance)}</div></div></div>` : ''}
        ${ent.map(e => `<div class="row tk-g" style="min-height:0"><div class="grow"><div class="t">${esc(e.zone)}: ${e.x}, ${e.y}</div><div class="s">${e.src === 'client' ? 'Position from the Forever client' : esc(e.src || '')}</div></div></div>`).join('')}
        ${fl.map(e => `<div class="row tk-b" style="min-height:0"><div class="grow"><div class="t">Nearest flight: ${esc(e.n)}</div><div class="s">${esc(e.sub || '')} ${e.f === 'a' ? '(Alliance)' : e.f === 'h' ? '(Horde)' : ''}</div></div></div>`).join('')}
        <div class="stat" style="margin:9px 0"><span>Levels</span><b>${cur.levels ? cur.levels.join('-') : '?'}${cur.enter ? ` <span class="mut" style="font-size:12px;font-weight:500">enter from ${cur.enter}</span>` : ''}</b></div>
        ${cur.coverage ? `<div class="note">${esc(cur.coverage)}</div>` : ''}
        <p class="mut" style="font-size:11.5px">${(cur.floors || []).some(f => f.origin === 'fdb') ? 'Map stitched from the Forever client\'s minimap art. Numbered pins use Classic spawn positions, which Forever may have moved.' : ((cur.floors || [])[0] || {}).by ? 'Map drawn by ' + esc(cur.floors[0].by) + ' with pins from foreverchanges.pro.' : 'In-game instance map with boss pins from foreverchanges.pro.'}</p>
        ${(cur.sources || []).map(s => `<a class="link" style="display:block;font-size:11.5px" href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}`;
    }
    if (st.tab === 'info') RF.load('map:dungeons').then(rows => { const hit = rows.find(r => r.id === cur.id) || rows.find(r => r.n === cur.name); const box = document.getElementById('dungeonMapLink'); if (hit && box) box.innerHTML = `<a class="btn sm" href="#/map/at/${hit.p[0]},${hit.p[1]},6.5">Show the entrance on the world map</a>`; });
    el.innerHTML = `<div class="tabs" id="dtabs" style="padding:0 8px">${tabs.map(t => `<button data-v="${t[0]}" class="${st.tab === t[0] ? 'on' : ''}">${t[1]}</button>`).join('')}</div><div class="scroll" style="flex:1;padding:9px 10px 12px" id="dsbody">${body}</div>`;
  }
  async function show(id) {
    cur = await RF.load('dungeon:' + id);
    st.floor = 0; st.boss = null; st.tab = cur.pending ? 'info' : 'bosses';
    const c = document.getElementById('dmain');
    const f = cur.floors || [];
    c.innerHTML = `<div class="art" style="background-image:url(${cur.art ? artSrc(cur.art) : ''})"><div><div style="font:700 19px Inter;color:#fff">${esc(cur.name)}</div><div class="dim" style="font-size:12px">${cur.kind === 'raid' ? 'Raid' : 'Dungeon'}${cur.levels ? ', level ' + cur.levels.join('-') : ''}${cur.zone ? ', ' + esc(cur.zone) : ''}${cur.faction ? ', built for ' + cur.faction : ''}</div></div></div>
      <div class="dgrid" style="padding:10px 0 0"><div class="col" style="min-height:0"><div class="seg" id="floors" style="align-self:flex-start;margin-bottom:6px;${f.length < 2 ? 'display:none' : ''}">${f.map((x, i) => `<button data-v="${i}" class="${i === 0 ? 'on' : ''}">${esc(x.name || 'Floor ' + (i + 1))}</button>`).join('')}</div><div class="dmap" id="dmap"></div></div><div class="pane col" id="dside"></div></div>`;
    drawMap(); drawSide(); drawList();
    const el = document.querySelector('#dlist .on'); if (el) el.scrollIntoView({ block: 'nearest' });
    RF.setCrumb('Dungeons / ' + cur.name);
  }

  RF.pages.dungeons = {
    crumb: () => cur ? 'Dungeons / ' + cur.name : 'Dungeons',
    async enter(view, p) {
      index = await RF.load('dungeons');
      view.innerHTML = `<div style="flex:1;min-height:0;display:grid;grid-template-columns:262px minmax(0,1fr);gap:12px;padding:12px 14px">
        <div class="pane col"><div style="padding:8px 8px 0"><input class="input" id="dq" placeholder="Filter by name or zone..." style="width:100%;margin-bottom:6px">
          <div class="seg" id="dkind" style="width:100%"><button data-v="all" class="on">All ${index.length}</button><button data-v="dungeon">Dungeons</button><button data-v="raid">Raids</button></div></div>
          <div class="dlist" id="dlist" style="flex:1"></div></div>
        <div class="col" id="dmain" style="min-height:0"></div></div>`;
      drawList();
      const first = p[0] || (cur && cur.id) || (index.find(d => !d.pending && d.levels && RF.prefs.level >= d.levels[0] && RF.prefs.level <= d.levels[1]) || index[0]).id;
      await show(first);
      view.querySelector('#dq').addEventListener('input', e => { st.q = e.target.value; drawList(); });
      view.querySelector('#dkind').addEventListener('click', e => { if (e.target.dataset.v) { st.kind = e.target.dataset.v; view.querySelectorAll('#dkind button').forEach(b => b.classList.toggle('on', b === e.target)); drawList(); } });
      view.addEventListener('click', e => {
        const t = e.target.closest('#dtabs button');
        if (t) { st.tab = t.dataset.v; drawSide(); return; }
        const fl = e.target.closest('#floors button');
        if (fl) { st.floor = +fl.dataset.v; view.querySelectorAll('#floors button').forEach(b => b.classList.toggle('on', b === fl)); drawMap(); return; }
        const pn = e.target.closest('.pin[data-boss]');
        if (pn && pn.dataset.boss) { st.boss = pn.dataset.boss; st.tab = 'bosses'; drawSide(); const c = document.getElementById('b-' + st.boss); if (c) { c.open = true; c.scrollIntoView({ block: 'start' }); } view.querySelectorAll('.pin').forEach(x => x.classList.toggle('on', x === pn)); return; }
        const pq = e.target.closest('.pin[data-pquest]');
        if (pq && pq.dataset.pquest) { RF.openQuest(+pq.dataset.pquest); return; }
        const br = e.target.closest('[data-bossrow]');
        if (br) { view.querySelectorAll('.pin[data-boss]').forEach(x => x.classList.toggle('on', x.dataset.boss === br.dataset.bossrow)); }
        if (e.target.id === 'rogueOnly') { st.rogueOnly = e.target.checked; drawSide(); }
      });
    },
    async update(p) { if (p[0] && (!cur || cur.id !== p[0])) await show(p[0]); },
    leave() { window.onmousemove = null; window.onmouseup = null; }
  };
})();
