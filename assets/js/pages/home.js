/* Overview: a one-screen console. Shows where you stand at your level and links into the guide. */
(function () {
  const esc = RF.esc;
  const SPEC = {
    Combat: { tk: 'a', one: 'Sinister Strike, Blade Flurry, Adrenaline Rush. Reliable, simple, and the only cleave.', icon: 'ability_backstab' },
    Assassination: { tk: 'r', one: 'Mutilate, poisons, Seal Fate. The highest single-target pressure, weak to poison-immune targets.', icon: 'ability_rogue_eviscerate' },
    Subtlety: { tk: 'v', one: 'Hemorrhage, bleeds, Death Mark, Preparation. Busiest rotation, strongest in long PvP fights.', icon: 'ability_stealth' },
  };
  const NEXT = [
    [1, 'Learn your basics', 'Stealth, Sinister Strike and Eviscerate are your whole kit.', '#/abilities/stealth'],
    [10, 'Talents begin', 'Sap, Sprint and Slice and Dice arrive. Your first spec choice.', '#/talents'],
    [18, 'Poised and Ambush', 'A cheaper opener from full Energy.', '#/abilities/poised'],
    [20, 'Do the Poison quest', 'The Poisons skill is a big power gain.', '#/abilities/poisons'],
    [24, 'Shank', 'Forever\'s new Energy tool. Use it on cooldown.', '#/abilities/shank'],
    [26, 'Cheap Shot', 'Your stun opener. PvP starts to feel different here.', '#/abilities/cheap-shot'],
    [30, 'Kidney Shot', 'Your main stun finisher, and row 5 talents.', '#/abilities/kidney-shot'],
    [34, 'Blind', 'Your best emergency tool. Buy Blinding Powder.', '#/abilities/blind'],
    [40, 'Mount, dual spec, capstones', 'Dual Specialization opens. Mutilate, Death Mark or Adrenaline Rush in reach.', '#/talents'],
    [50, 'Bridge gear', 'Sunken Temple and Zul\'Farrak drop upgrades that carry you to 60.', '#/gear'],
    [60, 'Level cap', 'Reach 8% hit and 6.5% expertise, then Agility.', '#/gear'],
  ];

  /* A note for Targar's new owner. It opens on the first visit, and the Welcome note button opens it again. */
  const WELCOME_KEY = 'rf_welcome_seen';
  const GUIDE = [
    ['g', '#/gear', 'Gear and stats', 'Best in slot gear for every level milestone, with the reason behind each pick.'],
    ['r', '#/abilities', 'Abilities', 'Every rogue ability with tips, and short clips for most of them.'],
    ['v', '#/talents', 'Talents and macros', 'Builds for each spec, and macros you can copy straight into the game.'],
    ['r', '#/matchups', 'Class matchups', 'What each class has, and how to beat it.'],
    ['g', '#/map', 'World map and dungeons', 'Quests, NPCs and routes on the real game map, plus dungeon maps with bosses and loot.'],
    ['a', '#/codex/leatherworking', 'Leatherworking', 'Crafting Targar\'s gear step by step. Type Targar\'s current skill into My skill at the top of that page, and the guide picks up from there.'],
  ];
  function openWelcome() {
    try { localStorage.setItem(WELCOME_KEY, '1'); } catch (e) { }
    RF.modal('Welcome to Targar', `<div class="welcome">
      <p class="lead">Thank you for buying Targar! I hope you have as much fun with Targar as I did.</p>
      <p class="dim">I built this site while leveling Targar in WoW Forever. Now it is yours, to use as a map for the road ahead. Inside you will find:</p>
      <div class="list">${GUIDE.map(g => `<a class="row click tk-${g[0]}" href="${g[1]}" data-act="close"><div class="grow"><div class="t">${esc(g[2])}</div><div class="s">${esc(g[3])}</div></div></a>`).join('')}</div>
      <p class="dim">Click the level pill at the top right to set your level, spec and faction, and the whole site adjusts to you. Most of the data is read from the WoW Forever game client, and anything that might be out of date is marked.</p>
      <p class="lead">Enjoy the game, and good luck out there!</p>
      <div class="foot"><button class="btn primary" data-act="close">Let's go</button></div></div>`, { w: 600 });
  }

  RF.pages.home = {
    async enter(view) {
      const [abilities, dungeons] = await RF.loadAll(['abilities', 'dungeons']);
      const p = RF.prefs, lv = p.level;
      const known = abilities.filter(a => (a.ranks || []).some(r => r.lv && r.lv <= lv));
      const next = NEXT.filter(n => n[0] > lv).slice(0, 2);
      const up = abilities.filter(a => (a.ranks || []).some(r => r.lv && r.lv > lv && r.lv <= lv + 6)).slice(0, 5);
      const dgs = dungeons.filter(d => d.kind === 'dungeon' && !d.pending && d.levels && lv >= d.levels[0] - 2 && lv <= d.levels[1] + 1 && (p.faction === 'any' || !d.faction || d.faction === p.faction)).slice(0, 5);
      view.innerHTML = `<div class="head"><div><h1>Overview</h1><p>A personal rogue guide for World of Warcraft: Forever, written for any race or faction, tuned to the level you set.</p></div><button class="btn" id="homeWelcome" style="margin-left:auto">Welcome note</button></div>
      <div class="home">
        <div class="col" style="gap:12px">
          <div class="hero">
            <div class="cap" style="color:#ff8d96">Your rogue</div>
            <h2 style="margin:4px 0 2px">${p.spec}, level ${lv}</h2>
            <p class="dim" style="max-width:520px">${SPEC[p.spec].one}</p>
            <div style="margin:12px 0 4px"><input type="range" min="1" max="60" value="${lv}" class="slider" id="homeLv"></div>
            <div class="grid3" style="gap:6px;margin-top:8px">
              <div class="stat"><b>${known.length}</b><span>abilities known</span></div>
              <div class="stat"><b>${lv >= 10 ? lv - 9 : 0}</b><span>talent points</span></div>
              <div class="stat"><b>${dgs.length}</b><span>dungeons at this level</span></div>
            </div>
            <div class="seg" id="homeSpec" style="margin-top:10px">${Object.keys(SPEC).map(s => `<button class="${p.spec === s ? 'on' : ''}" data-v="${s}">${s}</button>`).join('')}</div>
            <div class="seg" id="homeFac" style="margin:10px 0 0 6px">${[['any', 'Any'], ['Alliance', 'Alliance'], ['Horde', 'Horde']].map(s => `<button class="${p.faction === s[0] ? 'on' : ''}" data-v="${s[0]}">${s[1]}</button>`).join('')}</div>
          </div>
          <div class="pane col" style="padding:11px 12px;flex:1;min-height:0">
            <div class="cap" style="margin-bottom:8px">What to do next</div>
            <div class="scroll" style="flex:1">
              ${next.map(n => `<a class="row click tk-r" href="${n[3]}"><div class="grow"><div class="t">${esc(n[1])}</div><div class="s">${esc(n[2])}</div></div><div class="end">Level ${n[0]}</div></a>`).join('') || `<a class="row click tk-g" href="#/gear"><div class="grow"><div class="t">You are at the cap</div><div class="s">Gear and matchups are where you grow now.</div></div></a>`}
              ${up.map(a => `<a class="row click tk-a" href="#/abilities/${a.id}">${RF.img(a.icon, 24)}<div class="grow"><div class="t">${esc(a.name)}</div><div class="s">Next rank or new ability soon</div></div></a>`).join('')}
            </div>
          </div>
        </div>
        <div class="pane col" style="padding:11px 12px">
          <div class="cap" style="margin-bottom:8px">The guide</div>
          <div class="scroll" style="flex:1">
            ${[['abilities', 'Abilities', `All ${abilities.length}, with tips, reasons and clips`, 'ability_rogue_eviscerate', 'r'],
          ['talents', 'Talents and builds', 'Interactive trees and recommended builds', 'ability_rogue_deadlybrew', 'v'],
          ['macro', 'Macro', 'Big-picture decisions, and in-game macros', 'inv_misc_note_01', 'a'],
          ['matchups', 'Class matchups', 'What each class has, and how to beat it', 'ability_kick', 'r'],
          ['gear', 'Gear and stats', 'Best in slot by level, with reasons', 'inv_sword_27', 'g'],
          ['codex', 'Race, professions, more', 'What else you need to know', 'trade_brewpoison', 'n']].map(x => `<a class="row click tk-${x[4]}" href="#/${x[0]}">${RF.img(x[3], 28)}<div class="grow"><div class="t">${x[1]}</div><div class="s">${x[2]}</div></div></a>`).join('')}
            <div class="cap" style="margin:12px 0 8px">The world</div>
            <a class="row click tk-g" href="#/map">${RF.img('inv_misc_map_01', 28)}<div class="grow"><div class="t">World map</div><div class="s">Real in-game terrain, caves, NPCs, quests, routes</div></div></a>
            <a class="row click tk-g" href="#/dungeons">${RF.img('inv_misc_spyglass_01', 28)}<div class="grow"><div class="t">Dungeons and raids</div><div class="s">${dungeons.length} instances with maps, bosses, loot, quests</div></div></a>
          </div>
        </div>
        <div class="pane col" style="padding:11px 12px">
          <div class="cap" style="margin-bottom:8px">Dungeons for level ${lv}</div>
          <div class="scroll" style="flex:1">
            ${dgs.map(d => `<a class="row click tk-${d.status === 'new' ? 'v' : 'n'}" href="#/dungeons/${d.id}"><div class="grow"><div class="t">${esc(d.name)}</div><div class="s">${esc(d.zone || '')}</div></div><div class="end">${d.levels[0]}-${d.levels[1]}</div></a>`).join('') || '<p class="mut" style="font-size:12px">No dungeons in this range. Quest for a while, or check the map for zones.</p>'}
            <div class="cap" style="margin:12px 0 8px">Data status</div>
            <div class="row tk-g"><div class="grow"><div class="t">Spells and talents</div></div><span class="end good">Live client</span></div>
            <div class="row tk-g"><div class="grow"><div class="t">World map</div></div><span class="end good">Client terrain</span></div>
            <div class="row tk-a"><div class="grow"><div class="t">Boss drop chances</div></div><span class="end warn">Classic rates</span></div>
            <div class="row tk-a"><div class="grow"><div class="t">New item stats</div></div><span class="end warn">Partly hidden</span></div>
            <a class="link" style="font-size:11.5px" href="#/codex/sources">Read how each one is sourced</a>
          </div>
        </div>
      </div>`;
      view.querySelector('#homeLv').addEventListener('change', e => { p.level = +e.target.value; RF.save(); RF.route(true); });
      const seg = (id, key) => view.querySelector(id).addEventListener('click', e => { if (e.target.dataset.v) { p[key] = e.target.dataset.v; RF.save(); RF.route(true); } });
      seg('#homeSpec', 'spec'); seg('#homeFac', 'faction');
      view.querySelector('#homeWelcome').addEventListener('click', openWelcome);
      let seen = '1';
      try { seen = localStorage.getItem(WELCOME_KEY); } catch (e) { }
      if (!seen) openWelcome();
    }
  };
})();
