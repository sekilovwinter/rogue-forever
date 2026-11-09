/* World map: real in-game terrain tiles and painted map tiles, with every layer behind a toggle. Built on Leaflet. */
(function () {
  const esc = RF.esc;
  const ICON = 'assets/img/map/';
  let M, base, ctx = {};
  const layers = {};
  let on = {};
  const LS = 'rogueforever.map';
  try { on = JSON.parse(localStorage.getItem(LS) || 'null') || null; } catch (e) { on = null; }
  if (!on) on = { zones: true, zonelabels: true, subzones: true, city: true, town: true, dungeons: true, flight: true, transport: true, transitions: true };
  const saveOn = () => { try { localStorage.setItem(LS, JSON.stringify(on)); } catch (e) { } };
  const fac = () => RF.prefs.faction === 'Alliance' ? 'a' : RF.prefs.faction === 'Horde' ? 'h' : 'any';
  const allow = f => { const x = fac(); return x === 'any' || !f || f === 'n' || f === x; };
  const CAT = [
    ['Travel', [
      ['transitions', 'Zone exits and passes', 'exit', null, 'How to walk from each zone into the next'],
      ['flight', 'Flight masters', 'taxinode_neutral', 74],
      ['flightpaths', 'Flight paths', null, 294, 'Lines between flight masters', '#8fb7e8'],
      ['transport', 'Boats, zeppelins, tram', 'transport', 14],
    ]],
    ['Places', [
      ['zones', 'Zone borders', null, null, '', '#f3eee2'],
      ['zonelabels', 'Zone names and levels', null, null, '', '#f4cb75'],
      ['subzones', 'Subzone names', null, 804, '', '#e9e2c8'],
      ['city', 'Cities', 'poi-majorcity', 6],
      ['town', 'Towns', 'poi-town', 41],
      ['landmark', 'Landmarks', null, 220, '', '#d7c78f'],
      ['dungeons', 'Dungeon and raid entrances', 'dungeon', 35],
      ['caves', 'Caves and underground', 'cave', 320, 'Shows the underground layout and a marker at each one'],
      ['graveyards', 'Graveyards', 'graveyard', 88],
    ]],
    ['People', [
      ['questgivers', 'Quest givers', 'questnormal', 1806],
      ['npc_trainer', 'Trainers', null, null, '', '#58b7f0'],
      ['npc_vendor', 'Vendors', null, null, '', '#6fd36f'],
      ['npc_other', 'Other NPCs', null, null, '', '#b8c4b0'],
      ['svc_innkeeper', 'Innkeepers', null, 54, '', '#f0a858'],
      ['svc_banker', 'Bankers', null, 26, '', '#f5d76e'],
      ['svc_auctioneer', 'Auctioneers', null, 29, '', '#e9b94f'],
      ['svc_stable', 'Stable masters', null, 44, '', '#c9a27a'],
      ['svc_repair', 'Repair', null, 288, '', '#9aa3ad'],
      ['mailboxes', 'Mailboxes', 'mailbox', 56],
    ]],
    ['Hunting', [
      ['rares', 'Rare spawns', 'vignettekill', 169],
      ['elites', 'Elite mobs', null, 201, '', '#ff8a3d'],
    ]],
    ['Resources', [
      ['n_herb', 'Herbs', 'Mobile-Herbalism', null],
      ['n_ore', 'Ore', 'Mobile-Mining', null],
      ['n_fishing', 'Fishing pools', 'Mobile-Fishing', null],
      ['n_treasure', 'Treasure', 'Mobile-TreasureIcon', null],
      ['convergence', 'Skyborne convergences', 'skyborne-high-order-c60', 47, 'Reported by players'],
      ['signpost', 'Signposts', null, 1362, '', '#c7b79a'],
      ['book', 'Library books', null, 148, '', '#b48cff'],
    ]],
  ];
  const HERB = 'Peacebloom.Silverleaf.Earthroot.Mageroyal.Briarthorn.Stranglekelp.Bruiseweed.Wild Steelbloom.Grave Moss.Kingsblood.Liferoot.Fadeleaf.Goldthorn.Khadgar\'s Whisker.Wintersbite.Firebloom.Purple Lotus.Arthas\' Tears.Sungrass.Blindweed.Ghost Mushroom.Gromsblood.Golden Sansam.Dreamfoil.Mountain Silversage.Plaguebloom.Icecap.Black Lotus'.split('.');
  const nodeKind = n => HERB.includes(n) ? 'herb' : /Vein|Deposit/.test(n) ? 'ore' : /Wreckage|Debris|Spill|School|Swarm|Patch of Elemental/.test(n) ? 'fishing' : 'treasure';

  const icon = (name, size) => L.divIcon({ className: '', html: `<span class="mk" style="width:${size}px;height:${size}px;background-image:url(${ICON}${name}.webp)"></span>`, iconSize: [size, size], iconAnchor: [size / 2, size / 2] });
  const coordsOf = latlng => {
    const z = zoneAt(latlng);
    if (!z || !z.region) return null;
    const mp = base.offsets[z.mapId];
    const cx = latlng.lng / 4, cy = -latlng.lat / 4;
    const worldY = (32 - cx + mp.x) * (1600 / 3), worldX = (32 - cy + mp.y) * (1600 / 3);
    const r = z.region;
    return { zone: z, x: (r.west - worldY) / (r.west - r.east) * 100, y: (r.north - worldX) / (r.north - r.south) * 100 };
  };
  function inRing(lat, lng, ring) {
    let c = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const a = ring[i], b = ring[j];
      if ((a[0] > lat) !== (b[0] > lat) && lng < (b[1] - a[1]) * (lat - a[0]) / (b[0] - a[0]) + a[1]) c = !c;
    }
    return c;
  }
  function zoneAt(ll) {
    for (const z of base.zones) { if (z.realm === ctx.realm && z.rings && z.rings.some(r => inRing(ll.lat, ll.lng, r))) return z; }
    return null;
  }
  const coordTxt = ll => { const c = coordsOf(ll); return c ? `${c.zone.name} ${c.x.toFixed(1)}, ${c.y.toFixed(1)}` : ''; };

  function popupHead(title, sub, extra = '') { return `<div style="font-weight:600;color:#fff;font-size:13.5px">${esc(title)}</div>${sub ? `<div class="mut" style="font-size:11.5px">${esc(sub)}</div>` : ''}${extra}`; }
  const originTxt = { client: 'Position from the Forever client', classic: 'Classic spawn, not yet confirmed in Forever', video: 'Position taken from beta footage', pin: 'Hand-placed pin' };

  /* marker clustering by zoom: dots at distance, icons when close */
  function pointLayer(rows, opts) {
    const g = L.layerGroup();
    const canvas = opts.canvas;
    for (const r of rows) {
      if ((r.r || 'azeroth') !== ctx.realm) continue;
      const pts = Array.isArray(r.p[0]) ? r.p : [r.p];
      for (const p of pts) {
        let m;
        if (opts.icon) m = L.marker(p, { icon: icon(typeof opts.icon === 'function' ? opts.icon(r) : opts.icon, opts.size || 18), riseOnHover: true, keyboard: false });
        else m = L.circleMarker(p, { radius: opts.r || 3, color: '#000', weight: .7, fillColor: opts.color || '#ccc', fillOpacity: .95, renderer: canvas });
        if (opts.tip) m.bindTooltip(typeof opts.tip === 'function' ? opts.tip(r) : opts.tip, { direction: 'top', offset: [0, -4] });
        if (opts.popup) m.bindPopup(() => opts.popup(r, p), { maxWidth: 360 });
        m.addTo(g);
      }
    }
    return g;
  }

  const cvs = () => ctx.canvas || (ctx.canvas = L.canvas({ padding: .3 }));
  const realmRows = rows => rows; // rows are already on the current plane; other realms have separate tile sets

  const LOADERS = {
    async zones() {
      const g = L.layerGroup();
      for (const z of base.zones) if (z.realm === ctx.realm && z.rings) {
        const poly = L.polygon(z.rings, { color: '#f3eee2', weight: 1, opacity: .55, fill: true, fillOpacity: 0, interactive: true, bubblingMouseEvents: true });
        poly.on('mouseover', () => poly.setStyle({ fillOpacity: .07, fillColor: '#ff4655' }));
        poly.on('mouseout', () => poly.setStyle({ fillOpacity: 0 }));
        poly.on('click', e => { if (ctx.map.getZoom() < 4) { ctx.map.flyToBounds(poly.getBounds(), { padding: [30, 30], duration: .6 }); L.DomEvent.stop(e); } });
        poly.addTo(g);
      }
      return g;
    },
    async zonelabels() {
      const g = L.layerGroup();
      for (const z of base.zones) if (z.realm === ctx.realm && z.label) {
        const lv = z.levels ? (z.levels[0] === z.levels[1] ? `Level ${z.levels[0]}` : `Level ${z.levels[0]}-${z.levels[1]}`) : (z.city ? 'City' : '');
        L.marker(z.label, { interactive: false, keyboard: false, icon: L.divIcon({ className: 'zl', html: `<div style="transform:translate(-50%,-50%);position:absolute">${esc(z.name)}<small>${lv}${z.isNew ? ' · New' : ''}</small></div>`, iconSize: [0, 0] }) }).addTo(g);
      }
      return g;
    },
    async subzones() {
      const rows = await RF.load('map:subzones');
      const g = L.layerGroup();
      g._zoomMin = 4.5;
      for (const s of rows) if (s.r === ctx.realm) {
        L.marker(s.p, { interactive: false, keyboard: false, icon: L.divIcon({ className: 'sl', html: `<div style="transform:translate(-50%,-50%);position:absolute">${esc(s.n)}</div>`, iconSize: [0, 0] }) }).addTo(g);
      }
      return g;
    },
    async city() { const r = await RF.load('map:poi'); return pointLayer(ctxFilter(r.filter(x => x.k === 'city')), { icon: 'poi-majorcity', size: 22, tip: x => x.n, popup: x => poiPopup(x) }); },
    async town() { const r = await RF.load('map:poi'); return pointLayer(ctxFilter(r.filter(x => x.k === 'town')), { icon: 'poi-town', size: 18, tip: x => x.n, popup: x => poiPopup(x) }); },
    async landmark() { const r = await RF.load('map:poi'); const g = pointLayer(ctxFilter(r.filter(x => x.k === 'landmark')), { color: '#d7c78f', r: 3, canvas: cvs(), tip: x => x.n }); g._zoomMin = 3; return g; },
    async dungeons() {
      const r = await RF.load('map:dungeons');
      return pointLayer(r, {
        icon: x => x.k === 'raid' ? 'raid' : 'dungeon', size: 28, tip: x => x.n,
        popup: (x, p) => popupHead(x.n, x.k === 'raid' ? 'Raid entrance' : 'Dungeon entrance') + `<div class="mut" style="font-size:11px;margin:4px 0 7px">${esc(originTxt[x.s] || '')} · ${esc(coordTxt(L.latLng(p)))}</div>` + (x.id ? `<a class="btn sm" href="#/dungeons/${x.id}">Open dungeon</a>` : '')
      });
    },
    async flight() {
      const r = await RF.load('map:flight');
      return pointLayer(r.filter(x => allow(x.f)), { icon: x => 'taxinode_' + (x.f === 'a' ? 'alliance' : x.f === 'h' ? 'horde' : 'neutral'), size: 18, tip: x => 'Flight: ' + x.n, popup: (x, p) => popupHead(x.n, 'Flight master · ' + (x.f === 'a' ? 'Alliance' : x.f === 'h' ? 'Horde' : 'Neutral')) + `<div class="mut" style="font-size:11px;margin-top:4px">${esc(coordTxt(L.latLng(p)))}</div>` });
    },
    async flightpaths() {
      const r = await RF.load('map:flightpaths');
      const g = L.layerGroup();
      for (const p of r) L.polyline(p.pts, { color: '#8fb7e8', weight: 1, opacity: .35, renderer: cvs(), interactive: false }).addTo(g);
      return g;
    },
    async transport() {
      const r = await RF.load('map:transport');
      const g = L.layerGroup();
      const col = { ship: '#7fb5e6', zeppelin: '#e08a6a', airship: '#c7a6ff', tram: '#ffd96b' };
      const ico = { ship: 'transport', zeppelin: 'transport', airship: 'transport', tram: 'transport' };
      for (const t of r) {
        if (!allow(t.f)) continue;
        for (const l of t.lines) if (l.r === ctx.realm) L.polyline(l.pts, { color: col[t.k], weight: 2, opacity: .85, dashArray: t.k === 'ship' ? '6 6' : '2 7' }).bindTooltip(t.n).addTo(g);
        for (const s of t.stops) if (s.r === ctx.realm) {
          L.marker(s.p, { icon: icon(ico[t.k], 20) }).bindTooltip(`${t.k[0].toUpperCase() + t.k.slice(1)}: ${t.n}`).bindPopup(() => popupHead(s.n, `${t.k[0].toUpperCase() + t.k.slice(1)} stop`) + `<div class="dim" style="margin-top:5px;font-size:12px">Route: ${esc(t.n)}</div><div class="dim" style="font-size:12px">Stops: ${t.stops.map(x => esc(x.n)).join(' → ')}</div><div class="mut" style="font-size:11px;margin-top:5px">${t.f === 'a' ? 'Alliance' : t.f === 'h' ? 'Horde' : 'Open to both factions'} · from the Forever client</div>`).addTo(g);
        }
      }
      return g;
    },
    async graveyards() { const r = await RF.load('map:graveyards'); const g = pointLayer(r.filter(x => allow(x.f)), { icon: 'graveyard', size: 16, tip: x => 'Graveyard: ' + x.n }); g._zoomMin = 3; return g; },
    async caves() {
      const c = await RF.load('map:caves');
      const g = L.layerGroup();
      if (ctx.realm !== 'azeroth') return g;
      const tile = L.tileLayer(`assets/tiles/${c.tiles}/{z}/{x}/{y}.webp`, { tileSize: 512, minZoom: c.minZoom, minNativeZoom: c.minZoom, maxNativeZoom: c.maxNativeZoom, zIndex: 3, noWrap: true, errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' });
      tile.addTo(g);
      for (const v of c.list) {
        L.marker(v.c, { icon: icon('cave', 16) }).bindTooltip(`${v.kind}, near ${v.near || ''}`).bindPopup(() => popupHead(v.kind, `${v.near || ''}${v.zone ? ', ' + v.zone : ''}`) + `<div class="dim" style="font-size:12px;margin-top:5px">The blue-gray overlay shows the layout underground at zoom 5 and closer. Enter from where the footprint meets the surface: follow the slope or the mouth in the terrain around the marker.</div><div class="mut" style="font-size:11px;margin-top:5px">Client model: ${esc(v.wmo)} · ${esc(coordTxt(L.latLng(v.c)))}</div>`).addTo(g);
      }
      return g;
    },
    async questgivers() {
      const [r, qi] = await RF.loadAll(['map:questgivers', 'quests']);
      const g = pointLayer(r.filter(x => allow(x.f)), { icon: 'questnormal', size: 18, tip: x => `${x.n} (${x.q.length || x.qc || 0} quest${(x.q.length || x.qc) > 1 ? 's' : ''})`, popup: (x, p) => qgPopup(x, p, qi) });
      g._zoomMin = 2.5;
      return g;
    },
    async transitions() {
      const rows = RF.guide.transitions || [];
      const g = L.layerGroup();
      const mapIdFor = c => c === 'EK' ? 0 : c === 'K' ? 1 : c;
      if (ctx.realm !== 'azeroth') return g;
      for (const t of rows) {
        const p = t.p;
        L.marker(p, { icon: icon('exit', 20) }).bindTooltip(t.t).bindPopup(() => popupHead(t.t, t.k || 'Zone exit') + `<div class="dim" style="font-size:12px;margin-top:5px;white-space:normal">${esc(t.d || '')}</div>`).addTo(g);
      }
      return g;
    },
    async rares() { const r = await RF.load('map:rares'); return pointLayer(r.rares, { icon: x => x.cr >= 2 ? 'vignettekillelite' : 'vignettekill', size: 18, tip: x => `${x.n} (level ${x.lv[0]})`, popup: x => popupHead(x.n, `Rare, level ${x.lv[0]}${x.lv[1] !== x.lv[0] ? '-' + x.lv[1] : ''}`) + `<div class="mut" style="font-size:11px;margin-top:4px">Classic spawn data, ${x.p.length} point${x.p.length > 1 ? 's' : ''} shown</div>` }); },
    async elites() { const r = await RF.load('map:rares'); return pointLayer(r.elites, { color: '#ff8a3d', r: 3.5, canvas: cvs(), tip: x => `${x.n} (level ${x.lv[0]}, elite)` }); },
    async mailboxes() { const r = await RF.load('map:mailboxes'); return pointLayer(r.map(p => ({ p, r: 'azeroth' })), { icon: 'mailbox', size: 14, tip: 'Mailbox' }); },
    async convergence() { const r = await RF.load('map:convergence'); return pointLayer(r, { icon: x => x.ic === 'elemental' ? 'skyborne-windshapers-c60' : 'skyborne-high-order-c60', size: 16, tip: x => x.n, popup: x => popupHead(x.n, 'Skyborne convergence') + `<div class="mut" style="font-size:11px;margin-top:4px">${esc(x.d || '')}</div>` }); },
    async signpost() { const r = await RF.load('map:lore'); return pointLayer(r.signpost, { color: '#c7b79a', r: 2.5, canvas: cvs(), tip: x => x.n }); },
    async book() { const r = await RF.load('map:lore'); return pointLayer(r.book, { color: '#b48cff', r: 3.5, canvas: cvs(), tip: x => x.n }); },
  };
  for (const k of ['trainer', 'vendor', 'other']) {
    const col = { trainer: '#58b7f0', vendor: '#6fd36f', other: '#b8c4b0' }[k];
    LOADERS['npc_' + k] = async () => {
      const r = await RF.load('map:npcs');
      const f = r.filter(x => allow(x.f) && (x.cs || [x.c]).some(c => c === k || c.startsWith(k + ':')) );
      const g = pointLayer(f, { color: col, r: 3, canvas: cvs(), tip: x => x.n + (x.t ? ` <${x.t}>` : ''), popup: (x, p) => popupHead(x.n, x.t) + `<div class="mut" style="font-size:11px;margin-top:4px">${esc(coordTxt(L.latLng(p)))} · ${x.f === 'a' ? 'Alliance' : x.f === 'h' ? 'Horde' : 'Neutral'}</div>` });
      g._zoomMin = k === 'other' ? 5 : 3;
      return g;
    };
  }
  for (const k of ['innkeeper', 'banker', 'auctioneer', 'stable', 'repair']) {
    const col = { innkeeper: '#f0a858', banker: '#f5d76e', auctioneer: '#e9b94f', stable: '#c9a27a', repair: '#9aa3ad' }[k];
    LOADERS['svc_' + k] = async () => {
      const r = await RF.load('map:services');
      const g = pointLayer((r[k] || []).filter(x => allow(x.f)), { color: col, r: 3.5, canvas: cvs(), tip: x => `${x.n || k}${x.sub ? ' <' + x.sub + '>' : ''}` });
      g._zoomMin = k === 'repair' ? 4 : 2;
      return g;
    };
  }
  for (const k of ['herb', 'ore', 'fishing', 'treasure']) {
    LOADERS['n_' + k] = async () => {
      const r = await RF.load('map:nodes');
      const g = L.layerGroup();
      const col = { herb: '#57c15f', ore: '#c99552', fishing: '#4aa3df', treasure: '#e8c547' }[k];
      if (ctx.realm !== 'azeroth') return g;
      for (const [name, flat] of Object.entries(r)) {
        if (nodeKind(name) !== k) continue;
        for (let i = 0; i < flat.length; i += 2) L.circleMarker([flat[i], flat[i + 1]], { radius: 2.5, color: '#000', weight: .4, fillColor: col, fillOpacity: .9, renderer: cvs() }).bindTooltip(name).addTo(g);
      }
      g._zoomMin = 3;
      return g;
    };
  }
  const ctxFilter = rows => rows;
  const poiPopup = x => popupHead(x.n, x.k === 'city' ? 'Major city' : 'Town');

  /* quest popups show the giver, and each quest opens the full reader */
  function qgPopup(x, p, qi) {
    const items = (x.q || []).map(id => { const q = qi[id]; if (!q) return ''; return `<a class="row click tk-${q[2] === 'a' ? 'b' : q[2] === 'h' ? 'r' : 'n'}" data-quest="${id}" style="min-height:0;padding:4px 8px 4px 11px"><div class="grow"><div class="t" style="font-size:12px;white-space:normal">${esc(q[0])}</div></div><div class="end">${q[1] ? 'Lv ' + q[1] : ''}</div></a>`; }).join('');
    return popupHead(x.n, x.t) + `<div class="mut" style="font-size:11px;margin:3px 0 7px">${esc(coordTxt(L.latLng(p)))}</div>${items}`;
  }
  RF.openQuest = async id => {
    const q = (await RF.load('questb:b' + (id % 80)))[id];
    if (!q) return;
    const sec = (t, v) => v ? `<div class="cap" style="margin:11px 0 4px">${t}</div><div class="dim" style="white-space:pre-wrap;font-size:12.5px">${esc(v)}</div>` : '';
    const pins = (q.pins || []).map(p => `<div class="row tk-${p.e ? 'g' : 'a'}" style="min-height:0"><div class="grow"><div class="t" style="font-size:12px">${p.e ? 'Ends' : 'Starts'}: ${esc(p.n || '')}</div><div class="s">${esc(p.z || '')} ${p.x != null ? p.x + ', ' + p.y : ''}</div></div></div>`).join('');
    RF.modal(q.t, `<div class="factbar" style="margin:0 0 10px">${q.lv ? `<span class="chip">Level ${q.lv}</span>` : ''}${q.min ? `<span class="chip">Requires ${q.min}</span>` : ''}<span class="chip ${q.side === 'Alliance' ? 'b' : q.side === 'Horde' ? 'r' : ''}">${esc(q.side || 'Both')}</span><span class="chip ${q.tag === 'new' ? 'g' : q.tag === 'changed' ? 'a' : ''}">${q.tag === 'new' ? 'New in Forever' : q.tag === 'changed' ? 'Changed in Forever' : 'Classic text'}</span></div>
      ${q.st ? `<div class="note" style="border-color:#55555e;background:#1a1a1d;color:var(--txt2)">${esc(q.st)}</div>` : ''}
      ${pins}${sec('Objectives', q.obj)}${sec('Description', q.desc)}${sec('Rewards', q.rew)}${sec('When you come back', q.back)}${sec('When you hand it in', q.done)}`, { w: 640, h: 560 });
  };
  document.addEventListener('click', e => { const a = e.target.closest('[data-quest]'); if (a) { e.preventDefault(); RF.openQuest(+a.dataset.quest); } });

  async function setLayer(key, val) {
    on[key] = val; saveOn();
    if (!ctx.map) return;
    if (val) {
      if (!layers[key]) { layers[key] = await LOADERS[key](); }
      if (on[key]) { updateZoomed(key); }
    } else if (layers[key]) { ctx.map.removeLayer(layers[key]); }
  }
  function updateZoomed(key) {
    const l = layers[key];
    if (!l || !on[key]) return;
    const min = l._zoomMin;
    const z = ctx.map.getZoom();
    if (min != null && z < min) ctx.map.removeLayer(l);
    else if (!ctx.map.hasLayer(l)) l.addTo(ctx.map);
  }
  function updateAllZoomed() { Object.keys(layers).forEach(updateZoomed); }

  function setStyle(style) {
    if (ctx.tile) ctx.map.removeLayer(ctx.tile);
    const realm = base.realms.find(r => r.id === ctx.realm);
    const name = style === 'worldmap' ? (ctx.realm === 'zephras-isle' ? 'zephras-isle-worldmap' : 'worldmap') : realm.tiles;
    const nat = style === 'worldmap' ? 5 : base.maxNativeZoom;
    ctx.tile = L.tileLayer(`assets/tiles/${name}/{z}/{x}/{y}.webp`, { tileSize: 512, maxNativeZoom: nat, minNativeZoom: 0, maxZoom: base.maxNativeZoom + 2, noWrap: true, zIndex: 2, className: 'tile', errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' }).addTo(ctx.map);
    ctx.style = style;
  }
  function boundsOf(r) { return [[-r.canvas.bottom * 4, r.canvas.left * 4], [-r.canvas.top * 4, r.canvas.right * 4]]; }
  function zoomClass() { const c = ctx.map.getContainer(), z = ctx.map.getZoom(); c.classList.toggle('z-low', z < 2.6); c.classList.toggle('z-mid', z >= 2.6 && z < 4); }
  function buildMap() {
    const el = document.getElementById('map');
    const r = base.realms.find(x => x.id === ctx.realm);
    ctx.map = L.map(el, { crs: L.CRS.Simple, minZoom: 0, maxZoom: base.maxNativeZoom + 2, zoomSnap: .25, zoomDelta: .5, wheelPxPerZoomLevel: 90, attributionControl: false, zoomControl: false, preferCanvas: false, maxBoundsViscosity: .6 });
    L.control.zoom({ position: 'topright' }).addTo(ctx.map);
    ctx.map.fitBounds(boundsOf(r));
    setStyle(ctx.style || 'terrain');
    ctx.map.on('zoomend', () => { updateAllZoomed(); zoomClass(); });
    zoomClass();
    ctx.map.on('mousemove', e => { const c = document.getElementById('coords'); if (c) c.textContent = coordTxt(e.latlng) || 'Open sea'; });
    ctx.map.on('contextmenu', e => {
      const c = coordsOf(e.latlng);
      let html = popupHead(c ? c.zone.name : 'Open water', c ? `${c.x.toFixed(1)}, ${c.y.toFixed(1)}` : '');
      if (c) {
        const mp = base.offsets[c.zone.mapId];
        const wy = (32 - e.latlng.lng / 4 + mp.x) * (1600 / 3), wx = (32 + e.latlng.lat / 4 + mp.y) * (1600 / 3);
        html += `<div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap"><button class="btn sm" data-act="copy" data-text="${c.x.toFixed(1)} ${c.y.toFixed(1)}">Copy coordinates</button><a class="btn sm" target="_blank" rel="noopener" href="https://wowforevermap.com/#3d/${c.zone.mapId}/${Math.round(wx)}/${Math.round(wy)}">Walk here in 3D on wowforevermap</a></div>`;
      }
      L.popup({ maxWidth: 340 }).setLatLng(e.latlng).setContent(html).openOn(ctx.map);
    });
    return ctx.map;
  }
  async function reloadLayers() {
    for (const k of Object.keys(layers)) { if (ctx.map.hasLayer(layers[k])) ctx.map.removeLayer(layers[k]); delete layers[k]; }
    for (const k of Object.keys(on)) if (on[k] && LOADERS[k]) { try { layers[k] = await LOADERS[k](); updateZoomed(k); } catch (e) { console.error(k, e); } }
  }
  function goto(latlng, z) { ctx.map.flyTo(latlng, z || 6, { duration: .7 }); }
  /* A labelled pin for links from other pages, like a trainer from the Leatherworking path. */
  function pin(a, b, label) {
    if (ctx.pin) { ctx.pin.remove(); ctx.pin = null; }
    if (!label) return;
    ctx.pin = L.circleMarker([a, b], { radius: 8, color: '#fff', weight: 2, fillColor: '#ff4655', fillOpacity: 1 }).addTo(ctx.map);
    ctx.pin.bindTooltip(RF.esc(label), { permanent: true, direction: 'top', offset: [0, -8] }).openTooltip();
  }
  function flyZone(z) { if (z.rings) ctx.map.flyToBounds(L.polygon(z.rings).getBounds(), { padding: [20, 20], duration: .7 }); }

  function zoneList(q) {
    const s = (q || '').toLowerCase();
    const zs = base.zones.filter(z => (z.realm === ctx.realm) && (!s || z.name.toLowerCase().includes(s))).sort((a, b) => (a.levels ? a.levels[0] : 99) - (b.levels ? b.levels[0] : 99) || a.name.localeCompare(b.name));
    const lv = RF.prefs.level;
    return zs.map(z => {
      const fit = z.levels && lv >= z.levels[0] - 1 && lv <= z.levels[1] + 1;
      return `<div class="row click ${fit ? 'tk-g' : 'tk-n'}" data-zone="${z.id}" style="min-height:28px;padding-top:3px;padding-bottom:3px"><div class="grow"><div class="t" style="font-size:12px">${esc(z.name)}${z.isNew ? ' <span class="chip g">New</span>' : ''}</div></div><div class="end">${z.levels ? z.levels.join('-') : ''}</div></div>`;
    }).join('');
  }

  RF.pages.map = {
    crumb: () => 'World map',
    async enter(view, p) {
      base = await RF.load('map:base');
      ctx = { realm: 'azeroth', style: ctx.style || 'terrain' };
      Object.keys(layers).forEach(k => delete layers[k]);
      view.innerHTML = `<div id="mapwrap"><aside id="mapside">
          <div style="padding:10px;border-bottom:1px solid var(--line)">
            <input class="input" id="mapq" placeholder="Find a zone, town, NPC, quest..." style="width:100%" autocomplete="off">
            <div id="mapres" class="scroll" style="max-height:220px;margin-top:6px;display:none"></div>
            <div style="display:flex;gap:6px;margin-top:7px;align-items:center"><div class="seg" id="realmSeg"><button class="on" data-v="azeroth">Azeroth</button><button data-v="zephras-isle">Zephras Isle</button></div>
            <div class="seg" id="styleSeg"><button data-v="terrain" class="${ctx.style === 'terrain' ? 'on' : ''}">Terrain</button><button data-v="worldmap" class="${ctx.style === 'worldmap' ? 'on' : ''}">Painted</button></div></div>
          </div>
          <div class="tabs" id="sideTabs" style="padding:0 6px"><button class="on" data-v="layers">Layers</button><button data-v="zones">Zones</button><button data-v="legend">How to read</button></div>
          <div class="scroll" id="sideBody" style="flex:1;padding:6px 10px 12px"></div>
        </aside><div style="flex:1;position:relative;min-width:0;display:flex"><div id="map"></div><div class="coords" id="coords">Move over the map for coordinates</div>
        <button class="btn sm" id="sideToggle" style="position:absolute;left:10px;top:10px;z-index:800">Hide panel</button></div></div>`;
      buildMap();
      const drawLayers = () => {
        document.getElementById('sideBody').innerHTML = CAT.map(([name, items]) => `<div class="laygroup">${name}</div>` + items.map(([k, n, ic, cnt, tip, col]) => `<label class="lay" title="${esc(tip || '')}"><input type="checkbox" data-layer="${k}" ${on[k] ? 'checked' : ''}>${ic ? `<img src="${ICON}${ic}.webp" alt="" onerror="this.style.display='none'">` : `<span class="sw" style="background:${col || '#888'}"></span>`}<span>${esc(n)}</span>${cnt ? `<span class="n">${cnt}</span>` : ''}</label>`).join('')).join('') +
          `<div style="display:flex;gap:6px;margin-top:10px"><button class="btn sm" id="allOff">Hide all</button><button class="btn sm" id="defaults">Defaults</button></div>`;
      };
      const legend = () => {
        document.getElementById('sideBody').innerHTML = `<div class="prose" style="font-size:12px;padding:6px 2px">
          <h4>Terrain and Painted</h4><p>Terrain is the game's own top-down minimap art, stitched into one map. Painted is the world map art you see when you press M in game.</p>
          <h4>Moving between zones</h4><p>Green arrow markers show exits and passes. Click one to see where it leads and how to use it. Zone borders follow the game's real area data, but walls and cliffs often block a border, so use the exits.</p>
          <h4>Caves and underground</h4><p>Turn on the layer and zoom to 5 or closer to see the layout under the ground. Each cave also has a marker with the nearest named place.</p>
          <h4>How much to trust a marker</h4><p><b>Flight masters, towns, boats, dungeon entrances, signposts</b> come from the Forever client itself. <b>NPCs, quest givers, rare spawns, herbs, ore, graveyards</b> are mainly Classic data, with Forever additions where players found them. Forever moved some things, so a marker may be off until confirmed. Each popup says which it is where it matters.</p>
          <h4>Coordinates</h4><p>The box at the bottom right uses the same zone coordinates as the game: <code>x, y</code> percent across the zone. Right click any spot to copy them, or to walk there in 3D on wowforevermap.com, which needs the internet.</p></div>`;
      };
      drawLayers();
      for (const k of Object.keys(on)) if (on[k] && LOADERS[k]) setLayer(k, true);
      view.addEventListener('change', e => { const k = e.target.dataset && e.target.dataset.layer; if (k) setLayer(k, e.target.checked); });
      view.addEventListener('click', e => {
        const t = e.target.closest('#sideTabs button');
        if (t) {
          view.querySelectorAll('#sideTabs button').forEach(b => b.classList.toggle('on', b === t));
          if (t.dataset.v === 'layers') drawLayers();
          else if (t.dataset.v === 'zones') document.getElementById('sideBody').innerHTML = zoneList();
          else legend();
        }
        const z = e.target.closest('[data-zone]');
        if (z) flyZone(base.zones.find(x => x.id === +z.dataset.zone));
        if (e.target.id === 'allOff') { Object.keys(on).forEach(k => { if (on[k]) setLayer(k, false); }); drawLayers(); }
        if (e.target.id === 'defaults') { Object.keys(on).forEach(k => { if (on[k]) setLayer(k, false); }); ['zones', 'zonelabels', 'subzones', 'city', 'town', 'dungeons', 'flight', 'transport', 'transitions'].forEach(k => setLayer(k, true)); drawLayers(); }
        if (e.target.id === 'sideToggle') { const w = document.getElementById('mapwrap'); w.classList.toggle('nosid'); e.target.textContent = w.classList.contains('nosid') ? 'Show panel' : 'Hide panel'; setTimeout(() => ctx.map.invalidateSize(), 220); }
        const res = e.target.closest('[data-goto]');
        if (res) { const [lat, lng, z2] = res.dataset.goto.split(',').map(Number); goto([lat, lng], z2); }
      });
      view.querySelector('#styleSeg').addEventListener('click', e => { if (!e.target.dataset.v) return; view.querySelectorAll('#styleSeg button').forEach(b => b.classList.toggle('on', b === e.target)); setStyle(e.target.dataset.v); });
      view.querySelector('#realmSeg').addEventListener('click', async e => {
        if (!e.target.dataset.v) return;
        view.querySelectorAll('#realmSeg button').forEach(b => b.classList.toggle('on', b === e.target));
        ctx.realm = e.target.dataset.v;
        setStyle(ctx.style);
        ctx.map.fitBounds(boundsOf(base.realms.find(x => x.id === ctx.realm)));
        reloadLayers();
      });
      const qel = view.querySelector('#mapq');
      let idx = null;
      qel.addEventListener('input', async () => {
        const v = qel.value.trim().toLowerCase(), box = view.querySelector('#mapres');
        if (v.length < 2) { box.style.display = 'none'; return; }
        if (!idx) {
          const [poi, fl, npc, qg, sub, dg] = await RF.loadAll(['map:poi', 'map:flight', 'map:npcs', 'map:questgivers', 'map:subzones', 'map:dungeons']);
          idx = [];
          base.zones.forEach(z => z.label && idx.push(['Zone', z.name, z.label, 4]));
          dg.forEach(d => idx.push(['Instance', d.n, d.p, 6]));
          poi.forEach(x => idx.push([x.k === 'city' ? 'City' : x.k === 'town' ? 'Town' : 'Place', x.n, x.p, 6]));
          fl.forEach(x => idx.push(['Flight', x.n, x.p, 6]));
          sub.forEach(x => x.r === 'azeroth' && idx.push(['Subzone', x.n, x.p, 6]));
          npc.forEach(x => idx.push(['NPC', x.n + (x.t ? ` <${x.t}>` : ''), x.p[0], 7]));
          qg.forEach(x => idx.push(['Quest giver', x.n, x.p, 7]));
        }
        const hit = idx.filter(r => r[1].toLowerCase().includes(v)).slice(0, 40);
        box.style.display = 'block';
        box.innerHTML = hit.map(r => `<div class="row click tk-n" data-goto="${r[2][0]},${r[2][1]},${r[3]}" style="min-height:26px;padding-top:2px;padding-bottom:2px;margin-bottom:2px"><div class="grow"><div class="t" style="font-size:12px">${esc(r[1])}</div></div><div class="end">${r[0]}</div></div>`).join('') || '<div class="mut" style="padding:6px;font-size:12px">Nothing found.</div>';
      });
      if (p[0] === 'at' && p[1]) { const [a, b, c] = p[1].split(',').map(Number); ctx.map.setView([a, b], c || 6); pin(a, b, p[2]); }
    },
    update(p) { if (p[0] === 'at' && p[1] && ctx.map) { const [a, b, c] = p[1].split(',').map(Number); goto([a, b], c); pin(a, b, p[2]); } },
    leave() { if (ctx.map) { ctx.map.remove(); ctx.map = null; } }
  };
})();
