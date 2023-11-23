import { Accessories, Armors, Weapons } from "./entities";
import { Character, Level, LevelupBonus, LevelStats, Enemy } from "./types";

export const getBaseStats = (c: Character): LevelStats => {
  const baseAttack = c.levelBonuses
    .slice(0, c.level - c.minLevel + 1)
    .reduce(
      (accumulator: number, currentValue: Level, currentIndex: number) => {
        if (
          currentIndex > 0 &&
          c.statbonuses[currentIndex - 1] === LevelupBonus.ATTACK
        ) {
          accumulator += currentValue.bonus.pow.attack;
        }
        accumulator += currentValue.stats.attack;
        return accumulator;
      },
      0
    );
  const baseDefense = c.levelBonuses
    .slice(0, c.level - c.minLevel + 1)
    .reduce(
      (accumulator: number, currentValue: Level, currentIndex: number) => {
        if (
          currentIndex > 0 &&
          c.statbonuses[currentIndex - 1] === LevelupBonus.ATTACK
        ) {
          accumulator += currentValue.bonus.pow.defense;
        }
        accumulator += currentValue.stats.defense;
        return accumulator;
      },
      0
    );
  const baseHP = c.levelBonuses
    .slice(0, c.level - c.minLevel + 1)
    .reduce(
      (accumulator: number, currentValue: Level, currentIndex: number) => {
        if (
          currentIndex > 0 &&
          c.statbonuses[currentIndex - 1] === LevelupBonus.HP
        ) {
          accumulator += currentValue.bonus.hp.hp;
        }
        accumulator += currentValue.stats.hp;
        return accumulator;
      },
      0
    );
  const baseMagicAttack = c.levelBonuses
    .slice(0, c.level - c.minLevel + 1)
    .reduce(
      (accumulator: number, currentValue: Level, currentIndex: number) => {
        if (
          currentIndex > 0 &&
          c.statbonuses[currentIndex - 1] === LevelupBonus.SP
        ) {
          accumulator += currentValue.bonus.sp.magicAttack;
        }
        accumulator += currentValue.stats.magicAttack;
        return accumulator;
      },
      0
    );
  const baseMagicDefense = c.levelBonuses
    .slice(0, c.level - c.minLevel + 1)
    .reduce(
      (accumulator: number, currentValue: Level, currentIndex: number) => {
        if (
          currentIndex > 0 &&
          c.statbonuses[currentIndex - 1] === LevelupBonus.SP
        ) {
          accumulator += currentValue.bonus.sp.magicDefense;
        }
        accumulator += currentValue.stats.magicDefense;
        return accumulator;
      },
      0
    );

  return {
    attack: baseAttack,
    defense: baseDefense,
    magicAttack: baseMagicAttack,
    magicDefense: baseMagicDefense,
    speed: c.speed,
    hp: baseHP,
  };
};

export const getEffectiveStats = (c: Character): LevelStats => {
  const {
    attack: baseAttack,
    defense: baseDefense,
    magicAttack: baseMAttack,
    magicDefense: baseMDefense,
    speed: baseSpeed,
    hp: baseHP,
  } = getBaseStats(c);

  const effectiveAttack =
    baseAttack +
    (Weapons.find((w) => w.name === c.activeWeapon)?.basepower || 0) +
    (Armors.find((a) => a.name === c.activeArmor)?.attack || 0) +
    (Accessories.find((a) => a.name === c.activeAccessory)?.attack || 0);

  const effectiveDefense =
    baseDefense +
    (Armors.find((a) => a.name === c.activeArmor)?.defense || 0) +
    (Accessories.find((a) => a.name === c.activeAccessory)?.defense || 0);

  const effectiveMagicAttack =
    baseMAttack +
    (Weapons.find((w) => w.name === c.activeWeapon)?.magicAttack || 0) +
    (Armors.find((a) => a.name === c.activeArmor)?.magicAttack || 0) +
    (Accessories.find((a) => a.name === c.activeAccessory)?.magicAttack || 0);

  const effectiveMagicDefense =
    baseMDefense +
    (Armors.find((a) => a.name === c.activeArmor)?.magicDefense || 0) +
    (Accessories.find((a) => a.name === c.activeAccessory)?.magicDefense || 0);

  const effectiveSpeed =
    baseSpeed +
    (Armors.find((a) => a.name === c.activeArmor)?.speed || 0) +
    (Accessories.find((a) => a.name === c.activeAccessory)?.speed || 0);

  return {
    attack: effectiveAttack,
    defense: effectiveDefense,
    magicAttack: effectiveMagicAttack,
    magicDefense: effectiveMagicDefense,
    speed: effectiveSpeed,
    hp: baseHP,
  };
};

export const getEnemyStats = (
  enemy: Enemy,
  breezy: boolean = false
): LevelStats => ({
  attack: Math.round(enemy.attack * (breezy ? 0.9 : 1)),
  defense: Math.round(enemy.defense * (breezy ? 0.9 : 1)),
  magicAttack: Math.round(enemy.magicAttack * (breezy ? 0.9 : 1)),
  magicDefense: Math.round(enemy.magicDefense * (breezy ? 0.9 : 1)),
  speed: enemy.speed,
  hp: Math.round(enemy.hp * (breezy ? 0.9 : 1)),
});
