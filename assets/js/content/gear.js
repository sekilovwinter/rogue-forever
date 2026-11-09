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
    `This set was chosen as a whole, not one slot at a time. Every item in the Forever client that a ${side} Rogue can wear and get by this level was tried: about 4,000 items with a known source. Talents are the build named above, spent one point a level from 10 in the order the Talents page shows. Each slot was swapped in turn until no single swap, no set bonus, and no main-hand and off-hand pair (including the best pair of each weapon type, such as two daggers for Mutilate) made the set stronger.`,
    ...({
      pve: [
        'Stronger means more damage per second against a dungeon boss 3 levels above you. Forever keeps Classic\'s attack table: your abilities miss 8% of the time and dual-wield auto attacks 27%, minus your hit; the boss dodges 6.5%, minus expertise and Weapon Expertise, but cannot parry because you stand behind it; 40% of auto attacks glance for 35% less damage; your crit is 3% lower; and poisons miss 17% of the time, whatever your hit. Boss armor grows with level (3,731 at level 63), which is what maces and armor-ignoring effects work against. Stamina, armor and dodge count for nothing here.',
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
    'Rating is flat in Forever, the same at every level: 10 hit rating is 1% hit, 14 crit rating is 1% crit, 10 expertise rating is 1%. Crit from Agility uses the Forever client\'s own per-level table. Racial bonuses are not counted.',
    `Items only count if you can really get them: ${side} or neutral, not from a raid, not from the honor rank vendors, not a random world drop or container, not a drop under 1%, and by this level. A quest counts up to 3 levels above the bracket. Reputation counts up to Friendly by 20, Honored by 30, Revered by 40 and 50, and Exalted at 60. Every pick, runner-up and close call was then checked against its live foreverchanges.pro page: weapon damage is taken from the Forever tooltip, and anything that page calls a world drop, that has no source there, or that is not in the Forever client was removed and the sets re-optimized until nothing changed. A crafted item counts only if your faction can learn its pattern. Bind-on-pickup crafts count only for Leatherworking. Two copies of a quest reward, two of the same Use item, or two items that share a limit (such as one "Talisman of Battle") are never combined.`,
    ({
      pve: 'The model is checked for robustness: every set was also built with chance-on-hit effects firing twice a minute, and with Eviscerate scaling twice as much with Attack Power. Where a pick changes, the slot is marked as a close call and the other winner is named.',
      pvp: 'The model is checked for robustness: every set was also built with 1% damage worth 1.2% and 2% health. Where a pick changes, the slot is marked as a close call and the other winner is named.',
      lvl: 'The model is checked for robustness: every set was also built with damage taken worth half as much and almost twice as much. Where a pick changes, the slot is marked as a close call and the other winner is named.',
    })[mode],
  ],
  judged: 'Last, a few picks are judged by hand. The model cannot see how sure or how slow a source is, so where its pick wins by under 0.5% but needs a long reputation grind or a rare or random drop, a near-equal item you can count on is shown instead. Those slots are marked hand-picked, with the reason.',
  statName: { agi: 'Agility', sta: 'Stamina', str: 'Strength', ap: 'Attack Power', hit: 'hit rating', crit: 'crit rating', exp: 'expertise rating', haste: 'haste rating' },
  later: [
    'Raids: none are open. Blizzard opens The Barrow Deeps, Hyjal Summit and Onyxia\'s Lair on December 9. Raid drops will then beat several level 60 picks.',
    'Honor rank gear: the PvP vendors are down for now (Blizzard\'s known issues list), and the first ranked season has no start date yet. When they open, the Greater Insignia of your faction (rank 2) is the first thing to buy for PvP. It removes stuns, slows and loss-of-control effects, which no item in these sets can do.',
    'New Forever dungeons: The Drowned City (35 to 40), Krol\'dok Stronghold (40 to 45), Alcaz Prison (48 to 53), Blackmaw Hold (55 to 60) and Shaper\'s Terrace (58 to 60) are live, but no loot has been recorded from them yet. These sets will change when it is.',
    'Random world drops (Krol Blade and the like) are left out on purpose. They are a lottery on the auction house, not a plan.',
    'Also left out on purpose, because each is a grind far beyond normal play: Dungeon Set 0.5 (Darkmantle, a 23 to 25 quest chain that uses up your Shadowcraft pieces), Arena Grand Master (12 Arena Master trinkets from the Gurubashi Arena chest), Darkmoon Faire ticket prizes (the Faire is in town one week a month), and the Argent Dawn "Epic Armaments" rewards (110 Insignias of the Dawn and 110 of the Crusade). The Watchers rings and items sold for Tarnished Undermine Real are left out because nobody knows yet how to earn that reputation or currency.',
    'Bonuses that only work in some zones or against some creatures ("tripled in Forest and Grassland areas", "against Undead") are not counted.',
    'Enchants are not part of the picks. None of the enchants in the Forever client is tied to one item type, so they do not change which item wins a slot. Enchant Boots - Minor Speed is still the best boot enchant for PvP and leveling, and it is why boots with "run speed increased slightly" get no credit for it: item speed bonuses do not stack.',
  ],
};
