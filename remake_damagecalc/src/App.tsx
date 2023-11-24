import React, { useState, useEffect, useCallback } from "react";
import {
  HitType,
  AttackBoostModifier,
  AttackType,
  Character,
  AttackName,
  GenoBuff,
  MallowBuff,
  BowserBuff,
  PeachBuff,
  TimingType,
  Enemy,
  EnemyAttack,
  DefenseBoostModifier,
  AttackTimingModifier,
  AttackElement,
} from "./types";

import {
  AllyAttacks,
  Accessories,
  Armors,
  Weapons,
  Enemies,
  EnemyAttacks,
} from "./entities";

// import _ from 'lodash';

import {
  allySplashFormula,
  fireballFormula,
  jumpFormula,
  regularAttackFormula,
  starRidersFormula,
} from "./formulas";

import { getBaseStats, getEffectiveStats, getEnemyStats } from "./utils";
import CHARACTER_DATA from "./characters";
import { CharacterForm } from "./components";

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>(CHARACTER_DATA);
  const [selectedCharacterIndex, setSelectedCharacterIndex] =
    useState<number>(0);
  const [selectedType, setSelectedType] = useState<HitType>(HitType.HIT);
  const [selectedDefenseBoost, setSelectedDefenseBoostType] =
    useState<DefenseBoostModifier>(DefenseBoostModifier.NONE);
  const [selectedEnemyAttackBoost, setSelectedEnemyAttackBoostType] =
    useState<AttackBoostModifier>(AttackBoostModifier.NONE);
  const [selectedEnemyDefenseBoost, setSelectedEnemyDefenseBoostType] =
    useState<DefenseBoostModifier>(DefenseBoostModifier.NONE);
  const [selectedAttackTiming, setSelectedAttackTimingType] =
    useState<string>("2");
  const [selectedDefenseTiming, setSelectedDefenseTimingType] =
    useState<string>("1");

  const [selectedGenoBuff, setSelectedGenoBuff] = useState<GenoBuff>(
    GenoBuff.NO_CHAIN
  );
  const [selectedMallowBuff, setSelectedMallowBuff] = useState<MallowBuff>(
    MallowBuff.NO_CHAIN
  );
  const [selectedBowserBuff, setSelectedBowserBuff] = useState<BowserBuff>(
    BowserBuff.NO_CHAIN
  );
  const [selectedPeachBuff, setSelectedPeachBuff] = useState<PeachBuff>(
    PeachBuff.NO_CHAIN
  );

  const [splashDamage, setSplashDamage] = useState<boolean>(false);
  const [defending, setDefending] = useState<boolean>(false);
  const [breezy, setBreezy] = useState<boolean>(false);
  const [jumpCount, setJumpCount] = useState<number>(0);
  const [fbCount, setFBCount] = useState<number>(0);
  const [sjCount, setSJCount] = useState<number>(0);
  const [sfCount, setSFCount] = useState<number>(0);
  const [ujCount, setUJCount] = useState<number>(0);
  const [ufCount, setUFCount] = useState<number>(0);
  const [snowyCount, setSnowyCount] = useState<number>(0);
  const [srCount, setSRCount] = useState<number>(0);
  const [terrCount, setTerrCount] = useState<number>(0);
  const [pgCount, setPGCount] = useState<number>(0);
  const [bcCount, setBCCount] = useState<number>(0);
  const [pbCount, setPBCount] = useState<number>(0);
  const [selectedEnemy, setSelectedEnemy] = useState<Enemy>(Enemies[0]);
  const [selectedEnemyAttack, setSelectedEnemyAttack] = useState<EnemyAttack>(
    EnemyAttacks.find((a) => a.name === Enemies[0].attacks[0]) ||
      EnemyAttacks[0]
  );
  const [writtenFormula, setWrittenFormula] = useState<string>("N/A");
  const [writtenDamage, setWrittenDamage] = useState<string>("N/A");

  const selectedCharacter = characters[selectedCharacterIndex];
  const activeAllyAttack =
    AllyAttacks.find((a) => a.name === selectedCharacter.activeAttack) ||
    AllyAttacks[0];
  const activeAllyWeapon =
    Weapons.find((a) => a.name === selectedCharacter.activeWeapon) ||
    Weapons[0];
  const activeAllyArmor =
    Armors.find((a) => a.name === selectedCharacter.activeArmor) || Armors[0];
  const activeAllyAccessory =
    Accessories.find((a) => a.name === selectedCharacter.activeAccessory) ||
    Accessories[0];
  const baseStats = getBaseStats(selectedCharacter);
  const effectiveStats = getEffectiveStats(selectedCharacter);
  const enemyStats = getEnemyStats(selectedEnemy, breezy);

  const hitCounterValue =
    selectedCharacter.activeAttack === AttackName.JUMP
      ? jumpCount
      : selectedCharacter.activeAttack === AttackName.FIREBALL
      ? fbCount
      : selectedCharacter.activeAttack === AttackName.SUPER_JUMP
      ? sjCount
      : selectedCharacter.activeAttack === AttackName.SUPER_FIREBALL
      ? sfCount
      : selectedCharacter.activeAttack === AttackName.ULTRA_JUMP
      ? ujCount
      : selectedCharacter.activeAttack === AttackName.ULTRA_FIREBALL
      ? ufCount
      : selectedCharacter.activeAttack === AttackName.SNOWY
      ? snowyCount
      : selectedCharacter.activeAttack === AttackName.STAR_RAIN
      ? srCount
      : selectedCharacter.activeAttack === AttackName.TERRORIZE
      ? terrCount
      : selectedCharacter.activeAttack === AttackName.POISON_GAS
      ? pgCount
      : selectedCharacter.activeAttack === AttackName.MECHAKOOPA_STOMP
      ? bcCount
      : selectedCharacter.activeAttack === AttackName.PSYCH_BOMB
      ? pbCount
      : 0;

  const recalcDamage = useCallback(() => {
    if (selectedType === HitType.HIT) {
      // find element multiplier
      const allyAttack =
        AllyAttacks.find((a) => a.name === selectedCharacter.activeAttack) ||
        AllyAttacks[0];
      let elementModifier = 1;
      if (
        [
          AttackElement.THUNDER,
          AttackElement.FIRE,
          AttackElement.ICE,
          AttackElement.JUMP,
        ].includes(allyAttack.element) &&
        selectedEnemy.weakness.includes(allyAttack.element)
      ) {
        elementModifier = 2;
      } else {
        selectedEnemy.weakness.forEach((w) => {
          if (
            [
              AttackElement.THUNDER,
              AttackElement.FIRE,
              AttackElement.ICE,
            ].includes(w) &&
            allyAttack.element === AttackElement.ALL
          ) {
            elementModifier = 2;
          }
        });
      }
      if (
        [AttackElement.THUNDER, AttackElement.FIRE, AttackElement.ICE].includes(
          allyAttack.element
        ) &&
        selectedEnemy.weakness.includes(allyAttack.element)
      ) {
        elementModifier = 2;
      }
      const allyWeapon =
        Weapons.find((a) => a.name === activeAllyWeapon.name) || Weapons[0];

      // ally attack business logic
      if (allyAttack.type === AttackType.PHYSICAL) {
        let formula = regularAttackFormula;
        if (
          selectedAttackTiming === AttackTimingModifier.PERFECT &&
          splashDamage
        ) {
          formula = allySplashFormula;
        }
        setWrittenFormula(formula.written);
        const lower = formula.function(
          effectiveStats.attack,
          allyWeapon.variance * -1,
          enemyStats.defense,
          selectedCharacter.activeAttackBoost,
          selectedAttackTiming,
          selectedGenoBuff
        );
        const mid = formula.function(
          effectiveStats.attack,
          0,
          enemyStats.defense,
          selectedCharacter.activeAttackBoost,
          selectedAttackTiming,
          selectedGenoBuff
        );
        const upper = formula.function(
          effectiveStats.attack,
          allyWeapon.variance,
          enemyStats.defense,
          selectedCharacter.activeAttackBoost,
          selectedAttackTiming,
          selectedGenoBuff
        );
        if (upper === lower) {
          setWrittenDamage(`${mid}`);
        } else {
          setWrittenDamage(`Upper: ${upper}\nMedian: ${mid}\nLower: ${lower}`);
        }
      } else if (activeAllyAttack.name === AttackName.JUMP) {
        setWrittenFormula(jumpFormula.written);
        setWrittenDamage(
          `${jumpFormula.function(
            effectiveStats.magicAttack,
            jumpCount,
            enemyStats.magicDefense,
            selectedCharacter.activeAttackBoost,
            selectedAttackTiming,
            selectedMallowBuff,
            elementModifier
          )}`
        );
      } else if (
        [
          AttackName.FIREBALL,
          AttackName.SUPER_FIREBALL,
          AttackName.ULTRA_FIREBALL,
        ].includes(activeAllyAttack.name)
      ) {
        setWrittenFormula(fireballFormula.written);
        let count = 0;
        if (activeAllyAttack.name === AttackName.FIREBALL) {
          count = fbCount;
        }
        if (activeAllyAttack.name === AttackName.SUPER_FIREBALL) {
          count = sfCount;
        }
        if (activeAllyAttack.name === AttackName.ULTRA_FIREBALL) {
          count = ufCount;
        }
        setWrittenDamage(
          `${fireballFormula.function(
            effectiveStats.magicAttack,
            count,
            enemyStats.magicDefense,
            selectedCharacter.activeAttackBoost,
            selectedMallowBuff,
            elementModifier,
            activeAllyAttack.basepower,
            activeAllyAttack.cap
          )}`
        );
      } else if (selectedCharacter.activeAttack === AttackName.STAR_RIDERS) {
        setWrittenFormula(starRidersFormula.written);
        setWrittenDamage(
          `${starRidersFormula.function(
            characters[0],
            characters[1],
            characters[2],
            enemyStats.defense,
            selectedGenoBuff
          )}`
        );
      } else {
        setWrittenFormula("N/A");
        setWrittenDamage(`N/A`);
      }
    } else {
      setWrittenFormula("N/A");
      setWrittenDamage("N/A");
    }
  }, [
    selectedType,
    selectedEnemy.weakness,
    activeAllyAttack.name,
    activeAllyAttack.basepower,
    activeAllyAttack.cap,
    selectedCharacter.activeAttack,
    selectedCharacter.activeAttackBoost,
    activeAllyWeapon.name,
    selectedAttackTiming,
    splashDamage,
    effectiveStats.attack,
    effectiveStats.magicAttack,
    enemyStats.defense,
    enemyStats.magicDefense,
    selectedGenoBuff,
    jumpCount,
    selectedMallowBuff,
    fbCount,
    sfCount,
    ufCount,
    characters,
  ]);

  useEffect(() => {
    recalcDamage();
  }, [recalcDamage]);

  const updateAttack = useCallback((updatedAttack: AttackName) => {
    const a =
      AllyAttacks.find((a) => a.name === updatedAttack) || AllyAttacks[0];
    if (!!a.tiers) {
      setSelectedAttackTimingType(a.tiers[0]);
    }
  }, []);

  const handleChangeHitCounter = (value: number) => {
    if (selectedCharacter.activeAttack === AttackName.JUMP) {
      setJumpCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.FIREBALL) {
      setFBCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.SUPER_JUMP) {
      setSJCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.SUPER_FIREBALL) {
      setSFCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.ULTRA_JUMP) {
      setUJCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.ULTRA_FIREBALL) {
      setUFCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.SNOWY) {
      setSnowyCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.STAR_RAIN) {
      setSRCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.TERRORIZE) {
      setTerrCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.POISON_GAS) {
      setPGCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.MECHAKOOPA_STOMP) {
      setBCCount(value);
    } else if (selectedCharacter.activeAttack === AttackName.PSYCH_BOMB) {
      setPBCount(value);
    }
  };

  const handleTypeChange = (event: any) => {
    setSelectedType(event.target.value);
  };
  const handleDefenseBoostChange = (event: any) => {
    setSelectedDefenseBoostType(event.target.value);
  };
  const handleEnemyAttackBoostChange = (event: any) => {
    setSelectedEnemyAttackBoostType(event.target.value);
  };
  const handleEnemyDefenseBoostChange = (event: any) => {
    setSelectedEnemyDefenseBoostType(event.target.value);
  };

  const handleAttackTimingChange = (value: string) => {
    setSelectedAttackTimingType(value);
    recalcDamage();
  };
  const handleDefenseTimingChange = (value: string) => {
    setSelectedDefenseTimingType(value);
  };

  const handleGenoBuffChange = (event: any) => {
    setSelectedGenoBuff(event.target.value);
  };
  const handleMallowBuffChange = (event: any) => {
    setSelectedMallowBuff(event.target.value);
  };
  const handleBowserBuffChange = (event: any) => {
    setSelectedBowserBuff(event.target.value);
  };
  const handlePeachBuffChange = (event: any) => {
    setSelectedPeachBuff(event.target.value);
  };
  const handleSplashDamageChange = (event: any) => {
    setSplashDamage(!splashDamage);
  };
  const handleDefenseChange = (event: any) => {
    setDefending(!defending);
  };
  const handleDifficultyChange = (event: any) => {
    setBreezy(!breezy);
  };

  const handleCharacterChange = (value: string) => {
    setSelectedCharacterIndex(parseInt(value));
  };

  const handleEnemyChange = (value: string) => {
    const enemy = Enemies.find((c) => c.name === value) || Enemies[0];
    setSelectedEnemy(enemy);
    handleEnemyAttackChange(enemy.attacks[0]);
  };

  const handleEnemyAttackChange = (value: string) => {
    const attack =
      EnemyAttacks.find((c) => c.name === value) || EnemyAttacks[0];
    setSelectedEnemyAttack(attack);
  };

  const updateCharacter = useCallback((updatedCharacter: Character) => {
    setCharacters((prevCharacters) => {
      // Update the character based on the selectedType
      const updatedCharacters = [...prevCharacters];
      if (updatedCharacter.id === "mario") {
        updatedCharacters[0] = updatedCharacter;
      }
      if (updatedCharacter.id === "mallow") {
        updatedCharacters[1] = updatedCharacter;
      }
      if (updatedCharacter.id === "geno") {
        updatedCharacters[2] = updatedCharacter;
      }
      if (updatedCharacter.id === "bowser") {
        updatedCharacters[3] = updatedCharacter;
      }
      if (updatedCharacter.id === "peach") {
        updatedCharacters[4] = updatedCharacter;
      }
      // Handle other character updates as needed
      return updatedCharacters;
    });
  }, []);

  console.log(selectedType);

  return (
    <>
      <div>
        <b>
          This damage calculator is a work in progress. Many of these formulas
          are estimations, and postgame enemy stats are approximate. Join the
          SMRPG discord if you'd like to contribute research or code.
        </b>
      </div>
      <div className="container">
        <div className="column1">
          <label>
            <input
              type="radio"
              name="hitType"
              value={HitType.HIT}
              checked={selectedType === HitType.HIT}
              onChange={handleTypeChange}
            />
            I'm the one attacking
          </label>
          <div className="form">
            <div className="row">
              <div className="label">
                <label htmlFor="selectCharacter">Character:</label>
              </div>
              <div className="formElements">
                <select
                  onChange={(e) => handleCharacterChange(e.target.value)}
                  id="selectCharacter"
                >
                  {CHARACTER_DATA.map((c, idx) => (
                    <option value={idx}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <CharacterForm
              character={selectedCharacter}
              updateCharacter={updateCharacter}
              updateAttack={updateAttack}
              mode={selectedType}
            >
              <>
                {selectedType === HitType.HIT && (
                  <>
                    {(activeAllyAttack.timingType ===
                      TimingType.BUTTON_PRESSES ||
                      activeAllyAttack.timingType === TimingType.JUMP) && (
                      <div className="row">
                        <div className="label">
                          <label htmlFor="hitCounter">Count:</label>
                        </div>
                        <div className="formElements">
                          <input
                            type="number"
                            id="hitCounter"
                            step="1"
                            min="0"
                            max={activeAllyAttack.cap}
                            onChange={(e) =>
                              handleChangeHitCounter(Number(e.target.value))
                            }
                            value={hitCounterValue}
                          />
                        </div>
                      </div>
                    )}
                    {(activeAllyAttack.timingType === TimingType.THREE_TIER ||
                      activeAllyAttack.timingType === TimingType.FIVE_TIER ||
                      activeAllyAttack.timingType === TimingType.JUMP) && (
                      <div className="row">
                        <div className="label">
                          <label>Timing:</label>
                        </div>
                        <div className="formElements">
                          {!!activeAllyAttack.tiers &&
                            activeAllyAttack.tiers.map((tier, idx) => (
                              <label
                                className="verticalRadio"
                                htmlFor={`timingTier${idx}`}
                              >
                                <input
                                  type="radio"
                                  name="attackTiming"
                                  value={tier}
                                  checked={selectedAttackTiming === tier}
                                  onChange={(e) =>
                                    handleAttackTimingChange(e.target.value)
                                  }
                                  id={`timingTier${idx}`}
                                />
                                x{tier}
                              </label>
                            ))}
                        </div>
                      </div>
                    )}
                    {activeAllyAttack.type === AttackType.PHYSICAL &&
                      selectedAttackTiming === AttackTimingModifier.PERFECT && (
                        <div className="row">
                          <div className="label">
                            <label htmlFor="splash">Splash damage:</label>
                          </div>
                          <div className="formElements">
                            <input
                              type="checkbox"
                              checked={splashDamage}
                              onChange={handleSplashDamageChange}
                              id="splash"
                            />
                          </div>
                        </div>
                      )}
                    {(activeAllyAttack.type === AttackType.PHYSICAL ||
                      activeAllyAttack.name === AttackName.STAR_RIDERS) && (
                      <div className="row">
                        <div className="label">
                          <label>Geno ally chain buff:</label>
                        </div>
                        <div className="formElements">
                          <label className="verticalRadio" htmlFor="genoChain5">
                            <input
                              type="radio"
                              name="genoChain"
                              value={GenoBuff.FIVE_CHAIN}
                              checked={selectedGenoBuff === GenoBuff.FIVE_CHAIN}
                              onChange={handleGenoBuffChange}
                              id="genoChain5"
                            />
                            Five chain (x{GenoBuff.FIVE_CHAIN})
                          </label>
                          <label className="verticalRadio" htmlFor="genoChain3">
                            <input
                              type="radio"
                              name="genoChain"
                              value={GenoBuff.THREE_CHAIN}
                              checked={
                                selectedGenoBuff === GenoBuff.THREE_CHAIN
                              }
                              onChange={handleGenoBuffChange}
                              id="genoChain3"
                            />
                            Three chain (x{GenoBuff.THREE_CHAIN})
                          </label>
                          <label className="verticalRadio" htmlFor="genoChain2">
                            <input
                              type="radio"
                              name="genoChain"
                              value={GenoBuff.TWO_CHAIN}
                              checked={selectedGenoBuff === GenoBuff.TWO_CHAIN}
                              onChange={handleGenoBuffChange}
                              id="genoChain2"
                            />
                            Two chain (x{GenoBuff.TWO_CHAIN})
                          </label>
                          <label className="verticalRadio" htmlFor="genoChain0">
                            <input
                              type="radio"
                              name="genoChain"
                              value={GenoBuff.NO_CHAIN}
                              checked={selectedGenoBuff === GenoBuff.NO_CHAIN}
                              onChange={handleGenoBuffChange}
                              id="genoChain0"
                            />
                            No chain (x{GenoBuff.NO_CHAIN})
                          </label>
                        </div>
                      </div>
                    )}
                    {activeAllyAttack.type === AttackType.SPELL && (
                      <div className="row">
                        <div className="label">
                          <label>Mallow ally chain buff:</label>
                        </div>
                        <div className="formElements">
                          <label
                            className="verticalRadio"
                            htmlFor="mallowChain5"
                          >
                            <input
                              type="radio"
                              name="mallowChain"
                              value={MallowBuff.FIVE_CHAIN}
                              checked={
                                selectedMallowBuff === MallowBuff.FIVE_CHAIN
                              }
                              onChange={handleMallowBuffChange}
                              id="mallowChain5"
                            />
                            Five chain (x{MallowBuff.FIVE_CHAIN})
                          </label>
                          <label
                            className="verticalRadio"
                            htmlFor="mallowChain3"
                          >
                            <input
                              type="radio"
                              name="mallowChain"
                              value={MallowBuff.THREE_CHAIN}
                              checked={
                                selectedMallowBuff === MallowBuff.THREE_CHAIN
                              }
                              onChange={handleMallowBuffChange}
                              id="mallowChain3"
                            />
                            Three chain (x{MallowBuff.THREE_CHAIN})
                          </label>
                          <label
                            className="verticalRadio"
                            htmlFor="mallowChain2"
                          >
                            <input
                              type="radio"
                              name="mallowChain"
                              value={MallowBuff.TWO_CHAIN}
                              checked={
                                selectedMallowBuff === MallowBuff.TWO_CHAIN
                              }
                              onChange={handleMallowBuffChange}
                              id="mallowChain2"
                            />
                            Two chain (x{MallowBuff.TWO_CHAIN})
                          </label>
                          <label
                            className="verticalRadio"
                            htmlFor="mallowChain0"
                          >
                            <input
                              type="radio"
                              name="mallowChain"
                              value={MallowBuff.NO_CHAIN}
                              checked={
                                selectedMallowBuff === MallowBuff.NO_CHAIN
                              }
                              onChange={handleMallowBuffChange}
                              id="mallowChain0"
                            />
                            No chain (x{MallowBuff.NO_CHAIN})
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedType === HitType.BLOCK && (
                  <>
                    <div className="row">
                      <div className="label">
                        <label>Boost modifier:</label>
                      </div>
                      <div className="formElements">
                        <label
                          className="verticalRadio"
                          htmlFor="defenseBoostBoosted"
                        >
                          <input
                            type="radio"
                            name="defenseBoost"
                            value={DefenseBoostModifier.BOOSTED}
                            checked={
                              selectedDefenseBoost ===
                              DefenseBoostModifier.BOOSTED
                            }
                            onChange={handleDefenseBoostChange}
                            id="defenseBoostBoosted"
                          />
                          Player defense boosted (x2.0)
                        </label>
                        <label
                          className="verticalRadio"
                          htmlFor="defenseBoostFeared"
                        >
                          <input
                            type="radio"
                            name="defenseBoost"
                            value={DefenseBoostModifier.FEARED}
                            checked={
                              selectedDefenseBoost ===
                              DefenseBoostModifier.FEARED
                            }
                            onChange={handleDefenseBoostChange}
                            id="defenseBoostFeared"
                          />
                          Player feared (x2/3)
                        </label>
                        <label
                          className="verticalRadio"
                          htmlFor="defenseBoostNone"
                        >
                          <input
                            type="radio"
                            name="defenseBoost"
                            value={DefenseBoostModifier.NONE}
                            checked={
                              selectedDefenseBoost === DefenseBoostModifier.NONE
                            }
                            onChange={handleDefenseBoostChange}
                            id="defenseBoostNone"
                          />
                          None (x1)
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="label">
                        <label>Timing:</label>
                      </div>
                      <div className="formElements">
                        {[
                          { v: "0", n: "Perfect" },
                          { v: "0.5", n: "Half" },
                          { v: "1", n: "Untimed" },
                        ].map((tier, idx) => (
                          <label
                            className="verticalRadio"
                            htmlFor={`defenseTimingTier${idx}`}
                          >
                            <input
                              type="radio"
                              name="defenseTiming"
                              value={tier.v}
                              checked={selectedDefenseTiming === tier.v}
                              onChange={(e) =>
                                handleDefenseTimingChange(e.target.value)
                              }
                              id={`defenseTimingTier${idx}`}
                            />
                            {tier.n} (x{tier.v})
                          </label>
                        ))}
                      </div>
                    </div>
                    {selectedEnemyAttack.type === AttackType.PHYSICAL && (
                      <div className="row">
                        <div className="label">
                          <label>Bowser ally chain buff:</label>
                        </div>
                        <div className="formElements">
                          <label
                            className="verticalRadio"
                            htmlFor="bowserChain5"
                          >
                            <input
                              type="radio"
                              name="bowserChain"
                              value={BowserBuff.FIVE_CHAIN}
                              checked={
                                selectedBowserBuff === BowserBuff.FIVE_CHAIN
                              }
                              onChange={handleBowserBuffChange}
                              id="bowserChain5"
                            />
                            Five chain (x{BowserBuff.FIVE_CHAIN})
                          </label>
                          <label
                            className="verticalRadio"
                            htmlFor="bowserChain3"
                          >
                            <input
                              type="radio"
                              name="bowserChain"
                              value={BowserBuff.THREE_CHAIN}
                              checked={
                                selectedBowserBuff === BowserBuff.THREE_CHAIN
                              }
                              onChange={handleBowserBuffChange}
                              id="bowserChain3"
                            />
                            Three chain (x{BowserBuff.THREE_CHAIN})
                          </label>
                          <label
                            className="verticalRadio"
                            htmlFor="bowserChain2"
                          >
                            <input
                              type="radio"
                              name="bowserChain"
                              value={BowserBuff.TWO_CHAIN}
                              checked={
                                selectedBowserBuff === BowserBuff.TWO_CHAIN
                              }
                              onChange={handleBowserBuffChange}
                              id="bowserChain2"
                            />
                            Two chain (x{BowserBuff.TWO_CHAIN})
                          </label>
                          <label
                            className="verticalRadio"
                            htmlFor="bowserChain0"
                          >
                            <input
                              type="radio"
                              name="bowserChain"
                              value={BowserBuff.NO_CHAIN}
                              checked={
                                selectedBowserBuff === BowserBuff.NO_CHAIN
                              }
                              onChange={handleBowserBuffChange}
                              id="bowserChain0"
                            />
                            No chain (x{BowserBuff.NO_CHAIN})
                          </label>
                        </div>
                      </div>
                    )}
                    {selectedEnemyAttack.type === AttackType.SPELL && (
                      <div className="row">
                        <div className="label">
                          <label>Peach ally chain buff:</label>
                        </div>
                        <div className="formElements">
                          <label
                            className="verticalRadio"
                            htmlFor="peachChain5"
                          >
                            <input
                              type="radio"
                              name="peachChain"
                              value={PeachBuff.FIVE_CHAIN}
                              checked={
                                selectedPeachBuff === PeachBuff.FIVE_CHAIN
                              }
                              onChange={handlePeachBuffChange}
                              id="peachChain5"
                            />
                            Five chain (x{PeachBuff.FIVE_CHAIN})
                          </label>
                          <label
                            className="verticalRadio"
                            htmlFor="peachChain3"
                          >
                            <input
                              type="radio"
                              name="peachChain"
                              value={PeachBuff.THREE_CHAIN}
                              checked={
                                selectedPeachBuff === PeachBuff.THREE_CHAIN
                              }
                              onChange={handlePeachBuffChange}
                              id="peachChain3"
                            />
                            Three chain (x{PeachBuff.THREE_CHAIN})
                          </label>
                          <label
                            className="verticalRadio"
                            htmlFor="peachChain2"
                          >
                            <input
                              type="radio"
                              name="peachChain"
                              value={PeachBuff.TWO_CHAIN}
                              checked={
                                selectedPeachBuff === PeachBuff.TWO_CHAIN
                              }
                              onChange={handlePeachBuffChange}
                              id="peachChain2"
                            />
                            Two chain (x{PeachBuff.TWO_CHAIN})
                          </label>
                          <label
                            className="verticalRadio"
                            htmlFor="peachChain0"
                          >
                            <input
                              type="radio"
                              name="peachChain"
                              value={PeachBuff.NO_CHAIN}
                              checked={selectedPeachBuff === PeachBuff.NO_CHAIN}
                              onChange={handlePeachBuffChange}
                              id="peachChain0"
                            />
                            No chain (x{PeachBuff.NO_CHAIN})
                          </label>
                        </div>
                      </div>
                    )}
                    {selectedEnemyAttack.type === AttackType.PHYSICAL && (
                      <div className="row">
                        <div className="label">
                          <label htmlFor="defending">Defending:</label>
                        </div>
                        <div className="formElements">
                          <input
                            type="checkbox"
                            checked={defending}
                            onChange={handleDefenseChange}
                            id="defending"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            </CharacterForm>
          </div>
        </div>

        <div className="column2">
          <label>
            <input
              type="radio"
              name="hitType"
              value={HitType.BLOCK}
              checked={selectedType === HitType.BLOCK}
              onChange={handleTypeChange}
            />
            Enemy is the one attacking
          </label>
          <div className="form">
            <div className="row">
              <div className="label">
                <label htmlFor="selectEnemy">Monster:</label>
              </div>
              <div className="formElements">
                <select
                  onChange={(e) => handleEnemyChange(e.target.value)}
                  id="selectEnemy"
                  value={selectedEnemy.name || Enemies[0].name}
                >
                  {Enemies.map((c) => (
                    <option value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="label">
                <label
                  htmlFor="selectEnemyAttack"
                  style={{
                    paddingLeft: "10px",
                    visibility:
                      selectedType === HitType.BLOCK ? "visible" : "hidden",
                  }}
                >
                  Monster attack:
                </label>
              </div>
              <div className="formElements" style={{ width: "225px" }}>
                <select
                  onChange={(e) => handleEnemyAttackChange(e.target.value)}
                  id="selectEnemyAttack"
                  value={selectedEnemyAttack.name || EnemyAttacks[0].name}
                  style={{
                    visibility:
                      selectedType === HitType.BLOCK ? "visible" : "hidden",
                  }}
                >
                  {selectedEnemy.attacks.map((c) => (
                    <option value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="label">
                <label htmlFor="breezy">Breezy mode:</label>
              </div>
              <div className="formElements">
                <input
                  type="checkbox"
                  checked={breezy}
                  onChange={handleDifficultyChange}
                  id="breezy"
                />
              </div>
              {selectedType === HitType.HIT && (
                <>
                  <div className="label">
                    <label
                      style={{
                        paddingLeft: "10px",
                      }}
                    >
                      Enemy def boost:
                    </label>
                  </div>
                  <div className="formElements">
                    <label
                      className="verticalRadio"
                      htmlFor="enemyDefenseBoostBoosted"
                    >
                      <input
                        type="radio"
                        name="enemyDefenseBoost"
                        value={DefenseBoostModifier.BOOSTED}
                        checked={
                          selectedEnemyDefenseBoost ===
                          DefenseBoostModifier.BOOSTED
                        }
                        onChange={handleEnemyDefenseBoostChange}
                        id="enemyDefenseBoostBoosted"
                      />
                      Enemy def boosted (x2.0)
                    </label>
                    <label
                      className="verticalRadio"
                      htmlFor="enemyDefenseBoostFeared"
                    >
                      <input
                        type="radio"
                        name="enemyDefenseBoost"
                        value={DefenseBoostModifier.FEARED}
                        checked={
                          selectedEnemyDefenseBoost ===
                          DefenseBoostModifier.FEARED
                        }
                        onChange={handleEnemyDefenseBoostChange}
                        id="enemyDefenseBoostFeared"
                      />
                      Enemy feared (x2/3)
                    </label>
                    <label
                      className="verticalRadio"
                      htmlFor="enemyDefenseBoostNone"
                    >
                      <input
                        type="radio"
                        name="enemyDefenseBoost"
                        value={DefenseBoostModifier.NONE}
                        checked={
                          selectedEnemyDefenseBoost ===
                          DefenseBoostModifier.NONE
                        }
                        onChange={handleEnemyDefenseBoostChange}
                        id="enemyDefenseBoostNone"
                      />
                      None (x1)
                    </label>
                  </div>
                </>
              )}
              {selectedType === HitType.BLOCK && (
                <>
                  <div className="label">
                    <label
                      style={{
                        paddingLeft: "10px",
                      }}
                    >
                      Enemy atk boost:
                    </label>
                  </div>
                  <div className="formElements">
                    <label
                      className="verticalRadio"
                      htmlFor="enemyAttackBoostBoosted"
                    >
                      <input
                        type="radio"
                        name="enemyAttackBoost"
                        value={AttackBoostModifier.BOOSTED}
                        checked={
                          selectedEnemyAttackBoost ===
                          AttackBoostModifier.BOOSTED
                        }
                        onChange={handleEnemyAttackBoostChange}
                        id="enemyAttackBoostBoosted"
                      />
                      Enemy atk boosted (x2.0)
                    </label>
                    <label
                      className="verticalRadio"
                      htmlFor="enemyAttackBoostFeared"
                    >
                      <input
                        type="radio"
                        name="enemyAttackBoost"
                        value={AttackBoostModifier.FEARED}
                        checked={
                          selectedEnemyAttackBoost ===
                          AttackBoostModifier.FEARED
                        }
                        onChange={handleEnemyAttackBoostChange}
                        id="enemyAttackBoostFeared"
                      />
                      Enemy feared (x0.5)
                    </label>
                    <label
                      className="verticalRadio"
                      htmlFor="enemyAttackBoostNone"
                    >
                      <input
                        type="radio"
                        name="enemyAttackBoost"
                        value={AttackBoostModifier.NONE}
                        checked={
                          selectedEnemyAttackBoost === AttackBoostModifier.NONE
                        }
                        onChange={handleEnemyAttackBoostChange}
                        id="enemyAttackBoostNone"
                      />
                      None (x1)
                    </label>
                  </div>
                </>
              )}
            </div>
            <div className="row">
              <div className="label">Your HP:</div>
              <div className="formElements">{baseStats.hp}</div>
              <div className="label">
                <span className="padLeft15">Enemy HP</span>
              </div>
              <div className="formElements">{enemyStats.hp}</div>
            </div>
            <div className="row">
              <div className="label">Your attack:</div>
              <div className="formElements">
                {baseStats.attack}
                {activeAllyWeapon.basepower !== 0 &&
                  ` + ${activeAllyWeapon.basepower}`}
                {activeAllyArmor.attack !== 0 && ` + ${activeAllyArmor.attack}`}
                {activeAllyAccessory.attack !== 0 &&
                  ` + ${activeAllyAccessory.attack}`}
                <b>
                  {(activeAllyWeapon.basepower !== 0 ||
                    activeAllyAccessory.attack !== 0 ||
                    activeAllyArmor.attack !== 0) &&
                    ` = ${effectiveStats.attack}`}
                </b>
              </div>
              <div className="label">
                <span className="padLeft15">Enemy attack:</span>
              </div>
              <div className="formElements">{enemyStats.attack}</div>
            </div>
            <div className="row">
              <div className="label">Your defense:</div>
              <div className="formElements">
                {baseStats.defense}
                {activeAllyArmor.defense !== 0 &&
                  ` + ${activeAllyArmor.defense}`}
                {activeAllyAccessory.defense !== 0 &&
                  ` + ${activeAllyAccessory.defense}`}
                <b>
                  {(activeAllyAccessory.defense !== 0 ||
                    activeAllyArmor.defense !== 0) &&
                    ` = ${effectiveStats.defense}`}
                </b>
              </div>
              <div className="label">
                <span className="padLeft15">Enemy defense:</span>
              </div>
              <div className="formElements">{enemyStats.defense}</div>
            </div>
            <div className="row">
              <div className="label">Your mag.attack:</div>
              <div className="formElements">
                {baseStats.magicAttack}
                {!!activeAllyWeapon.magicAttack &&
                  ` + ${activeAllyWeapon.magicAttack}`}
                {activeAllyArmor.magicAttack !== 0 &&
                  ` + ${activeAllyArmor.magicAttack}`}
                {activeAllyAccessory.magicAttack !== 0 &&
                  ` + ${activeAllyAccessory.magicAttack}`}
                <b>
                  {(activeAllyAccessory.magicAttack !== 0 ||
                    activeAllyArmor.magicAttack !== 0) &&
                    ` = ${effectiveStats.magicDefense}`}
                </b>
              </div>
              <div className="label">
                <span className="padLeft15">Enemy mag.attack:</span>
              </div>
              <div className="formElements">{enemyStats.magicAttack}</div>
            </div>
            <div className="row">
              <div className="label">Your mag.defense:</div>
              <div className="formElements">
                {baseStats.magicDefense}
                {activeAllyArmor.magicDefense !== 0 &&
                  ` + ${activeAllyArmor.magicDefense}`}
                {activeAllyAccessory.magicDefense !== 0 &&
                  ` + ${activeAllyAccessory.magicDefense}`}
                <b>
                  {(activeAllyAccessory.magicDefense !== 0 ||
                    activeAllyArmor.magicDefense !== 0) &&
                    ` = ${effectiveStats.magicDefense}`}
                </b>
              </div>
              <div className="label">
                <span className="padLeft15">Enemy mag.defense:</span>
              </div>
              <div className="formElements">{enemyStats.magicDefense}</div>
            </div>
            <div className="row">
              <div className="label">Your speed:</div>
              <div className="formElements">
                {baseStats.speed}
                {activeAllyArmor.speed !== 0 && ` + ${activeAllyArmor.speed}`}
                {activeAllyAccessory.speed !== 0 &&
                  ` + ${activeAllyAccessory.speed}`}
                <b>
                  {(activeAllyAccessory.speed !== 0 ||
                    activeAllyArmor.speed !== 0) &&
                    ` = ${effectiveStats.speed}`}
                </b>
              </div>
              <div className="label">
                <span className="padLeft15">Enemy speed:</span>
              </div>
              <div className="formElements">{enemyStats.speed}</div>
            </div>
            <div className="row">
              <div className="label">Weapon range:</div>
              <div className="formElements">
                {activeAllyWeapon.variance === 0
                  ? "None"
                  : `[-${activeAllyWeapon.variance}, +${activeAllyWeapon.variance}]`}
              </div>
              <div className="label">
                <span className="padLeft15">Elemental weakness:</span>
              </div>
              <div className="formElements">
                {selectedEnemy.weakness.length === 0
                  ? "None"
                  : selectedEnemy.weakness.join(", ")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                <span
                  style={{
                    visibility:
                      selectedType === HitType.HIT &&
                      activeAllyAttack.type === AttackType.SPELL
                        ? "visible"
                        : "hidden",
                  }}
                >
                  Spell base power:
                </span>
              </div>
              <div className="formElements">
                <span
                  style={{
                    visibility:
                      selectedType === HitType.HIT &&
                      activeAllyAttack.type === AttackType.SPELL
                        ? "visible"
                        : "hidden",
                  }}
                >
                  {activeAllyAttack.basepower}
                </span>
              </div>
              <div className="label">
                <span className="padLeft15">Resists:</span>
              </div>
              <div className="formElements">
                {selectedEnemy.resistance.length === 0
                  ? "None"
                  : selectedEnemy.resistance.join(", ")}
              </div>
            </div>
          </div>
          <div className="form">
            <div className="row">
              <div className="label">Output:</div>
              <div
                className="formElements"
                style={{ fontSize: 24, fontWeight: "bold" }}
              >
                {writtenDamage?.split("\n").map((p) => (
                  <p>{p}</p>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="label">Formula:</div>
              <div className="formElements">
                {writtenFormula?.split("\n").map((p) => (
                  <p>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

// TODO: geno whirl timing
// TODO: Geno chain speed boost
// TODO: Triple attack type & definitions
// TODO: Postgame enemies and attscks
// TODO: Formulas
// TODO: Toad assist
// TODO: Japanese names for attacks and weapons
// TODO: What happens when enemy with no attack selected (torte)?
// TODO: Relationship between tripler barrier and geno chain
// TODO: Bundt mag attack goes up by 5 for every candle. OG bundt?
// 0x81c, whatever encounter that is. candles * 5 + matk