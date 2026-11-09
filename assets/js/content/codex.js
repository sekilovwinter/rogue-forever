/* Things not asked for directly but needed to play the class well: race choice, professions, leveling, legacy, sourcing. */
RF.guide.raceWhy = {
  'Undead': { best: 'The best rogue race in Forever.',
    pve: 'Touch of the Grave: a hit has a 20% chance to steal 5% of your maximum health from the target, at most once every 15 seconds. It is damage and healing at once, and it grows with your Stamina, so it adds about 2 to 4% damage in dungeons, more than any other racial. While leveling, the drain and Cannibalize also cut eating time.',
    pvp: 'Will of the Forsaken removes Fear, Howl of Terror, Psychic Scream, Intimidating Shout, Mind Control, Seduction and Wyvern Sting, every 2 minutes. Forever has no PvP trinket yet, so it is your only way out of them. It does not remove Blind, Polymorph, Sap, Death Coil or stuns. The drain\'s healing also helps you outlast.' },
  'Human': { best: 'The best Alliance race, and the answer to stuns.',
    pve: 'Ruthless is a permanent 1% crit. Crits also feed Seal Fate, so it is worth about 1% damage. The Human Spirit only speeds up health regeneration out of combat.',
    pvp: 'Will to Survive removes any stun, every 3 minutes: Cheap Shot, Kidney Shot, Hammer of Justice, Intercept, Concussion Blow and Bash. It is the only stun break in Forever until honor vendors open, and stuns come from rogues, warriors, paladins and druids. Perception shows stealthed rogues and druids for 20 seconds, so you open first in a mirror.' },
  'Gnome': { best: 'The strongest Alliance burst, good for leveling.',
    pve: 'Eureka! makes Sinister Strike, Backstab, Mutilate, Hemorrhage, Ambush and Eviscerate cost 10% less and hit 10% harder for 8 seconds, every 2 minutes. It does nothing for Rupture, Garrote or poisons. Over a long boss fight that is under 1%, but on a single pull it is a real burst.',
    pvp: 'Used on your opener, Eureka! adds about 6% damage to the whole fight. Escape Artist removes roots and slows (Frost Nova, Hamstring, Entangling Roots, Concussive Shot) and makes you immune to them for 3 seconds, every 2 minutes. No answer to stuns or fears.' },
  'Night Elf': { best: 'Burst and stealth, behind Human.',
    pve: 'Elune\'s Light gives 10% crit for 15 seconds every 3 minutes: about 0.7% damage over a long fight. Quickness adds 1% dodge and 2% movement speed.',
    pvp: 'Elune\'s Light covers most of a stun chain: about 6% more damage per fight, and more combo points from Seal Fate. Quickness makes you harder to see in stealth, as if you were 1 level higher, and Shadowmeld drops you out of sight for a moment. No crowd control break.' },
  'Orc': { best: 'Steady in PvP, behind Undead.',
    pve: 'Blood Fury gives 10% Attack Power for 15 seconds every 2 minutes: about 0.4% damage, because it is up only an eighth of the time and Attack Power is a modest part of each hit next to weapon damage.',
    pvp: 'Hardiness makes every stun on you 20% shorter, all the time: a 6 second Kidney Shot lasts 4.8. Blood Fury adds about 2% damage per fight, and Shatter Curse removes curses such as Curse of Exhaustion.' },
  'Troll': { best: 'Best for leveling, weak in PvP.',
    pve: 'Rapid Regeneration heals half your health over 6 seconds out of combat every 3 minutes, and Beast Slaying adds 5% damage to beasts. Together they tie Undead as the fastest leveler. Berserking (10% attack speed for 15 seconds) only speeds up your white swings, so it adds little in dungeons.',
    pvp: 'Berserking adds about 2.5% damage per fight. No crowd control break, and Rapid Regeneration stops the moment you are hit.' },
  'Dwarf': { best: 'Strong against rogues and hunters only.',
    pve: 'Artisan\'s Precision gives 1% hit: about 1% damage at 40, less at 60, where gear already reaches the 8% hit cap. Big Game Hunter adds 5% damage to beasts while leveling.',
    pvp: 'Stoneform removes and blocks every poison, bleed and disease for 8 seconds and cuts physical damage by 10%, every 3 minutes. Forever counts Blind and Wyvern Sting as poisons, so Stoneform breaks them. Nothing against stuns or fears.' },
  'Skyborne (Windshaper)': { best: 'The weakest choice for a rogue.',
    pve: 'Wind Blessed gives 2% haste, which only speeds up your white swings: under 1% damage. Elemental Insight adds 5% damage to elementals. Skyborne need a Heroic or higher Forever pack.',
    pvp: 'Walk on Air lets you glide for 10 seconds every 90 seconds, so a cliff becomes an escape. Skysight adds 15% speed for 30 seconds. No crowd control break and no burst.' },
  'Skyborne (High Order)': { best: 'The weakest choice for a rogue.',
    pve: 'Wind Blessed gives 2% haste, which only speeds up your white swings: under 1% damage. Read Leyline raises health regeneration by 50% for 15 seconds. Skyborne need a Heroic or higher Forever pack.',
    pvp: 'Walk on Air lets you glide for 10 seconds every 90 seconds, so a cliff becomes an escape. No crowd control break and no burst.' },
};
/* The verdict on the Race tab. Numbers: tools/gear_opt.py with Ctx(..., race=...), every race's best gear set rebuilt at level 60 and
   averaged over Combat, Assassination and Subtlety (raw/pvp/race_summary.json, made 2026-11-09 from build 1.60.1.70862). */
RF.guide.raceVerdict = {
  title: 'The best rogue race in Forever: Undead',
  lead: 'Undead is first or tied first in dungeons, PvP and leveling, and no other race is in all three. If you play Alliance, take Human.',
  table: [
    ['Undead', 'Horde', 2.7, 15.5, 4.6],
    ['Human', 'Alliance', 0.9, 11.7, 0.9],
    ['Gnome', 'Alliance', 0.6, 9.0, 3.4],
    ['Night Elf', 'Alliance', 0.7, 6.3, 2.6],
    ['Orc', 'Horde', 0.4, 6.3, 1.1],
    ['Troll', 'Horde', 0.3, 2.4, 4.8],
    ['Dwarf', 'Alliance', 0.7, 2.2, 2.2],
    ['Skyborne (High Order)', 'Alliance', 0.8, 0.7, 0.7],
    ['Skyborne (Windshaper)', 'Horde', 0.8, 0.7, 0.7],
  ],
  why: [
    ['Dungeons', 'Touch of the Grave steals 5% of your maximum health about every 15 to 20 seconds: about 2.7% damage. The next best, Human\'s 1% crit, gives 0.9%.'],
    ['PvP', 'Forever has no PvP trinket yet, so a racial break is the only one you get, and that puts Undead and Human far ahead. Will of the Forsaken breaks fears, charms and sleeps. Will to Survive breaks stuns. Touch of the Grave\'s healing keeps Undead in front.'],
    ['Leveling', 'Troll and Undead tie: Rapid Regeneration and Beast Slaying against the drain and Cannibalize. Both save eating time between pulls.'],
  ],
  breaks: [
    ['Stuns', 'Human removes one; Orc makes all of them 20% shorter'],
    ['Fear, charm, sleep', 'Undead'],
    ['Blind, poisons, bleeds', 'Dwarf'],
    ['Roots and slows', 'Gnome'],
    ['Polymorph, Sap, Gouge, Repentance', 'No race'],
  ],
  how: 'Each number is how much stronger the race makes you, as a share of your damage, against the same faction with no racials. Every race got its own best gear set, because +1% hit or crit changes which items win, and the average covers Combat, Assassination and Subtlety at level 60 with this site\'s talent builds. In PvP, health and crowd control count too, turned into damage: you win if you kill first, and breaking a stun or fear takes about 3 of the 20 seconds an enemy gets to hit you. Racial values come from the Forever client, build 1.60.1.70862.',
  sure: 'Two things no source states: whether white swings can trigger Touch of the Grave, and whether a fear break is worth as much as a stun break. If only abilities trigger it, Undead still lead dungeons by about 2% against 0.9%. Stuns come from more classes than fears (rogues, warriors, paladins and druids, against warlocks, priests and a warrior\'s Shout), so if a fear break counts two thirds of a stun break, Undead and Human tie in PvP. Not in the numbers: stealth detection (Night Elf, Human\'s Perception) and escapes (Shadowmeld, Walk on Air).',
};
/* Cooldowns from the Forever client (build 1.60.1.70862), shown beside each racial. */
RF.guide.racialCd = {
  'Will to Survive': '3 min', 'Perception': '3 min', 'Stoneform': '3 min', 'Elune\'s Light': '3 min', 'Shadowmeld': '10 sec, 2 min in combat', 'Eureka!': '2 min',
  'Escape Artist': '2 min', 'Walk on Air': '90 sec', 'Read Leyline': '2 min', 'Skysight': '2 min', 'Blood Fury': '2 min', 'Shatter Curse': '3 min',
  'Will of the Forsaken': '2 min', 'Cannibalize': '2 min', 'Touch of the Grave': '15 sec between drains', 'Berserking': '3 min', 'Rapid Regeneration': '3 min',
};
RF.guide.professions = [
  { name: 'Engineering', icon: 'trade_engineering', tk: 'r', when: 'PvP, first choice', why: 'Grenades give stuns on top of yours, nets stop runners, and Rocket Boots and goggles add options. Because they use no Energy, you have an answer when your cooldowns are gone.' },
  { name: 'Mining', icon: 'trade_mining', tk: 'a', when: 'Pair with Engineering', why: 'Gives materials for grenades and bars. It also makes gold while you travel.' },
  { name: 'Leatherworking', icon: 'inv_misc_armorkit_17', tk: 'g', when: 'PvE and leveling', why: 'You wear leather, so the crafted pieces are yours. Armor kits are strong, and Forever adds new patterns, seen on the BiS lists.' },
  { name: 'Skinning', icon: 'inv_misc_pelt_wolf_01', tk: 'g', when: 'Pair with Leatherworking', why: 'You kill beasts anyway, so it costs almost no extra time, and it supplies your own leather.' },
  { name: 'Herbalism', icon: 'spell_nature_naturetouchgrow', tk: 'n', when: 'For gold', why: 'Stealth helps you reach herbs safely, and the demand for flasks and potions is always high.' },
  { name: 'Enchanting', icon: 'trade_engraving', tk: 'n', when: 'For gold or your own enchants', why: 'Agility enchants on bracers, gloves, cloak and boots are a big gain. You can buy them instead, but it is cheaper to make your own if you have the time.' },
  { name: 'First Aid', icon: 'spell_holy_sealofsacrifice', tk: 'g', when: 'Everyone, mandatory', why: 'Rogues have no self-healing. Bandaging after a Gouge or Blind is your only in-fight heal, and it saves food time between fights.' },
  { name: 'Cooking', icon: 'inv_misc_food_15', tk: 'g', when: 'Everyone', why: 'Agility food at higher levels, plus health recovery. Forever adds campfire features: the Cozy Sleeping Bag gives 3% extra experience for two hours if you rest in it for three minutes.' },
  { name: 'Poisons', icon: 'trade_brewpoison', tk: 'g', when: 'Rogue only, at 20', why: 'A secondary skill like First Aid in Forever. Make your own poisons and Blinding Powder after the class quest.' },
  { name: 'Lockpicking', icon: 'spell_nature_moonkey', tk: 'g', when: 'Rogue only', why: 'A secondary skill in Forever. Open lockboxes and doors. Income from lockboxes alone pays for a lot.' },
];
RF.guide.leveling = [
  { lv: '1-10', title: 'Learn your rhythm', tk: 'g', text: 'Stealth, open, Sinister Strike, Eviscerate. Pick Pocket every humanoid. Use a Weapon stone where you can. Do your starting zone fully for the XP and the free gear.', zones: 'Starting zones and Zephras Isle (Skyborne).' },
  { lv: '10-20', title: 'Talents and First Aid', tk: 'g', text: 'Take Efficient Strikes and Coup de Grace first as Combat. Slice and Dice at 10 is your largest damage increase. Train First Aid now.', zones: 'Westfall, Loch Modan, Darkshore, Silverpine Forest, The Barrens. First dungeons: Hall of Thanes, Ragefire Chasm, Ruins of Lordaeron.' },
  { lv: '20-30', title: 'Poisons and Shank', tk: 'a', text: 'Do the Poison class quest at 20. Shank at 24, and Cheap Shot at 26 change how you open. Respec at 30 if you want Hemorrhage or Blade Flurry early.', zones: 'Redridge Mountains, Duskwood, Wetlands, Ashenvale, Stonetalon Mountains, Hillsbrad. Dungeons: Wailing Caverns, Deadmines, Shadowfang Keep, Blackfathom Deeps.' },
  { lv: '30-40', title: 'Kidney Shot and Blind', tk: 'a', text: 'Kidney Shot at 30 and Blind at 34 give you your full control kit. Ride at 40, and Dual Specialization opens. Set one spec for quests and one for groups.', zones: 'Arathi Highlands, Stranglethorn Vale, Thousand Needles, Desolace, Alterac Mountains. Dungeons: Gnomeregan, Razorfen Kraul, Scarlet Monastery, City of Dalaran.' },
  { lv: '40-50', title: 'Capstones', tk: 'r', text: 'Mutilate, Death Mark and Adrenaline Rush arrive around here depending on your spec. The new Riverglades zone is built for this range.', zones: 'Tanaris, Dustwallow Marsh, Feralas, Badlands, Swamp of Sorrows, Riverglades, The Hinterlands. Dungeons: Razorfen Downs, Uldaman, Zul\'Farrak, Maraudon.' },
  { lv: '50-60', title: 'Into the endgame', tk: 'r', text: 'Consumables begin to matter. Collect pre-raid gear in Blackrock Depths and Blackrock Spire. Prepare for hit and expertise caps. Learn your rank 3 Sprint at 58.', zones: 'Un\'Goro Crater, Felwood, Azshara, Searing Gorge, Blasted Lands, Burning Steppes, Plaguelands, Winterspring, Silithus, Mount Hyjal.' },
];
RF.guide.sources = [
  { t: 'Spells, talents, racials', s: 'good', d: 'Read from the client at build 1.60.1.70790 (the launch hotfix of November 4, 2026) as published on foreverchanges.pro. Tooltips are shown exactly as the client gives them.' },
  { t: 'World map terrain and painted map', s: 'good', d: 'The game\'s own minimap and world map art, as stitched by wowforevermap.com.' },
  { t: 'Flight masters, towns, boats, dungeon entrances, signposts', s: 'good', d: 'Client data published by foreverdb.net. We compared flight masters with wowforevermap.com: all 74 agree to within 25 yards. Dungeon pins on the hand-placed source were up to 2,700 yards away from client positions, so the client positions are the ones used. Three entrances (Krol\'dok Stronghold, Alcaz Prison, Blackmaw Hold) come from beta footage rather than the client and are marked that way.' },
  { t: 'Dungeon maps, boss pins, drops', s: 'mixed', d: 'Most maps are in-game art with pins from foreverchanges.pro. Where there is none, the map is stitched from client minimap art by foreverdb.net, and boss pins are Classic spawn positions, which Forever may have moved. Each dungeon says which it is.' },
  { t: 'Drop chances and boss abilities', s: 'warn', d: 'Classic numbers until enough players report in Forever. They are labelled. Treat percentages as a guide rather than a promise.' },
  { t: 'Item stats', s: 'warn', d: 'Blizzard hides the stats of thousands of new Forever items on its servers until someone finds one, so nobody can see all of them yet. Items are marked Seen in Forever, In client or Classic data. Lists will change as items are found: this is why BiS for 40+ cannot be final in any source today.' },
  { t: 'NPCs, quest givers, rare spawns, herbs, ore, graveyards', s: 'warn', d: 'Based on QuestieDB and CMaNGOS Classic data, with additions for Forever where players have found them. New areas like Mount Hyjal and Riverglades have fewer markers than old zones. A marker in a changed zone can be off.' },
  { t: 'Quest text', s: 'mixed', d: 'From foreverchanges.pro. Each quest says if it is new, changed or still Classic text.' },
  { t: 'Five announced dungeons', s: 'warn', d: 'Drowned City, Krol\'dok Stronghold, Alcaz Prison, Blackmaw Hold and The Shaper\'s Terrace have level ranges and entrances but no bosses or maps in the launch data. They are listed as pending rather than filled with guesses.' },
  { t: 'Stat weights and milestone gear order', s: 'mixed', d: 'Computed here with a small damage model, in tools/build_gear.py. Its weights match foreverdb.net closely, except for Expertise. No win rates or popularity were used. It is a comparison tool rather than a damage predictor.' },
  { t: 'Class matchups', s: 'mixed', d: 'Reasoned from each class\'s spells in the launch client. Forever launched today, so these are not yet tested against months of play. They assume equal level and gear.' },
  { t: 'Leatherworking path', s: 'mixed', d: 'Recipes, skill levels and materials come from the Forever client, and pattern prices from two sources that agree. The route to skill 125 was worked out here, and the skill-up formula reproduces the source\'s own craft counts. Where leather, gems and scales come from is Classic data. Nobody has published the Pristine Leather drop rate, what crates cost, or where the Brawler\'s Leather Armor and Pants patterns come from. A link on its page says how each part was checked.' },
  { t: 'Ability clips', s: 'mixed', d: '32 of 44 abilities have a clip, and each clip was checked by eye before use. 26 are Forever footage, from the launch client or its beta. 5 are Classic footage and 1 is Season of Discovery, with the same ability and labelled on the clip: Adrenaline Rush, Blind, Cold Blood, Crippling Poison, Vanish and Wound Poison. 5 abilities have nothing to film. 7 have no clip because no footage proves the press: Shank, Death Mark, Preparation, Premeditation, Feint, Instant Poison and Mind-numbing Poison. Backstab rests on the player naming it, because it leaves no icon. Each clip says what it is based on, and footage is credited to its channel.' },
  { t: 'Wowhead', s: 'warn', d: 'Wowhead blocks your region, so it was not used. Other sources cover the same ground, but anything found only there would be missing here.' },
];

RF.guide.legacyPlans = [
  { title: 'While leveling', tk: 'g', perks: [['Talented', 5, 'Talent points start at level 5 instead of 10. Five extra points during the whole climb is the biggest power gain you can buy, and it fades at 60 when everyone reaches 51.'], ['Well Rested', 5, 'Rested experience builds 20% faster with a higher cap: pure time saved.'], ['Field Medicine', 2, 'Bandage more often. You have no self-heal, so this matters more for you than for most classes.'], ['Frequent Flier', 1, 'Half price flights and 20% faster. Saves gold and time on every trip.'], ['Thrill of Adventure', 3, 'Health back on each kill means less eating between mobs.']] },
  { title: 'At level 60, PvP focus', tk: 'r', perks: [['High Alert', 2, 'See stealth as if 2 levels higher in the open world, so other rogues and druids do not get the first move. It does not work in battlegrounds.'], ['Reagent Economy', 1, 'Vanish no longer needs Flash Powder. One less thing to run out of at the worst moment.'], ['For Great Honor', 5, 'More honor from each win.'], ['Field Medicine', 2, 'Bandage sooner between world fights.'], ['Frequent Flier', 1, 'Faster travel between fights.'], ['Diplomat', 5, 'Reputation for gear and recipes as you go.']] },
  { title: 'At level 60, PvE focus', tk: 'a', perks: [['Reagent Economy', 1, 'Fewer things to buy.'], ['Gourmand', 3, 'Food buffs last twice as long, so you waste fewer between pulls.'], ['Diplomat', 5, 'Faster reputation for faction gear and recipes.'], ['Frequent Flier', 1, 'Faster group meetups.'], ['Reinforce', 5, 'Lower repair bills when learning raid fights.'], ['The Quick and the Dead', 1, 'Move faster while dead.']] },
];
RF.guide.legacyNote = 'Legacy points are earned across your whole account and spent per character. You can spend up to 16 per character at launch, and 65 can be earned. Reaching 25, 45 and 60 on each class and raising crafting professions earns them. One point per rank is the planning assumption, because the client does not state the rank cost. You can reset your choices, so nothing here is permanent. Talented cannot be unlearned while your talent points depend on it: unlearn class talents first.';
RF.guide.noVideo = {
  poised: 'Poised is passive: nothing plays on screen. You only see a lower cost on your opener.',
  'safe-fall': 'Safe Fall is passive with no animation. You simply take less damage when you land.',
  'detect-traps': 'Detect Traps has no animation of its own. It lets you see trap symbols on the ground.',
  'blinding-powder': 'A crafting recipe with no in-world effect.',
  poisons: 'Poisons is a skill rather than a spell. See the individual poison pages.',
  shank: 'No clip yet. Shank leaves no buff or debuff icon, and it never shows in a combat log we could read, so nothing in the footage proves a press. A guessed clip could teach you the wrong thing, so there is none here.',
  'death-mark': 'No clip yet. Death Mark is a deep Subtlety talent, and no footage we could check uses it. Videos only read out its tooltip. Forever launched on November 4, so real footage should appear soon.',
  preparation: 'No clip yet. Preparation is instant and leaves no icon: the only sign is your long cooldowns coming back. Videos talk about it, but none shows a press we can prove.',
  premeditation: 'No clip yet. There is no swing to watch: two combo points simply appear on your target. Videos name it while playing, but none shows the press clearly enough to prove it.',
  feint: 'No clip yet. Feint only lowers your threat, so it leaves no buff or debuff icon to prove a press. Watch your threat instead: it is a raid button, not a visual one.',
  'instant-poison': 'No clip yet. A proc is only an extra nature damage number with no icon, and no combat log we could read shows one. For how poison damage looks between weapon hits, see the Deadly Poison clip.',
  'mind-numbing-poison': 'No clip yet. No footage we could check uses it. It leaves a debuff on the target and slows spell casts, so there is little to see unless you are the caster.',
};
