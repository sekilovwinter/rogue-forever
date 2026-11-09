/* "Macro" covers both meanings: big-picture decision making, and the game's own /macro system. */
RF.guide.macroGame = [
  {
    id: 'rotation', title: 'What to press, per spec', icon: 'ability_rogue_slicedice',
    sum: 'A rogue rotation is a priority list rather than a fixed order. Each time you have Energy, press the highest item that makes sense right now.',
    points: [
      ['Combat', 'Slice and Dice first, even at 1 or 2 points. Shank when you are under about 70 Energy. Sinister Strike to 5 points, then Eviscerate. Blade Flurry and Adrenaline Rush together on hard fights, and Blade Flurry alone when two enemies stand close.'],
      ['Assassination', 'Keep Deadly Poison stacked. Shank on cooldown so Venom stays active. Mutilate to 4 or 5 points, since Seal Fate often adds one. Slice and Dice, then Rupture on long fights, and Eviscerate on short ones.'],
      ['Subtlety', 'Garrote from stealth. Hemorrhage to 5 points, with Shank and Boot Knife for extra points. Keep Rupture and Slice and Dice running. Death Mark every 10 seconds, while bleeds are ticking.'],
      ['The rule behind all three', 'Upkeep first, because it raises everything after it. Then free Energy, because it pays for everything. Then builders, then finishers. Never let Energy sit at 100.'],
    ],
    why: 'Order matters because each step multiplies the next. Slice and Dice raises all your swings, Shank pays for your builders, and builders feed the finisher. Starting from the top means every later press is worth more.'
  },
  {
    id: 'energy', title: 'Energy is your clock', icon: 'spell_shadow_shadowworddominate',
    sum: 'Every decision a rogue makes is an Energy decision. You regenerate about 10 per second. Nothing you do changes that much, except Shank and Adrenaline Rush.',
    points: [
      ['Never sit at 100.', 'Regeneration stops at the cap, so every second at full Energy is damage you can never recover. If you are waiting at full, you have already lost something.'],
      ['Except before an opener.', 'Pooling to full before a stealth opener is the one time to wait, because your first 3 seconds decide most fights, and Poised gives a discount only at full.'],
      ['Spend before a stun ends.', 'In a stun window, damage is safe. Enter the stun with as much Energy as you can, and leave it with little. Then build again through their response.'],
      ['Always plan the next 25.', 'Kick costs 25. Never spend the last 25 Energy against a caster, because the Kick you cannot afford loses the fight.'],
    ],
    why: 'Most classes run out of mana over a fight. You never run out, but you are always limited right now. That makes rogue play a rhythm rather than a budget.'
  },
  {
    id: 'combo', title: 'Combo points are stored damage', icon: 'ability_rogue_eviscerate',
    sum: 'Points sit on a target. They are not yours until they are spent, and you lose them if the target dies or you change targets.',
    points: [
      ['Decide your finisher before you build.', 'If you know you want Kidney Shot next, build to the right number and save Energy for the 25 cost.'],
      ['Spend before a target dies.', 'A 2 point Eviscerate that kills is better than wasted points on a corpse.'],
      ['Fewer points can be fine.', 'A 1 point Slice and Dice is excellent value, since the speed bonus does not change with points.'],
      ['Do not swap targets without a reason.', 'A swap throws away what you built, unless Ruthlessness and Relentless Strikes have given you a new one.'],
    ],
    why: 'You are not doing damage when you build, you are storing it. The skill is releasing it at the moment it cannot be answered.'
  },
  {
    id: 'cooldowns', title: 'Cooldown economy', icon: 'ability_vanish',
    sum: 'You have a small number of very strong abilities on long cooldowns. A fight is usually won by who has one left when it matters.',
    points: [
      ['Count theirs.', 'Paladin: Divine Shield, Hammer of Justice. Mage: Blink, Ice Block. Rogue: Vanish, Evasion, Blind. Write nothing down: just watch for them.'],
      ['Spend the small ones first.', 'Use Gouge before Blind, Blind before Vanish. The longer the cooldown, the later it should come.'],
      ['Bait.', 'Good players react to a first stun with their big break. So your first stun should be the short one, and your long stun should come after.'],
      ['Know when not to fight.', 'If Vanish and Evasion are on cooldown, stay stealthed and let the enemy pass. The fight will still be there in 3 minutes.'],
    ],
    why: 'Rogue abilities are stronger than most because they are so rare. Using them on the wrong target is a 5-minute penalty, not a 5-second one.'
  },
  {
    id: 'picking', title: 'Choosing fights in the open world', icon: 'ability_stealth',
    sum: 'Your stealth means you are the only class that can truly refuse a fight. Use that.',
    points: [
      ['Ask three questions.', 'Is it busy? Can I kill it before it can answer? Can I leave if I am wrong? If you can say yes to two, go in.'],
      ['Wait for the mob.', 'A player fighting a mob at half health is your best possible target. Wait until the mob is low, too. They cannot do anything else in the seconds that follow.'],
      ['Know how you will leave.', 'Before you open, know where you will go if it fails. A cliff, a building or a road back to your guards.'],
      ['Do not fight near their friends.', 'You can win a 1v1 in seconds. Two more enemies can catch you before you finish.'],
    ],
    why: 'Your win rate does not come from out-skilling everyone. It comes from only fighting when you already have the advantage.'
  },
  {
    id: 'groups', title: 'Your job in a dungeon', icon: 'inv_misc_spyglass_01',
    sum: 'You are a damage dealer who also brings control. Good rogues make runs safer as well as faster.',
    points: [
      ['Control one mob per pull.', 'Sap a humanoid before the pull. Tell the group which one, with a raid marker.'],
      ['Interrupt the right cast.', 'Every enemy healer and every dangerous spell is yours. Keep 25 Energy.'],
      ['Stay behind the target.', 'From behind, you avoid parry and block. It counts as a large damage increase for almost no effort.'],
      ['Watch threat.', 'Use Feint on a schedule, not after you take aggro. If it fails, Vanish.'],
      ['Check for immunity.', 'A boss may ignore your poison or bleeds. The dungeon pages list it for each boss.'],
    ],
    why: 'A rogue who dies does zero damage, and may wipe the group. Staying alive is your biggest damage increase.'
  },
  {
    id: 'pvp', title: 'Battlegrounds', icon: 'ability_kick',
    sum: 'Your job is rarely to fight the biggest thing. Your job is to remove what makes the enemy team work.',
    points: [
      ['Hunt healers.', 'A healer stopped for 15 seconds can decide a whole fight. Use Sap before it starts, or Cheap Shot and Kick when it does.'],
      ['Guard the quiet places.', 'A stealthed rogue on a flag or capture point can stop a lone attacker. Sap the first who arrives, fight the next.'],
      ['Stop the carrier.', 'Crippling Poison and Blind stop a flag carrier, and Sprint means you can reach them.'],
      ['Stay stealthed until it counts.', 'The enemy team does not know you are there. That is worth more than any early damage.'],
      ['Darkspear Islands', 'Forever adds a new 15v15 battleground with control points and flags, at levels 30 to 60. Its capture points are exactly where a hidden Sap wins time.'],
    ],
    why: 'Battlegrounds are won by numbers at the right place. You remove enemies from the fight without being seen, so the numbers change in your team\'s favor.'
  },
  {
    id: 'leveling', title: 'Leveling efficiently', icon: 'inv_misc_note_01',
    sum: 'Rogues are not the fastest leveler, but they are among the safest, and they earn the most gold.',
    points: [
      ['Stealth past what does not matter.', 'Do not kill mobs you do not need. Walk past them in stealth to your quest objective. It often saves minutes.'],
      ['Pick Pocket every humanoid.', 'It is free money and costs nothing.'],
      ['Open with the strongest move.', 'Ambush with a dagger, then swap to a slower weapon for Sinister Strike using a weapon swap macro.'],
      ['Do class quests.', 'The Poison quest at level 20 is a major power gain.'],
      ['Eat and bandage.', 'You have no self-healing. First Aid is mandatory, and Cooking with the new camping system saves time.'],
    ],
    why: 'Fewer pulls and fewer deaths beat raw kill speed. Stealth lets you skip what other classes must fight.'
  },
  {
    id: 'money', title: 'Gold and professions', icon: 'inv_misc_bag_11',
    sum: 'Rogues can earn gold with no gathering at all. You should still pick your professions on purpose.',
    points: [
      ['Pick Pocket and Lockpicking.', 'Boxes from pockets and from other players pay for your training and your first mount.'],
      ['Leveling: Skinning and Leatherworking, or Mining and Engineering.', 'Skinning pairs with beasts you kill anyway. Engineering is the strongest in PvP.'],
      ['Stay stocked.', 'Flash Powder and Blinding Powder are small costs. Running out in a fight costs a lot more.'],
      ['Sell what others need.', 'Lockboxes opened for tips, and rare world drops, are the easy money.'],
    ],
    why: 'Time saved by not worrying about gold is time you spend playing. Rogues get money as a free side effect of what they already do.'
  },
];
