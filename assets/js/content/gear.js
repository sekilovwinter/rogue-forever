/* Gear guide text. The gear sets themselves come from tools/build_gear_plan.py (assets/data/gearplan_h.js and gearplan_a.js). */
RF.guide.stats = [
  { k: 'hit', name: 'Hit', cap: 'Cap: 8% for abilities', rank: 1, tk: 'g', what: 'Chance your attack connects at all. Against a boss 3 levels above you, abilities miss 8% of the time, and dual-wield auto attacks miss 27%.',
    why: 'A miss wastes the whole Energy cost. Nothing else on this page matters if the attack does not land. That is why hit comes first until 8%. After that it still helps auto attacks and poisons, but at a much lower value, so stop chasing it.',
    how: 'Roughly 10 rating is 1%. Precision gives 3%. Dwarf rogues have Artisan\'s Precision for 1%.' },
  { k: 'exp', name: 'Expertise', cap: 'Cap: 6.5% from behind', rank: 2, tk: 'g', what: 'New in Forever. Reduces how often enemies dodge or parry your attacks.',
    why: 'Bosses dodge 6.5% of attacks and parry 14% from the front. From behind there is no parry, so 6.5% is your cap. A dodged ability wastes Energy just like a miss, so its value equals hit when you are behind the target, and double when you are stuck in front.',
    how: 'Weapon Expertise gives 2%. Some set bonuses add 2%.' },
  { k: 'wpn', name: 'Weapon damage', cap: 'No cap', rank: 3, tk: 'r', what: 'Your weapon\'s top-end damage per hit, not only its damage per second.',
    why: 'Sinister Strike, Backstab, Ambush and Hemorrhage all use weapon damage per hit. A slow weapon gives a bigger hit to multiply, and auto attacks and poisons benefit from its speed. So you want a slow main hand and a faster off hand: the slow weapon gives big skills, the fast one gives more poison chances.',
    how: 'Check tooltip damage, and DPS. Compare two daggers by their top damage. In the model on this page, a weapon is worth more than any other single item.' },
  { k: 'agi', name: 'Agility', cap: 'No cap', rank: 4, tk: 'a', what: '1 Agility is 1 Attack Power, about 1/29 of 1% crit, and 1/26 of 1% dodge at level 60.',
    why: 'It gives damage, crit and defense from one stat. That is why rogue items have it on nearly every slot. Once you hit your hit and expertise caps, this is your best damage stat.',
    how: 'Look for it on every slot. Enchants exist for gloves, cloak, boots and bracers.' },
  { k: 'crit', name: 'Critical strike', cap: 'No cap', rank: 5, tk: 'a', what: 'Chance to deal double damage. Crits also feed talents like Seal Fate, and Remorseless Attacks gives a boost after a kill.',
    why: 'Double damage is strong, but on auto attacks a crit must fit in the hit table beside misses, dodges and glancing blows. Only with enough hit and expertise does your full crit chance apply. That is why it comes after hit in value.',
    how: 'About 14 rating is 1%. Malice gives 5%. Dagger/Fist Hack and Slash gives more. Humans have Ruthless for 1%.' },
  { k: 'ap', name: 'Attack Power and Strength', cap: 'No cap', rank: 6, tk: 'n', what: 'Each adds a little to every attack. 14 Attack Power adds 1 weapon DPS. For rogues, 1 Strength is 1 Attack Power.',
    why: 'It is useful, but one Agility already gives 1 Attack Power plus crit and dodge. So Agility is about twice as valuable. Take Attack Power when it comes on an item with a much higher amount.',
    how: 'Compare totals. A piece with +50 Attack Power may still beat +20 Agility.' },
  { k: 'haste', name: 'Haste', cap: 'No cap', rank: 7, tk: 'n', what: 'Faster auto attacks.',
    why: 'It does not raise Energy, abilities or Rupture ticks. It only speeds up auto attacks, poison chances and extra-attack procs. So it is below Agility, despite how strong it sounds.',
    how: 'Skyborne have Wind Blessed for 2%. Troll Berserking gives 10% for 15 seconds.' },
  { k: 'skill', name: 'Weapon skill', cap: 'Check at each level', rank: 8, tk: 'n', what: 'Reduces how badly glancing blows hurt. Forever changed weapon skill, so glancing blows are harder to get rid of.',
    why: '40% of your auto attacks against a boss glance, losing damage. Weapon skill reduces this penalty. It is one reason Combat is a little weaker here than in Classic, and Subtlety stronger, as Subtlety relies less on auto attacks.',
    how: 'Use your weapon: skill rises as you fight. Rogues start at skill 1 with axes. Train a new type before you rely on it.' },
  { k: 'sta', name: 'Stamina', cap: 'PvP: high value', rank: 9, tk: 'b', what: 'More health.',
    why: 'In PvE it adds nothing to damage. In PvP, one more second alive is one more Kick or Kidney, which is worth far more than a little damage. So in PvP it sits next to Agility.',
    how: 'Use PvE gear for dungeons and raids, and a set with more Stamina for PvP.' },
];
RF.guide.statNotes = [
  'These values come from the same model that picks the gear: it adds 10 of a stat to the finished set and asks how much better the set gets. They are not read from a list, and they move with the gear: once a cap is reached, hit or expertise drops to almost nothing.',
  'A stat that only comes with others on an item is judged through the whole item, not through these numbers: the Best in slot tab tries every item whole.'
];
RF.guide.weaponRules = {
  combat: 'A slow sword or axe in the main hand, then the highest-damage off hand. Slow means bigger Sinister Strike hits. Axes are new to rogues in Forever and start at skill 1, so train them first.',
  assassination: 'Daggers in both hands: Mutilate needs them and hits with both, so your off hand matters more than in any other spec.',
  subtlety: 'Dagger line: main-hand dagger for Ambush and Backstab. Hemo line: a slow sword, mace or axe, because Hemorrhage is pure weapon damage. Blizzard reduced dagger bonus damage on Hemorrhage and Ghostly Strike before launch.'
};
RF.guide.itemCounters = [
  { title: 'Items that stop your stuns', tk: 'r', icon: 'inv_jewelry_necklace_21', rows: [
    ['Insignia of the Alliance or Horde (PvP trinket)', 'Breaks crowd control on a long cooldown. It is why your Kidney Shot may not land the kill. Bait it with Cheap Shot first.'],
    ['Free Action Potion', 'About 30 seconds of immunity to stuns and movement slows. It is the worst thing for a rogue to see, since it removes your entire chain. Keep distance and let it run out, or kill them with burst and poisons.'],
    ['Living Action Potion', 'A stronger version that also clears effects already on the player. Expect it from prepared opponents.'],
    ['Limited Invulnerability Potion', 'Six seconds of immunity to physical attacks, in Classic terms. It stops weapon damage cold, so switch to Kick, poison ticks or patience.'],
    ['Will to Survive (Human)', 'Instantly breaks a stun: not an item, but it works the same way.'],
    ['Gnomish Rocket Boots and Goblin Rocket Boots', 'Sudden speed to escape after your control ends.'],
  ] },
  { title: 'Items that counter stealth', tk: 'a', icon: 'ability_stealth', rows: [
    ['Perception (Human racial)', 'Dramatically increases stealth detection for 20 seconds. Not an item, but it works like one.'],
    ['Hunter Flare, Faerie Fire', 'Class spells rather than items, but they count: you cannot ignore them.'],
    ['Gnomish Mind Control Cap', 'An Engineering helm that can take over your character for a short time. Stay at range of cliffs and enemy groups when you see one.'],
  ] },
  { title: 'Items that hurt you directly', tk: 'r', icon: 'inv_misc_bomb_02', rows: [
    ['Thorium Grenade and Iron Grenade', 'Area stuns that do not care about stealth or Evasion. They break Sap or your chain. A dangerous reply from anyone with Engineering.'],
    ['Gnomish Net-o-Matic Projector', 'Roots you in place when you try to leave. Keep Vanish ready.'],
    ['Mechanical Dragonling', 'A pet that keeps hitting you, and knocks you out of stealth.'],
    ['Armor buffs and high armor items', 'Physical damage is your main damage type: items with high armor push a Warrior or bear far out of reach. Use bleeds and poison.'],
  ] },
  { title: 'Things that weaken your gear choices', tk: 'a', icon: 'inv_sword_27', rows: [
    ['Nature resistance gear', 'Your poisons are Nature damage. Enemies wearing it can reduce a big share of Assassination\'s damage. Against them, switch to weapon stones.'],
    ['Bleed and poison immunity', 'Many bosses ignore bleeds or poisons. Subtlety is weak against bleed-immune targets, and Assassination against Nature-immune ones. The dungeon pages list each boss.'],
    ['Stoneform (Dwarf racial)', 'Removes bleeds, poisons and diseases and grants immunity for 8 seconds. It also takes 10% off physical damage. Time your burst after it.'],
    ['High dodge items', 'Against other rogues, or against hunters with dodge, your Energy is wasted by more dodges. This is why expertise matters.'],
    ['Disarm effects', 'If someone Disarms your main hand, your plan loses most of its weapon damage. Keep poison and bleed damage up as your backup.'],
  ] },
];
RF.guide.consumables = [
  ['Flash Powder', 'Reagent for Vanish. Always carry a stack, or take the Reagent Economy legacy perk so you never need it.'],
  ['Blinding Powder', 'Reagent for Blind. Crafted with Poisons.'],
  ['Weapon stones', 'Forever lets you use one with a poison on the same weapon. Elemental Sharpening Stone is the top pre-raid choice.'],
  ['Elixirs and food', 'Elixir of the Mongoose and Agility food are the classic picks. Check what your server is selling.'],
  ['Healing Potions and bandages', 'You have no self-heal. Potions in combat, bandages between fights. First Aid is a must.'],
  ['Free Action Potion', 'Very strong in PvP and on a few raid bosses.'],
];
/* Text for the optimizer-built gear plans. The picks themselves come from tools/build_gear_plan.py, the model from tools/gear_opt.py. */
RF.guide.planNotes = {
  title: (lv, side, spec, mode) => `Level ${lv}: ${side} ${spec} ${({ pve: 'dungeon', pvp: 'PvP', lvl: 'leveling' })[mode]} set, one pick per slot`,
  goal: { pve: 'in dungeons', pvp: 'in PvP', lvl: 'while leveling' },
  unit: { pve: 'damage', pvp: 'damage', lvl: 'leveling speed' },
  buildNote: {
    'assassination/pvp': 'the site has no Assassination PvP build, so this uses the dungeon build',
    'combat/lvl': 'leveling uses the dungeon build',
    'assassination/lvl': 'leveling uses the dungeon build',
    'subtlety/lvl': 'leveling uses the dungeon build',
  },
  how: (mode, side) => [
    `This set was chosen as a whole, not one slot at a time. Every item in the Forever client that a ${side} Rogue can wear and get by this level was tried: about 7,000, counting each useful random ending of an auction-house green ("of the Monkey", "of the Bandit", "of Power" and so on) as its own item. Talents are the build named above, spent one point a level from 10 in the order the Talents page shows. Each slot was swapped in turn until no single swap, no set bonus, and no main-hand and off-hand pair (including the best pair of each weapon type, such as two daggers for Mutilate) made the set stronger.`,
    'One pass like that can stop too early: a three-piece set bonus may only pay once two other slots change with it, and a piece with hit rating may only pay once another piece gives its hit up. So the search starts again from every set bonus forced in and from random sets, then tries every swap of two slots at once among each slot\'s eight closest items, and keeps the strongest set of all those tries. At level 60 this found sets about 1% stronger than a single pass did.',
    ...({
      pve: [
        'Stronger means more damage per second against a dungeon boss 3 levels above you. Forever keeps Classic\'s attack table: your abilities miss 8% of the time and dual-wield auto attacks 27%, minus your hit; the boss dodges 6.5%, minus expertise and Weapon Expertise, but cannot parry because you stand behind it; 40% of auto attacks glance for 35% less damage; your crit is 3% lower; and poisons miss 17% of the time, whatever your hit. Boss armor grows with level (3,731 at level 63), which is what maces and armor-ignoring effects work against. Armor and dodge count for nothing here. Health counts a little: a dead Rogue deals no damage, so 1% more health is scored as 0.05% more damage. That is small enough that it never beats a real damage gain, but it settles near-ties in favor of the piece with Stamina.',
      ],
      pvp: [
        'Stronger means better at winning a fight against a player of your level. You win if you kill them before they kill you. Your time to kill them is their health divided by your damage, and theirs is your health divided by their damage. So 1% more damage and 1% more health are worth about the same. A Rogue also keeps the enemy stunned for about 8 seconds of a fight, through Cheap Shot, Kidney Shot and Gouge, and only your damage counts in that time. Against about 16 seconds for an enemy to kill you, that makes 1% more damage worth 1.5% more health.',
        'Health counts Stamina, armor against physical attacks, dodge and parry, Use shields scaled by how often their cooldown is ready (with a fight every 3 minutes), and stuns or silences from weapon procs at one per minute. Players have no glancing blows: abilities miss 5% and dual-wield swings 24%, minus your hit, and they dodge 5%. Each fight opens with Cheap Shot from a full Energy bar; Adrenaline Rush and Blade Flurry are counted for the share of fights their cooldowns allow.',
      ],
      lvl: [
        'Stronger means more mobs per hour. Time per mob is the time to kill it plus the time to eat back the damage it did, and food heals a fixed amount per second whatever your health. A mob of your level hits about half as hard as food heals, so 1% less damage taken saves about a third of a percent of time; the model counts it as 0.4% of damage. Health gets a small weight for adds and accidents, because it does not shorten eating.',
        'Mobs of your level face you: abilities miss 5% and dual-wield swings 24%, minus your hit; mobs dodge 5% and parry 5%, minus expertise; 10% of auto attacks glance for 5% less damage. Every pull starts from a full Energy bar with Ambush if you hold a dagger, Garrote otherwise. Backstab is not used, because the mob faces you.',
      ],
    })[mode],
    'Damage comes from your real abilities at each level: the best builder your weapons allow (Sinister Strike, Backstab from behind in dungeons, Hemorrhage, or Mutilate with two daggers), Eviscerate, Slice and Dice, Rupture when it pays, Death Mark for Subtlety, Ghostly Strike and the Ambush it allows, Shank, auto attacks and poisons (Deadly Poison on the main hand in dungeons from 30, Instant Poison on the off hand). Energy and combo points are balanced exactly, with Ruthlessness, Relentless Strikes, Seal Fate, Boot Knife, Flash of Steel, Adrenaline Rush and Blade Flurry. Sinister Strike, Backstab, Ambush, Hemorrhage and Ghostly Strike use normalized weapon damage (1.7 speed for daggers, 2.4 for other one-handers), as the Forever spell data says; Shank uses the off hand\'s real speed.',
    'Rating is flat in Forever, the same at every level: 10 hit rating is 1% hit, 14 crit rating is 1% crit, 10 expertise rating is 1%. Crit from Agility uses the Forever client\'s own per-level table. The shared set counts no racial bonus. Choose your race above the list and every set is checked again with that race\'s racials on: where they make another item better, by at least 0.1% for the whole set, that slot changes and says why.',
    `Items only count if you can really get them: ${side} or neutral, not from a raid, not from the honor rank vendors, and by this level. Random world drops, container finds and drops under 1% count only when the item binds when equipped, because then other players sell it: its source is shown as the auction house. One that binds when picked up is a lottery and is left out. A quest counts up to 3 levels above the bracket. Reputation counts up to Friendly by 20, Honored by 30, Revered by 40 and 50, and Exalted at 60. Every pick, runner-up and close call was then checked against its live foreverchanges.pro page: weapon damage is taken from the Forever tooltip, anything that page calls a world drop was moved to the auction house (or removed if it cannot be traded), anything with no source there or not in the Forever client was removed, and the sets were re-optimized until nothing changed. A crafted item counts only if your faction can learn its pattern. Bind-on-pickup crafts count only for Leatherworking. Two copies of a quest reward, two of the same Use item, or two items that share a limit (such as one "Talisman of Battle") are never combined.`,
    ({
      pve: 'The model is checked for robustness: every set was also built with chance-on-hit effects firing twice a minute, with Energy-on-hit set bonuses (Stormshroud\'s 4% chance of 30 Energy) firing half as often as the tooltip says in case they have a hidden cooldown, and with Eviscerate scaling twice as much with Attack Power. Where a pick changes, the slot is marked as a close call and the other winner is named.',
      pvp: 'The model is checked for robustness: every set was also built with 1% damage worth 1.2% and 2% health. Where a pick changes, the slot is marked as a close call and the other winner is named.',
      lvl: 'The model is checked for robustness: every set was also built with damage taken worth half as much and almost twice as much. Where a pick changes, the slot is marked as a close call and the other winner is named.',
    })[mode],
  ],
  race: {
    human: 'Ruthless gives Humans 1% crit, which shifts what the rest of the set needs.',
    dwarf: 'Artisan\'s Precision gives Dwarves 1% hit, so the set reaches the hit cap with less hit on gear and this slot is free for other stats.',
    nightelf: 'Elune\'s Light (10% crit for 15 seconds) and Quickness (1% dodge) shift what the rest of the set needs.',
    gnome: 'Expansive Mind (5% more Energy) and Eureka! (abilities cost 10% less and hit 10% harder for 8 seconds) put more of a Gnome\'s damage into abilities.',
    highorder: 'Wind Blessed gives 2% haste, so auto attacks and what feeds them are worth more.',
    windshaper: 'Wind Blessed gives 2% haste, so auto attacks and what feeds them are worth more.',
    orc: 'Blood Fury raises Attack Power by 10% for 15 seconds, so Attack Power on gear is worth a little more.',
    undead: 'Touch of the Grave steals 5% of your maximum health as damage, so for Undead Stamina also adds damage.',
    troll: 'Berserking gives 10% attack speed for 15 seconds, so auto attacks and what feeds them are worth more.',
  },
  judged: 'Last, the sets are judged for how sure each source is, which the damage model cannot see. Where a pick only drops at random (an auction-house item), comes from a drop under 15%, or is a world drop nobody has confirmed in Forever, it must earn its place: a common auction-house green has to beat the best sure item by more than 0.15%, and a rare or unconfirmed drop by more than 0.5%. Otherwise the sure item is shown, marked hand-picked, with the item it replaced and the exact cost. All such swaps together never cost a set more than 1%.',
  statName: { agi: 'Agility', sta: 'Stamina', str: 'Strength', ap: 'Attack Power', hit: 'hit rating', crit: 'crit rating', exp: 'expertise rating', haste: 'haste rating' },
  later: [
    'Raids: none are open. Blizzard opens The Barrow Deeps, Hyjal Summit and Onyxia\'s Lair on December 9. Raid drops will then beat several level 60 picks.',
    'Honor rank gear: the PvP vendors are down for now (Blizzard\'s known issues list), and the first ranked season has no start date yet. When they open, the Greater Insignia of your faction (rank 2) is the first thing to buy for PvP. It removes stuns, slows and loss-of-control effects, which no item in these sets can do.',
    'New Forever dungeons: The Drowned City (35 to 40), Krol\'dok Stronghold (40 to 45), Alcaz Prison (48 to 53), Blackmaw Hold (55 to 60) and Shaper\'s Terrace (58 to 60) are live, but no loot has been recorded from them yet. These sets will change when it is.',
    'Auction house items are in the plan since November 9: random world drops that bind when equipped, and the greens that get a random ending when they drop. For a green the ending is the item: "of the Monkey" is Agility and Stamina, "of the Tiger" Agility and Strength, "of the Bandit" Agility, Stamina and Attack Power, "of Agility" and "of Power" one stat only. The amounts are the Forever client\'s own for each item. Whether one is for sale on your realm today is the one thing no data can tell, so each of these picks names what to wear until you find it.',
    'Also left out on purpose, because each is a grind far beyond normal play: Dungeon Set 0.5 (Darkmantle, a 23 to 25 quest chain that uses up your Shadowcraft pieces), Arena Grand Master (12 Arena Master trinkets from the Gurubashi Arena chest), Darkmoon Faire ticket prizes (the Faire is in town one week a month), and the Argent Dawn "Epic Armaments" rewards (110 Insignias of the Dawn and 110 of the Crusade). The Watchers rings and items sold for Tarnished Undermine Real are left out because nobody knows yet how to earn that reputation or currency.',
    'Drawbacks are counted: Petrolspill Leggings make you take 10% more fire damage, and an item that slows your movement loses about that share of its value.',
    'Bonuses that only work in some zones or against some creatures ("tripled in Forest and Grassland areas", "against Undead") are not counted.',
    'Enchants have their own tab. None of the enchants in the Forever client is tied to one item type, so they do not change which item wins a slot: the gear is chosen first, then the best enchant for each piece. Boots with "run speed increased slightly" get no credit for it, because the boot speed enchant gives the same thing and item speed bonuses do not stack.',
  ],
};

/* Text for the Enchants tab. The picks come from tools/build_enchants.py, scored by the same model as the gear. */
RF.guide.enchNotes = {
  title: (lv, side, spec, mode) => `Level ${lv}: best enchants for the ${side} ${spec} ${({ pve: 'dungeon', pvp: 'PvP', lvl: 'leveling' })[mode]} set, one per slot`,
  lead: 'One enchant per piece that can take one: both weapons, chest, cloak, bracers, gloves and boots. Each is the strongest that an enchanter can learn in Forever today. An enchant has no level requirement, so the same one can win at every level: what changes is whether an enchanter with enough skill is around. It stays on the item, so on a piece you will replace in a few levels the materials are lost with it.',
  checked: 'Every enchant for this slot was put on the finished set, one at a time, and the whole set was scored again. The number is how much each adds.',
  how: [
    'The gear set from the Best in slot tab is taken as it is. Every Enchanting recipe in the Forever client for that slot is then added to it, one at a time, and the same model scores the set again: the same boss, player or mob, the same talents, the same rotation. The enchant that adds the most is the pick.',
    'An enchant counts only if an enchanter can learn it now: from the trainer, from a vendor, or from a formula that drops outside raids. That leaves out Superior Agility for gloves (the formula drops in Ahn\'Qiraj), Greater Stats for chests (Blackwing Lair in the Forever data) and Grand Crusader (no known source). When raids open, these will change.',
    'Amounts are the Forever spell texts. How often Crusader, Fiery Weapon and Lifestealing fire is not in the client, so Classic\'s rates are used: Crusader once a minute per weapon, the other two six times a minute. Weapon damage enchants add their damage to every swing and to every ability that uses that weapon.',
    'Boots for PvP and leveling are judged by hand, because a damage model cannot score run speed. The reason is given on the pick.',
    'Head, leg and shoulder enchants are not here: in the Forever client they come from Zul\'Gurub, Dire Maul librams and the Argent Dawn, and none is confirmed obtainable yet.',
  ],
};

/* Text for the "Where to get it" tab. The details come from tools/gear_route.py. */
RF.guide.routeNotes = {
  title: (lv, side, spec, mode) => `Level ${lv}: where to get the ${side} ${spec} ${({ pve: 'dungeon', pvp: 'PvP', lvl: 'leveling' })[mode]} set`,
  lead: 'Only the one pick per slot, grouped by where it comes from, so one trip covers every piece from the same place. The colored tag says how sure the source is: seen by players in Forever, in the Forever client, or only in Classic\'s data.',
  ah: 'Search by the name shown. For a green with a random ending, the ending is the item: buy only the one that ends the same way.',
  lw: 'The best Leatherworking craft for each slot at this level, if it is the pick or within 1% of it. A craft that is not the pick costs you that much damage, but you can make it today.',
  how: [
    'Quests: who starts the quest, where, and what it asks come from foreverchanges.pro\'s quest pages, which mark each quest as changed or unchanged in Forever.',
    'Vendors: the vendor, the map spot and the price come from foreverdb.net. "Seen" means players have reported that vendor in Forever. Reputation amounts are counted from Neutral.',
    'Dungeons: the boss and the drop chance come from foreverdb.net\'s loot tables. Where no Forever player has reported the drop, the line says the numbers are Classic\'s. The number of runs is 100 divided by the drop chance, an average.',
    'Crafted: the skill and materials are the Forever recipe. Where the pattern comes from was checked on the pattern\'s own foreverchanges.pro page, because the other data names a single dropper even for patterns that drop at random all over the world. Those are sent to the auction house.',
    'Named mobs: the zone and coordinates come from classicdb.ch, so they are Classic\'s spot for that mob.',
    'Coordinates are the ones the game shows on the map of the named zone. One known trap is fixed by hand: Werg Thickblade stands at the Bulwark, which the game counts as Tirisfal Glades (83.3, 69.7), not the Western Plaguelands.',
  ],
};
