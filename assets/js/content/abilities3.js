/* Ability guide, part 3: Subtlety tab, Lockpicking and Poisons. */
Object.assign(RF.guide.abilities, {
  stealth: {
    role: 'Core', one: 'Become nearly invisible while moving slower. Everything good starts here.',
    what: 'You hide from enemies, moving at reduced speed: the penalty falls as ranks go up, to 30% at rank 4. Attacking or taking damage breaks it. It has a 10 second cooldown after you leave stealth. Mobs and players can still detect you if you get too close: the higher their level compared to you, the further they see.',
    why: 'Choosing when a fight starts is the largest advantage in the game. Every rogue opener needs stealth, and it lets you skip dangerous mobs, reach quest objectives and pick your targets. A rogue who is seen first has already lost most of their advantage.',
    tips: {
      b: ['Press it after each fight while you recover, so nothing can jump you.', 'Do not walk straight at mobs. Approach from behind, where detection is weakest.', 'Use the macro with "!Stealth" so double presses do not knock you out of stealth.'],
      i: ['Detection is much shorter from behind and at the side than from the front, so path around.', 'Camouflage cuts the speed penalty by 15% and the cooldown by 6 seconds, the most comfortable talent while leveling.', 'Master of Deception makes you harder to see as if you were 3 levels higher. Take it when fighting higher-level players or higher-level content.'],
      a: ['Night Elf rogues are harder to detect (1 level better) in Forever. Combined with Master of Deception that is 4 levels of advantage.', 'Distract now lowers enemy detection as if they were 1 level lower for 10 seconds, on top of turning them around.', 'Sprint in stealth: the speed bonus and the penalty combine, so you move faster than most running players while invisible.']
    },
    counteredBy: [['hunter', 'Track Hidden boosts detection and marks hidden units on the minimap. Flare reveals stealth in a 10 yard radius for 30 sec.'], ['druid', 'Faerie Fire stops you from re-entering stealth for 40 sec. Prowling Druids can also see you with their own detection.'], ['warlock', 'The Felhunter\'s Paranoia raises detection, and any area damage such as Rain of Fire knocks you out.'], ['warrior', 'Thunder Clap and Whirlwind hit you if you are nearby. Stealth does not protect from area damage.'], ['mage', 'Arcane Explosion and Frost Nova catch stealthed players by accident in melee range.'], ['priest', 'Holy Nova reveals you if you are close, and a damage-over-time from earlier in the fight keeps knocking you out of stealth.'], ['rogue', 'Sap and Heightened Senses. A rogue who sees you first gets to open first.']],
    counters: [['mage', 'They do not see you until you are in melee range: their range advantage is gone.'], ['warlock', 'Same. Open on them before Fear or the pet is ready.'], ['priest', 'Reach them before any shield is up.'], ['shaman', 'Reach them without a Sentry Totem in place and before totems drop.']],
    pair: ['ambush', 'sap', 'cheap-shot', 'pick-pocket']
  },
  'pick-pocket': {
    role: 'Utility', one: 'Steal money and items from humanoids without a fight.',
    what: 'While in stealth, stand close to a humanoid and steal. It has no cost and no cooldown, but only one pick per target until they respawn. It gives money, junk to sell and useful items, including some lockboxes.',
    why: 'It is free money on every humanoid you were going to kill anyway. Over a character\'s life that pays for your training, your mount and your poisons. Rogues are never short of gold if they use this every time.',
    tips: {
      b: ['Turn on Auto Loot in options, so a single press takes everything.', 'Stop moving for a moment. You cannot pick while walking.', 'Use the macro that picks and then Ambushes with one press.'],
      i: ['Lockboxes from pockets sell well or open with Pick Lock.', 'Before a dungeon boss, pick the humanoid trash on your way.', 'Sap a humanoid first, then pick its neighbors safely.'],
      a: ['In some dungeons, certain mobs carry quest keys or useful rare items in their pockets. It is worth a look on a slow run.', 'Your Pick Pocket can fail if you are detected. A higher Master of Deception helps against high-level targets.']
    },
    counteredBy: [], counters: [], note: 'It only works on NPC humanoids, so no player class counters it.',
    pair: ['stealth', 'sap', 'pick-lock']
  },
  sap: {
    role: 'Control', one: 'Takes a humanoid out of a fight for up to 45 seconds, from stealth.',
    what: 'From stealth, you incapacitate a humanoid that is not in combat. Rank 3 lasts up to 45 seconds. Any damage breaks it. In Forever it does not break your stealth, and it does not trigger your weapon procs. It costs 65 Energy, and only 1 target at a time (2 with Quick Getaway).',
    why: 'It removes one enemy from a fight before the fight even begins. In a dungeon that is one fewer mob. In PvP it can take a healer out, let you run past someone, or give you a 45 second head start. Because stealth stays on, you can Sap and then open on a different target from behind, which turns a 2-on-1 into a 1-on-1.',
    tips: {
      b: ['Only humanoids can be sapped: mobs like beasts or undead are immune.', 'Warn your group which mob you sapped, so nobody hits it.', 'Sapping costs a lot: wait for full Energy before you press it if you also want to open with an attack.'],
      i: ['Dirty Tricks cuts its cost by up to 50%. That is the difference between Sap and open, and Sap and wait.', 'Quick Getaway lets you keep a second target sapped and adds 30% speed for 3 seconds after sapping.', 'Do not run bleeds nearby, or stand near a Blade Flurry: it will break on any damage.'],
      a: ['Against 2 players: Sap the healer, then Cheap Shot the damage dealer. When the Sap ends, you can do it again through a Vanish.', 'Sap a stealthed Rogue or Druid the moment you spot them. They cannot act, and they cannot Sap you.', 'If you run out of time, Sap and walk away: you can often disengage from a fight you would lose, with no cooldown used.']
    },
    counteredBy: [['warrior', 'Berserker Rage makes them immune to Incapacitate effects for 10 sec. Watch for the stance.'], ['paladin', 'Divine Shield removes it, and they can then heal up.'], ['mage', 'Ice Block removes it. Arcane Explosion by a teammate can also break it.'], ['druid', 'Shapeshifted Druids are not humanoid. Bear, Cat and Travel Forms cannot be sapped.'], ['shaman', 'Ghost Wolf is not a humanoid form, so it cannot be sapped while running.']],
    counters: [['priest', 'Takes the healer out completely before you touch their ally.'], ['mage', 'Sapped Mage cannot Blink, Nova or Sheep. You choose when the fight begins.'], ['warlock', 'Sap the Warlock, then kill their pet or their teammate.'], ['hunter', 'Sap the Hunter while the pet stays passive beside them.'], ['rogue', 'First to see the other wins: a sapped Rogue cannot do anything.']],
    pair: ['stealth', 'cheap-shot', 'ambush', 'pick-pocket']
  },
  poised: {
    role: 'Passive', one: 'New in Forever. Your first ability from full Energy costs 10 less.',
    what: 'A passive learned at level 18. While you are at maximum Energy and out of combat, your next ability costs 10 less Energy. Composure can raise this to 20 less.',
    why: 'Every fight starts with a costly opener. This makes that opener cheaper, so you have 10 to 20 more Energy immediately after it, which is often one extra builder early in the fight. It rewards patience: waiting until you are at full Energy before you start.',
    tips: {
      b: ['You do not press anything: it is automatic. Just wait for full Energy before opening.', 'Combined with stealth: wait, then open.'],
      i: ['Composure (Combat): 10 more off. That is a strong opening with Ambush, Cheap Shot or Sap.', 'Every opener benefits, so do not start a fight at 90 Energy if you can help it.'],
      a: ['Vanish then wait a moment: you can regain the discount for a second opener in the same fight if you leave combat.', 'Sap also benefits. It costs 65, so a Poised Sap leaves enough Energy for a Cheap Shot soon after.']
    },
    counteredBy: [], counters: [], note: 'This is a passive energy discount, so no class interacts with it directly.',
    pair: ['ambush', 'cheap-shot', 'sap', 'garrote']
  },
  distract: {
    role: 'Utility', one: 'Throw something so enemies turn around, without breaking stealth.',
    what: 'A thrown noise at up to 30 yards. Nearby enemies look at it for 10 seconds. In Forever, they also detect stealth as if they were 1 level lower during that time. It costs 30 Energy and has a 30 second cooldown.',
    why: 'Mobs that are facing away see you at a much shorter distance. Distract makes any guard or patrol look the other way, so you get past them, or get behind a mob for Ambush. It costs little, and it solves the most common problem for a rogue trying to reach something.',
    tips: {
      b: ['Throw it past the mob, so it turns its back toward you.', 'Use it on patrols and guards standing in doorways.'],
      i: ['Use the cursor macro: no targeting circle, so you can react quickly.', 'It affects a group, so you can turn a whole pack.'],
      a: ['On players it only turns their character for a moment. It is mostly a tool for NPCs, so do not count on it in a duel.', 'Combining the 1 level detection reduction with Master of Deception is excellent when sneaking past higher-level mobs.']
    },
    counteredBy: [], counters: [], note: 'Distract is a sneaking tool for NPCs. It barely affects players, so no class matchup depends on it.',
    pair: ['stealth', 'sap', 'ambush']
  },
  vanish: {
    role: 'Escape', one: 'Instantly drop into stealth in the middle of a fight.',
    what: 'You leave combat and enter an improved stealth for 10 seconds. It also breaks movement-slowing effects. It has a 5 minute cooldown (reduced by Elusiveness) and needs a reagent. Rank 2 at level 42 is stronger.',
    why: 'It is the only reset button in the game: you go from losing to invisible with one press, and you can open again from stealth. It does not just save your life, it gives you a second Ambush or Cheap Shot, so it can turn a losing fight around. That is why a good rogue player always counts the enemy\'s and their own Vanish.',
    tips: {
      b: ['Press it when a fight is lost. Then move away and heal up.', 'Use the "stop attacking" macro so your auto-attack does not pull you back out.', 'Damage knocks you out of stealth, so wait a moment if a damage-over-time on you is about to end.'],
      i: ['Vanish then Cheap Shot (or Ambush) is your second opener in a fight. Have Energy for it.', 'It also drops threat in a dungeon: last resort when you take aggro.', 'Check your reagents. If you run out, you lose your best escape. Buy several Flash Powder.'],
      a: ['Timing: Vanish as a long cast on you is about to finish. With you gone, the caster has no target and the spell is wasted.', 'Against a Warlock, drop your Vanish after their Corruption wears off, since ticking DoTs can pull you out of stealth.', 'Elusiveness takes 90 seconds off. Preparation resets it, so a Subtlety rogue can Vanish twice in one fight: that is a major part of why Subtlety wins long fights.']
    },
    counteredBy: [['warlock', 'DoT ticks after Vanish can pull you back out of stealth. Curses and Corruption are the classic examples.'], ['priest', 'Shadow Word: Pain and Devouring Plague knock you out of stealth when they tick.'], ['hunter', 'Flare and Hunter\'s Mark (tracks you even in stealth) reduce the value a lot.'], ['druid', 'Faerie Fire prevents stealth entirely for 40 sec. Vanish is disabled while it holds.']],
    counters: [['warrior', 'Removes Hamstring and resets the fight: you get a new opener.'], ['paladin', 'Ends the long melee fight where they out-sustain you. They rarely have reveals.'], ['mage', 'Breaks Frost Nova and the slow. Stops them from nuking you at range.'], ['shaman', 'Breaks Earthbind\'s slow and lets you reposition away from their totems.'], ['rogue', 'Used after they spent theirs, it gives you a second opener they cannot answer.']],
    pair: ['stealth', 'cheap-shot', 'sprint', 'preparation']
  },
  'detect-traps': {
    role: 'Utility', one: 'Greatly improves your chance of spotting traps.',
    what: 'A passive-style ability, learned at level 24, that greatly raises your chance to see hidden traps in the world and player traps.',
    why: 'Hunter traps can lock you for many seconds. Seeing them lets you walk around or Disarm them, which turns the Hunter\'s preparation into a waste.',
    tips: {
      b: ['Learn it when you can. Then just look out for trap symbols on the ground.'],
      i: ['Against a Hunter, walk toward them slightly sideways, so you do not run straight onto the trap they placed between you and them.'],
      a: ['If you see a trap in a battleground, tell your team. It also tells you a Hunter is nearby.']
    },
    counteredBy: [],
    counters: [['hunter', 'Traps are a Hunter\'s main defensive plan against melee. Seeing them ruins that plan.']],
    pair: ['disarm-trap', 'stealth']
  },
  'disarm-trap': {
    role: 'Utility', one: 'Remove a trap from a safe distance.',
    what: 'A 2 second cast from 5 yards. It removes the trap. Get too close and it goes off.',
    why: 'In dungeons, traps can kill a run. In PvP it removes a Hunter\'s preparation. It costs you nothing but time, so whenever you are not in danger it is always better than walking through.',
    tips: {
      b: ['Stand back about 5 yards, then cast. If you get closer, it triggers.'],
      i: ['Use it in dungeons that have traps in corridors, before the group runs through.'],
      a: ['Disarming a Freezing Trap in the open at the start of a Hunter fight removes their best control for 30 seconds. They will likely not expect it.']
    },
    counteredBy: [],
    counters: [['hunter', 'Removes a trap they have spent a global cooldown setting up.']],
    pair: ['detect-traps', 'stealth']
  },
  blind: {
    role: 'Control', one: 'Blinds a target within 10 yards for up to 10 seconds. Any damage ends it.',
    what: 'Thrown powder that makes a target wander blindly for up to 10 seconds. It works on anything that is not immune, not only humanoids, and in combat too. It needs Blinding Powder as a reagent and has a 5 minute cooldown (less with Elusiveness). It costs 30 Energy.',
    why: 'Your only ranged crowd control and your only mid-combat control that does not depend on combo points. It can stop a healer, stop a fleeing target, or get you out of a fight so you can run or bandage. It is one of the strongest cooldowns in rogue play because it answers nearly every situation.',
    tips: {
      b: ['Keep Blinding Powder on you. It is made with the Poisons skill.', 'Use it to stop a mob, then bandage or run.', 'Stop your auto-attack first, or your next swing breaks it. There is a macro for this.'],
      i: ['Blind the healer, kill the damage dealer. The Shift-focus macro does this without changing your target.', 'Elusiveness reduces its cooldown by 90 seconds.', 'Use it as your answer when the enemy pops a healing potion, or when you need a few seconds.'],
      a: ['It has a 10 yard range, so it works when they run from you. Blind a fleeing healer as they hit a health potion.', 'To leave a fight without Vanish: Blind, step away, then re-enter Stealth as soon as your combat drops.', 'Hold it for a Paladin bubble: after Divine Shield ends, they are at their most vulnerable, and they cannot bubble again soon because of Forbearance.']
    },
    counteredBy: [['paladin', 'Divine Shield removes it. In Classic, Blind counts as a poison effect, and its numbers are unchanged in Forever, so expect Purify and Cleanse to clear it too.'], ['shaman', 'Cure Poison can clear it, under the same Classic rule.'], ['druid', 'Cure Poison and Abolish Poison, as above.'], ['warrior', 'Check for Berserker Rage first: its immunity covers Incapacitate effects.'], ['mage', 'A team\'s area damage will break it. Ice Block will remove it.'], ['hunter', 'A pet hitting you is unaffected. Remember to control the pet too.']],
    counters: [['priest', 'Takes a healer out for 10 sec when Kick and Gouge are on cooldown.'], ['warlock', 'No answer to it except pet damage hitting someone else. A long window to run or heal.'], ['mage', 'Stops casting for 10 sec. They need Ice Block to escape it.'], ['rogue', 'Stops their chain if they are not Vanishing, and gives you time to Vanish first.']],
    pair: ['kick', 'gouge', 'vanish', 'blinding-powder']
  },
  'death-mark': {
    role: 'Finisher', one: 'New in Forever. Stores your damage on the target and detonates after 6 seconds.',
    what: 'The Subtlety capstone talent. A finisher that marks the target for 6 seconds. A share of your attack damage is stored per combo point (up to 60% at 5 points), and bleeds count double. After 6 seconds, the stored amount hits at once, up to a cap that grows with Attack Power and crit chance. Costs 25 Energy, 10 second cooldown, 20 yard range.',
    why: 'Damage arrives as a single huge hit that nothing can react to until too late. Since bleeds are stored at twice the rate, it is what turns your Rupture and Garrote upkeep into burst. It rewards planning ahead: apply bleeds, mark, then put all your Energy into hits during the window.',
    tips: {
      b: ['Use at 5 combo points on a target that will live at least 6 more seconds.', 'Have your bleeds running first, as they count double.', 'Use it from range if needed: it reaches 20 yards.'],
      i: ['Coup de Grace raises its damage and store rate by up to 20%. Take it with a few Combat points.', 'Line it up with Kidney Shot so the target stands still during the store window.', 'The cap rises with Attack Power and crit, so those stats also raise the burst limit.'],
      a: ['If the cap would be hit, you are better off with a higher-AP window. Pool Energy and use trinkets and racials during the window.', 'Death Mark has a 10 second cooldown, shorter than most fights, so you can keep cycling it as long as you can keep making points.', 'Shank with Boot Knife adds 2 points at once: useful right after your previous mark to get back to 5 quickly.']
    },
    counteredBy: [['paladin', 'Divine Shield can make the detonation do nothing. Wait for immunity to come and go first.'], ['mage', 'Ice Block at the wrong moment wastes it. Bait the Block.'], ['priest', 'Power Word: Shield absorbs the detonation.'], ['druid', 'Blizzard\'s notes call Death Mark a curse, so expect Remove Curse to clear it. Mages have Remove Lesser Curse and Orcs have Shatter Curse for the same reason.']],
    counters: [['warrior', 'Bleed damage ignores armor, then the stored hit comes down all at once. Your best kill plan into plate.'], ['paladin', 'After their immunity is used up, a mark in the next stun is your finisher.'], ['hunter', 'It reaches 20 yards, so it can be applied as they gain distance.'], ['rogue', 'Evasion does not stop stored bleed damage, so a mark during their Evasion still pays out.']],
    pair: ['hemorrhage', 'rupture', 'garrote', 'shank']
  },
  'safe-fall': {
    role: 'Passive', one: 'Reduces falling damage.',
    what: 'A passive learned at level 40. You take less damage from falling.',
    why: 'Rogues have many shortcuts available in the world: jumping off a ledge beats walking around a mountain. It saves travel time, and it lets you take the shortest way out of a bad fight.',
    tips: {
      b: ['Learn it and enjoy: jump off things that used to hurt.'],
      i: ['In PvP, jump off a cliff to break line of sight or lose a melee chaser.', 'Skyborne have Walk on Air, which is a different and stronger way of avoiding falls.'],
      a: ['Use it for quick escape routes, like jumping from the rises of Thunder Bluff or off the cliffs near a road.']
    },
    counteredBy: [], counters: [], note: 'A passive travel skill, not something classes interact with.',
    pair: ['sprint', 'vanish']
  },
  premeditation: {
    role: 'Cooldown', one: 'Adds 2 combo points instantly, even from 20 yards.',
    what: 'A Subtlety talent. It gives 2 combo points on your target. You must use or add to them within 20 seconds, or they are lost. It has a 2 minute cooldown and costs no Energy. In Forever it no longer requires stealth.',
    why: 'Combo points are the real currency of a rogue. Two free points effectively save a builder or two, which is 70 to 120 Energy. With the first attack added, you can Kidney Shot almost immediately.',
    tips: {
      b: ['Use it just before you open with Ambush or Cheap Shot.', 'Use the macro so it fires as part of your opener.'],
      i: ['Combine with Cheap Shot: 2 + 2 = 4 points, so a Kidney Shot of 4 points or more after one builder.', 'Works outside stealth in Forever. Use it in a long fight to reach 5 points quickly.'],
      a: ['Use it during a Blind or Sap to prepare before the fight restarts.', 'Have the finisher in mind before you use it: a wasted Premeditation is a 2 minute loss.']
    },
    counteredBy: [['paladin', 'Immunity during your burst wastes the points. Time it after they use Divine Shield.'], ['mage', 'A Blink can carry them out of reach, and the points expire after 20 seconds if you cannot get back.']],
    counters: [['warlock', 'Kidney Shot can come so fast they cannot Fear in time.'], ['priest', 'Kidney Shot comes so soon it stops the first heal.']],
    pair: ['ambush', 'cheap-shot', 'kidney-shot', 'eviscerate']
  },
  'ghostly-strike': {
    role: 'Builder / Defensive', one: 'A strike that raises dodge and lets your next Ambush or Garrote skip stealth.',
    what: 'A Subtlety talent. A strike for 125% weapon damage (180% with a main-hand dagger) that gives 1 combo point. You also gain 15% dodge for 7 seconds, and your next Ambush or Garrote within 7 seconds does not require stealth. It costs 40 Energy, with a 20 second cooldown.',
    why: 'It breaks the biggest rule of rogue play, that openers only come from stealth. You can now bring your hardest hit into the middle of a fight, on a timer. The dodge is also a real defense, so you get value on offense and defense from one button.',
    tips: {
      b: ['Use it whenever it is available if you plan to Ambush next, with a dagger.', 'Do not save it: its 20 second cooldown means many uses in long fights.'],
      i: ['Ghostly Strike into Ambush for a big burst while they are stunned, which is the Subtlety dagger line.', 'Hemo builds that lack daggers use it into Garrote instead, giving a mid-fight bleed.', 'The dodge helps most against melee classes. Against casters, take it as pure damage.'],
      a: ['Set up: use it, then Kidney Shot, then Ambush from behind during the stun.', 'Setup talent adds a chance for a free combo point on each dodge, and this gives 15% more dodge.', 'Blizzard reduced how much Dagger builds gain from it just before launch. Numbers shown here are the launch numbers.']
    },
    counteredBy: [['warrior', 'Overpower punishes dodges, so 15% more dodge can feed them.'], ['mage', 'Dodge does nothing against spells, so half the value disappears.'], ['warlock', 'Same: no value from dodge against spell damage.']],
    counters: [['rogue', 'Dodges more of their attacks in a burst window.'], ['paladin', 'Your second Ambush lands after they use up Divine Protection.'], ['hunter', 'Dodges their pet and melee hits, and adds more damage.']],
    pair: ['ambush', 'garrote', 'kidney-shot', 'hemorrhage']
  },
  preparation: {
    role: 'Cooldown', one: 'Resets the cooldowns on your other Rogue abilities.',
    what: 'A Subtlety talent, on a 10 minute cooldown. It instantly finishes the cooldown of your other Rogue abilities.',
    why: 'Every rogue cooldown is long: Vanish, Blind, Sprint and Evasion at several minutes each. This gives you them all a second time in the same fight. In PvP that is often the difference between one kill and two, or between dying and escaping.',
    tips: {
      b: ['Use it after you have used Vanish, Sprint and Evasion in a fight that is still going.', 'Do not press it with nothing on cooldown: you waste 10 minutes.'],
      i: ['The most valuable reset is usually Vanish, because it gives a new opener and a new chance.', 'Plan a sequence: Vanish, Cheap Shot, Kidney, then Preparation, Vanish again, Cheap Shot again.'],
      a: ['In a battleground, you can take the fight to the healer, Blind them, use Preparation, and Blind again.', 'Trinket and racial cooldowns are not reset. Only Rogue abilities.', 'Check the Death Mark and Kidney cooldowns too: those reset as well.']
    },
    counteredBy: [['warlock', 'Damage-over-time effects knock you out of a second Vanish just as they did the first.'], ['hunter', 'Flare can still reveal you after a reset Vanish.']],
    counters: [['warrior', 'Doubles your escape tools against their relentless chase.'], ['paladin', 'Lets you outlast Divine Shield and Lay on Hands with a second full chain.'], ['rogue', 'In the mirror, whoever has their cooldowns last wins. This is the win button.']],
    pair: ['vanish', 'blind', 'kidney-shot', 'cheap-shot']
  },
  hemorrhage: {
    role: 'Builder', one: 'Cheap builder that works with any weapon and boosts your bleeds.',
    what: 'A Subtlety talent. It strikes for 100% weapon damage (145% with a dagger) and gives 1 combo point. The target takes 15% more damage from your Rupture and Garrote for 15 seconds. It costs 35 Energy, or 30 with Efficient Strikes.',
    why: 'No position or dagger requirement, and a cost lower than Backstab. You press it more often, which means more combo points and more finishers. It also amplifies your bleeds. That combination is why Subtlety has the highest action rate of any rogue spec.',
    tips: {
      b: ['This is your main builder if you take the talent. Press it whenever you are below 5 points.', 'Use your highest-damage weapon. Slow is good here, since it strikes for weapon damage.'],
      i: ['Keep the debuff up before refreshing your bleeds: the increase applies to ticks while it is active.', 'Efficient Strikes reduces its cost by 5, so you get more uses per fight.'],
      a: ['A dagger hits for 145%, but a slow sword may still do more because weapon damage per hit is bigger. Compare hit damage, not just DPS.', 'Death Mark stores more if your bleeds are doing more, so this button raises both tick damage and the detonation.', 'Blizzard cut dagger Hemorrhage damage before launch. Numbers shown here are the launch numbers.']
    },
    counteredBy: [['warrior', 'Disarm stops it for 10 sec.'], ['paladin', 'Divine Shield and Divine Protection: the debuff will not matter if no damage lands.'], ['rogue', 'Evasion makes it dodge, which wastes Energy.']],
    counters: [['warrior', 'Adds bleed damage that ignores armor, and works from the front.'], ['hunter', 'No need to get behind a hunter who is turning and kiting you.'], ['mage', 'Cheap pressing while they are stunned adds up to many combo points quickly.']],
    pair: ['rupture', 'garrote', 'death-mark', 'shank']
  },
  'pick-lock': {
    role: 'Secondary skill', one: 'Open locked chests, doors and lockboxes.',
    what: 'Lockpicking is a secondary skill in Forever, like First Aid. You raise it by opening locks. A 5 second cast, at up to 5 yards. It opens chests and locked doors your skill allows.',
    why: 'Skips keys in dungeons, makes money from lockboxes, and opens chests others cannot. It is a real source of gold while leveling, and it can save a group a long walk.',
    tips: {
      b: ['Practice on lockboxes that you pick from pockets. Your skill rises as you open them.', 'Ask your group: other players often pay to have their lockboxes opened.'],
      i: ['Keep your skill level up with your character level, so you can open what you find.', 'Some dungeons have locked doors that a key normally opens: Blackrock Depths and Scholomance are the classic examples.'],
      a: ['Use the Trade window: you can open a lockbox without taking it, so other players trust you with it.']
    },
    counteredBy: [], counters: [], note: 'A world and dungeon skill, not something classes counter.',
    pair: ['pick-pocket', 'stealth']
  },
  poisons: {
    role: 'Secondary skill', one: 'Lets you make poisons from about level 20, after your class quest.',
    what: 'Poisons is a secondary skill in Forever, like First Aid. You make your poisons from bought and found ingredients. In this version, weapon oils and sharpening stones can be used on your weapon at the same time as a poison.',
    why: 'Poisons are a large part of rogue damage and control. A rogue without poisons can lose a big share of their damage, and they are cheap to make. The new ability to stack a stone on a poison means you can gain even more than Classic rogues could.',
    tips: {
      b: ['Do your class quest around level 20. It is what unlocks Poisons.', 'Buy your ingredients from a Poison Vendor in your capital or a rogue trainer area.', 'Refresh your poison before you go into a dungeon. It lasts 30 minutes, or until its charges run out.'],
      i: ['Put a different poison in each hand: typically damage on the main hand, and utility or Deadly on the off-hand.', 'Use weapon stones too. Forever allows it, and stones are cheap.', 'Patch note: Poisons no longer trigger against targets attacking you, and Sap no longer triggers weapon procs.'],
      a: ['Vile Poisons and Improved Poisons increase poison damage and chance, plus some resistance to dispel, so Assassination gets the most from this.', 'Keep extra poisons in your bags for long raids. Charges run out.']
    },
    counteredBy: [['paladin', 'Purify and Cleanse remove them.'], ['shaman', 'Cure Poison and Poison Cleansing Totem.'], ['druid', 'Cure Poison and Abolish Poison, and shapeshifting.']],
    counters: [['mage', 'Mages cannot cleanse poisons (only curses).'], ['warlock', 'No poison cure on the class.'], ['priest', 'Priests cure disease, not poison.'], ['warrior', 'No cleanse at all.'], ['rogue', 'No cleanse at all.'], ['hunter', 'No cleanse at all.']],
    pair: ['instant-poison', 'deadly-poison', 'crippling-poison', 'wound-poison']
  },
  'blinding-powder': {
    role: 'Reagent', one: 'Makes the powder that Blind needs.',
    what: 'A Poisons recipe at level 34. Creates Blinding Powder, the reagent required to use Blind.',
    why: 'Blind is one of your best cooldowns, and with no powder it does not work. Making a stack costs little compared with the deaths that running out will cost you.',
    tips: { b: ['Make a stack as soon as you learn Blind.'], i: ['Check your count before any PvP or dungeon session.'], a: ['Keep a spare stack in your bank or alt: you will forget otherwise.'] },
    counteredBy: [], counters: [], note: 'A crafting recipe.', pair: ['blind', 'poisons']
  },
  'instant-poison': {
    role: 'Poison', one: 'Each hit has a chance to deal instant Nature damage.',
    what: 'You coat a weapon. Each strike has a 20% chance to inflict Nature damage immediately. Top rank is 76 to 100 damage. Blizzard doubled its Attack Power scaling (1%) right before launch.',
    why: 'It deals immediate damage, so it works on anything, even on mobs that die quickly. It ignores armor because it is Nature damage, so it does well against plate. That is why it is the default main-hand poison for leveling and for short fights.',
    tips: {
      b: ['Use it on your main hand while leveling.', 'Re-apply every 30 minutes. It also uses charges: watch the buff.'],
      i: ['Fast weapons get more chances. A fast off-hand can be better for this poison than a slow main hand.', 'Improved Poisons raises the chance and can save charges.'],
      a: ['Nature-immune or resistant mobs ignore it. Check the dungeon page: some bosses are immune.', 'Against targets with high armor, poison is a larger share of damage: often worth swapping to full damage poisons.']
    },
    counteredBy: [['shaman', 'Nature Resistance Totem reduces it.'], ['druid', 'Mark of the Wild adds a little resistance.'], ['paladin', 'Divine Shield stops all of it while up.']],
    counters: [['warrior', 'Ignores plate armor entirely: real damage where your weapon does little.'], ['paladin', 'Same: armor does not reduce it.'], ['druid', 'Bear armor does not reduce it.'], ['mage', 'Instant, unavoidable extra damage that they can\'t cleanse.']],
    pair: ['deadly-poison', 'slice-and-dice', 'blade-flurry']
  },
  'deadly-poison': {
    role: 'Poison', one: 'Stacks a poison on the target that ticks up to 5 times.',
    what: 'You coat a weapon. Each strike has a 30% chance to apply a poison dealing Nature damage over 12 seconds, stacking up to 5 times. Top rank is 92 per stack over 12 seconds. Blizzard doubled its Attack Power scaling (0.9%) before launch.',
    why: 'Five stacks of a damage-over-time is a strong damage source against anything that lives long enough. It is also the main reason for the Mutilate bonus: a poisoned target takes 20% more from Mutilate. Long fights, like bosses, are where it wins over Instant Poison.',
    tips: {
      b: ['Use on long fights and for an Assassination rogue.', 'It takes time to stack. On short fights, Instant Poison is better.'],
      i: ['Keep up the stacks by keeping up your swing rate: Slice and Dice helps here.', 'Vile Poisons adds 20% damage and dispel resistance.'],
      a: ['It is Nature damage: bosses that resist or are immune can make Assassination weak. Check the dungeon pages for immunities.', 'Venom (Shank) adds 30% damage and 20% application chance for 6 seconds: keep it active for the most damage.', 'It carries through Vanish, so the target keeps taking damage while you reposition. This also means it can keep them in combat.']
    },
    counteredBy: [['paladin', 'Purify and Cleanse strip the stacks, undoing a lot of time.'], ['shaman', 'Poison Cleansing Totem removes one every 5 seconds. Kill the totem: it has 5 health.'], ['druid', 'Abolish Poison cures it over time.']],
    counters: [['mage', 'They cannot cleanse it, and it stops them from drinking while it ticks.'], ['warlock', 'No poison cure on the class, so the pressure stays on.'], ['priest', 'Priests cannot cleanse poison, only disease.'], ['warrior', 'Ignores armor and they have no cleanse.'], ['hunter', 'No cleanse, and they have to stop kiting if you keep it up.']],
    pair: ['mutilate', 'shank', 'instant-poison']
  },
  'crippling-poison': {
    role: 'Poison', one: 'A chance per hit to slow the target by up to 70%.',
    what: 'You coat a weapon. Each strike has a 30% chance to slow the target\'s movement. Rank 1 is 50%, rank 2 is 70%, for 12 seconds. It deals no damage.',
    why: 'Being in melee range is your whole plan. A slowed enemy cannot escape, so you can spend fewer cooldowns chasing them. A 70% slow on someone running away means they might as well stand still.',
    tips: {
      b: ['Put this on your off-hand for PvP.', 'It is not useful in most group content. Use damage poisons instead.'],
      i: ['A fast off-hand weapon applies it faster.', 'A dispel-heavy enemy will clear it, but then they have spent time and mana.'],
      a: ['Against Paladins: Blessing of Freedom gives immunity, so wait for its 10 seconds to pass before you rely on it.', 'Hit-and-run line: Crippling, Vanish, Cheap Shot, without losing them.', 'Keep a Deadly main-hand as you go for the slow from a fast off-hand.']
    },
    counteredBy: [['paladin', 'Blessing of Freedom gives immunity for 10 sec, and Purify or Cleanse removes it.'], ['druid', 'Shapeshifting frees them from slows at once, and Cure Poison removes it.'], ['shaman', 'Cure Poison and Poison Cleansing Totem.'], ['mage', 'Blink breaks out of range, even though the slow stays on.']],
    counters: [['hunter', 'Stops kiting. A 70% slow turns their range game off.'], ['warrior', 'A slowed Warrior cannot catch you once you Sprint or Vanish, and Charge cannot be used in combat.'], ['warlock', 'They cannot get away from your melee range.'], ['priest', 'They cannot get away while running to safety.']],
    pair: ['sprint', 'kidney-shot', 'vanish', 'instant-poison']
  },
  'mind-numbing-poison': {
    role: 'Poison', one: 'A chance per hit to make enemy spells take much longer to cast.',
    what: 'You coat a weapon. Each strike has a 20% chance to increase the target\'s casting time by up to 60%, at the top rank, for 14 seconds.',
    why: 'Time is what a caster needs. A 3 second heal at +60% takes nearly 5 seconds, so you get a chance to Kick, or to end the fight first. It also works without any cooldown or Energy once it\'s applied.',
    tips: {
      b: ['Use it against healers and casters in PvP.', 'Not useful against melee classes, since they do not cast.'],
      i: ['On your off-hand it applies fast, with quick off-hand attacks.', 'It extends time for Kick to land, because cast bars move slower.'],
      a: ['Combine with Kick: with a slower cast bar, a later Kick gets more of their time.', 'Swap it in when you know the target: a Priest or Shaman fight gets more out of it than damage poison.']
    },
    counteredBy: [['paladin', 'Purify and Cleanse.'], ['shaman', 'Cure Poison and Poison Cleansing Totem.'], ['druid', 'Cure Poison and Abolish Poison, and instant Rejuvenation ignores casting times.'], ['priest', 'Instant Renew and Power Word: Shield are not slowed by this.'], ['warrior', 'No spells, so it is wasted.'], ['rogue', 'No spells, so it is wasted.']],
    counters: [['priest', 'Greater Heal and Flash Heal take much longer.'], ['mage', 'Frostbolt and Polymorph take much longer. A Polymorph you can interrupt is a win.'], ['warlock', 'Shadow Bolt and Fear both get slower, so Kick is easy.'], ['shaman', 'Healing Wave and Lightning Bolt get slower.']],
    pair: ['kick', 'gouge', 'instant-poison']
  },
  'wound-poison': {
    role: 'Poison', one: 'A stacking effect that reduces healing on the target.',
    what: 'You coat a weapon. Each strike has a 30% chance to apply a debuff that reduces healing effects on the target. Top rank reduces each heal by 165, stacking up to 5 times, for 15 seconds.',
    why: 'If a healer is keeping a target alive, reducing each heal is often better than adding more damage. Five stacks is a flat reduction of about 825 per heal: for small heals, that is nearly all of it. It is the rogue\'s own tool for healer teams.',
    tips: {
      b: ['Use this in PvP when healers are around.', 'It is not needed solo, since mobs rarely heal.'],
      i: ['It works best against many small heals: fast heals and heal-over-time ticks lose the most.', 'Stack it early before they start healing.'],
      a: ['Because the reduction is flat per heal, it is weakest against a huge single heal, and strongest against Renew, Rejuvenation or Riptide ticks.', 'Rogues with a fast off-hand reach 5 stacks quickly.', 'Mortal Strike and this do different jobs. Check with your team: both on one target is still strong.']
    },
    counteredBy: [['paladin', 'Purify and Cleanse. Big Holy Lights lose less, as the reduction is flat.'], ['shaman', 'Cure Poison and Poison Cleansing Totem. Kill the totem first.'], ['druid', 'Abolish Poison, Cure Poison.']],
    counters: [['priest', 'Renew ticks and small heals are nearly removed, and they cannot cleanse it.'], ['druid', 'Rejuvenation and Regrowth ticks lose a lot.'], ['shaman', 'Riptide and Lesser Healing Wave lose a lot, if the totem is dead.'], ['warlock', 'Drain Life and Siphon Life heal less. They have no cure.']],
    pair: ['deadly-poison', 'kick', 'kidney-shot']
  }
});
