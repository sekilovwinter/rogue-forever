/* Ability guide, part 1: Assassination tab. Numbers shown on the page come from the client data; this text explains them.
   counteredBy / counters are [classKey, reason]. Keep sentences plain: what happens, then why it matters. */
RF.guide.abilities = RF.guide.abilities || {};
Object.assign(RF.guide.abilities, {
  eviscerate: {
    role: 'Finisher', one: 'Your main damage finisher. Spends combo points for one big hit.',
    what: 'You spend all your combo points on the target to deal a burst of physical damage. More points means a much bigger hit, and Attack Power adds to it. It is instant, so it works on someone running away.',
    why: 'Rogues do not win with steady damage alone. They win by storing damage as combo points and releasing it all in a moment the enemy cannot react to. Eviscerate is that release. Because damage arrives in one instant hit, it beats healing and ends fights that would otherwise drag on.',
    tips: {
      b: ['Build to 5 combo points, then press Eviscerate. Five points is far more damage per Energy than two or three.', 'If the target is about to die, spend whatever you have. Points on a dead target are gone.', 'Keep Slice and Dice running first on any fight that lasts longer than a few seconds.'],
      i: ['Count Energy before you build. A 5-point finisher means nothing if you cannot afford it, so hold 35 Energy (20 with Flawless Execution) as you approach 5 points.', 'In PvP, wait for the enemy to use a defensive before you spend. Finishers into Divine Shield, Ice Block or Power Word: Shield throw away your whole build-up.', 'A 4-point Eviscerate that kills now is better than a 5-point one after a heal lands.'],
      a: ['Pair with Cold Blood for one guaranteed crit: it turns a survivable hit into a kill, and it costs no global cooldown.', 'Use Kidney Shot first, then hit during the stun. The enemy cannot heal or fight back, so your energy pool becomes guaranteed damage.', 'Coup de Grace, Aggression and Flawless Execution all stack on this one button. That is why a Combat Eviscerate hits so hard for so little Energy. Assassination gets more of its value from crits via Malice.']
    },
    counteredBy: [['paladin', 'Divine Protection (8 sec) and Divine Shield (12 sec) make the hit worth nothing. Wait them out instead of spending points into them.'], ['priest', 'Power Word: Shield soaks a big chunk of your burst. Pop the shield with builders first, then finish.'], ['warrior', 'Plate armor reduces physical damage heavily, and Shield Wall cuts it by 60%. Expose Armor or a bleed plan beats raw Eviscerates here.'], ['druid', 'Bear Form multiplies armor and Barkskin takes 20% off. Do not dump finishers into a bear unless it is nearly dead.'], ['mage', 'Mana Shield and Ice Barrier absorb it, and Ice Block ignores it. Bait the Block first.']],
    counters: [['mage', 'Cloth has almost no armor, so the full number lands. Few things beat a 5-point crit on a mage caught mid-cast.'], ['warlock', 'Low armor and no instant escape. Eviscerate finishes before a Death Coil heal can save them.'], ['priest', 'Once the shield is down a cloth priest takes it nearly in full, and instant damage cannot be interrupted by Fade or Scream.'], ['hunter', 'Instant hit ignores the distance game the moment you are in range. Finish before they get range back.']],
    pair: ['slice-and-dice', 'cold-blood', 'kidney-shot', 'rupture']
  },
  'slice-and-dice': {
    role: 'Finisher buff', one: 'A cheap finisher that makes you swing 30% faster.',
    what: 'You spend combo points on yourself instead of the target. Your melee attack speed goes up by 30%. More points means it lasts longer, from 9 seconds at 1 point up to 21 seconds at 5.',
    why: 'Most rogue damage is automatic weapon swings, plus the poisons those swings apply. A 30% speed gain is 30% more of all of that, for a 25 Energy cost. Because the speed bonus is the same at every point count, even a 1-point Slice and Dice is excellent value: it is the highest damage gain per Energy you can buy.',
    tips: {
      b: ['Use it first on anything that will live more than about 15 seconds.', 'Early in a fight, a 1 or 2 point Slice and Dice is fine. Getting it up matters more than making it long.', 'It keeps working after you switch targets, so it carries from mob to mob.'],
      i: ['Refresh it just before it runs out, not long before. Refreshing early wastes the time that was left.', 'Improved Slice and Dice makes it 45% longer, so you spend fewer finishers on upkeep and more on damage.', 'It has a 100 yard range in the tooltip because it targets you. Use it while running between packs to keep it going.'],
      a: ['Pre-buff trick: put points on one mob before a fight, Slice and Dice as you walk to the next target. You start the real fight already swinging fast.', 'Slice and Dice speed is multiplied with other haste, including Blade Flurry and Berserking. Line them up to get the highest swing rate for poison procs.', 'Blizzard fixed it so Slice and Dice no longer makes a sitting target stand up, so you can use it safely next to a Sap or next to a mob that is eating.']
    },
    counteredBy: [['warrior', 'Thunder Clap slows your swings by 20%, and Disarm stops weapon damage entirely for 10 sec. Both directly undo what you paid for.'], ['mage', 'Frost Armor can slow your attack speed by 25% when you hit them, cancelling most of the gain.']],
    counters: [['warlock', 'Faster swings mean more poison procs, so Mind-numbing and Crippling land sooner on a caster who needs distance.'], ['shaman', 'Same idea on a healer: more swings apply Mind-numbing or Wound Poison faster.']],
    pair: ['eviscerate', 'rupture', 'blade-flurry', 'instant-poison']
  },
  'expose-armor': {
    role: 'Finisher debuff', one: 'A finisher that strips armor for 30 seconds.',
    what: 'You spend combo points to reduce the target\'s armor. At 5 points with the top rank it removes 2,250 armor for 30 seconds.',
    why: 'Armor reduces physical damage by a percentage. Removing a lot of it raises damage for you and for every other physical attacker on the target. On a raid boss this can be worth more than your own Eviscerate, because you are boosting several people at once. Against plate wearers in PvP, it is the difference between hitting for nothing and hitting for real.',
    tips: {
      b: ['Do not use this while leveling. Eviscerate is better on normal mobs that die quickly.', 'Use it on long fights with a boss, if no Warrior is applying a stronger Sunder Armor.'],
      i: ['It does not stack with Sunder Armor: the larger one wins. Ask your group who is doing it before you spend points.', 'Improved Expose Armor drops the cost by 10 and refunds 2 combo points at 5 points. That refund is what makes it practical to keep up.', 'Blizzard changed it so a miss no longer costs you your combo points, so the risk is lower than Classic veterans remember.'],
      a: ['Against a Warrior or Paladin with a healer behind them, use it right after your opener. Everything after that is amplified for 30 seconds, including your team\'s damage.', 'Compare its value by thinking of the whole group: if four physical attackers gain about 10% each, you have gained 40% of one rogue\'s damage for one finisher.']
    },
    counteredBy: [['warrior', 'Sunder Armor already does a similar job, so yours may be wasted. Check the debuff first.'], ['druid', 'Faerie Fire overlaps as another armor debuff, and Bear Form armor is so high that some value is lost.']],
    counters: [['warrior', 'Plate armor is their whole defense. Taking it away is the cleanest way to beat them.'], ['paladin', 'Same logic: Devotion Aura and plate lose much of their value.'], ['druid', 'Bears live on armor, so a big reduction hurts more here than almost anywhere else.']],
    pair: ['eviscerate', 'kidney-shot', 'slice-and-dice']
  },
  garrote: {
    role: 'Opener bleed', one: 'A stealth opener that makes the target bleed and adds a combo point.',
    what: 'From stealth and behind the target, you open with a bleed that ticks for 18 seconds. Damage scales with Attack Power and ignores armor. It also gives one combo point.',
    why: 'Bleeds ignore armor, so they do the same damage to a plate wearer as to a mage. Garrote also does not need a dagger, so it is the opener for any weapon. With Subtlety talents it can deal a lot of damage, and in Forever Ghostly Strike can let you use it out of stealth.',
    tips: {
      b: ['Use Garrote when you do not have a dagger equipped, since Ambush requires one.', 'Open on enemies that will live long enough for the full 18 seconds. Do not waste it on something about to die.', 'Check that the target is not a bleed-immune creature, like an elemental or mechanical boss. The dungeon pages show which bosses are immune.'],
      i: ['Dirty Deeds removes the need to be behind the target and reduces the cost by 20, so you can open from the side.', 'Hemorrhage increases your Garrote damage by 15%. Use it in the first few seconds to get the bonus on every tick after.', 'Blood Splatter adds 9 seconds to it. Longer bleed means more total damage and more damage stored by Death Mark.'],
      a: ['Death Mark stores bleed damage at twice the rate. Garrote, then Death Mark, then Rupture is the Subtlety kill sequence because every tick is banked for the 6 second detonation.', 'Bleeds do not stop when the target turns into a sheep or runs, so they keep building pressure during your cooldown gaps.', 'Bleed damage can break some crowd control. Do not Garrote a target you plan to Sap or Blind in the next few seconds.']
    },
    counteredBy: [['paladin', 'Divine Shield removes it, and Divine Protection stops further hits. Cleanse does not touch bleeds, but the immunity does.'], ['mage', 'Ice Block removes it.'], ['druid', 'Healing over time on self easily outpaces one bleed if you do not add more pressure.'], ['warrior', 'Victory Rush and big heals can offset the ticks, but they cannot remove them, so this one is a mild counter.']],
    counters: [['warrior', 'Armor does nothing against a bleed, so this is one of your better damage sources into plate.'], ['paladin', 'Plate and Devotion Aura do not reduce it at all.'], ['druid', 'Bear armor is ignored, and the ticks keep pressure up through shapeshifts.'], ['priest', 'The bleed keeps them in combat, so they cannot sit and drink to recover mana.']],
    pair: ['hemorrhage', 'death-mark', 'rupture', 'ghostly-strike']
  },
  ambush: {
    role: 'Opener', one: 'Your hardest-hitting opener from stealth, with a dagger.',
    what: 'From stealth and behind the target, you strike for 250% of your weapon damage plus a flat bonus. It needs a dagger in your main hand and gives one combo point.',
    why: 'Stealth is a free first move, and Ambush is how you cash it in. It is your single largest hit, and because the target did not see you coming, you can often take a quarter or more of their health before the fight even starts. Weapon damage is multiplied by 2.5, so slow high-damage daggers make it hit much harder.',
    tips: {
      b: ['Stand behind the target, not at their side. If it says you must be behind, walk further around.', 'Make sure you have Energy. It costs 60, so wait until your bar is full. Poised takes 10 off when you open at full Energy out of combat.', 'Do not use it if you have a slow sword equipped. It requires a dagger in the main hand.'],
      i: ['Improved Ambush adds 45% crit chance at max. Cheap Shot gives control, but Ambush with this talent gives the fastest kill.', 'Open while the enemy is fighting a mob or another player. They will not turn around to fight you until the damage has landed.', 'Stay a little back from the target. A known issue lets enemies parry and block from behind when you stand very close, per Blizzard.'],
      a: ['Macro Premeditation with Ambush: the first hit then already gives you 3 points, which puts a Kidney Shot within reach of your very next builder.', 'Cold Blood plus Ambush with Opportunity is a one-shot threat on cloth. Use it when you know the target has no shield.', 'Ghostly Strike lets you use Ambush out of stealth for 7 seconds. It gives Subtlety a second Ambush in a single stun.']
    },
    counteredBy: [['priest', 'A shield already up on the target absorbs the whole opening. Look for the shield glow and wait, or Cheap Shot instead.'], ['paladin', 'Blessing of Protection or Divine Protection makes it deal nothing. Wait for it to end.'], ['warrior', 'Plate reduces the hit a lot, so Cheap Shot usually gives better value.'], ['hunter', 'Track Hidden and Flare may reveal you before you get into position. Pets can also bump into you.'], ['druid', 'Faerie Fire stops you from stealthing for 40 sec, so you lose the opener completely.']],
    counters: [['mage', 'Cloth armor and low health. Ambush with a crit can take half of them or more before they react.'], ['warlock', 'Same: they rely on not being touched, and the burst is hard to recover from.'], ['priest', 'Without a shield, a big opener forces them to spend their turn on healing.'], ['rogue', 'An opener on a rogue who has not Vanished forces their Evasion early.']],
    pair: ['cold-blood', 'premeditation', 'stealth', 'backstab']
  },
  rupture: {
    role: 'Finisher bleed', one: 'A finisher that makes the target bleed. It ignores armor and can crit in Forever.',
    what: 'You spend combo points to apply a bleed. More points means more damage and longer duration, up to 16 seconds at 5 points, more with talents. It scales with Attack Power, not weapon damage.',
    why: 'Because it ignores armor, Rupture\'s damage does not drop against plate, where Eviscerate struggles. In Forever it can also critically hit, which makes crit a real damage stat for it. That is why Subtlety is built around it: stacking Serrated Blades and Hemorrhage multiplies a damage source the enemy\'s armor cannot reduce.',
    tips: {
      b: ['Use it on high-armor targets and long fights. On a normal mob that dies in seconds, use Eviscerate.', 'Use it at 5 points. Short Ruptures waste the talent bonus.', 'Check for bleed immunity on bosses: the dungeon page tells you.'],
      i: ['Serrated Blades adds 30% damage, Hemorrhage adds 15%, Blood Splatter adds 6 seconds. All three make this the Subtlety finisher, far more than Eviscerate.', 'Refresh it just as it ends. Overwriting it early loses the remaining ticks.', 'Apply Hemorrhage before refreshing, so the bonus is active as the new bleed ticks.'],
      a: ['Death Mark stores bleed damage at double the rate, so Rupture active during the 6 second window is your biggest stored damage.', 'Rupture keeps pressure on a target while you Blind or Sap someone else, but it will also break those effects on that same target, so do not bleed what you intend to control.', 'Against Warriors and Paladins, consider running Expose Armor only if you have allies. Solo, Rupture already bypasses armor, so you can save the Energy.']
    },
    counteredBy: [['paladin', 'Divine Shield clears it. Time your Rupture after the immunity, not before.'], ['mage', 'Ice Block clears it.'], ['druid', 'Heavy self-healing can outpace bleed damage. You need Wound Poison alongside.'], ['warlock', 'Drain Life and Siphon Life heal them back while you tick.']],
    counters: [['warrior', 'Plate armor is ignored completely. This is your cleanest damage into them.'], ['paladin', 'Same: full damage through plate, and Purify cannot remove bleeds.'], ['druid', 'Bear armor is ignored.'], ['rogue', 'Evasion stops melee hits but does not stop your bleed that is already ticking.'], ['hunter', 'Deterrence raises dodge and parry, but a bleed already on them keeps ticking through it.']],
    pair: ['hemorrhage', 'death-mark', 'garrote', 'slice-and-dice']
  },
  'cheap-shot': {
    role: 'Opener stun', one: 'A stealth stun for 4 seconds that gives 2 combo points.',
    what: 'From stealth, you stun the target for 4 seconds and gain 2 combo points. You do not need to be behind them. It does no real damage: its value is the control and the points.',
    why: 'Control is worth more than damage when the fight is even. A stunned player cannot cast, heal, run or fight back. Four seconds of that, plus a head start of 2 points, usually leads straight into a Kidney Shot, so one opener can lock someone down for 8 to 10 seconds. That is often the whole fight.',
    tips: {
      b: ['Learned at level 26 in Forever. Before that, open with Ambush or Garrote.', 'Use it in PvP when you want safety rather than a big opening hit.', 'It costs 60 Energy. Stay at full before opening, and Poised takes 10 off.'],
      i: ['Dirty Deeds takes 20 off the cost, so you keep more Energy for hits during the stun.', 'Follow with builders during the 4 seconds, then Kidney Shot at 4 or 5 points right as the first stun ends.', 'Initiative can add a third combo point. That shortens how many builders you need before Kidney.'],
      a: ['Do not Kidney instantly. Use all of Cheap Shot first, then Kidney as it ends, otherwise the two stuns overlap and you waste seconds. Repeated stuns also run into diminishing returns in PvP.', 'Human Will to Survive and a PvP trinket can end the stun at once. Watch if they respond. If they use it on Cheap Shot, your Kidney is now a guaranteed follow-up.', 'Gouge or Blind after Kidney to reset positions and regain Energy: this is the classic full chain.']
    },
    counteredBy: [['paladin', 'Divine Protection and Divine Shield remove the stun. Blessing of Freedom will not, but immunity does.'], ['mage', 'Blink frees them from stuns in Forever. Ice Block also breaks it.'], ['warrior', 'Iron Will shortens stuns by up to 15%, so your window is a little smaller.']],
    counters: [['mage', 'Their entire defense is range and cast time. A stun on arrival removes both until Blink is forced.'], ['warlock', 'No instant answer to a stun, and it stops Fear casting.'], ['priest', 'They cannot shield or heal during the stun. Your Energy goes straight into damage.'], ['hunter', 'Being in melee with a stunned hunter is the exact position they fear most.'], ['shaman', 'A stun stops totems, heals and shocks together.']],
    pair: ['kidney-shot', 'gouge', 'sinister-strike', 'stealth']
  },
  'kidney-shot': {
    role: 'Finisher stun', one: 'A finisher stun from 2 to 6 seconds. Your main lockdown.',
    what: 'You spend combo points to stun the target. One point gives 2 seconds, five points give 6. It costs 25 Energy and has a 20 second cooldown.',
    why: 'This is the only stun you can use in the middle of a fight without stealth. It is the middle link of every good rogue fight: open, build, Kidney, kill. Six seconds of no healing and no fighting back usually equals 2 or 3 big hits, delivered safely.',
    tips: {
      b: ['Use it at 4 or 5 points. A 1-point stun costs the cooldown and gives little.', 'Use it to stop a player from healing or finishing a long cast.', 'It works from the front, so you do not need to get behind.'],
      i: ['Save your Energy during the build-up. Kidney at 100 Energy gives you several attacks while they cannot act.', 'Improved Kidney Shot adds 10% damage to everything during the stun, and that includes poisons.', 'If you are low on health, Kidney then Bandage or Vanish is a clean escape.'],
      a: ['Against a healer, Kick their heal, then Kidney on the next one. Kick locks a school for 5 seconds, and Kidney holds them for that period.', 'Watch for Blink and stun-break abilities. Do not spend your whole Energy bar in the first second, because if they break out, you want a reply ready.', 'Repeated stuns run into diminishing returns in PvP, so never overlap Kidney with Cheap Shot. Let the first stun finish, then press it.']
    },
    counteredBy: [['mage', 'Blink breaks stuns in Forever, on a 15 second cooldown. Bait it or stay in range for your reply.'], ['paladin', 'Divine Shield and Divine Protection end stuns. Also, stunning into their immunity wastes a 20 second cooldown.'], ['warrior', 'Iron Will shortens stun duration by up to 15%, and they can Hamstring you as soon as it ends.'], ['druid', 'Shapeshifting does not free stuns, but Barkskin and big armor make your damage window smaller.']],
    counters: [['priest', 'Six seconds of no healing is often lethal. Stops Psychic Scream and Shield too.'], ['warlock', 'Stops Fear and channeled Drain Life. Kill them inside it.'], ['shaman', 'Stops shocks, heals, and totem drops at the same time.'], ['hunter', 'Pin them in melee range where most of their kit is weak.'], ['rogue', 'Vanish cannot be used while stunned. A well-timed Kidney prevents their escape.']],
    pair: ['cheap-shot', 'eviscerate', 'cold-blood', 'kick']
  },
  mutilate: {
    role: 'Builder', one: 'Strikes with both daggers for 2 combo points. New talent in Forever.',
    what: 'A talent from the bottom of the Assassination tree. You hit with both daggers at once for 90% weapon damage plus a bonus on each hand. It gives 2 combo points, and does 20% more damage if the target is poisoned. No position requirement.',
    why: 'Two combo points per press changes the rhythm of the spec: you reach 5 points in about half as many builders, so your Energy goes further. Removing the need to stand behind the target also fixes the biggest weakness of Backstab. Everything in the Assassination tree is designed to make this button better.',
    tips: {
      b: ['You need a dagger in both hands. If you only have one, you cannot use it at all.', 'Keep a poison on your target: that is a 20% damage bonus.', 'You reach this at the bottom of the tree, so plan for level 40 and beyond.'],
      i: ['Seal Fate makes crits add an extra combo point, so crit feeds your combo points directly. It has a half-second internal cooldown, so a double crit on one Mutilate still gives one bonus point.', 'Puncturing Wounds from Combat adds up to 15% crit chance to Mutilate. It is why many Assassination builds take a few Combat points.', 'Opportunity also increases Mutilate damage if you spend points in Subtlety.'],
      a: ['Fast off-hand daggers help poison application, but Mutilate adds your off-hand weapon damage, so a stronger off-hand matters more here than in other specs.', 'Cold Blood with Mutilate guarantees one crit: if you have Seal Fate, that is a dependable extra point.', 'Do not cap Energy while waiting for 60. Shank with Venom in between adds poison strength and returns Energy for the next Mutilate.']
    },
    counteredBy: [['paladin', 'Purify and Cleanse strip poisons, which removes your 20% bonus. Cheap for them to do.'], ['shaman', 'Cure Poison and Poison Cleansing Totem do the same. Kill the totem first.'], ['druid', 'Cure Poison and Abolish Poison, and shapeshifting frees them from slows.'], ['warrior', 'Plate reduces this physical hit a lot, and Disarm stops it entirely for 10 sec.']],
    counters: [['mage', 'No armor and no need to get behind them: just stick and press.'], ['warlock', 'Combo points arrive fast enough to Kidney before their pet can do much.'], ['priest', 'High burst breaks a shield quickly, and they have no poison cure.'], ['hunter', 'Hits as well from the front when they turn to kite.']],
    pair: ['deadly-poison', 'cold-blood', 'shank', 'eviscerate']
  },
  'cold-blood': {
    role: 'Cooldown', one: 'Your next strike is guaranteed to crit.',
    what: 'A talent. When you activate it, your next Sinister Strike, Backstab, Ambush, Eviscerate or Mutilate is a certain critical strike. It has a 3 minute cooldown and uses no Energy.',
    why: 'A crit doubles a hit. Doubling your biggest hit, at the exact moment you choose, is what gets kills before the enemy can respond. Random crits are helpful, but a guaranteed crit lets you plan a kill.',
    tips: {
      b: ['Save it for a 5 point Eviscerate on a real target, not on a mob that was going to die anyway.', 'It has no global cooldown, so use it just before your strike. You lose no time.'],
      i: ['Macro it with Eviscerate so you never waste it on a builder by accident. The macro page has one ready.', 'In PvE it can go on cooldown every 3 minutes for a small gain. In PvP, save it for the kill.'],
      a: ['In a Kidney Shot window: Cold Blood + Eviscerate at 5 points usually finishes anyone below 60%.', 'Check the target has no shield or armor buff active, as a guaranteed crit into Shield Wall is wasted.', 'On Ambush from stealth it can win a fight before it starts, but only when you are sure no shield is up.']
    },
    counteredBy: [['priest', 'Power Word: Shield absorbs it. Remove the shield first.'], ['paladin', 'Divine Shield or Divine Protection wastes it entirely. This is why you bait immunity first.'], ['mage', 'Mana Shield and Ice Block waste it.'], ['warrior', 'Shield Wall reduces it 60%.']],
    counters: [['mage', 'Guaranteed big hit on a target with very low health.'], ['warlock', 'Ends them before Death Coil can save them.'], ['hunter', 'Saved for the moment you finally catch them, it turns one finisher into most of their remaining health.']],
    pair: ['eviscerate', 'ambush', 'mutilate', 'kidney-shot']
  }
});
