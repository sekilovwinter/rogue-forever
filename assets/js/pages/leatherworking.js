/* Leatherworking path: one step at a time. The left rail is the whole plan, the right card says exactly what to do next. */
(function () {
  const esc = RF.esc;
  const LS = 'rf_lw2';
  const SLOTS = { head: 'Head', shoulder: 'Shoulder', back: 'Back', chest: 'Chest', wrist: 'Wrist', hands: 'Hands', waist: 'Waist', legs: 'Legs', feet: 'Feet' };
  const BELT = 252428, GLOVES = 252494, BOOTS = 252439, HOOD = 252504;
  const MAIN = [BELT, GLOVES, BOOTS, HOOD];
  const OPTIONAL = [252490, 252500];
  const SKBELT = 252520, SKGLOVES = 252525, TUNIC = 252508;
  const TOUGH = 4253, DCLOAK = 2316, BSHOULD = 5964, DUSKY = 7374, BRACERS = 18948, LEGGUARDS = 252516;
  const SUBS = [['steps', 'Step by step'], ['pieces', 'The gear you get'], ['buy', 'Everything to buy'], ['favor', 'Merchant\'s Favor']];
  const PHASES = [['p1', 'Skill 1 to 100'], ['p2', '100 to 225'], ['p3', '225 to 300'], ['g30', 'Level 30 gear']];
  const SKIN = new Set([2934, 2318, 783, 2319, 4232, 249427, 249428, 4234, 4235, 4304, 8169, 8170, 8171, 15408, 15422]);
  const VENDOR = new Set([4289, 2320, 2321, 4340, 7005, 4291, 8343, 14341, 2325, 2605]);
  let L, G, host;
  let st = { sub: 'steps', skill: 0, city: null, step: 'learn', done: {}, sel: MAIN.slice(), list: 'combat.pvp.20' };
  try { st = Object.assign(st, JSON.parse(localStorage.getItem(LS) || '{}')); } catch (e) { }
  const save = () => { try { localStorage.setItem(LS, JSON.stringify(st)); } catch (e) { } };
  const v0 = st.v || 0;
  /* Saved pages from before the guide went past skill 100 start on the new part if they had reached the end of the old one. */
  if (!st.v) {
    st.v = 2;
    if (st.level === undefined) st.level = 30;
    if (st.step === 'later' || st.skill >= 100) { st.phase = 'p2'; if (st.step === 'later') st.step = 'road'; }
    if (!st.sel.includes(SKBELT)) st.sel.push(SKBELT);
    if (st.list === 'combat.pvp.20') st.list = 'combat.pvp.30';
  }
  /* The level 30 gear path. A page that was already in use opens on it, at skill 150 and level 30, with the level 20 part done. */
  if (st.v < 3) {
    st.v = 3;
    [TOUGH, DUSKY].forEach(i => { if (!st.sel.includes(i)) st.sel.push(i); });
    if (st.skill > 0) { st.skill = Math.max(st.skill, 150); st.level = Math.max(st.level || 30, 30); st.phase = 'g30'; st.step = 'g30'; st.sub = 'steps'; st.fillP1 = 1; }
  }
  /* One piece per slot: the weaker chest and legs left the level 30 path, and the gear tab follows the leveling list, which the path matches.
     A page already on the level 30 path gets the pieces its player reported on November 7: the belt, gloves, Tunic and Legguards (and the trip, rack and crates they took). */
  if (st.v < 4) {
    st.v = 4;
    st.sel = st.sel.filter(i => i !== DUSKY);
    if (st.list === 'combat.pvp.30') st.list = 'combat.lvl.30';
    if (v0 === 3 && st.skill > 0) { ['rack', 'g30favor', 'p' + SKBELT, 'p' + TOUGH, 'p' + TUNIC, 'p' + LEGGUARDS].forEach(k => { st.done[k] = true; }); st.phase = 'g30'; st.step = 'g30'; st.sub = 'steps'; }
  }
  /* Version 4 also ticked the Thunder Bluff trip, guessing from the Dusky Leather Armor. That armor can be bought, and on November 8 the player had not been to Una yet, so the tick comes off and the page opens on that trip. */
  if (st.v < 5) {
    st.v = 5;
    if (v0 === 4 && st.done.g30una && !st.done['p' + BSHOULD]) { delete st.done.g30una; if (st.phase === 'g30') st.step = 'g30una'; }
  }
  if (v0 !== st.v) save();
  const made = id => !!st.done['p' + id];

  const nm = i => (L.names[i] || [`Item ${i}`])[0];
  const icon = (i, s) => RF.img((L.names[i] || [])[1], s, (L.names[i] || [])[2] >= 2 ? 'bq' + L.names[i][2] : '');
  const qc = i => `q${(L.names[i] || [0, 0, 1])[2] ?? 1}`;
  const cityKey = () => (L.cities[st.city] ? st.city : RF.prefs.faction === 'Alliance' ? 'sw' : 'org');
  const city = () => L.cities[cityKey()];
  const camp = () => L.camps[city().side];
  const spot = patId => (camp().lw.n === 'Pawani' && RF.guide.lw.spots[patId]) || '';
  const money = c => RF.money(c) || '0';
  const mapBtn = (ll, label, z = 8) => (ll ? `<a class="btn sm" href="#/map/at/${ll[0]},${ll[1]},${z}/${encodeURIComponent(label)}">Show on map</a>` : '');
  const price = id => (L.vendors[id] && L.vendors[id][0] ? L.vendors[id][0].p : 0);

  const chance = (y, grey, s) => (s < y ? 1 : s >= grey ? 0 : (grey - s) / (grey - y));
  function craftsLeft(step, to) {
    let n = 0;
    const end = to === undefined ? step.b : Math.min(step.b, to);
    for (let s = Math.max(step.a, st.skill); s < end; s++) n += 1 / chance(step.y, step.grey, Math.max(s, 1));
    return n;
  }
  const route = spell => L.route.find(r => r.spell === spell);
  const timesLeft = (name, r) => {
    const left = Math.ceil(craftsLeft(r));
    if (!left) return `${name}: finished`;
    return `${name} about ${left} ${st.skill > r.a ? 'more ' : ''}times`;
  };

  /* ---------- Reusable pieces of a step ---------- */
  function person(role, p, zone, note) {
    return `<div class="lwperson"><div class="grow"><div class="t">${esc(p.n)}${p.seen ? ' <span class="chip g" data-tip="Players have reported this NPC here in Forever">Seen</span>' : p.seen === 0 ? ' <span class="chip a" data-tip="From Classic data. Nobody has reported this NPC in Forever yet, so the spot or what they offer may have changed.">Classic data</span>' : ''}</div><div class="s">${esc(role)}. ${esc(zone)} ${p.x}, ${p.y}${note ? `. ${esc(note)}` : ''}</div></div>${mapBtn(p.ll, p.n)}</div>`;
  }
  function bagRow(id, count, note) {
    const c = city();
    const src = note || (VENDOR.has(id) ? `Buy from ${c.shop.n} for ${money(price(id))} each` : (RF.guide.lw.src[id] || 'Auction house'));
    return `<div class="lwbag" data-mat="${id}" data-tip="Click for where to get it">${icon(id, 28)}<b class="lwn">${Math.ceil(count)}</b><div class="grow"><div class="${qc(id)}" style="font-weight:500">${esc(nm(id))}</div><div class="s">${esc(src)}</div></div></div>`;
  }
  function learnRow(name, cost, id, note) {
    return `<div class="lwbag">${id ? icon(id, 28) : ''}<div class="grow"><div style="font-weight:500">${esc(name)}</div><div class="s">${esc(note || `Costs ${money(cost)}`)}</div></div></div>`;
  }
  const box = (title, html) => (html ? `<div class="lwbox"><div class="cap">${esc(title)}</div>${html}</div>` : '');

  /* The exact patterns to buy. The vendor's list is long, so the full name matters. */
  function buyBox(ids) {
    const rows = ids.map(id => {
      const t = L.targets[id], p = t.pat, q = L.names[p.id][2];
      RF.regItem(t);
      const stats = (t.x || []).filter(l => /^\+/.test(l)).join(', ');
      return `<div class="lwbuyrow" data-itemref="${id}">${RF.img(L.names[p.id][1], 36, 'bq' + q)}<div class="grow"><div class="lwbuyname q${q}">${esc(p.n)}</div><div class="s">Gives ${esc(stats)}</div></div><div class="lwbuyend">${spot(p.id) ? `<b class="lwspot">${esc(spot(p.id))}</b>` : ''}<span class="lwfav">${p.favor} Favor</span></div></div>`;
    }).join('');
    return `<div class="lwbuy"><div class="cap">Buy exactly these ${ids.length} from ${esc(camp().lw.n)}</div>${rows}</div>`;
  }

  /* A step that makes a piece of gear. You already bought its pattern by this point. */
  function pieceStep(id, group, at) {
    const t = L.targets[id];
    const canWear = t.r || 1;
    const stats = (t.x || []).filter(l => /^\+|Armor$/.test(l)).join(', ');
    return {
      id: 'p' + id, group, rail: `Make ${t.n.replace(' Leather', '')}`, sub: `At ${at}`, piece: id, at,
      title: `Make the ${t.n}`, lead: `You can do this from skill ${at}. You can wear it from level ${canWear}.`,
      do: [
        id === HOOD ? 'Craft 2 Cured Medium Hide. You learned the recipe in step 8.' : null,
        id === BOOTS ? 'You used 2 Cured Light Hide on your crate, so make 2 more from Light Hide and Salt.' : null,
        `Right-click ${t.pat.n} in your bags to learn it.`,
        'Open Leatherworking, craft 1, and put it on.',
      ].filter(Boolean),
      tipLabel: 'Missing Pristine Leather or Shadowgem?',
      tip: 'Keep the pattern, and craft the piece once you have them. You can do that anywhere. You do not need to go back to the camp.',
      why: RF.guide.lw.items[id],
      bag: t.reag.map(([m, n]) => [m, n]),
      gear: stats,
    };
  }

  /* The whole plan. Every step uses the same layout. */
  function steps() {
    const c = city(), cp = camp(), sub = L.sub;
    const rLL = route(2881), rHide = route(3816), rKit = route(2152), rGlove = route(3756), rBelt = route(3763);
    const reag = (r, to) => r.reag.map(([id, q]) => [id, q * craftsLeft(r, to)]);
    const times = timesLeft;
    const S = [];
    S.push({
      id: 'learn', group: 'Get started', rail: 'Learn both professions', sub: 'Start', to: 1,
      title: 'Learn Leatherworking and Skinning',
      lead: `Everything is in one spot in ${c.name}.`,
      do: [`Talk to ${c.j.n}, and learn Leatherworking.`, `Talk to ${c.skin.n}, and learn Skinning.`, `Buy a Skinning Knife from ${c.shop.n}, and keep it in your bags.`],
      why: 'You can only have two main professions, and these are the two you need. Skinning gives you free leather, and Leatherworking turns it into gear. If you already have two main professions, you must unlearn one first.',
      where: person('Leatherworking trainer', c.j, c.name) + person('Skinning trainer', c.skin, c.name) + person('Supplies vendor', c.shop, c.name),
      bag: [[7005, 1]],
    });
    S.push({
      id: 'skin', group: 'Get started', rail: 'Skin beasts for materials', sub: 'To level 25',
      title: 'Skin beasts, and save what you get',
      lead: 'Do this whenever you are out questing. You will need a lot of leather.',
      do: ['Kill a beast and loot it. Then click the corpse again to skin it.', 'Keep everything in the "Save these" list. Do not sell it.', 'Your Skinning skill sets which beasts you can skin. The list on the right shows the skill for each one.', 'When your Skinning stops going up at 75, ask your Skinning trainer for the next rank.', 'Short on time? You can buy all of this on the auction house instead.'],
      warn: 'Do not skip this before level 26. Pristine Leather only drops while you are level 25 or lower, from beasts of level 10 to 25 that are not grey to you, outside the starting zones. You need 11. Nobody knows the exact drop rate yet.',
      skinList: 1,
    });
    S.push({
      id: 'r1', group: 'Skill 1 to 50', rail: `Craft Light Leather`, sub: '1-30', to: rLL.b, make: rLL.make,
      title: times('Craft Light Leather', rLL), lead: 'This takes your skill to 30. You already know this recipe.',
      do: ['Open Leatherworking from your spellbook.', 'Craft Light Leather until your skill reaches 30.', 'Keep the Light Leather. You need it later.'],
      tip: 'Not enough scraps? Craft Light Armor Kits instead. They cost 1 Light Leather each, and they also reach 30.',
      bag: reag(rLL),
    });
    S.push({
      id: 'r2', group: 'Skill 1 to 50', rail: 'Craft Cured Light Hide', sub: '30-39', to: rHide.b, make: rHide.make,
      title: times('Learn Cured Light Hide, and craft it', rHide), lead: 'This takes your skill to 39.',
      do: [`Go to ${c.j.n}, and learn Cured Light Hide.`, `Buy Salt from ${c.shop.n}.`, 'Craft 9 in total. Keep all of them: your gear needs them.'],
      why: 'Hides only come from about 1 skin in 20, so make no more than your gear needs.',
      where: person('Teaches the recipe', c.j, c.name) + person('Sells Salt', c.shop, c.name),
      learn: learnRow('Cured Light Hide', sub['Cured Light Hide'].cost, 4231),
      bag: reag(rHide),
    });
    S.push({
      id: 'r3', group: 'Skill 1 to 50', rail: 'Craft Light Armor Kit', sub: '39-50', to: rKit.b, make: rKit.make,
      title: times('Craft Light Armor Kit', rKit), lead: 'This takes your skill to 50. You already know this recipe.',
      do: ['Craft Light Armor Kits until your skill reaches 50.', 'Use them on your gear, or sell them to a vendor.'],
      bag: reag(rKit),
    });
    const G1 = `Skill 50 to 75: stay in ${c.name}`, G2 = 'One trip to the trade camp', G3 = 'Skill 75 to 100: anywhere';
    const threadNow = Math.ceil(craftsLeft(rGlove) * 2);
    const near = person('Sells thread and Salt near the camp', cp.near, cp.zone);
    const travel = c.side === 'h' ? 'Fly to the Crossroads. The camp is about a 30-second run west of the flight master.' : 'Fly to Lakeshire, then run west to Three Corners, about a minute away.';
    S.push({
      id: 'rank1', group: G1, rail: `Rank up with ${c.e.n}`, sub: 'At 50', to: 51,
      title: 'Rank up at skill 50', lead: `Steps 6 to 9 all happen in ${c.name}, so you only make this trip once.`,
      do: [`Go to ${c.e.n}, and learn Journeyman Leatherworking. You must be level 10.`, `Go to ${c.j.n}, and learn Embossed Leather Gloves.`, `Buy about ${threadNow} Coarse Thread from ${c.shop.n}, for the next step.`],
      tipLabel: 'Watch out',
      tip: `The titles are misleading. ${c.j.n} is called a Journeyman Leatherworker, but only teaches up to Apprentice. The Journeyman rank comes from ${c.e.n}, the Expert Leatherworker, who stands close by.`,
      where: person('Teaches Journeyman rank', c.e, c.name) + person('Teaches the gloves', c.j, c.name) + person('Sells thread', c.shop, c.name),
      learn: learnRow('Journeyman Leatherworking', 500, null, 'About 5 silver. One guide lists 5, with no unit') + learnRow('Embossed Leather Gloves', rGlove.cost, rGlove.make),
    });
    S.push({
      id: 'r4', group: G1, rail: 'Craft Embossed Gloves', sub: '50-75', to: rGlove.b, make: rGlove.make,
      title: times('Craft Embossed Leather Gloves', rGlove), lead: 'Stay right next to the trainers. That saves you a trip back.',
      do: ['Craft gloves until your skill reaches 75.', 'Sell the gloves to a vendor.'],
      tipLabel: 'Not enough Light Leather?',
      tip: 'Buy the rest on the auction house. If that costs too much, skin some and craft the gloves out in the world. You would then come back for step 8 once, at skill 75.',
      why: 'These are the cheapest way through this stretch, and every craft gives a point until skill 70.',
      bag: reag(rGlove),
    });
    S.push({
      id: 'rank2', group: G1, rail: `Learn from ${c.e.n}`, sub: 'At 75', to: 76,
      title: 'Learn your next recipes at skill 75', lead: `${c.e.n} is still close by.`,
      do: [`Talk to ${c.e.n}, and learn Fine Leather Belt and Cured Medium Hide.`, `After this, you do not need to come back to ${c.name} for this plan, except to use the auction house.`],
      where: person('Expert trainer', c.e, c.name),
      learn: learnRow('Fine Leather Belt', rBelt.cost, rBelt.make) + learnRow('Cured Medium Hide', sub['Cured Medium Hide'].cost, 4233),
    });
    S.push({
      id: 'crate', group: G1, rail: 'Buy and fill 1 crate', sub: 'Today',
      title: 'Buy one crate, and fill it', lead: 'You do not need 120 Favor today. One crate and its quest pay for 2 patterns.',
      do: ['At the auction house, search for "Waylaid Crate".', 'Buy Waylaid Crate: Apprentice Fabrics. It is in green text.', 'Right-click it in your bags, then click your Cured Light Hide. It uses 2, and turns into a sealed crate.'],
      warnLabel: 'Use your main character',
      warn: 'Crates need level 10, sealed crates bind to you, and Favor stays on the character who hands it in. To buy on another character, mail the crate to your main before you fill it.',
      tipLabel: 'Why not a cheaper crate?',
      tip: 'Green crates pay 10 Favor, and white crates pay 5. A white crate gets you only 55 Favor, which buys 1 pattern. The other cheap green crates need bolts or metal bars you would also have to buy, and this one only needs hides you already have.',
      bag: [[248702, 1], [4231, 2]],
    });
    S.push({
      id: 'camp', group: G2, rail: 'Hand in your crate', sub: '60 Favor',
      title: 'Hand in your crate, and buy 2 patterns', lead: 'You arrive with one sealed crate, and leave with two patterns.',
      do: [travel, `Give the sealed crate to ${cp.crates.n}. You get 10 Favor and 5 silver.`, `Your first crate also gives a Shipping Label. Right-click it to start its quest, and hand it to ${cp.crates.n} too. You get 50 Favor.`, `Buy the 2 patterns listed below from ${cp.lw.n}. They cost 30 Favor each, which uses all 60.`],
      buy: [BELT, GLOVES],
      warnLabel: 'Read the name',
      warn: `Every pattern uses the same picture, so go by the name. The picture turns red if your skill is too low, so at skill 75 both of these show in color. ${c.side === 'h' ? 'The gloves are easy to miss: they are on page 1, away from the other gloves on pages 4 to 6. ' : ''}A pattern binds to you when you buy it, so check the name first.`,
      tipLabel: "Why Brawler's?",
      tip: "It gives Agility, Strength and Stamina, and you use all three. Trapper's looks close, but it has Intellect instead of Strength, and you have no mana. Prowler's and Skulker's also suit a Rogue, but they need skill 150 or more.",
      whyLabel: 'Why these 2 first?',
      why: "You can use both right away at skill 75. The Brawler's Boots and Hood patterns would just sit in your bags until you have the skill for them.",
      where: person('Takes your crate', cp.crates, cp.zone) + person('Sells your patterns', cp.lw, cp.zone) + near,
      favorMath: 'Crate: <b>10</b><br>Shipping Label quest: <b>50</b><br>Total: <b>60</b>, enough for 2 patterns at 30 each.<br><span class="s">Bring your materials: the camp has no mailbox.</span>',
    });
    S.push(pieceStep(BELT, G2, 60));
    S.push(pieceStep(GLOVES, G2, 75));
    S.push({
      id: 'r5', group: G3, rail: 'Craft Fine Leather Belt', sub: '75-100', to: rBelt.b, make: rBelt.make,
      title: times('Craft Fine Leather Belt', rBelt), lead: 'This takes your skill to 100. Do it wherever you are, while you quest and skin.',
      do: [`Buy thread from ${cp.near.n} near the camp before you leave, or from ${c.shop.n}.`, 'Craft belts until your skill reaches 100.', 'Sell the belts to a vendor.'],
      why: 'This is the most leather you will spend, because belts start to miss skill points after 85. Your gear only needs skill 100, so you can stop there.',
      tipLabel: 'Skinning Medium Leather already?',
      tip: 'From skill 85, Gray Leather Boots also work: 4 Medium Leather, 2 Fine Thread and 1 Gray Dye each, about 15 crafts. Learn them from your Expert trainer.',
      where: near,
      bag: reag(rBelt),
    });
    S.push({
      id: 'favor2', group: G3, rail: 'Buy 6 more crates', sub: 'Near 85',
      title: 'Buy 6 more crates, and hand them all in', lead: 'It is the same crate as in step 9, just 6 of them. There is no rush: do this when your skill is close to 85.',
      do: ['At the auction house, buy 6 Waylaid Crate: Apprentice Fabrics.', 'Make or buy 12 more Cured Light Hide, because each crate uses 2. Do not use the ones you saved for your gear.', 'Fill all 6 the same way as before: right-click a crate, then click your Cured Light Hide.', `Go back to the camp, and give all 6 sealed crates to ${cp.crates.n}. You get 60 Favor and 30 silver.`, `Buy the 2 patterns listed below from ${cp.lw.n}. They cost 30 Favor each.`],
      buy: [BOOTS, HOOD],
      warnLabel: 'If money or hides are short',
      warn: 'At about 25 silver each, 6 crates cost about 1 gold 50 silver. You can split them: 3 crates pay for the Boots pattern, and 3 more pay for the Hood pattern, but that takes a second trip. Each crate also takes 20 Bolt of Linen Cloth instead of hides.',
      tipLabel: 'Looted a Waylaid Crate?',
      tip: 'Right-click it to read the label and see which kind it is. A green one counts as 1 of your 6, but it may ask for different materials. A white one pays half as much.',
      link: ['favor', 'Compare crate prices'],
      whyLabel: 'Why 6, and why wait until 85?',
      why: 'Each of these crates pays 10 Favor, and 2 patterns cost 60. The Shipping Label only pays once, so it does not help this time. At skill 85 you can learn the Boots pattern, so the trip pays off right away.',
      where: person('Takes your crates', cp.crates, cp.zone) + person('Sells your patterns', cp.lw, cp.zone),
      bag: [[248702, 6], [4231, 12, 'Make them: 1 Light Hide and 1 Salt each. Or buy them on the auction house']],
      favorMath: '6 crates at 10 each: <b>60</b><br>Enough for 2 patterns at 30 each.<br>You also get <b>30 silver</b> back.<br><span class="s">No Shipping Label this time: it only pays once.</span>',
    });
    S.push(pieceStep(BOOTS, G3, 85));
    S.push(pieceStep(HOOD, G3, 100));
    S.push({
      id: 'later', group: 'After skill 100', rail: 'Keep going', sub: 'Next',
      title: 'You are done with the level 20 gear', lead: 'Nothing on your level 20 list needs more skill. Next come your level 30 gear and the road to skill 225.',
      html: '<button class="btn primary" data-phase="g30">Show my level 30 gear</button> <button class="btn" data-phase="p2">Show me skill 100 to 225</button>',
    });
    S.forEach(s => { s.ph = 'p1'; });
    moreSteps(S);
    level30(S);
    return S;
  }
  const isDone = (s) => !!st.done[s.id] || (s.to && st.skill >= s.to);

  /* ---------- Past skill 100: only two places to visit, and the rest can be crafted anywhere ---------- */
  const place = p => p.z || city().name;
  const beastSkill = lv => (lv <= 10 ? 1 : lv <= 20 ? (lv - 10) * 10 : lv * 5);
  function gearRow(id, how) {
    const t = L.targets[id]; if (!t) return '';
    RF.regItem(t);
    const ready = st.skill >= t.learn && st.level >= (t.r || 1);
    return `<div class="lwgear" data-itemref="${id}">${RF.img(t.ic, 28, t.q >= 2 ? 'bq' + t.q : '')}<div class="grow"><div class="t q${t.q}">${esc(t.n)}${ready ? ' <span class="chip g">Ready</span>' : ''}</div><div class="s">Skill ${t.learn}, level ${t.r || 1}. ${esc(how)}</div></div></div>`;
  }
  function roadHtml(una, hah) {
    const c = city();
    const levelGap = Math.max(0, 35 - st.level);
    const stops = [
      ['100 to 150', c.e.n, c.name, 'Learn your recipes here as you reach them. No trip needed.', 'c100'],
      ['150', una.n, una.z, 'Learn the Expert rank, which lets you go past 150.', 'una1'],
      ['175', una.n, una.z, 'Learn Thick Armor Kit. Bring your materials on the first trip and you can skip this one.', 'una2'],
      ['200', hah.n, hah.z, `Learn the Artisan rank. You must be level 35${levelGap ? `, so ${levelGap} more level${levelGap > 1 ? 's' : ''} to go` : ''}.`, 'hah'],
    ];
    return `${st.skill < 100 ? `<div class="lwtip" style="display:flex;align-items:center;gap:12px;margin-top:0"><span class="grow">Your page still says My skill ${st.skill}. If you have reached 100 and made your 4 pieces, update it so the counts are right.</span><button class="btn" data-at100="1">I am at skill 100</button></div>` : ''}
      <div class="cap" style="margin:4px 0 6px">Where you need to go</div>
      <div class="lwstops">${stops.map(s => `<button class="lwstop" data-step="${s[4]}"><b>${esc(s[0])}</b><span class="grow"><i>${esc(s[1])}, ${esc(s[2])}</i>${esc(s[3])}</span></button>`).join('')}</div>
      <div class="lwtip"><b>Sell what you craft:</b> gear from these recipes pays well at a vendor. Barbaric Shoulders pay ${money(L.route.find(r => r.a === 155).sell)} each, and Nightscape Pants pay ${money(L.route.find(r => r.a === 210).sell)}. That pays for most of your thread and training.</div>
      <div class="lwtip"><b>First time on your account:</b> skill 150, 225 and 300 each give 1 Legacy point.</div>`;
  }
  function roadRight() {
    const c = camp(), spot2 = id => (spot(id) ? `, ${spot(id).toLowerCase()}` : '');
    const perks = RF.guide.lw.perks.map(p => `<div class="lwperk"><b>${esc(p[0])}</b> ${esc(p[1])}</div>`).join('');
    return box('Gear you unlock on the way', [
      gearRow(SKBELT, '20 silver from your Expert trainer. Needs a Tanning Rack.'),
      gearRow(5964, 'You craft these anyway, so keep one.'),
      gearRow(TUNIC, `30 Favor from ${c.lw.n}${spot2(252805)}.`),
      gearRow(SKGLOVES, `60 Favor from ${c.lw.n}${spot2(252837)}. Needs a Tanning Rack.`),
      gearRow(8176, '35 silver from your Artisan trainer.'),
    ].join('') + '<button class="btn sm" style="margin-top:6px" data-phase="g30">See all your level 30 gear</button>') + box('Legacy perks that help', perks);
  }
  function skinHtml() {
    const c = city(), Z = L.skinZones;
    let band = Z.find(b => b.lo === st.band);
    if (!band) band = Z.find(b => st.level + 2 >= b.lo && st.level + 2 <= b.hi) || (st.level < 26 ? Z[0] : Z[Z.length - 1]);
    const gives = band.gives.map(g => `<span class="lwmatname" data-mat="${g[0]}" data-tip="Click for where to get it">${icon(g[0], 20)}<span class="${qc(g[0])}">${esc(nm(g[0]))}</span> <b>${g[1]}%</b></span>`).join('');
    const zones = band[c.side].map(z => {
      const zep = c.side === 'h' && z.base.n === "Grom'gol" ? ' Zeppelin from Orgrimmar or Tirisfal Glades.' : '';
      return `<div class="lwperson"><div class="grow"><div class="t">${esc(z.z)}</div><div class="s">Fly to ${esc(z.base.n)}.${zep} ${z.beasts.map(b => `${esc(b[0])} ${b[1]}-${b[2]}`).join(', ')}</div></div>${mapBtn(z.base.ll, z.base.n)}</div>`;
    }).join('');
    return `<div class="cap" style="margin:10px 0 6px">Pick the level of beast to skin</div>
      <div class="lwchips">${Z.map(b => `<button class="btn sm ${b === band ? 'on' : ''}" data-band="${b.lo}">${b.lo}-${b.hi}</button>`).join('')}</div>
      <div class="lwbox" style="margin-top:8px"><div class="cap">Level ${band.lo} to ${band.hi} beasts give</div><div class="lwicons">${gives}</div><div class="s" style="margin-top:6px">You need Skinning ${beastSkill(band.lo)} to ${beastSkill(band.hi)}. Percentages and beast names are Classic data.</div></div>
      <div class="lwbox"><div class="cap">Where to find them</div>${zones}</div>`;
  }
  function moreSteps(S) {
    const c = city(), cp = camp(), P = L.people, side = c.side;
    const una = side === 'h' ? P.una : P.telonis;
    const hah = side === 'h' ? P.hahrana : P.drakk;
    const uShop = side === 'h' ? P.mahu : P.saenorion;
    const hShop = side === 'h' ? P.jangdor : P.nioma;
    const patt = side === 'h' ? P.werg : P.porter;
    /* Recipes from skill 120 to 150 have been seen at Karolek, Arthur Moore and Simon Tanner, and Classic teaches them at Una and Telonis. */
    const mid = { org: c.e, uc: c.e, sw: c.e, tb: una, da: una, if: P.simon }[cityKey()];
    const r = a => L.route.find(x => x.a === a);
    const sellLine = (x, rest) => `Sell ${rest ? 'the rest' : 'them'} to a vendor for ${money(x.sell)} each, or list them on the auction house.`;
    const craft = (ph, group, a, o) => {
      const x = r(a);
      return Object.assign({ ph, group, id: 'c' + a, rail: `Craft ${nm(x.make)}`, sub: `${x.a}-${x.b}`, to: x.b, make: x.make, title: timesLeft(`Craft ${nm(x.make)}`, x), lead: `This takes your skill from ${x.a} to ${x.b}.`, bag: x.reag.map(([id, q]) => [id, q * craftsLeft(x)]) }, o);
    };
    const learnIt = a => learnRow(nm(r(a).make), r(a).cost, r(a).make);
    const trainer = (role, p) => person(role, p, place(p));
    const shop = trainer('Sells thread and dye', c.shop);
    const G0 = 'Before you start', G1 = place(mid) === c.name ? `Skill 100 to 150: stay in ${c.name}` : 'Skill 100 to 150', G2 = `Skill 150 to 175: ${una.z}`, G3 = 'Skill 175 to 200', G4 = `Level 35: ${hah.z}`;
    const toUna = side === 'h' ? 'Fly to Thunder Bluff. If you have never been there, fly to Camp Taurajo, run west into Mulgore, then north to Thunder Bluff.' : 'Go to Darnassus. Take the boat from Auberdine to Rut\'theran Village, then use the portal.';
    const toHah = side === 'h' ? 'Fly to Freewind Post in Thousand Needles. Follow the main road north-west past Camp E\'thok, until you enter Feralas. Camp Mojache is just inside.' : 'Fly to Southshore in Hillsbrad, then ride north-east into The Hinterlands. Aerie Peak is on the western side.';
    S.push({
      ph: 'p2', group: G0, id: 'road', rail: 'Your road to 225', sub: 'Start',
      title: 'Your road from skill 100 to 225', lead: 'You only need to visit 2 new trainers. Everything else you can craft wherever you are.',
      html: roadHtml(una, hah), rightHtml: roadRight(),
    });
    S.push({
      ph: 'p2', group: G0, id: 'skin2', rail: 'Skin the right beasts', sub: `You: ${st.level}`,
      title: 'Skin the right beasts', lead: 'A beast\'s level decides which leather it gives, so pick beasts by level. Everything you skin can also be bought on the auction house.',
      do: [`Your Skinning stops at 150 until you learn the Expert rank from ${c.skin.n} in ${c.name}. You need Skinning 125 and level 20.`, 'Above level 20, a beast needs Skinning of 5 times its level. A level 33 beast needs 165.', st.level > 25 ? 'Keep every hide you find. You are past level 25, so beasts no longer give you Pristine Leather.' : 'Keep every hide you find, and every Pristine Leather.'],
      html: skinHtml(),
      where: trainer('Teaches Skinning ranks', c.skin),
    });
    S.push(craft('p2', G1, 100, {
      do: [`Talk to ${c.e.n}, and learn Gray Leather Boots.`, `Buy Fine Thread and Gray Dye from ${c.shop.n}.`, 'Craft boots until your skill reaches 113.', sellLine(r(100))],
      why: 'Each pair uses only 4 Medium Leather, which is the least you can spend per skill point up to here.',
      where: trainer('Teaches the recipe', c.e) + shop, learn: learnIt(100),
    }));
    S.push(craft('p2', G1, 113, {
      do: [`Talk to ${c.e.n}, and learn Dark Leather Cloak.`, 'Craft cloaks until your skill reaches 120.', sellLine(r(113))],
      why: 'Boots start to miss skill points once you pass 112. Cloaks use twice the leather, but still give a point almost every time here.',
      where: trainer('Teaches the recipe', c.e) + shop, learn: learnIt(113),
    }));
    S.push(craft('p2', G1, 120, {
      do: [`Talk to ${mid.n}, and learn Hillman's Leather Gloves.`, 'Craft gloves until your skill reaches 125.', sellLine(r(120))],
      tipLabel: 'Have spare Medium Hides?', tip: `Hillman's Shoulders use 4 Medium Leather and 1 Cured Medium Hide instead of 14 Medium Leather. ${mid.n} teaches those too.`,
      where: trainer('Teaches the recipe', mid) + shop, learn: learnIt(120),
    }));
    S.push(craft('p2', G1, 125, {
      do: [`Talk to ${mid.n}, and learn Heavy Leather.`, 'Turn Medium Leather into Heavy Leather until your skill reaches 130.', 'Keep the Heavy Leather. You use it in the next step.'],
      why: 'This is close to free. You get skill points, and you keep what you make.',
      where: trainer('Teaches the recipe', mid), learn: learnIt(125),
    }));
    S.push(craft('p2', G1, 130, {
      do: [`Talk to ${mid.n}, and learn Hillman's Cloak and Cured Heavy Hide. You need the hides later.`, 'Craft cloaks until your skill reaches 150.', 'Stop at 150. You cannot go higher until you rank up.', sellLine(r(130))],
      tipLabel: 'Short of Heavy Leather?', tip: `Hillman's Leather Gloves still work up to here. They use 14 Medium Leather and 4 Fine Thread.`,
      why: 'Heavy Armor Kit uses the same leather, but a cloak pays more at a vendor.',
      where: trainer('Teaches the recipes', mid) + shop, learn: learnIt(130) + learnRow('Cured Heavy Hide', 500, 4236),
    }));
    S.push({
      ph: 'p2', group: G2, id: 'una1', rail: `Rank up with ${una.n}`, sub: 'At 150', to: 151,
      title: 'Rank up at skill 150', lead: 'Your skill stops at 150 until you do this. You can do it any time from skill 125, and you must be level 20.',
      do: [toUna, `Talk to ${una.n}, and learn Expert Leatherworking.`, 'Learn Barbaric Shoulders while you are there.'],
      warnLabel: 'The title is misleading', warn: `${una.n} is called an Artisan Leatherworker, but teaches the Expert rank. The Artisan rank comes from ${hah.n} in ${hah.z}.`,
      tipLabel: 'Save a trip', tip: `Bring what you need for skill 150 to 175 (see Everything to buy). You can then stay here, craft to 175 beside ${una.n}, and learn Thick Armor Kit without coming back.`,
      where: trainer('Teaches the rank', una) + trainer('Sells thread and dye', uShop),
      learn: learnRow('Expert Leatherworking', 5000, null, 'About 50 silver. One guide lists this') + learnRow('Barbaric Shoulders', r(155).cost, 5964),
    });
    S.push(craft('p2', G2, 150, {
      id: 'c150', title: timesLeft('Craft Hillman\'s Cloak', r(150)),
      do: ['Keep crafting cloaks until your skill reaches 155.', sellLine(r(150))],
      why: 'Cloaks still cost less leather per skill point than Barbaric Shoulders up to here, and they use no hides.',
    }));
    S.push(craft('p2', G2, 155, {
      do: ['Make Cured Heavy Hide as you need it: 1 Heavy Hide and 3 Salt each.', 'Craft shoulders until your skill reaches 175.', `Keep 1 to wear if it beats your current shoulders. ${sellLine(r(155), 1)}`],
      tipLabel: 'Short of hides?', tip: `Dusky Leather Armor gives skill at the same rate, with no hide: 10 Heavy Leather, 1 Shadow Oil and 2 Fine Thread. ${una.n} teaches it for 25 silver.`,
      why: 'From 155, cloaks waste too much leather. These pay back a lot at a vendor, which covers the hides.',
    }));
    S.push({
      ph: 'p2', group: G3, id: 'una2', rail: `Learn from ${una.n}`, sub: 'At 175', to: 176,
      title: 'Learn your Thick Leather recipes at skill 175', lead: `Skip the trip if you stayed beside ${una.n} and crafted there.`,
      do: [`Talk to ${una.n}, and learn Thick Armor Kit.`, 'Learn Thick Leather too, if you have Heavy Leather to spare.'],
      tipLabel: 'What Thick Leather does', tip: 'It turns 6 Heavy Leather into 1 Thick Leather. That is costly, but it lets you keep going before you can skin Thick Leather yourself, and it gives skill points up to about 178.',
      where: trainer('Teaches the recipes', una) + trainer('Sells thread', uShop),
      learn: learnIt(175) + learnRow('Thick Leather', 2800, 4304),
    });
    S.push(craft('p2', G3, 175, {
      do: ['Buy Silken Thread.', 'Craft kits until your skill reaches 200.', sellLine(r(175))],
      tipLabel: 'Where the leather comes from', tip: 'Beasts of level 36 and up start to give Thick Leather. Open Skin the right beasts to see where.',
      why: `This is the last recipe ${una.n} teaches that gives you points cheaply. Nightscape recipes come from ${hah.n}.`,
      where: shop,
    }));
    S.push({
      ph: 'p2', group: G3, id: 'p' + SKGLOVES, rail: 'Make Skulker\'s Gloves', sub: 'At 175', piece: SKGLOVES, at: 175, lvl: 35,
      title: `Make the ${L.targets[SKGLOVES].n}`, lead: 'You can do this from skill 175. You can wear it from level 35.',
      do: [`Hand in 60 Favor worth of crates at the trade camp. 3 Journeyman green crates pay 20 each.`, `Buy the pattern below from ${cp.lw.n}, and right-click it to learn it.`, 'Light a campfire, and place a Tanning Rack by it.', 'Craft 1, and put it on.'],
      buy: [SKGLOVES],
      warnLabel: 'Hard to get', warn: 'Pristine Leather and Pristine Hide will likely come from the auction house. No source has published how Pristine Hide drops yet.',
      link: ['favor', 'Compare crate prices'],
      why: RF.guide.lw.items[SKGLOVES],
      where: person('Sells the pattern', cp.lw, cp.zone),
      bag: L.targets[SKGLOVES].reag.map(([m, n]) => [m, n]),
      gear: (L.targets[SKGLOVES].x || []).filter(l => /^\+|Armor$/.test(l)).join(', '),
    });
    S.push({
      ph: 'p2', group: G4, id: 'hah', rail: `Rank up with ${hah.n}`, sub: 'At 200', to: 201,
      title: `Get the Artisan rank in ${hah.z}`, lead: 'You need skill 200 and level 35. Bring your materials, because you can do the next 2 steps right here.',
      do: [toHah, 'Talk to the flight master there, so you can fly back next time.', `Talk to ${hah.n}, and learn Artisan Leatherworking and Nightscape Headband.`],
      warn: st.level < 35 ? `You are level ${st.level}. The rank needs level 35, so come here once you reach it. Your skill can wait at 200 until then.` : '',
      warnLabel: 'Level check',
      where: trainer('Teaches the rank', hah) + trainer('Sells thread', hShop),
      learn: learnRow('Artisan Leatherworking', 0, null, 'No source lists the fee yet, so bring a few gold') + learnIt(200),
      bag: [[4304, Math.ceil(craftsLeft(r(200))) * 5], [4291, Math.ceil(craftsLeft(r(200))) * 2]],
    });
    S.push(craft('p2', G4, 200, {
      do: [`Stay beside ${hah.n}, and craft headbands until your skill reaches 210.`, `Keep 1 to wear at level 36. ${sellLine(r(200), 1)}`],
      why: `${hah.n} teaches your next recipe at 210. Crafting here means you learn it straight away, with no second trip.`,
      where: trainer('Teaches the recipe', hah),
    }));
    S.push(craft('p2', G4, 210, {
      do: [`Learn Nightscape Pants and Nightscape Boots from ${hah.n}. You use the boots at 230, and this saves a trip.`, 'Craft pants until your skill reaches 225.', sellLine(r(210))],
      why: 'The most leather in this part of the guide, but also the best vendor price, so most of the money comes back.',
      where: trainer('Teaches the recipes', hah) + trainer('Sells thread', hShop),
      learn: learnIt(210) + learnRow('Nightscape Boots', r(230).cost, r(230).make),
    }));
    const P3a = 'Skill 225 to 235', P3b = 'Skill 235 to 300';
    const where2 = who => (who === P.werg ? `at The Bulwark, the Horde camp on the road from Tirisfal Glades into the Western Plaguelands (${who.z} ${who.x}, ${who.y})` : who === P.porter ? `at Chillwind Camp (${who.z} ${who.x}, ${who.y})` : who === P.qia ? `in Everlook (${who.z} ${who.x}, ${who.y})` : `in ${who.z}, at ${who.x}, ${who.y}`);
    S.push(craft('p3', P3a, 225, {
      do: ['Keep crafting Nightscape Pants until your skill reaches 230.', sellLine(r(225))],
      why: `The Artisan rank you already have lets you go past 225, so there is no trip here. Skipping Rugged Armor Kit saves another visit to ${hah.n}.`,
    }));
    S.push(craft('p3', P3a, 230, {
      do: ['Craft Nightscape Boots until your skill reaches 235.', sellLine(r(230))],
      why: 'Boots are still sure to give a point at 230, when pants have started to miss.',
      where: shop,
    }));
    const pattStep = (a, who, name, price, extra) => craft('p3', P3b, a, Object.assign({
      do: [`Buy Pattern: ${name} from ${who.n} ${where2(who)}. It costs ${price}, and vendors only hold a few at a time.`, 'Right-click it in your bags to learn it.', `Craft until your skill reaches ${r(a).b}.`, sellLine(r(a))],
      where: person('Sells the pattern', who, who.z),
    }, extra));
    S.push(pattStep(235, patt, 'Wicked Leather Gauntlets', '1 gold 20 silver', {
      tipLabel: 'Where the leather comes from', tip: 'Beasts of level 46 and up start to give Rugged Leather, and from level 51 it is the main drop. Open Skin the right beasts to see where.',
      why: 'These stay sure to give a point all the way to 255, and they use the least Rugged Leather.',
      rightExtra: gearRow(15057, `Same vendor. Worth buying the pattern while you are there.`),
    }));
    S.push(pattStep(258, P.qia, 'Frostsaber Boots', '1 gold 60 silver', {
      tipLabel: 'Frostsaber Leather', tip: 'It comes from skinning frostsabers in Winterspring, the same zone as this vendor, so farm it while you are there.',
      why: 'Half the Rugged Leather of the next-best recipe. This step follows foreverchanges.pro\'s route.',
    }));
    S.push(pattStep(279, P.zannok, 'Heavy Scorpid Helm', '2 gold 50 silver', {
      tipLabel: 'Rather not farm scales?', tip: `Pattern: Runic Leather Headband from ${P.jase.n} in ${P.jase.z} works from skill 265, with 14 Rugged Leather, 10 Runecloth and 1 Rune Thread. It takes more leather, but no hides or scales.`,
      why: 'This step follows foreverchanges.pro\'s route. Buy Cured Rugged Hide on the auction house: making it needs Refined Deeprock Salt, which no vendor sells.',
    }));
    S.push({
      ph: 'p3', group: 'Skill 300', id: 'end', rail: 'What skill 300 gives you', sub: 'Done',
      title: 'What skill 300 gives you', lead: 'Your first character to reach 300 earns a Legacy point for the account.',
      do: [`${camp().lw.n} sells Leatherworking Certification for 1000 Favor${spot(271626) ? ` (${spot(271626).toLowerCase()})` : ''}. It gives your whole account the title the Leatherworker.`, 'Open The gear you get, and pick your level 50 or 60 list to see which crafted pieces are worth making.'],
      rightHtml: box('Patterns to buy along the way', [
        gearRow(252535, `60 Favor from ${camp().lw.n}${spot(252849) ? `, ${spot(252849).toLowerCase()}` : ''}.`),
        gearRow(252469, `90 Favor from ${camp().lw.n}${spot(252861) ? `, ${spot(252861).toLowerCase()}` : ''}.`),
        gearRow(252474, `90 Favor from ${camp().lw.n}${spot(252873) ? `, ${spot(252873).toLowerCase()}` : ''}.`),
        gearRow(15057, `Sold by ${patt.n}.`),
      ].join('')),
    });
  }

  /* ---------- Level 30 gear: one piece per slot, the best a level 30 rogue with skill 150 can make ---------- */
  const G30 = [SKBELT, TOUGH, DCLOAK, BSHOULD, TUNIC, LEGGUARDS, BRACERS];
  /* The shopping list covers the next batch that is not made yet: the trainer pieces, then the Favor pieces, then the bracers. */
  const G30_TRIPS = [[SKBELT, TOUGH, DCLOAK, BSHOULD], [TUNIC, LEGGUARDS], [BRACERS]];
  const STAT_ORDER = ['Agility', 'Strength', 'Stamina', 'Spirit', 'Intellect', 'Armor'];
  const plusStats = id => (L.targets[id].x || []).filter(l => /^\+/.test(l)).sort((a, b) => STAT_ORDER.indexOf(a.split(' ').pop()) - STAT_ORDER.indexOf(b.split(' ').pop())).join(', ');
  const statMap = id => { const m = {}; (L.targets[id].x || []).forEach(l => { const r = /^\+(\d+) (\w+)$/.exec(l); if (r) m[r[2]] = +r[1]; }); return m; };
  const gainOver = (from, to) => { const a = statMap(from), b = statMap(to); return Object.keys(b).filter(k => b[k] > (a[k] || 0)).sort((x, y) => STAT_ORDER.indexOf(x) - STAT_ORDER.indexOf(y)).map(k => `+${b[k] - (a[k] || 0)} ${k}`).join(', '); };
  function g30Html() {
    const una = city().side === 'h' ? L.people.una : L.people.telonis;
    const note = {
      [SKBELT]: `${gainOver(BELT, SKBELT)} more than your Brawler's belt. Needs a rack.`,
      [TOUGH]: `${gainOver(GLOVES, TOUGH)} more than your Brawler's gloves.`,
      [DCLOAK]: `${plusStats(DCLOAK)}. You already know the recipe.`,
      [BSHOULD]: `${plusStats(BSHOULD)}. Only ${una.n} in ${una.z} teaches it.`,
      [TUNIC]: `${plusStats(TUNIC)}. 30 Favor and 6 Pristine Leather.`,
      [LEGGUARDS]: `${plusStats(LEGGUARDS)}. 30 Favor, 8 Pristine Leather and a rack.`,
      [BRACERS]: `${plusStats(BRACERS)}. Look on the auction house first.`,
    };
    const row = id => {
      const t = L.targets[id];
      RF.regItem(t);
      const chip = made(id) ? '<span class="chip">Made</span>' : st.skill >= t.learn && st.level >= (t.r || 1) ? '<span class="chip g">Ready</span>' : '';
      return `<button class="lwstop lwg30" data-step="p${id}"><b>${esc(t.s)}</b>${RF.img(t.ic, 28, 'bq' + t.q)}<span class="grow"><i class="q${t.q}" data-itemref="${id}">${esc(t.n)}</i>${esc(note[id])}</span>${chip}</button>`;
    };
    return `${st.skill < 150 ? `<div class="lwtip" style="margin-top:0">Your page says My skill ${st.skill}. Set it to your real skill at the top, so the Ready marks are right.</div>` : ''}
      <div class="cap" style="margin:8px 0 4px">One piece per slot, in the order to make them</div><div class="lwstops">${G30.map(row).join('')}</div>
      <p class="s" style="margin:10px 0 0;line-height:1.5">Head and feet: keep your Brawler's Hood and Boots. Nothing you can make beats them yet. The Brawler's Leather Helm would, but nobody has found its pattern. Dungeon drops and quest rewards are on the <a class="link" href="#/gear">Gear &amp; stats</a> page.</p>`;
  }
  function g30Right() {
    const trip = G30_TRIPS.find(t => t.some(id => !made(id)));
    if (!trip) return box('Shopping list', '<div class="s">Nothing left. Every slot is made.</div>');
    const todo = trip.filter(id => !made(id));
    const need = {};
    const add = (m, n) => { need[m] = (need[m] || 0) + n; };
    todo.forEach(id => L.targets[id].reag.forEach(([m, n]) => add(m, n)));
    /* One rack per crafting session. The belt's rack is the one the rack step already bought. */
    if (todo.some(id => L.targets[id].station === 279941 && !(id === SKBELT && st.done.rack))) add(279941, 1);
    let lines, total;
    if (trip[0] === SKBELT) {
      const fees = [SKBELT, TOUGH, BSHOULD].filter(id => !made(id) && !(id === BSHOULD && st.done.g30una)).map(id => [L.targets[id].n, L.targets[id].pat.cost || 0]);
      const recipes = fees.reduce((n, f) => n + f[1], 0);
      const rack = made(SKBELT) || st.done.rack ? 0 : 1996;
      const rank = st.skill <= 150 && !st.done.g30una ? 5000 : 0;
      total = recipes + rack + rank;
      lines = [
        recipes ? `<div><b>${money(recipes)}</b> recipes: ${esc(fees.map(f => f[0].replace(' Leather', '')).join(', '))}</div>` : '',
        rack ? `<div><b>${money(rack)}</b> for 1 Tanning Rack, the cheapest on November 7</div>` : '',
        rank ? '<div><b>About 50s</b> for the Expert rank, from one guide</div>' : '',
      ].join('');
    } else if (trip[0] === TUNIC) {
      const crates = st.done.g30favor ? 0 : todo.length * 3;
      if (crates) { add(248702, crates); add(4231, crates * 2); }
      total = crates * 2500;
      lines = crates ? `<div><b>About ${money(total)}</b> for ${crates} Waylaid Crates. Each pays ${money(500)} back when you hand it in.</div>` : '';
    } else {
      total = 0;
      lines = '<div>A finished pair, or the pattern and its materials, from the auction house. Nobody has reported a price yet.</div>';
    }
    const rows = Object.keys(need).map(Number).sort((a, b) => need[b] - need[a]).map(m => bagRow(m, need[m])).join('');
    return box(`Shopping list: ${todo.map(id => L.targets[id].n.replace(' Leather', '')).join(', ')}`, rows)
      + (lines ? box(total ? `Money: about ${money(total)}` : 'Money', `<div class="lwmoneyl">${lines}${total ? '<div class="s">Plus what the auction house charges for the materials.</div>' : ''}</div>`) : '');
  }
  function level30(S) {
    const c = city(), cp = camp(), P = L.people, side = c.side;
    const una = side === 'h' ? P.una : P.telonis, uShop = side === 'h' ? P.mahu : P.saenorion;
    const mid = { org: c.e, uc: c.e, sw: c.e, tb: una, da: una, if: P.simon }[cityKey()];
    const T = id => L.targets[id];
    const trainer = (role, p) => person(role, p, place(p));
    const piece = (id, group, o) => Object.assign({ ph: 'g30', group, id: 'p' + id, rail: `Make ${T(id).n.replace(' Leather', '')}`, sub: T(id).s, piece: id, at: T(id).learn, lvl: T(id).r, title: `Make the ${T(id).n}`, why: RF.guide.lw.items[id], bag: T(id).reag.map(([m, n]) => [m, n]), gear: (T(id).x || []).filter(l => /^\+|Armor$/.test(l)).join(', ') }, o);
    const learnPat = id => `Right-click ${T(id).pat.n} in your bags to learn it.`;
    const rackLine = 'Light your campfire, and place a Tanning Rack next to it. If the game will not let you, step outside the city first.';
    const rackBag = [279941, 1, 'Auction house. 1 per crafting session'];
    const toUna = side === 'h' ? 'Fly to Thunder Bluff. If you have never been there, fly to Camp Taurajo, run west into Mulgore, then north to Thunder Bluff.' : 'Go to Darnassus. Take the boat from Auberdine to Rut\'theran Village, then use the portal.';
    const travel = side === 'h' ? 'Fly to the Crossroads. The camp is about a 30-second run west of the flight master.' : 'Fly to Lakeshire, then run west to Three Corners, about a minute away.';
    const A = 'Start here', B = place(mid) === c.name ? `Today, in ${c.name}` : 'Today', C = `One trip: ${una.z}`, E = 'Merchant\'s Favor', D = 'Wrist';
    S.push({
      ph: 'g30', group: A, id: 'g30', rail: 'What you can make', sub: 'Start',
      title: 'Your level 30 gear', lead: 'The best piece you can make for each slot at level 30 with skill 150. One piece per slot, so make every one. Click a piece to see its steps.',
      html: g30Html(), rightHtml: g30Right(),
    });
    S.push({
      ph: 'g30', group: B, id: 'rack', rail: 'Buy a Tanning Rack', sub: '20 silver',
      title: 'Buy 1 finished Tanning Rack', lead: 'Your belt can only be made beside a rack, and towns do not have one. A finished rack costs far less than the blueprint.',
      do: ['At the auction house, search for "Tanning Rack". Buy 1 Tanning Rack, not Blueprint: Tanning Rack.', 'Buy 1 Simple Wood from a general goods vendor.', 'Open Cooking, and make 1 Basic Campfire Kit. Learn Cooking from a Cooking trainer first if you have not.', 'Keep the rack and the kit in your bags until your materials are ready.'],
      warnLabel: 'Have everything ready first', warn: 'A rack lasts 15 minutes and is used up when you place it. You need skill 140 to place one, and placing it starts a 1-hour cooldown on camp objects.',
      tipLabel: 'Another leatherworker nearby?', tip: 'Anyone at the fire can craft beside a placed rack, so you can use theirs for free.',
      whyLabel: 'Why not the blueprint, or Happy Camper?', why: `On November 7 the blueprint cost ${money(37000)} and a finished rack cost ${money(1996)}, so the blueprint costs as much as 18 racks. You need 1 rack per crafting session, so buy racks. Older guides name a vendor called Happy Camper who sold the blueprint for 15 silver. Warcraft Wiki lists him as a test-server vendor, and he was not at the Orgrimmar spot when checked in game on November 7.`,
      bag: [[279941, 1, `Auction house. The cheapest was ${money(1996)} on November 7`], [4470, 1, 'Any general goods vendor, 38 copper']],
    });
    S.push(piece(SKBELT, B, {
      lead: `${gainOver(BELT, SKBELT)} more than your Brawler's belt. The best belt you can make at level 30.`,
      do: [`Talk to ${c.e.n}, and learn Skulker's Leather Belt for ${money(T(SKBELT).pat.cost)}.`, 'Make 2 Cured Medium Hide if you have none: 1 Medium Hide and 1 Salt each.', rackLine, 'Craft 1, and put it on.'],
      tipLabel: `If ${c.e.n} does not list it`, tip: side === 'h' ? `${P.arthur.n} in Undercity was seen teaching it. foreverchanges.pro counts 14 trainers for this recipe, so ${c.e.n} very likely does too.` : 'Aayndia Floralwind in Ashenvale was seen teaching it. foreverchanges.pro counts 14 trainers for this recipe, so your city\'s Expert trainer very likely does too.',
      where: trainer('Teaches the recipe', c.e),
    }));
    S.push(piece(TOUGH, B, {
      lead: `${gainOver(GLOVES, TOUGH)} more than your Brawler's gloves. No rack and no Favor.`,
      do: [`Talk to ${mid.n}, and learn Toughened Leather Gloves for ${money(T(TOUGH).pat.cost)}.`, 'Make 2 Cured Medium Hide if you have none.', 'Buy 2 Elixir of Lesser Defense and 2 Spider\'s Silk on the auction house.', 'Craft 1, and put it on.'],
      warnLabel: 'Check the price first', warn: 'Skulker\'s Leather Gloves replace these at level 35, so do not overpay for the elixirs and silk.',
      where: trainer('Teaches the recipe', mid),
    }));
    S.push(piece(DCLOAK, B, {
      lead: `A cheap cloak: ${plusStats(DCLOAK)}. Skip it if your cloak is already better.`,
      do: ['If you kept a cloak from skill 113 to 120, put it on, and you are done.', 'If not, craft 1. You learned the recipe on the way to skill 120.'],
    }));
    S.push({
      ph: 'g30', group: C, id: 'g30una', rail: `Learn from ${una.n}`, sub: 'One trip',
      title: `Rank up with ${una.n}, and learn Barbaric Shoulders`, lead: 'You need this trip for the Expert rank anyway, so you only make it once.',
      do: [toUna, `Talk to ${una.n}, and learn Expert Leatherworking. Your skill cannot go past 150 without it.`, `Learn Barbaric Shoulders for ${money(T(BSHOULD).pat.cost)}.`, `Buy Fine Thread from ${uShop.n} if you are short.`],
      tipLabel: 'Save a trip', tip: `Bring the materials for the shoulders, and craft them beside ${una.n}.`,
      whyLabel: 'How sure is this?', why: `Classic lists only ${una.n} and ${side === 'h' ? P.telonis.n : P.una.n} as teachers of Barbaric Shoulders. Nobody has reported ${una.n}'s recipe list in Forever yet.`,
      where: trainer('Teaches the rank and recipe', una) + trainer('Sells thread', uShop),
      learn: learnRow('Expert Leatherworking', 5000, null, 'About 50 silver. One guide lists this') + learnRow('Barbaric Shoulders', T(BSHOULD).pat.cost, BSHOULD),
    });
    S.push(piece(BSHOULD, C, {
      lead: `Only ${una.n} in ${una.z} teaches this recipe${c.e.n !== una.n ? `, so ${c.e.n} will not list it` : ''}. It needs no other recipe first, just skill 150.`,
      do: [`Learn Barbaric Shoulders from ${una.n} in ${una.z}, for ${money(T(BSHOULD).pat.cost)}. The step before this one has the trip, and the Expert rank you get there.`, 'Make 1 Cured Heavy Hide: 1 Heavy Hide and 3 Salt.', 'Craft 1, and put it on.'],
      tipLabel: 'Cheap to wear', tip: 'You craft about 20 of these on your way to skill 175 anyway, so wearing one costs nothing extra.',
      where: trainer('Teaches the recipe', una),
    }));
    S.push({
      ph: 'g30', group: E, id: 'g30favor', rail: 'Get patterns with Favor', sub: '6 crates',
      title: 'Get the Tunic and Legguards patterns', lead: `Both cost 30 Merchant's Favor from ${cp.lw.n}. 3 crates pay for each one.`,
      do: ['At the auction house, buy 6 Waylaid Crate: Apprentice Fabrics.', 'Fill each crate: right-click it, then click your Cured Light Hide. Each uses 2. 20 Bolt of Linen Cloth works too.', `${travel} Give the sealed crates to ${cp.crates.n}. Each pays 10 Favor and 5 silver.`, `Buy both patterns from ${cp.lw.n}. They cost 30 Favor each.`],
      buy: [TUNIC, LEGGUARDS],
      warnLabel: 'Read the name', warn: 'Every pattern uses the same picture, and a pattern binds to you when you buy it.',
      link: ['favor', 'Compare crate prices'],
      where: person('Takes your crates', cp.crates, cp.zone) + person('Sells your patterns', cp.lw, cp.zone),
      bag: [[248702, 6, 'Auction house, about 25 silver each. 3 per pattern'], [4231, 12, 'Make them: 1 Light Hide and 1 Salt each. 2 per crate']],
      favorMath: '<b>6 crates</b>, about 1 gold 50 silver, and you get 30 silver back.',
    });
    S.push(piece(TUNIC, E, {
      lead: `${plusStats(TUNIC)}. The best chest you can make at level 30.`,
      do: ['Buy 6 Pristine Leather and 6 Shadowgem on the auction house. You are past level 25, so you cannot skin Pristine Leather any more.', 'Make 3 Cured Medium Hide if you have none.', learnPat(TUNIC), 'Craft 1, and put it on.'],
    }));
    S.push(piece(LEGGUARDS, E, {
      lead: `${plusStats(LEGGUARDS)}. The best legs you can make at level 30.`,
      do: ['Buy 8 Pristine Leather and 8 Shadowgem on the auction house.', 'Make 4 Cured Medium Hide if you have none.', learnPat(LEGGUARDS), rackLine, 'Craft 1, and put it on.'],
      bag: T(LEGGUARDS).reag.map(([m, n]) => [m, n]).concat([rackBag]),
    }));
    const braV = side === 'h' ? P.joseph : P.saenorion;
    S.push(piece(BRACERS, D, {
      lead: 'The best wrist piece you can make. Its pattern was missing at the vendor, so start at the auction house.',
      do: ['At the auction house, search for "Barbaric Bracers". If a finished pair is listed, buy it, put it on, and you are done.', `If not, buy ${T(BRACERS).pat.n} there, and right-click it to learn it.`, 'Buy 4 Small Lustrous Pearl, 4 Large Fang and 1 Raptor Hide. Make 2 Cured Heavy Hide: 1 Heavy Hide and 3 Salt each.', rackLine, 'Craft 1, and put it on.'],
      warnLabel: 'Not at the vendor', warn: side === 'h' ? `${braV.n} in Undercity had no pattern when you checked on November 7. In Classic the vendor holds only 1 at a time and gets another later, so look again when you pass through.` : `A player who opened ${braV.n}'s window in Forever did not see the pattern. In Classic the vendor holds only 1 at a time and gets another later.`,
      tipLabel: 'Why the auction house has it', tip: 'Neither the pattern nor the bracers bind when you buy them, so other players can sell both.',
      bag: T(BRACERS).reag.map(([m, n]) => [m, n]).concat([rackBag]),
      where: person('Sold the pattern in Classic', braV, braV.z),
    }));
  }

  /* ---------- Step by step ---------- */
  function stepsTab() {
    const all = steps();
    if (!PHASES.some(p => p[0] === st.phase)) st.phase = (all.find(s => s.id === st.step) || all[0]).ph;
    const S = all.filter(s => s.ph === st.phase);
    const cur = S.find(s => s.id === st.step) || S[0];
    const idx = S.indexOf(cur);
    let groups = '', last = '';
    S.forEach((s, i) => {
      if (s.group !== last) { groups += `<div class="cap lwgroup">${esc(s.group)}</div>`; last = s.group; }
      const done = isDone(s);
      const ready = s.piece && !done && st.skill >= s.at && st.level >= (s.lvl || 1);
      groups += `<button class="lwrail ${s.id === cur.id ? 'on' : ''} ${done ? 'done' : ''}" data-step="${s.id}"><span class="lwdot">${done ? '&#10003;' : i + 1}</span><span class="grow"><b>${esc(s.rail)}</b></span>${ready ? '<span class="chip g">Ready</span>' : `<i>${esc(s.sub)}</i>`}</button>`;
    });
    const phases = `<div class="lwphases">${PHASES.map(p => `<button class="${p[0] === st.phase ? 'on' : ''}" data-phase="${p[0]}">${esc(p[1])}</button>`).join('')}</div>`;
    const right = [
      cur.rightHtml || '',
      cur.rightExtra ? box('Also from this vendor', cur.rightExtra) : '',
      cur.where ? box('Where to go', cur.where) : '',
      cur.learn ? box('Learn there', cur.learn) : '',
      cur.bag && cur.bag.some(b => b[1] > 0) ? box('Have this in your bags', cur.bag.filter(b => b[1] > 0).map(([id, q, note]) => bagRow(id, q, note)).join('')) : '',
      cur.skinList ? skinBox() : '',
      cur.favorMath ? box('How the Favor adds up', `<div class="dim" style="font-size:12.5px;line-height:1.6">${cur.favorMath}</div>`) : '',
      cur.gear ? box('What it gives you', `<div class="dim" style="font-size:12.5px">${esc(cur.gear)}</div>`) : '',
    ].join('');
    const body = `${cur.do ? `<ol class="lwdo">${cur.do.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}
      ${cur.html || ''}
      ${cur.buy ? buyBox(cur.buy) : ''}
      ${cur.warn ? `<div class="note"><b>${esc(cur.warnLabel || 'Deadline')}:</b> ${esc(cur.warn)}</div>` : ''}
      ${cur.tip ? `<div class="lwtip"><b>${esc(cur.tipLabel || 'If it goes differently')}:</b> ${esc(cur.tip)}</div>` : ''}
      ${cur.link ? `<a class="link" style="font-size:12.5px;display:inline-block;margin:6px 0" data-go="${cur.link[0]}">${esc(cur.link[1])}</a>` : ''}
      ${cur.why ? `<details class="lwwhy"><summary>${esc(cur.whyLabel || 'Why this step?')}</summary><p>${esc(cur.why)}</p></details>` : ''}`;
    return `<div class="lwlayout"><nav class="lwnav">${phases}${groups}<a class="link lwchecks" data-checks="1">How this was checked</a></nav><section class="lwcard">
      <div class="lwhead"><span class="chip">Step ${idx + 1} of ${S.length}</span><h2>${esc(cur.title)}</h2><p>${esc(cur.lead)}</p></div>
      <div class="lwcols ${right ? '' : 'one'}"><div>${body}
        <div class="lwfoot">${idx > 0 ? `<button class="btn" data-step="${S[idx - 1].id}">Back</button>` : ''}${!cur.to ? `<button class="btn ${st.done[cur.id] ? 'on' : ''}" data-tick="${cur.id}">${st.done[cur.id] ? 'Done' : 'Mark as done'}</button>` : ''}${idx < S.length - 1 ? `<button class="btn primary" data-step="${S[idx + 1].id}">Next step</button>` : ''}</div>
      </div>${right ? `<div>${right}</div>` : ''}</div></section></div>`;
  }
  function skinBox() {
    const c = city();
    const save = [2934, 2318, 783, 2319, 4232, 249427];
    // A few from each level band, so the list covers the whole climb
    const list = [];
    [[10, 12], [13, 14], [15, 16], [17, 18], [19, 20], [21, 25]].forEach(([a, b]) => list.push(...c.beasts.filter(x => x[1] >= a && x[1] <= b).slice(0, 2)));
    return box('Save these', `<div class="lwicons">${save.map(id => `<span class="lwmatname" data-mat="${id}" data-tip="Click for where to get it">${icon(id, 24)}<span class="${qc(id)}">${esc(nm(id))}</span></span>`).join('')}</div>`)
      + box(`Skin these in ${c.zone}`, list.map(b => `<div class="lwbeast"><span>${esc(b[0])}</span><span class="mut">level ${b[1]}-${b[2]}, Skinning ${beastSkill(b[1])}</span></div>`).join('') + '<div class="s" style="margin-top:5px">Beast lists are Classic data. Beasts of level 10 or lower need Skinning 1.</div>');
  }

  /* ---------- The gear you get ---------- */
  function pieceCard(id, opt) {
    const t = L.targets[id]; if (!t) return '';
    RF.regItem(t);
    const stats = (t.x || []).filter(l => /^\+|^Equip/.test(l)).map(l => l.replace('Equip: ', '')).join(', ');
    const p = t.pat;
    const how = p.k === 'favor' ? `${p.n}. ${p.favor} Favor from ${camp().lw.n}${spot(p.id) ? `, ${spot(p.id).toLowerCase()}` : ''}` : p.k === 'trainer' ? `Trainer, ${money(p.cost)}` : p.k === 'quest' ? `Quest reward: ${(p.q || []).map(q => q.n).join(', ')}` : p.k === 'vendor' ? `Sold by ${(p.vend || []).filter(v => v.s === city().side || v.s === 'n' || !v.s).map(v => `${v.n}, ${v.z}`).join('; ') || 'a vendor'}` : p.k === 'drop' ? 'Drops in the world or a dungeon' : 'Nobody knows yet';
    const ok = p.k === 'favor' || p.k === 'trainer';
    const on = st.sel.includes(id);
    return `<div class="lwpiece"><div class="lwpiecehead" data-itemref="${id}">${RF.img(t.ic, 36, t.q >= 2 ? 'bq' + t.q : '')}<div class="grow"><div class="t q${t.q}">${esc(t.n)}</div><div class="s">${esc(stats)}</div></div></div>
      <div class="lwfacts"><div><i>Skill</i><b>${t.learn}</b></div><div><i>Wear at level</i><b>${t.r || 1}</b></div><div class="wide"><i>Pattern</i><b class="${ok ? '' : 'lwbad'}">${esc(how)}</b></div></div>
      ${RF.guide.lw.items[id] ? `<p class="dim" style="font-size:12px;line-height:1.45;margin:6px 0">${esc(RF.guide.lw.items[id])}</p>` : ''}
      <div class="lwminis">${t.reag.map(([m, n]) => `<span class="lwmat" data-mat="${m}" data-tip="${esc(nm(m))}: click for where to get it">${icon(m, 20)}<b>${n}</b></span>`).join('')}<label class="lwsel"><input type="checkbox" data-sel="${id}" ${on ? 'checked' : ''}> On my shopping list</label></div></div>`;
  }
  function listOptions() {
    const specs = [['combat', 'Combat'], ['assassination', 'Assassination'], ['subtlety', 'Subtlety']];
    const modes = [['pvp', 'PvP'], ['pve', 'PvE'], ['lvl', 'Leveling']];
    const out = [];
    specs.forEach(s => modes.forEach(m => [20, 30, 40, 50, 60].forEach(l => out.push([`${s[0]}.${m[0]}.${l}`, `${s[1]} ${m[1]}, level ${l}`]))));
    return out;
  }
  function piecesTab() {
    const [sp, mo, lv] = st.list.split('.');
    const g = G.specs[sp] && G.specs[sp][mo] && G.specs[sp][mo][lv];
    const other = st.list !== 'combat.pvp.20';
    const rows = [];
    /* One piece per slot: the highest-scoring crafted piece whose pattern someone has found. */
    if (g) Object.keys(g).forEach(slot => { const r = (g[slot].top || []).find(x => L.targets[x[1]] && L.targets[x[1]].pat.k !== 'unknown'); if (r) rows.push(r[1]); });
    const uniq = [...new Set(rows)];
    return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap"><label class="dim" style="font-size:12px">Show crafted gear for <select class="input" id="lwlist" style="height:26px;margin-left:6px">${listOptions().map(o => `<option value="${o[0]}" ${o[0] === st.list ? 'selected' : ''}>${esc(o[1])}</option>`).join('')}</select></label></div>
      ${other ? `<div class="cap" style="margin-bottom:6px">The best piece you can make for each slot</div><div class="lwgrid3">${uniq.map(i => pieceCard(i)).join('') || '<div class="mut">No crafted pieces on this list.</div>'}</div>` : `
      <div class="cap" style="margin-bottom:6px">The four to make</div><div class="lwgrid4">${[HOOD, BOOTS, GLOVES, BELT].map(i => pieceCard(i)).join('')}</div>
      <div class="cap" style="margin:14px 0 6px">Not available yet: nobody has found these patterns</div><div class="lwgrid4">${OPTIONAL.map(i => pieceCard(i)).join('')}</div>`}`;
  }

  /* ---------- Everything to buy ---------- */
  const BUY_TO = [100, 150, 175, 200, 225, 300];
  const buyTarget = () => (BUY_TO.includes(st.target) && st.target > st.skill ? st.target : BUY_TO.find(t => t > st.skill) || 300);
  function plan(target) {
    const need = {}, made = {};
    const add = (o, k, v) => { o[k] = (o[k] || 0) + v; };
    let train = 0, back = 0;
    const firstAt = {}, paid = {};
    L.route.forEach(s => { if (firstAt[s.spell] === undefined) firstAt[s.spell] = s.a; });
    L.route.forEach(s => {
      if (s.a >= target) return;
      const k = craftsLeft(s, target);
      if (k <= 0) return;
      s.reag.forEach(([id, c]) => add(need, id, c * k));
      if (s.keep && s.make !== 4231) add(made, s.make, s.cnt * k);
      else if (!s.keep) back += (s.sell || 0) * s.cnt * k;
      if (s.cost && !paid[s.spell] && st.skill <= firstAt[s.spell]) { train += s.cost; paid[s.spell] = 1; }
    });
    const hidesIn = i => (L.targets[i].reag.find(r => r[0] === 4231) || [0, 0])[1];
    const known = st.sel.filter(i => L.targets[i] && L.targets[i].learn <= target);
    const todo = known.filter(i => !st.done['p' + i]);
    const doneMain = MAIN.filter(i => st.done['p' + i]);
    todo.forEach(i => L.targets[i].reag.forEach(([id, c]) => { if (id !== 4231) add(need, id, c); }));
    let favor = 0, spent = 0, gold = 0;
    todo.forEach(i => { const p = L.targets[i].pat; if (p.k === 'favor') favor += p.favor; if (p.k === 'trainer' && p.cost) train += p.cost; });
    doneMain.forEach(i => { spent += L.targets[i].pat.favor || 0; });
    /* The first crate and its quest pay 60 Favor. Every later crate pays 10. */
    const firstDone = !!(st.done.crate || st.done.camp);
    const first = favor > 0 && !firstDone ? 1 : 0;
    const later = st.done.favor2 || !favor ? 0 : Math.ceil(Math.max(0, favor + spent - 60) / 10);
    /* Step 4 makes 9 Cured Light Hide. Anything you have used comes off that, and anything more has to be made. */
    const hideRoute = L.route.find(r => r.make === 4231);
    const stock = Math.max(0, hideRoute.crafts - doneMain.reduce((n, i) => n + hidesIn(i), 0) - (firstDone ? 2 : 0));
    const hideNeed = todo.reduce((n, i) => n + hidesIn(i), 0) + (first + later) * 2;
    if (hideNeed > stock) add(need, 4231, hideNeed - stock);
    if (first + later) add(need, 248702, first + later);
    Object.keys(made).forEach(id => { if (need[id]) need[id] = Math.max(0, need[id] - made[id]); });
    [[4231, 783, 1, null], [4233, 4232, 1, 'Cured Medium Hide'], [4236, 4235, 3, 'Cured Heavy Hide']].forEach(([cured, hide, salt, rec]) => {
      if (need[cured]) { add(need, hide, need[cured]); add(need, 4289, need[cured] * salt); if (rec && st.skill < 150) train += L.sub[rec].cost; delete need[cured]; }
    });
    add(need, 7005, st.skill === 0 ? 1 : 0);
    Object.entries(need).forEach(([id, c]) => { if (VENDOR.has(+id)) gold += price(+id) * Math.ceil(c); });
    return { need, favor, train, gold, later, back, count: todo.length, patterns: todo.map(i => L.targets[i].pat).filter(x => x.k === 'favor').map(x => x.n.replace('Pattern: ', '')) };
  }
  function buyTab() {
    const target = buyTarget();
    const p = plan(target);
    const c = city();
    const rows = f => Object.keys(p.need).map(Number).filter(i => Math.ceil(p.need[i]) > 0 && f(i)).sort((a, b) => p.need[b] - p.need[a]);
    const row = i => `<div class="lwbag" data-mat="${i}" data-tip="Click for where to get it">${icon(i, 28)}<b class="lwn">${Math.ceil(p.need[i])}</b><div class="grow"><div class="${qc(i)}" style="font-weight:500">${esc(nm(i))}</div><div class="s">${esc(VENDOR.has(i) ? `${money(price(i))} each` : (RF.guide.lw.src[i] || 'Auction house'))}</div></div></div>`;
    const v = rows(i => VENDOR.has(i)), s = rows(i => SKIN.has(i)), h = rows(i => !VENDOR.has(i) && !SKIN.has(i));
    const ranks = [];
    if (st.skill < 50 && target > 50) ranks.push('about 5 silver for Journeyman');
    if (st.skill <= 150 && target > 150) ranks.push('about 50 silver for Expert');
    if (st.skill <= 200 && target > 200) ranks.push('a fee nobody has published for Artisan');
    return `<div class="lwbuybar"><span class="dim">Show what I need to reach skill</span> <span class="lwchips">${BUY_TO.filter(t => t > st.skill).map(t => `<button class="btn sm ${t === target ? 'on' : ''}" data-target="${t}">${t}</button>`).join('')}</span></div>
      <p class="dim" style="font-size:13px;margin:0 0 10px">Everything you still need from skill <b>${st.skill}</b> to skill <b>${target}</b>${p.count ? `, plus the ${p.count} piece${p.count > 1 ? 's' : ''} on your list` : ''}. Counts are averages, so get a few extra. Change the pieces in <a class="link" data-go="pieces">The gear you get</a>.</p>
      <div class="lwgrid3" style="align-items:start">
        <div class="lwbox"><div class="cap">Skin it, or buy it on the auction house</div>${s.map(row).join('') || '<div class="s">Nothing left.</div>'}</div>
        <div class="lwbox"><div class="cap">Buy from ${esc(c.shop.n)}: ${money(p.gold)}</div>${person('Supplies vendor', c.shop, c.name)}${v.map(row).join('') || '<div class="s">Nothing left.</div>'}</div>
        <div>${h.length ? `<div class="lwbox"><div class="cap">Harder to get</div>${h.map(row).join('')}</div>` : ''}
          <div class="lwbox"><div class="cap">Other costs</div>
            ${p.favor ? `<div class="lwbag"><b class="lwn">${p.favor}</b><div class="grow"><div style="font-weight:500">Merchant's Favor</div><div class="s">For these patterns: ${esc(p.patterns.join(', '))}. ${p.later ? `That takes ${p.later} crates on top of your first one, which this list counts. ` : ''}<a class="link" data-go="favor">Compare crates</a></div></div></div>` : ''}
            <div class="lwbag"><b class="lwn lwmoney">${money(p.train)}</b><div class="grow"><div style="font-weight:500">Recipes at the trainer</div><div class="s">${ranks.length ? `Plus ${esc(ranks.join(', and '))}.` : 'No rank fees on this stretch.'}</div></div></div>
            ${p.back ? `<div class="lwbag"><b class="lwn lwmoney">${money(Math.round(p.back / 100) * 100)}</b><div class="grow"><div style="font-weight:500">What you get back</div><div class="s">About this much if you sell everything you craft to a vendor. The auction house may pay more.</div></div></div>` : ''}
          </div></div>
      </div>
      <a class="link" style="font-size:12px" data-checks="1">How this was checked</a>`;
  }
  function matModal(id) {
    const info = (RF.guide.lw.mats || {})[id];
    const c = city();
    const v = (L.vendors[id] || []).filter(r => r.s === c.side || r.s === 'n');
    const cl = L.classic[id] || {};
    const tbl = (title, rows) => (rows && rows.length ? `<div class="cap" style="margin:10px 0 5px">${esc(title)}</div>${rows.map(r => `<div class="row tk-a"><div class="grow"><div class="t">${esc(r[0])}</div><div class="s">Level ${r[1]}</div></div><div class="end">${r[2]}%</div></div>`).join('')}` : '');
    const inCity = v.filter(r => r.z === c.name).sort((a, b) => (b.n === c.shop.n) - (a.n === c.shop.n));
    const seen = v.filter(r => r.fv && r.z !== c.name);
    const list = inCity.concat(seen).slice(0, 12);
    const body = `${info ? `<p class="dim" style="font-size:13px;line-height:1.55;margin:0 0 8px">${esc(info)}</p>` : ''}
      ${list.length ? `<div class="cap" style="margin:10px 0 5px">Vendors: ${money(list[0].p)} each</div>${list.map(r => `<div class="row tk-${r.z === c.name ? 'g' : 'n'}"><div class="grow"><div class="t">${esc(r.n)}${r.fv ? ' <span class="chip g">Seen</span>' : ''}</div><div class="s">${esc(r.sub ? r.sub + ', ' : '')}${esc(r.z)} ${r.x}, ${r.y}</div></div><div class="end">${mapBtn(r.ll, r.n)}</div></div>`).join('')}` : ''}
      ${tbl('Pick Pocket from (Classic data)', cl.pp)}${tbl('Skinned from (Classic data)', cl.skin)}${tbl('Drops from (Classic data)', cl.drop)}`;
    RF.modal(nm(id), body);
  }
  function checksModal() {
    RF.modal('How this was checked', `<p class="dim" style="font-size:12.5px;margin:0 0 10px">Green comes from the game's data. Blue was worked out here. Amber is partial, or from Classic. Red is not known by anyone yet. Client build ${esc(L.build)}.</p>${RF.guide.lw.checks.map(c => `<div class="row tk-${c[0]}" style="align-items:flex-start;padding-top:7px;padding-bottom:7px"><div class="grow" style="white-space:normal"><div class="t">${esc(c[1])}</div><div class="dim" style="font-size:12.5px">${esc(c[2])}</div></div></div>`).join('')}`);
  }

  /* ---------- Merchant's Favor ---------- */
  function favorTab() {
    const c = camp();
    const pay = { 'Apprentice white': [5, 250], 'Apprentice green': [10, 500], 'Journeyman white': [10, 500], 'Journeyman green': [20, 1000] };
    const fills = {};
    RF.guide.lw.crates.forEach(x => { fills['Apprentice ' + x.kind] = x.a; fills['Journeyman ' + x.kind] = x.j; });
    const P = RF.guide.lw.cratePrices;
    const rows = P.rows.map(r => { const [fav, back] = pay[r[0].split(' ')[0] + ' ' + r[2]]; return { n: r[0], price: r[1], paid: r[2], fav, back, per: (r[1] - back) / fav, fill: fills[r[0]] }; }).sort((a, b) => a.per - b.per);
    return `<div class="lwgrid2" style="align-items:start;grid-template-columns:minmax(0,5fr) minmax(0,7fr)"><div>
        <div class="why" style="margin-top:0"><b>The short version</b>You buy gear patterns with Favor, and you only earn it by handing in crates. You do not need it all at once. Your first crate and its quest pay 60 Favor, which buys 2 patterns. The last 2 patterns take 6 more of the same crate. <a class="link" data-step="crate">See the steps</a></div>
        <div class="lwbox"><div class="cap">The trade camp: ${esc(c.faction)}</div><p class="s" style="margin:0 0 6px">${esc(c.zone)} ${c.x}, ${c.y}: ${esc(c.place)}. ${esc(c.pvp)} There is no mailbox, so bring your materials. A guide says an auctioneer or a banker stands here too, depending on the time of day.</p>${person('Takes your crates', c.crates, c.zone)}${person('Sells Leatherworking patterns', c.lw, c.zone)}${person('Sells thread and Salt nearby', c.near, c.zone)}</div>
        <div class="lwbox"><div class="cap">Good to know</div><ul class="lwlist"><li>A crate needs level 10, and you can fill it anywhere.</li><li>You only need one line of the list a crate shows, and the whole amount must be in one stack.</li><li>Sealed crates bind to you, and Favor stays on the character who hands them in.</li><li>Monsters of about level 7 to 26 drop crates rarely. Keep any you loot, because they save you money.</li><li>The Shipping Label pays 50 Favor once per character.</li><li>A crate only pays Favor and a little money. No recipe needs reputation with the camp.</li><li>${esc(c.lw.n)} sells about 80 patterns. For your level 20 list, you want these Brawler's Leather patterns: Belt, Gloves, Boots and Hood.${c.lw.n === 'Pawani' ? ' Belt and Gloves are on page 1, and Hood and Boots are on page 3.' : ''}</li></ul></div>
      </div><div class="lwbox"><div class="cap">Crate prices from your auction house</div>
        <p class="s" style="margin:0 0 7px">Prices from your screenshot on ${esc(P.date)}. They change often, so check again before you buy. "Cost per Favor" takes off the money the crate pays back, but not what you put inside it. That is why the cheapest crates at the top are not always the cheapest overall.</p>
        <table class="ranktbl lwcrates"><thead><tr><th>Crate</th><th>Price</th><th>Pays</th><th>Cost per Favor</th><th>Fill it with one of these</th></tr></thead><tbody>${rows.map(r => `<tr class="${r.n === 'Apprentice Fabrics' ? 'lwpick' : ''}"><td style="white-space:nowrap" class="${r.paid === 'green' ? 'q2' : ''}">${esc(r.n)}${r.n === 'Apprentice Fabrics' ? ' <span class="chip g">Buy this first</span>' : ''}</td><td style="white-space:nowrap">${money(r.price)}</td><td style="white-space:nowrap">${r.fav} Favor, ${money(r.back)}</td><td style="white-space:nowrap">${money(Math.round(r.per))}</td><td>${esc(r.fill || '')}</td></tr>`).join('')}</tbody></table>
      </div></div>`;
  }

  /* ---------- Frame ---------- */
  function bar() {
    const groups = [['h', 'Horde'], ['a', 'Alliance']].map(g => `<optgroup label="${g[1]}">${Object.entries(L.cities).filter(([, c]) => c.side === g[0]).map(([k, c]) => `<option value="${k}" ${city() === c ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</optgroup>`).join('');
    const ph = PHASES.some(p => p[0] === st.phase) ? st.phase : st.skill >= 225 ? 'p3' : st.skill >= 100 ? 'p2' : 'p1';
    const P = L.people, h = city().side === 'h', una = h ? P.una : P.telonis, hah = h ? P.hahrana : P.drakk;
    let goal, pct;
    if (ph === 'p1') {
      const left = Math.max(0, 100 - st.skill);
      goal = `<b>Goal: skill 100, then make 4 pieces of gear.</b> ${left ? `${left} skill to go.` : 'Skill 100 reached.'}`;
      pct = Math.min(100, st.skill);
    } else if (ph === 'p2') {
      const next = st.skill < 150 ? `Next trip: ${una.n} at skill 150.` : st.skill < 175 ? `Next trip: ${una.n} at skill 175.` : st.skill < 200 ? `Next trip: ${hah.n} at skill 200 and level 35.` : 'No more trips before 225.';
      goal = `<b>Goal: skill 225.</b> ${esc(next)}`;
      pct = Math.max(0, Math.min(100, (st.skill - 100) / 1.25));
    } else if (ph === 'g30') {
      const n = G30.filter(made).length;
      goal = `<b>Goal: your level 30 gear.</b> ${n} of ${G30.length} slots done.`;
      pct = n / G30.length * 100;
    } else {
      goal = `<b>Goal: skill 300.</b> ${Math.max(0, 300 - st.skill)} skill to go.`;
      pct = Math.max(0, Math.min(100, (st.skill - 225) / 0.75));
    }
    return `<div class="lwbar"><div class="lwgoal2">${goal}</div>
      <div class="lwprog"><i style="width:${pct}%"></i></div>
      <label class="dim lwfield">My level <input class="input" id="lwlevel" type="number" min="1" max="60" value="${st.level}"></label>
      <label class="dim lwfield">My skill <input class="input" id="lwskill" type="number" min="0" max="300" value="${st.skill}"></label>
      <label class="dim lwfield">My city <select class="input" id="lwcity">${groups}</select></label></div>`;
  }
  function draw(keep) {
    if (!host) return;
    const body = st.sub === 'pieces' ? piecesTab() : st.sub === 'buy' ? buyTab() : st.sub === 'favor' ? favorTab() : stepsTab();
    const old = host.querySelector('#lwscroll');
    const pos = keep && old ? old.scrollTop : 0;
    host.innerHTML = `<div class="pane col" style="margin:0 16px 14px;flex:1;min-height:0">${bar()}<div class="tabs" id="lwtabs">${SUBS.map(s => `<button data-v="${s[0]}" class="${st.sub === s[0] ? 'on' : ''}">${esc(s[1])}</button>`).join('')}</div><div class="ab-body ${st.sub === 'steps' ? 'lwsteps' : ''}" id="lwscroll">${body}</div></div>`;
    host.querySelector('#lwscroll').scrollTop = pos;
  }
  function onClick(e) {
    const t = e.target.closest('#lwtabs button');
    if (t) { st.sub = t.dataset.v; save(); draw(); return; }
    const go = e.target.closest('[data-go]');
    if (go) { st.sub = go.dataset.go; save(); draw(); return; }
    const phs = e.target.closest('[data-phase]');
    if (phs) {
      st.phase = phs.dataset.phase; st.sub = 'steps';
      const S = steps().filter(x => x.ph === st.phase);
      st.step = (S.find(x => x.id === st.step) || S.find(x => !isDone(x)) || S[0]).id;
      save(); draw(); return;
    }
    if (e.target.closest('[data-at100]')) {
      st.skill = Math.max(st.skill, 100);
      steps().filter(x => x.ph === 'p1' && !x.to).forEach(x => { st.done[x.id] = true; });
      save(); draw(true); return;
    }
    const band = e.target.closest('[data-band]');
    if (band) { st.band = +band.dataset.band; save(); draw(true); return; }
    const tgt = e.target.closest('[data-target]');
    if (tgt) { st.target = +tgt.dataset.target; save(); draw(true); return; }
    const stp = e.target.closest('[data-step]');
    if (stp) {
      st.step = stp.dataset.step; st.sub = 'steps';
      const s = steps().find(x => x.id === st.step);
      if (s) st.phase = s.ph;
      save(); draw(); return;
    }
    const tick = e.target.closest('[data-tick]');
    if (tick) { st.done[tick.dataset.tick] = !st.done[tick.dataset.tick]; save(); draw(true); return; }
    if (e.target.closest('[data-checks]')) { checksModal(); return; }
    const mat = e.target.closest('[data-mat]');
    if (mat) matModal(+mat.dataset.mat);
  }
  function onChange(e) {
    const el = e.target;
    if (el.id === 'lwskill') {
      st.skill = Math.max(0, Math.min(300, +el.value || 0));
      if (st.phase === 'g30') { save(); draw(true); return; }
      const all = steps();
      const next = all.find(s => s.to && st.skill < s.to) || all.find(s => s.piece && !st.done[s.id]) || all[all.length - 1];
      st.step = next.id; st.phase = next.ph;
      save(); draw(); return;
    }
    if (el.id === 'lwlevel') { st.level = Math.max(1, Math.min(60, +el.value || 1)); st.band = 0; save(); draw(true); return; }
    if (el.id === 'lwcity') { st.city = el.value; save(); draw(true); return; }
    if (el.id === 'lwlist') { st.list = el.value; save(); draw(); return; }
    if (el.dataset.sel) {
      const i = +el.dataset.sel, n = st.sel.indexOf(i);
      if (n >= 0) st.sel.splice(n, 1); else st.sel.push(i);
      save();
    }
  }
  RF.lw = {
    async render(el) {
      [L, G] = await RF.loadAll(['lw', 'gear']);
      if (st.fillP1) { steps().filter(x => x.ph === 'p1' && !x.to).forEach(x => { st.done[x.id] = true; }); delete st.fillP1; save(); }
      if (host !== el) { el.addEventListener('click', onClick); el.addEventListener('change', onChange); }
      host = el;
      draw();
    },
  };
})();
