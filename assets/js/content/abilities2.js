/* Ability guide, part 2: Combat tab. */
Object.assign(RF.guide.abilities, {
  'sinister-strike': {
    role: 'Builder', one: 'Your basic attack. Works with any weapon, from any side.',
    what: 'An instant strike for your weapon damage plus a small bonus. It gives 1 combo point. There is no need for a dagger or a specific position.',
    why: 'It is the reliable button: it works in every situation, so it is what you press when nothing else is possible. Because it adds your full weapon damage, a slow weapon with a big hit makes it stronger. That is the reason Combat rogues want a slow sword or axe in the main hand.',
    tips: {
      b: ['Press this whenever you have Energy and fewer than 5 combo points, unless you can Backstab.', 'Use the slowest, hardest-hitting weapon in your main hand: the hit is based on that damage.'],
      i: ['Efficient Strikes takes 5 Energy off. It is a huge gain over a whole fight, since this is the button you press most.', 'Aggression adds 15% damage to it. Combat talents are built around this button and Eviscerate.', 'When a mob turns to face you, switch from Backstab to this instead of losing Energy waiting.'],
      a: ['Lethality adds 20% to its crit damage. Cheap with a few Assassination points.', 'Plan Energy so you never sit at 100. Every second at full Energy is lost damage: it is the most common rogue mistake.', 'Remorseless Attacks gives 40% crit on the next one after a kill. On packs, kill the weak one first to carry the bonus to the next.']
    },
    counteredBy: [['warrior', 'Plate armor reduces it, and Disarm stops it from dealing weapon damage for 10 sec.'], ['rogue', 'Evasion makes it dodge a lot, which wastes your Energy. Stop pressing it into Evasion.'], ['hunter', 'Deterrence adds dodge and parry, and Aspect of the Monkey adds dodge. Wait out Deterrence.'], ['paladin', 'Holy Shield and block reduce or stop hits from the front.']],
    counters: [['mage', 'No armor and little dodge: every press lands in full.'], ['warlock', 'Same: a steady stream of combo points toward Kidney.'], ['priest', 'A reliable way to chip off shields and stop casting with damage pushback.']],
    pair: ['eviscerate', 'slice-and-dice', 'shank', 'gouge']
  },
  backstab: {
    role: 'Builder', one: 'A big dagger strike that only works from behind.',
    what: 'Deals 150% of your weapon damage plus a bonus. It needs a dagger in your main hand and you must be behind the target. Gives 1 combo point (Puncturing Wounds can add a second).',
    why: 'It trades flexibility for damage. Standing behind a target is free in a group, where the tank holds aggro, so you get far more damage per press than Sinister Strike. Behind the target you also avoid parries and blocks, which raises all your damage. In Forever, Puncturing Wounds makes it crit far more often.',
    tips: {
      b: ['Use it only when you are behind the target. In a dungeon that is most of the time, solo it is rarely possible without tricks.', 'Use Gouge when soloing: it holds the mob for 4 seconds so you can walk behind it.'],
      i: ['Puncturing Wounds: +30% crit chance and a 45% chance for an extra combo point at max rank. It is the talent that makes a dagger Combat build strong.', 'The fastest dagger is not the best: Backstab scales with damage per hit, so pick a slow, high-damage dagger.', 'Opportunity adds up to 20% more damage to it from the Subtlety tree.'],
      a: ['Standing behind also removes parry and block chances, so your Expertise needs drop to dodge alone. That is a big part of why positioning is treated as a stat.', 'Do not stand inside the enemy. A known Forever issue lets enemies parry and block from behind if you are very close: keep a small gap.', 'In PvP, Kidney Shot gives the moment to step behind for two or three free Backstabs.']
    },
    counteredBy: [['warrior', 'Hamstring slows you by 50%, so a Warrior who keeps turning stops you from circling behind them. Retaliation cannot counter attacks from behind, so Backstab stays safe during it.'], ['hunter', 'They keep their back away from you by kiting, and Wing Clip stops you from circling.'], ['rogue', 'Evasion and a player who keeps turning stops your Backstab: use Gouge or Hemorrhage.'], ['druid', 'Roots hold you in front of them, and stuns stop you from getting behind.']],
    counters: [['mage', 'High damage per press on a stunned, low-armor target. Get behind during Cheap Shot or Kidney Shot.'], ['warlock', 'Once you are behind a stunned Warlock, cloth armor means every press lands at nearly full value.'], ['priest', 'A stunned priest cannot keep shield and heal up against this hit rate.']],
    pair: ['gouge', 'kidney-shot', 'ambush', 'cheap-shot']
  },
  gouge: {
    role: 'Control', one: 'Incapacitates a target in front of you for 4 seconds. Any damage breaks it.',
    what: 'You hit the target and disable them for 4 seconds. They must be facing you. Any damage ends it, including your own poisons and bleeds. It stops your auto-attack and gives 1 combo point.',
    why: 'This is your only "take a break" button during a fight. It buys time to get behind a target, to let Energy refill, to bandage, or to run. It also comes with a combo point, so it is not lost tempo. The art of it is that doing nothing for a few seconds can be the strongest move.',
    tips: {
      b: ['When solo: Gouge, walk behind, then Backstab.', 'Do not have a damage-over-time on the target. Deadly Poison or Rupture ticks will break it at once.', 'Your attack turns off when you Gouge. That is good, it stops you from breaking it by accident.'],
      i: ['Improved Gouge adds up to 1.5 seconds. That is a big increase for this ability.', 'Use it to interrupt a cast when Kick is on cooldown. It stops the spell because the target is incapacitated.', 'After Gouge, let your Energy tick up, so you have enough for a full Kidney Shot and a few hits when it ends.'],
      a: ['Gouge, then Bandage for a mid-fight heal: First Aid bandages need you not to be hit, and this gives the window.', 'Cast Gouge while stepping forward to stay in range as they move: a target just out of reach will not be Gouged.', 'Blade Flurry and any cleave break it. Turn off auto attack and any cleave before you rely on it in a group.']
    },
    counteredBy: [['rogue', 'Evasion can make it dodge. Gouge is a melee attack, so it can be dodged, parried or missed.'], ['warrior', 'Berserker Rage gives immunity to Incapacitate effects for 10 sec.'], ['paladin', 'Divine Shield and Divine Protection remove it, and they then heal safely behind the immunity.']],
    counters: [['priest', 'Stops healing for 4 seconds, in addition to Kick, as a second interrupt.'], ['mage', 'Blocks a cast when Kick is on cooldown. A bit of extra time to catch Energy.'], ['warlock', 'A short window to run back in after a Fear, or to step away from their pet.'], ['shaman', 'Interrupts Healing Wave when Kick is on cooldown.']],
    pair: ['backstab', 'kick', 'kidney-shot', 'blind']
  },
  evasion: {
    role: 'Defensive', one: 'Doubles down on dodging: 50% more dodge for 15 seconds.',
    what: 'Adds 50% to your dodge chance for 15 seconds. It has a 5 minute cooldown (less with the Endurance talent). It only helps against attacks that can be dodged: melee and physical ranged hits, not spells.',
    why: 'With your base dodge from Agility, this can stop more than half of incoming melee hits. It turns a losing melee fight into a winning one for 15 seconds, or buys time for the tank to take aggro back. Knowing it only stops physical attacks is the whole skill: use it against the right threats.',
    tips: {
      b: ['Press it when a mob gets aggro on you or when two melee enemies hit you.', 'It does nothing against spells. Do not use it to survive a mage.', 'Use it early when a fight goes wrong, not at 10% health.'],
      i: ['Setup gives a 45% chance of a free combo point each time you dodge. With Evasion up that can feed a Kidney Shot without spending Energy.', 'Riposte becomes available after parrying (Evasion does not add parry). Deflection is what feeds it.', 'Endurance reduces its cooldown by up to 60%, which is the same as having it far more often in long fights.'],
      a: ['Against Warriors, dodging lets them use Overpower, which cannot be dodged. So Evasion is less effective against a Warrior than against a Rogue or Paladin. Save it for when you are low.', 'Against a Druid or Hunter pet, it is great: pets rely on melee hits.', 'Ghostly Strike adds another 15% dodge for 7 seconds, and it stacks with this.']
    },
    counteredBy: [['warrior', 'Overpower activates when you dodge and cannot be dodged, parried or blocked. Your dodges feed their damage.'], ['mage', 'Spells ignore dodge entirely. It does nothing against Frostbolt.'], ['warlock', 'Shadow Bolt, curses and damage-over-time ignore dodge.'], ['priest', 'Mind Blast and Shadow Word: Pain ignore dodge.'], ['shaman', 'Earth Shock and Lightning Bolt ignore dodge.']],
    counters: [['rogue', 'A rogue\'s whole offense can be dodged. Evasion at the start of their burst can ruin it.'], ['hunter', 'Pets and melee attacks miss heavily. Physical ranged hits can also be dodged.'], ['druid', 'Cat and bear attacks miss heavily, wasting their Energy and rage.'], ['paladin', 'Melee hits and their Seal procs depend on connecting.']],
    pair: ['sprint', 'riposte', 'vanish', 'ghostly-strike']
  },
  sprint: {
    role: 'Movement', one: 'Run 70% faster for 15 seconds. Works in stealth.',
    what: 'Your speed rises sharply for 15 seconds at the top rank (rank 1 and 2 are slower). It keeps you stealthed if you were stealthed. It has a 5 minute cooldown, reduced by Endurance.',
    why: 'Distance is life for a melee class. Sprint closes the gap to a target before they can react, or opens a gap so you can leave. Used from stealth it is especially strong: a stealth speed penalty becomes a huge speed gain, so you reach a target nobody sees coming.',
    tips: {
      b: ['Use it to catch a runner or to run away.', 'It does not remove slows or roots without a talent. If you are rooted, it does nothing until the root ends.'],
      i: ['Improved Sprint gives a 100% chance to clear slows and roots on activation with 2 points. It is an escape button that saves you from Frost Nova, roots and Hamstring.', 'Use it from stealth to reach a healer across open ground. Nobody can respond to what they cannot see.', 'Endurance lowers the cooldown by up to 60%, so you get many more uses.'],
      a: ['Against Frost Mages, do not burn it while frozen unless you have Improved Sprint. Wait for the freeze to end, then use it.', 'Sprint plus Crippling Poison makes it almost impossible for a target to escape.', 'In battlegrounds, use Sprint plus Stealth to cross the map to a flag carrier or an undefended point.']
    },
    counteredBy: [['mage', 'Frost Nova and Frostbolt slow or freeze you straight after. Without Improved Sprint it is wasted.'], ['druid', 'Entangling Roots holds you still until it breaks.'], ['warrior', 'Hamstring and Piercing Howl cut your speed by 50%.'], ['hunter', 'Concussive Shot and Wing Clip slow you, and Freezing Trap stops you entirely.'], ['shaman', 'Earthbind Totem slows you. Kill it: it has 5 health.']],
    counters: [['hunter', 'Crosses their preferred range in a few seconds.'], ['mage', 'Closes the distance after Blink.'], ['warlock', 'Runs through their Fear window and pet.'], ['druid', 'Keeps up with Travel Form or Cat Form running away.']],
    pair: ['vanish', 'evasion', 'stealth', 'crippling-poison']
  },
  kick: {
    role: 'Interrupt', one: 'Interrupts a cast and locks that spell school for 5 seconds.',
    what: 'A fast kick that stops a spell being cast and prevents the target from casting anything in that school for 5 seconds. Costs 25 Energy, 10 second cooldown. It does a little damage.',
    why: 'Casters need to finish spells to do anything. Five seconds of lockout on a healer\'s only school means no healing at all, and that is usually the kill. It is also why you always keep 25 Energy spare in any fight with a caster: being unable to Kick at the right moment loses fights.',
    tips: {
      b: ['Watch the enemy cast bar. Kick when you see a heal or a big spell begin.', 'Always leave 25 Energy when fighting a caster.', 'It only interrupts during a cast. Instant spells cannot be stopped.'],
      i: ['Kick the heal, not the damage spell, in most fights. Stopping the heal wins the race.', 'Kick late in a cast rather than early. If you kick too soon, players will fake casts. Late Kicks also waste more of their time.', 'Improved Kick adds a 2 second silence (at 2/2), which also stops instants.'],
      a: ['Lockout is per school. Kicking a Priest\'s Holy spell stops Holy only, they can still use Shadow. A Shaman\'s Nature lockout stops Healing Wave and Lightning Bolt together.', 'Paladins have Voice of Truth: 6 seconds immune to interrupts on a 3 minute cooldown. Watch for it and do not waste your Kick.', 'Players fake cast to bait your Kick: start casting, then stop. Wait until the last half second if you can see the pattern.']
    },
    counteredBy: [['paladin', 'Voice of Truth makes them immune to Kick for 6 sec. Concentration Aura does not stop Kick, but this does.'], ['priest', 'Instant spells like Power Word: Shield, Renew and Psychic Scream cannot be kicked, and Kicking Holy does not stop Shadow spells.'], ['warlock', 'Instant Corruption, curses and pet damage keep flowing through a lockout, so a Kick slows them but does not stop them.'], ['mage', 'Instant Ice Lance, Frost Nova and Blink cannot be kicked. A Frost lockout does not stop Fire or Arcane spells.']],
    counters: [['priest', 'Greater Heal is a long cast. A locked-out Holy school ends healing for 5 seconds.'], ['shaman', 'Healing Wave and Lightning Bolt share Nature: both are locked at once.'], ['mage', 'Frostbolt lockout removes their main damage and slow together.'], ['warlock', 'Kick the Fear cast to lock Shadow Bolt too, since both are Shadow school.'], ['druid', 'Healing Touch and Roots both sit in Nature school.'], ['paladin', 'Holy Light and Flash of Light both locked, as long as Voice of Truth is used up.']],
    pair: ['gouge', 'kidney-shot', 'blind', 'mind-numbing-poison']
  },
  feint: {
    role: 'Threat', one: 'Drops your threat so mobs stay on the tank.',
    what: 'Costs 20 Energy with a 10 second cooldown. It lowers your threat by a large amount. It deals no damage. It does nothing to players.',
    why: 'In a group, the thing that gets a rogue killed is pulling aggro from the tank. Feint lets you do your full damage without that happening. Used at the right moment, it adds more damage than the 20 Energy it costs, because a dead rogue does zero.',
    tips: {
      b: ['In dungeons: when you are close to the tank\'s threat, press it. If you do not have a threat meter, press it just after a big Eviscerate crit.', 'Use it on cooldown on a hard boss if you often take aggro.', 'Useless solo. Do not press it while leveling alone.'],
      i: ['Threat is per enemy. It lowers your threat on your current target, so Feint the mob that is looking at you.', 'Feint before a big finisher, not after, if the tank is struggling.'],
      a: ['The macro page has Feint on mouseover, so you can drop threat on a mob without losing your own target.', 'Vanish also drops threat, but with a much longer cooldown. Save Vanish for emergencies, and use Feint for routine use.']
    },
    counteredBy: [], counters: [],
    note: 'Feint is a group threat tool, not a PvP tool, so no class interacts with it. It does not fool players.',
    pair: ['vanish', 'evasion', 'eviscerate']
  },
  shank: {
    role: 'Energy tool', one: 'New in Forever. A cheap off-hand stab that pays you back Energy.',
    what: 'For 5 Energy you stab with your off-hand for 50% weapon damage and get Energy back: 15 at rank 1, 25 at rank 2 (level 44). It cannot miss and has a 10 second cooldown.',
    why: 'Energy is the limit on all rogue damage. Base regeneration is about 10 per second, and Shank adds a chunk of free Energy every 10 seconds, so it is effectively more damage. Because it cannot miss, your Energy return is guaranteed. Three talents build around it, so it is one of the most important changes from Classic.',
    tips: {
      b: ['Use it on cooldown whenever you have room for the Energy return. Not at 95 Energy.', 'It needs an off-hand weapon, so dual wield. Learned at level 24.'],
      i: ['Press it when you are below about 70 Energy so nothing is wasted.', 'Flash of Steel (Combat): 15 more Energy and 2 second lower cooldown at max rank. That is a 30% or so raise in total Energy, which is why it beats many damage talents.', 'Boot Knife (Subtlety): 100% chance to add 2 combo points at max. Now your Energy tool is also a builder.'],
      a: ['Venom (Assassination): Shank boosts Poison damage by 30% and poison application by 20% for 6 seconds. Keep it up close to full uptime.', 'It uses your off-hand weapon damage, so a bigger off-hand makes it hit harder. It is minor for damage, but Boot Knife and Venom make it matter.', 'Use it at the start of a stun window to get a burst of Energy you can immediately spend.']
    },
    counteredBy: [['warrior', 'Disarm can stop your weapon strikes for 10 sec, which takes Shank out of your plan.'], ['rogue', 'Riposte can disarm you for 6 sec.'], ['paladin', 'Time it outside Divine Protection and Divine Shield: the strike needs a target it can hit.']],
    counters: [['rogue', 'Your Energy is your life in a mirror: you can land more attacks than they can.'], ['warrior', 'More Energy per fight means more Kicks and more bleeds, the tools that do not care about plate.'], ['mage', 'Refilled Energy lets you land the Kick you need right after a Blink.']],
    pair: ['death-mark', 'mutilate', 'sinister-strike', 'hemorrhage']
  },
  riposte: {
    role: 'Counterattack', one: 'After you parry, strike back for 150% damage and disarm them for 6 seconds.',
    what: 'A talent. It becomes usable just after you parry an attack. It deals 150% weapon damage and disarms the target for 6 seconds. It costs 10 Energy and has a 6 second cooldown.',
    why: 'Disarm is the strongest melee control: it cuts a melee opponent\'s damage to nearly nothing, for 6 seconds, for only 10 Energy. It is only available to you because you parried, so it is conditional, but when it is up it is very high value per Energy.',
    tips: {
      b: ['When the button lights up, press it. It is cheap and strong.', 'You can only parry attacks from the front, so face your attacker when you want this to come up.'],
      i: ['Deflection gives up to 6% parry. Without it, this button is rare.', 'It lights up for a short time. Watch for it in melee fights.'],
      a: ['Disarm a Warrior before they burst: they lose Mortal Strike damage, weapon damage and Overpower for 6 seconds.', 'It is less valuable against targets that are not melee: nothing to disarm on a caster holding a staff, though it still does damage.', 'Sits in the middle of the Combat tree, so a Combat build gets it almost for free.']
    },
    counteredBy: [['mage', 'Casters do not swing at you, so you will rarely parry anything.'], ['warlock', 'Spells cannot be parried, so it rarely lights up.'], ['druid', 'A feral Druid in form fights with claws, which have nothing to disarm, though the damage still lands.']],
    counters: [['warrior', 'Their damage is nearly all weapon-based. Six seconds of disarm is huge.'], ['rogue', 'Disarms them, stopping their own Shank and weapon strikes too.'], ['paladin', 'Removes melee and Seal damage for 6 seconds.'], ['shaman', 'Enhancement Shamans lose their weapon procs for 6 seconds.']],
    pair: ['evasion', 'sinister-strike', 'kick']
  },
  'blade-flurry': {
    role: 'Cooldown', one: 'Attacks 20% faster and hits a second target for 15 seconds.',
    what: 'A talent with a 2 minute cooldown, costing 25 Energy. For 15 seconds you swing 20% faster, and your melee hits also strike one nearby enemy.',
    why: 'Rogues have no real area damage. This is the only tool that doubles your damage when two enemies stand together, and even on one target the speed bonus is a real gain. So it pays for itself anywhere, and it is the main reason Combat is wanted in groups.',
    tips: {
      b: ['Use on any fight with two enemies near each other, or simply on cooldown for bosses.', 'Do not use it next to a Sapped or Gouged target: the extra hits will break the control.'],
      i: ['Line it up with Adrenaline Rush: more Energy and more swings at the same time.', 'Slice and Dice multiplies with it, so have Slice and Dice up first.', 'Every extra hit also rolls for poison and for Hack and Slash.'],
      a: ['In PvP it can break your own team\'s crowd control, such as a Sheep or Sap. Check the area first.', 'Cleave copies damage from your attacks, so your Eviscerate also splashes. Finishers are often the best use of a short window.', 'Pair it with trinkets using the macro on the macro page.']
    },
    counteredBy: [['warrior', 'Disarm stops all of it for 10 sec.'], ['mage', 'Frost Armor slows your attack speed. Nova and Blink split you from the second target.'], ['paladin', 'Immunity effects simply stop the hits from counting.']],
    counters: [['warlock', 'Hits both them and their pet at once.'], ['hunter', 'Hits the Hunter and the pet together, so you do not have to choose.'], ['shaman', 'Your second hit can kill the 5 health totem next to them without a target swap.']],
    pair: ['adrenaline-rush', 'slice-and-dice', 'eviscerate']
  },
  'adrenaline-rush': {
    role: 'Cooldown', one: 'Doubles Energy regeneration for 15 seconds.',
    what: 'A talent at the bottom of Combat, with a 5 minute cooldown. For 15 seconds your Energy regeneration is 100% higher. It has no cost.',
    why: 'Energy is your limit. Doubling it means twice as many strikes for 15 seconds. Since Energy is what stops you from pressing buttons, this is one of the strongest burst tools in the game, and it costs nothing.',
    tips: {
      b: ['Use it at the start of a big fight, right away.', 'Do not press it at full Energy: spend first, then activate.'],
      i: ['Combine with Blade Flurry for a two-target burst window.', 'Shank during it: the extra Energy flows faster, so you keep pressing.'],
      a: ['Save it for a boss damage window rather than the first second, if you know one is coming.', 'In PvP, use it during a Kidney Shot: 6 seconds with doubled Energy is nearly a full kill.']
    },
    counteredBy: [['warrior', 'Disarm reduces the value of all that Energy for 10 seconds.'], ['paladin', 'Divine Protection for 8 seconds uses up half of the window.'], ['mage', 'Ice Block for 10 seconds wastes most of the window.'], ['hunter', 'Freezing Trap wastes the time, so keep some movement or Vanish available.']],
    counters: [['warrior', 'More strikes than they can handle if you time it after their Disarm.'], ['rogue', 'A mirror fight is Energy against Energy. This wins that race.'], ['priest', 'Much more damage than a shield and a heal can cover.']],
    pair: ['blade-flurry', 'kidney-shot', 'eviscerate', 'sinister-strike']
  }
});
