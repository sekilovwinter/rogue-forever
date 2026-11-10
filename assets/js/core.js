/* Core runtime: lazy data loading (works on file://), router, tooltips, modals, search, profile. */
window.RF = (function () {
  const RF = { data: {}, pages: {}, guide: {}, content: {} };
  const waiting = {};
  const FILES = {
    abilities: 'assets/data/abilities.js', talents: 'assets/data/talents.js', races: 'assets/data/races.js',
    dungeons: 'assets/data/dungeons/index.js', gear: 'assets/data/gear.js', search: 'assets/data/search.js', videos: 'assets/data/videos.js',
    quests: 'assets/data/quests/index.js', macros: 'assets/data/macros.js', legacy: 'assets/data/legacy.js', lw: 'assets/data/leatherworking.js', gearplan_h: 'assets/data/gearplan_h.js', gearplan_a: 'assets/data/gearplan_a.js', enchantplan_h: 'assets/data/enchantplan_h.js', enchantplan_a: 'assets/data/enchantplan_a.js', lwcheck: 'assets/data/lwcheck.js',
  };
  const fileOf = k => {
    if (FILES[k]) return FILES[k];
    if (k.startsWith('dungeon:')) return `assets/data/dungeons/${k.slice(8)}.js`;
    if (k.startsWith('map:')) return `assets/data/map/${k.slice(4)}.js`;
    if (k.startsWith('questb:')) return `assets/data/quests/${k.slice(7)}.js`;
    return null;
  };
  RF.put = (k, v) => { RF.data[k] = v; (waiting[k] || []).forEach(r => r(v)); delete waiting[k]; };
  RF.load = k => {
    if (RF.data[k] !== undefined) return Promise.resolve(RF.data[k]);
    return new Promise((res, rej) => {
      const first = !waiting[k];
      (waiting[k] = waiting[k] || []).push(res);
      if (first) {
        const s = document.createElement('script');
        s.src = fileOf(k);
        s.onerror = () => { delete waiting[k]; rej(new Error('Could not load ' + k)); };
        document.head.appendChild(s);
      }
    });
  };
  RF.loadAll = keys => Promise.all(keys.map(RF.load));

  /* helpers */
  RF.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const esc = RF.esc;
  RF.iconSrc = n => {
    if (n == null || n === '') return 'assets/img/noicon.svg';
    return typeof n === 'number' || /^\d+$/.test(n) ? `assets/icons/f/${n}.webp` : `assets/icons/${n}.webp`;
  };
  RF.img = (n, size = 24, extra = '') => `<img class="ic ic${size} ${extra}" decoding="async" src="${RF.iconSrc(n)}" alt="" onerror="this.src='assets/img/noicon.svg'">`;
  RF.slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  RF.money = c => { if (!c) return ''; const g = Math.floor(c / 10000), s = Math.floor(c % 10000 / 100), k = c % 100; return [g && g + 'g', s && s + 's', k && k + 'c'].filter(Boolean).join(' '); };
  RF.toast = msg => { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 1500); };
  RF.copy = txt => {
    const done = () => RF.toast('Copied');
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(txt).then(done).catch(fallback); else fallback();
    function fallback() { const a = document.createElement('textarea'); a.value = txt; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); done(); } catch (e) { } a.remove(); }
  };

  /* profile */
  const LS = 'rogueforever.v1';
  const defaults = { level: 60, faction: 'any', race: null, spec: 'Combat', mode: 'pve' };
  let store = {};
  try { store = JSON.parse(localStorage.getItem(LS) || '{}'); } catch (e) { }
  RF.prefs = Object.assign({}, defaults, store);
  RF.save = () => { try { localStorage.setItem(LS, JSON.stringify(RF.prefs)); } catch (e) { } renderPill(); };
  function renderPill() {
    const p = RF.prefs, el = document.getElementById('profilePill');
    if (el) el.innerHTML = `Level <b>${p.level}</b><span class="mut">·</span><b>${p.spec}</b><span class="mut">·</span><span>${p.faction === 'any' ? 'Any faction' : p.faction}</span>`;
  }

  /* tooltips: any element with data-tip="html" or data-item='...' */
  const tip = () => document.getElementById('tip');
  RF.itemTip = it => {
    const q = it.q == null ? 1 : it.q;
    const lines = (it.x || []).map(l => {
      const cl = /^(Equip|Use|Chance on hit|\(\d\) Set)/.test(l) ? 'eq' : /Damage|Armor$/.test(l) ? 'dmg' : '';
      return `<div class="ln ${cl}">${esc(l).replace('\t', '   ')}</div>`;
    }).join('');
    const orig = it.t === 'missing' || it.t === 'classic' ? '<div class="ln mut" style="margin-top:5px;font-size:10.5px">Classic values: not yet seen in Forever</div>' : '';
    return `<b class="n q${q}">${esc(it.n)}</b>${it.l ? `<div class="mut" style="font-size:11px">Item level ${it.l}</div>` : ''}${lines}${orig}`;
  };
  document.addEventListener('mousemove', e => {
    const t = tip();
    const el = e.target.closest && e.target.closest('[data-tip],[data-itemref]');
    if (!el) { t.style.display = 'none'; return; }
    if (el !== t._for) {
      t._for = el;
      if (el.dataset.itemref) { const it = RF.itemIndex && RF.itemIndex[el.dataset.itemref]; t.innerHTML = it ? RF.itemTip(it) : ''; }
      else t.innerHTML = el.dataset.tip;
    }
    if (!t.innerHTML) { t.style.display = 'none'; return; }
    t.style.display = 'block';
    const w = t.offsetWidth, h = t.offsetHeight;
    let x = e.clientX + 14, y = e.clientY + 14;
    if (x + w > innerWidth - 8) x = e.clientX - w - 14;
    if (y + h > innerHeight - 8) y = Math.max(8, innerHeight - h - 8);
    t.style.left = x + 'px'; t.style.top = y + 'px';
  });
  RF.hideTip = () => { const t = tip(); t.style.display = 'none'; t._for = null; };
  RF.regItem = it => { RF.itemIndex = RF.itemIndex || {}; const k = it.i || it.id; RF.itemIndex[k] = it; return k; };

  /* modal */
  RF.modal = (title, html, opts = {}) => {
    const m = document.getElementById('modal');
    m.innerHTML = `<div class="dialog" style="width:${opts.w || 760}px;${opts.h ? `height:${opts.h}px` : ''}"><div class="dlgbar">${esc(title)}<button class="x" data-act="close">✕</button></div><div class="scroll" style="padding:${opts.pad === 0 ? 0 : '14px 16px'};flex:1;min-height:0" id="modalBody">${html}</div></div>`;
    m.classList.add('show');
    return m.querySelector('#modalBody');
  };
  RF.closeModal = () => { const m = document.getElementById('modal'); m.classList.remove('show'); m.innerHTML = ''; m.removeAttribute('data-palette'); };

  /* search palette */
  RF.openSearch = async () => {
    const m = document.getElementById('modal');
    m.dataset.palette = '1';
    m.innerHTML = `<div id="palette"><div class="dialog"><input id="pq" placeholder="Abilities, talents, items, dungeons, bosses, quests, zones, NPCs..." autocomplete="off"><div class="scroll" id="pres" style="flex:1;padding:6px 0"></div></div></div>`;
    m.classList.add('show');
    const q = m.querySelector('#pq'); q.focus();
    const res = m.querySelector('#pres');
    res.innerHTML = '<div class="empty">Loading index...</div>';
    const idx = await RF.load('search');
    let sel = 0, hits = [];
    const draw = () => {
      const v = q.value.trim().toLowerCase();
      if (!v) { res.innerHTML = '<div class="empty">Type to search across the whole guide.<br><span class="mut">Enter opens the highlighted result. Esc closes.</span></div>'; hits = []; return; }
      const terms = v.split(/\s+/);
      hits = [];
      for (const r of idx) { const l = r[5] || (r[5] = r[1].toLowerCase()); if (terms.every(t => l.includes(t))) { hits.push(r); if (hits.length > 120) break; } }
      hits.sort((a, b) => (a[1].toLowerCase().startsWith(v) ? 0 : 1) - (b[1].toLowerCase().startsWith(v) ? 0 : 1) || a[0] - b[0] || a[1].length - b[1].length);
      hits = hits.slice(0, 60);
      sel = 0;
      res.innerHTML = hits.length ? hits.map((r, i) => `<a class="hit ${i === 0 ? 'on' : ''}" data-i="${i}" href="${r[3]}">${RF.img(r[4], 24)}<div style="min-width:0"><div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r[1])}</div></div><span class="k">${esc(r[2])}</span></a>`).join('') : '<div class="empty">Nothing found.</div>';
    };
    q.addEventListener('input', draw);
    q.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        sel = Math.max(0, Math.min(hits.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1)));
        res.querySelectorAll('.hit').forEach((h, i) => { h.classList.toggle('on', i === sel); if (i === sel) h.scrollIntoView({ block: 'nearest' }); });
      } else if (e.key === 'Enter' && hits[sel]) { location.hash = hits[sel][3]; RF.closeModal(); }
    });
    res.addEventListener('click', e => { if (e.target.closest('.hit')) RF.closeModal(); });
    draw();
  };

  /* profile dialog */
  RF.openProfile = () => {
    const p = RF.prefs;
    const b = RF.modal('Your rogue', `
      <p class="dim" style="margin-bottom:12px">These settings shape the whole site: which ranks you see on abilities, which gear list opens first, and which factions show on the map.</p>
      <div class="cap" style="margin-bottom:4px">Level <b id="plv" style="color:#fff;letter-spacing:0">${p.level}</b></div>
      <input type="range" min="1" max="60" value="${p.level}" class="slider" id="pfl">
      <div class="grid2" style="margin-top:12px">
        <div><div class="cap" style="margin-bottom:5px">Spec</div><div class="seg" id="pfs">${['Combat', 'Assassination', 'Subtlety'].map(s => `<button class="${p.spec === s ? 'on' : ''}" data-v="${s}">${s}</button>`).join('')}</div></div>
        <div><div class="cap" style="margin-bottom:5px">Faction</div><div class="seg" id="pff">${[['any', 'Any'], ['Alliance', 'Alliance'], ['Horde', 'Horde']].map(s => `<button class="${p.faction === s[0] ? 'on' : ''}" data-v="${s[0]}">${s[1]}</button>`).join('')}</div></div>
      </div>`, { w: 520 });
    b.querySelector('#pfl').addEventListener('input', e => { p.level = +e.target.value; b.querySelector('#plv').textContent = p.level; RF.save(); });
    const seg = (id, key) => b.querySelector(id).addEventListener('click', e => {
      if (!e.target.dataset.v) return;
      p[key] = e.target.dataset.v; b.querySelectorAll(id + ' button').forEach(x => x.classList.toggle('on', x === e.target)); RF.save();
    });
    seg('#pfs', 'spec'); seg('#pff', 'faction');
    document.getElementById('modal')._onclose = () => { RF.route(true); };
  };

  /* navigation */
  const NAV = [
    ['Guide'],
    ['home', 'Overview', 'ability_stealth'],
    ['abilities', 'Abilities', 'ability_rogue_eviscerate'],
    ['talents', 'Talents & builds', 'ability_rogue_deadlybrew'],
    ['macro', 'Macro', 'inv_misc_note_01'],
    ['matchups', 'Class matchups', 'ability_kick'],
    ['gear', 'Gear & stats', 'inv_sword_27'],
    ['codex', 'Race, skills & more', 'trade_brewpoison'],
    ['World'],
    ['map', 'World map', 'inv_misc_map_01'],
    ['dungeons', 'Dungeons & raids', 'inv_misc_spyglass_01'],
  ];
  function drawRail(cur) {
    document.getElementById('rail').innerHTML = NAV.map(n => n.length === 1 ? `<div class="navlab">${n[0]}</div>` :
      `<a class="nav ${cur === n[0] ? 'on' : ''}" href="#/${n[0]}" title="${n[1]}">${RF.img(n[2], 20)}<span>${n[1]}</span></a>`).join('') +
      `<div class="railfoot">WoW: Forever launch data<br>Client build 1.60.1.70790<br><a class="link" href="#/codex/sources">Sources &amp; honesty notes</a></div>`;
  }
  let cur = null, curView = null;
  RF.route = async force => {
    const parts = (location.hash || '#/home').slice(2).split('/').map(decodeURIComponent);
    const name = RF.pages[parts[0]] ? parts[0] : 'home';
    const view = document.getElementById('view');
    RF.hideTip();
    if (cur !== name || force) {
      if (curView && curView.leave) curView.leave();
      cur = name; curView = RF.pages[name];
      drawRail(name);
      view.innerHTML = '';
      try { await curView.enter(view, parts.slice(1)); }
      catch (e) { console.error(e); view.innerHTML = `<div class="empty">Something went wrong loading this page.<br><span class="mut">${esc(e.message)}</span></div>`; }
    } else if (curView.update) {
      await curView.update(parts.slice(1));
    } else {
      view.innerHTML = '';
      await curView.enter(view, parts.slice(1));
    }
    if (curView.crumb) setCrumb(curView.crumb(parts.slice(1)));
    else setCrumb('');
  };
  function setCrumb(t) { document.getElementById('crumb').textContent = t || ''; }
  RF.setCrumb = setCrumb;

  /* global delegated actions */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-act]');
    if (a) {
      const act = a.dataset.act;
      if (act === 'search') RF.openSearch();
      if (act === 'profile') RF.openProfile();
      if (act === 'close') closeTop();
      if (act === 'copy') RF.copy(a.dataset.text || a.parentElement.querySelector('.code')?.textContent || '');
    }
    if (e.target.id === 'modal') closeTop();
  });
  function closeTop() { const m = document.getElementById('modal'); const f = m._onclose; m._onclose = null; RF.closeModal(); if (f) f(); }
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); RF.openSearch(); }
    if (e.key === 'Escape') closeTop();
  });

  RF.start = () => {
    renderPill();
    addEventListener('hashchange', () => RF.route());
    RF.route(true);
  };
  return RF;
})();
