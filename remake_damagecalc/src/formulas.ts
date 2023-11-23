/* eslint-disable no-eval */

import { Character, Formula } from "./types";
import { getEffectiveStats } from "./utils";

const allyPhysicalAttack = (
  attack: number,
  variance: number,
  def: number,
  boostModifier: string,
  timingModifier: string,
  chainModifier: string
) => {
  const bm = eval(boostModifier);
  const tm = eval(timingModifier);
  const cm = eval(chainModifier);
  return Math.round(
    Math.max((Math.round(attack * cm) + variance - def) * bm, 1) * tm
  );
};

export const regularAttackFormula: Formula = {
  function: allyPhysicalAttack,
  written:
    "round(((round(atk * chainModifier) + variance - enemyDef) * boostModifier) * timingModifier)",
};

const allySplash = (
  attack: number,
  variance: number,
  def: number,
  boostModifier: string,
  timingModifier: string,
  chainModifier: string
) => {
  const bm = eval(boostModifier);
  const tm = eval(timingModifier);
  const cm = eval(chainModifier);
  return Math.round(
    Math.max(((Math.round(attack * cm) + variance - def) / 5) * bm, 1) * tm
  );
};

export const allySplashFormula: Formula = {
  function: allySplash,
  written:
    "round(((round(atk * chainModifier) + variance - enemyDef) / 5 * boostModifier) * timingModifier)",
};

const starRidersOutput = (
  character1: Character,
  character2: Character,
  character3: Character,
  enemyDef: number,
  chainModifier: string
) => {
  const c1stats = getEffectiveStats(character1);
  const c2stats = getEffectiveStats(character2);
  const c3stats = getEffectiveStats(character3);

  console.log(c1stats, c2stats, c3stats);

  const c1dmg = allyPhysicalAttack(
    c1stats.attack,
    0,
    enemyDef,
    character1.activeAttackBoost,
    "2.0",
    chainModifier
  );
  const c2dmg = allyPhysicalAttack(
    c2stats.attack,
    0,
    enemyDef,
    character2.activeAttackBoost,
    "2.0",
    chainModifier
  );
  const c3dmg = allyPhysicalAttack(
    c3stats.attack,
    0,
    enemyDef,
    character3.activeAttackBoost,
    "2.0",
    chainModifier
  );

  return c1dmg + c2dmg + c3dmg;
};

export const starRidersFormula: Formula = {
  function: starRidersOutput,
  written:
    "round(((round(mario_atk * chainModifier) - enemyDef) * mario_boostModifier) * 2) + \nround(((round(mallow_atk * chainModifier) - enemyDef) * mallow_boostModifier) * 2) + \nround(((round(geno_atk * chainModifier) - enemyDef) * geno_boostModifier) * 2)",
};

const jumpDamage = (
  magicAttack: number,
  count: number,
  magicDef: number,
  boostModifier: string,
  timingModifier: string,
  chainModifier: string,
  elementModifier: number
) => {
  const bm = eval(boostModifier);
  const tm = eval(timingModifier);
  const cm = eval(chainModifier);
  return Math.round(
    Math.max(
      1,
      (Math.round(magicAttack * cm) +
        25 +
        Math.min(125, count / 2) -
        magicDef) *
        bm *
        elementModifier
    ) * tm
  );
};

export const jumpFormula: Formula = {
  function: jumpDamage,
  written:
    "round(((((round(magAtk * chainModifier) + basePower + min(125, jumpCount/2))-magDef)*boostModifier) * elementModifier) * timingModifier)",
};

const fireballDamage = (
  magicAttack: number,
  count: number,
  magicDef: number,
  boostModifier: string,
  chainModifier: string,
  elementModifier: number,
  basePower: number,
  cap: number
) => {
  const bm = eval(boostModifier);
  const cm = eval(chainModifier);

  console.log(magicAttack * cm + basePower - magicDef);
  console.log("15", ((magicAttack * cm + basePower - magicDef) * count) / 15);
  console.log(
    "ceil 15",
    Math.ceil(((magicAttack * cm + basePower - magicDef) * count) / 15)
  );
  console.log(
    "round 15",
    Math.round(((magicAttack * cm + basePower - magicDef) * count) / 15)
  );
  console.log(
    "floor 15",
    Math.floor(((magicAttack * cm + basePower - magicDef) * count) / 15)
  );
  console.log(Math.round(magicAttack * cm + basePower - magicDef));
  console.log(
    Math.round(((magicAttack * cm + basePower - magicDef) * count) / 15)
  );
  console.log(
    Math.round((magicAttack * cm + basePower - magicDef) * (1 + count / 15))
  );

  return Math.round(
    /*(Math.round(magicAttack * cm) + basePower - magicDef) *
      bm *
      elementModifier *
      (1 + Math.min(cap, count) / 16)*/

    (Math.round(magicAttack * cm) + basePower - magicDef) *
      bm *
      elementModifier *
      (1 + Math.min(cap, count) / 16)
  );
};

export const fireballFormula: Formula = {
  function: fireballDamage,
  written:
    "round((round(magicAttack * cm) + basePower - magicDef) * bm * elementModifier * (1 + count / 17))",
};

const multiJumpDamage = (
  magicAttack: number,
  count: number,
  magicDef: number,
  boostModifier: string,
  chainModifier: string,
  elementModifier: number,
  basePower: number
) => {
  const bm = eval(boostModifier);
  const cm = eval(chainModifier);
  const base =
    Math.floor((Math.floor(magicAttack * cm) + basePower - magicDef) * bm) *
    elementModifier;
  const step = Math.floor(base / 8);
  return base + step * count;
};

export const multijumpFormula: Formula = {
  function: multiJumpDamage,
  written:
    "round((round(magicAttack * cm) + basePower - magicDef) * bm * elementModifier * (1 + count / 17))",
};
