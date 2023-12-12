/* eslint-disable no-eval */

// run npm run build before committing

import React, { useState, useEffect, useCallback } from "react";
import {
  HitType,
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
  AttackTimingModifier,
  SpeedBuff,
  ChainLevel,
  Party,
  Attack,
  AttackElement,
  EnemyAttackName,
  ArmorName,
  AccessoryName,
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

import { getBaseStats, getEffectiveStats, getEnemyStats } from "./utils";
import CHARACTER_DATA from "./characters";
import { CharacterForm, FormContainer, TableRow } from "./components";

const App: React.FC = () => {
  /* form state stuff */

  const [characters, setCharacters] = useState<Character[]>(CHARACTER_DATA);
  const [selectedCharacterIndex, setSelectedCharacterIndex] =
    useState<number>(0);
  const [selectedType, setSelectedType] = useState<HitType>(HitType.HIT);
  const [selectedAttackTiming, setSelectedAttackTimingType] =
    useState<string>("2");
  const [selectedDefenseTiming, setSelectedDefenseTimingType] =
    useState<string>("1");
  const [selectedChain, setSelectedChain] = useState<ChainLevel>(
    ChainLevel.ZERO
  );

  const [selectedPartyMembers, setSelectedPartyMembers] = useState<string[]>([
    "mario",
  ]);

  const [splashDamage, setSplashDamage] = useState<boolean>(false);
  const [defending, setDefending] = useState<boolean>(false);
  const [breezy, setBreezy] = useState<boolean>(false);
  const [special, setSpecial] = useState<boolean>(false);
  const [whirlTiming, setWhirlTiming] = useState<boolean>(false);
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
  const [enemyAttackBoost, setEnemyAttackBoost] = useState<boolean>(false);
  const [enemyDefenseBoost, setEnemyDefenseBoost] = useState<boolean>(false);
  const [enemyFear, setEnemyFear] = useState<boolean>(false);

  const [sssBuff, setSSSBuff] = useState<boolean>(false);

  const handleEnemyAttackBoostChange = (event: any) => {
    setEnemyAttackBoost(!enemyAttackBoost);
  };
  const handleEnemyDefenseBoostChange = (event: any) => {
    setEnemyDefenseBoost(!enemyDefenseBoost);
  };
  const handleEnemyFearChange = (event: any) => {
    setEnemyFear(!enemyFear);
  };
  const handleWhirlTimingChange = (event: any) => {
    setWhirlTiming(!whirlTiming);
  };
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
  const enemyStats = getEnemyStats(selectedEnemy, breezy, special);

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

  const selectedMallowBuff: MallowBuff =
    [Party.MARIO, Party.GENO, Party.BOWSER].includes(selectedCharacter.id) &&
    sssBuff &&
    !selectedPartyMembers.includes(Party.MALLOW)
      ? MallowBuff.SSS_BUFF
      : !selectedPartyMembers.includes(Party.MALLOW)
      ? MallowBuff.NO_CHAIN
      : selectedChain === ChainLevel.FIVE
      ? MallowBuff.FIVE_CHAIN
      : selectedChain === ChainLevel.THREE
      ? MallowBuff.THREE_CHAIN
      : [Party.MARIO, Party.GENO, Party.BOWSER].includes(
          selectedCharacter.id
        ) && sssBuff
      ? MallowBuff.SSS_BUFF
      : selectedChain === ChainLevel.TWO
      ? MallowBuff.TWO_CHAIN
      : MallowBuff.NO_CHAIN;
  const selectedGenoBuff: GenoBuff =
    [Party.MARIO, Party.GENO, Party.BOWSER].includes(selectedCharacter.id) &&
    sssBuff &&
    !selectedPartyMembers.includes(Party.GENO)
      ? GenoBuff.FIVE_CHAIN
      : !selectedPartyMembers.includes(Party.GENO)
      ? GenoBuff.NO_CHAIN
      : ([Party.MARIO, Party.GENO, Party.BOWSER].includes(
          selectedCharacter.id
        ) &&
          sssBuff) ||
        selectedChain === ChainLevel.FIVE
      ? GenoBuff.FIVE_CHAIN
      : selectedChain === ChainLevel.THREE
      ? GenoBuff.THREE_CHAIN
      : selectedChain === ChainLevel.TWO
      ? GenoBuff.TWO_CHAIN
      : GenoBuff.NO_CHAIN;
  const selectedSpeedBuff: SpeedBuff =
    [Party.MARIO, Party.GENO, Party.BOWSER].includes(selectedCharacter.id) &&
    sssBuff &&
    !selectedPartyMembers.includes(Party.GENO)
      ? SpeedBuff.FIVE_CHAIN
      : !selectedPartyMembers.includes(Party.GENO)
      ? SpeedBuff.NO_CHAIN
      : ([Party.MARIO, Party.GENO, Party.BOWSER].includes(
          selectedCharacter.id
        ) &&
          sssBuff) ||
        selectedChain === ChainLevel.FIVE
      ? SpeedBuff.FIVE_CHAIN
      : selectedChain === ChainLevel.THREE
      ? SpeedBuff.THREE_CHAIN
      : selectedChain === ChainLevel.TWO
      ? SpeedBuff.TWO_CHAIN
      : SpeedBuff.NO_CHAIN;
  const selectedBowserBuff: BowserBuff = !selectedPartyMembers.includes(
    Party.BOWSER
  )
    ? BowserBuff.NO_CHAIN
    : selectedChain === ChainLevel.FIVE
    ? BowserBuff.FIVE_CHAIN
    : selectedChain === ChainLevel.THREE
    ? BowserBuff.THREE_CHAIN
    : selectedChain === ChainLevel.TWO
    ? BowserBuff.TWO_CHAIN
    : BowserBuff.NO_CHAIN;
  const selectedPeachBuff: PeachBuff = !selectedPartyMembers.includes(
    Party.PEACH
  )
    ? PeachBuff.NO_CHAIN
    : selectedChain === ChainLevel.FIVE
    ? PeachBuff.FIVE_CHAIN
    : selectedChain === ChainLevel.THREE
    ? PeachBuff.THREE_CHAIN
    : selectedChain === ChainLevel.TWO
    ? PeachBuff.TWO_CHAIN
    : PeachBuff.NO_CHAIN;

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

  const handleAttackTimingChange = (value: string) => {
    setSelectedAttackTimingType(value);
    recalcDamage();
  };
  const handleDefenseTimingChange = (value: string) => {
    setSelectedDefenseTimingType(value);
  };
  const handleChainChange = (value: ChainLevel) => {
    setSelectedChain(value);
  };

  const handleSelectedPartyMemberChange = (event: any) => {
    const member = event.target.value as Party;
    if (selectedPartyMembers.includes(member)) {
      setSelectedPartyMembers(selectedPartyMembers.filter((p) => p !== member));
    } else {
      setSelectedPartyMembers([...selectedPartyMembers, member]);
    }
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
  const handleSpecialEnemyChange = (event: any) => {
    setSpecial(!special);
  };
  const handleSSSBuffChange = (event: any) => {
    setSSSBuff(!sssBuff);
  };

  const handleCharacterChange = (value: string) => {
    const ind = parseInt(value);
    setSelectedCharacterIndex(ind);

    const a =
      AllyAttacks.find((a) => a.name === characters[ind].activeAttack) ||
      AllyAttacks[0];
    if (!!a.tiers) {
      setSelectedAttackTimingType(a.tiers[0]);
    }

    if (!selectedPartyMembers.includes(characters[ind].id)) {
      setSelectedPartyMembers([...selectedPartyMembers, characters[ind].id]);
    }
  };

  const handleEnemyChange = (value: string) => {
    const enemy = Enemies.find((c) => c.name === value) || Enemies[0];
    setSelectedEnemy(enemy);
    if (enemy.attacks.length === 0) {
      setSelectedType(HitType.HIT);
    } else {
      handleEnemyAttackChange(enemy.attacks[0]);
    }
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

  const getCounterLabel = () => {
    if (selectedCharacter.activeAttack === AttackName.JUMP) {
      return "Jumps done before this:";
    } else if (
      [
        AttackName.FIREBALL,
        AttackName.SUPER_FIREBALL,
        AttackName.ULTRA_FIREBALL,
        AttackName.MECHAKOOPA_STOMP,
        AttackName.PSYCH_BOMB,
      ].includes(selectedCharacter.activeAttack)
    ) {
      return "Button mashes:";
    } else if (
      [
        AttackName.SUPER_JUMP,
        AttackName.ULTRA_JUMP,
        AttackName.STAR_RAIN,
      ].includes(selectedCharacter.activeAttack)
    ) {
      return "Consecutive timed hits:";
    } else if (
      [AttackName.SNOWY, AttackName.TERRORIZE, AttackName.POISON_GAS].includes(
        selectedCharacter.activeAttack
      )
    ) {
      return "Directional inputs:";
    } else {
      return "Count:";
    }
  };

  /* damage formula stuff */

  const recalcDamage = useCallback(() => {
    /* setup */

    const baseAttackDiff = (c: Character, variance: number = 0) => {
      const e = getEffectiveStats(c);
      return Math.floor(
        (e.attack + variance) * parseFloat(selectedGenoBuff) -
          enemyStats.defense
      );
    };
    const baseMagicDiff = (c: Character) => {
      const e = getEffectiveStats(c);
      return Math.floor(
        e.magicAttack * parseFloat(selectedMallowBuff) - enemyStats.magicDefense
      );
    };
    const baseAttackEnemyDiff = (c: Character) => {
      const e = getEffectiveStats(c);
      return Math.floor(
        enemyStats.attack -
          Math.floor(e.defense * parseFloat(selectedBowserBuff))
      );
    };
    const baseMagicEnemyDiff = (c: Character) => {
      const e = getEffectiveStats(c);
      return Math.floor(
        enemyStats.magicAttack -
          Math.floor(e.magicDefense * parseFloat(selectedPeachBuff))
      );
    };

    const activeAttack: Attack =
      AllyAttacks.find((a) => a.name === selectedCharacter.activeAttack) ||
      AllyAttacks[0];

    const multiHitAddition = (attack: Attack, base: number, hits: number) =>
      Math.floor(Math.floor(base * attack.per_hit) * attack.hosei * hits);

    const selectedBaseMagicDiff = baseMagicDiff(selectedCharacter);
    const selectedEnemyAttackDiff = baseAttackEnemyDiff(selectedCharacter);
    const selectedEnemyMagicDiff = baseMagicEnemyDiff(selectedCharacter);

    const doPhysicalAttackDamage = (
      c: Character,
      variance: number = 0
    ): number => {
      let b = baseAttackDiff(c, variance);
      b = Math.max(1, b);
      if (selectedCharacter.isFeared) {
        b = Math.max(1, b >> 1);
      }
      if (enemyDefenseBoost) {
        b = Math.max(1, b >> 1);
      }
      if (selectedCharacter.hasAttackBoost || enemyFear) {
        b = Math.floor(b * 1.5);
      }
      if (
        selectedAttackTiming === AttackTimingModifier.PERFECT &&
        splashDamage
      ) {
        b = Math.floor(b / 5);
      }
      b = Math.floor(b * parseFloat(selectedAttackTiming));

      return b;
    };

    const getTriplerBases = (
      character1: Character,
      character2: Character,
      character3: Character
    ): number[] => {
      const c1 = character1;
      const c2 = character2;
      const c3 = character3;
      const w1 = Weapons.find((w) => w.name === c1.activeWeapon) || Weapons[0];
      const w2 = Weapons.find((w) => w.name === c2.activeWeapon) || Weapons[0];
      const w3 = Weapons.find((w) => w.name === c3.activeWeapon) || Weapons[0];
      // console.log(w1, w2, w3);
      const br1 = [
        baseAttackDiff(c1, w1.variance - (w1.variance > 0 ? 1 : 0)),
        baseAttackDiff(c1),
        baseAttackDiff(c1, -1 * w1.variance),
      ];
      const br2 = [
        baseAttackDiff(c2, w2.variance - (w2.variance > 0 ? 1 : 0)),
        baseAttackDiff(c2),
        baseAttackDiff(c2, -1 * w2.variance),
      ];
      const br3 = [
        baseAttackDiff(c3, w3.variance - (w3.variance > 0 ? 1 : 0)),
        baseAttackDiff(c3),
        baseAttackDiff(c3, -1 * w3.variance),
      ];
      // console.log(br1, br2, br3);
      const br = [
        Math.max(0, br1[0]) + Math.max(br2[0], 0) + Math.max(br3[0], 0),
        Math.max(0, br1[1]) + Math.max(br2[1], 0) + Math.max(br3[1], 0),
        Math.max(0, br1[2]) + Math.max(br2[2], 0) + Math.max(br3[2], 0),
      ];
      // console.log(br);

      const output = br.map((b) => {
        if (enemyDefenseBoost) {
          b = b >> 1;
        } else {
          let fearNum = 0;
          if (c1.isFeared) {
            fearNum++;
          }
          if (c2.isFeared) {
            fearNum++;
          }
          if (c3.isFeared) {
            fearNum++;
          }
          const fearMultiplier = (fearNum / -3) * 0.5 + 1;
          b = Math.floor(b * fearMultiplier);
        }

        if (!enemyFear) {
          let boostNum = 0;
          if (c1.hasAttackBoost) {
            boostNum++;
          }
          if (c2.hasAttackBoost) {
            boostNum++;
          }
          if (c3.hasAttackBoost) {
            boostNum++;
          }
          const boostMultiplier = (boostNum / 3) * 0.5 + 1;
          // console.log("bm", boostMultiplier);
          b = Math.floor(b * boostMultiplier);
        } else {
          b *= 3;
          b = b >> 1;
        }
        return b;
      });

      return output;
    };

    // Ally -> enemy basic physical attack

    if (
      selectedType === HitType.HIT &&
      selectedCharacter.activeAttack === AttackName.PHYSICAL
    ) {
      const w =
        Weapons.find((w) => w.name === selectedCharacter.activeWeapon) ||
        Weapons[0];
      const upper = doPhysicalAttackDamage(
        selectedCharacter,
        w.variance - (w.variance > 0 ? 1 : 0)
      ); // +variance is an exclusive max in the game's random number gen code
      const mid = doPhysicalAttackDamage(selectedCharacter);
      const lower = doPhysicalAttackDamage(selectedCharacter, w.variance * -1);
      if (upper === lower) {
        setWrittenDamage(`${mid}`);
      } else {
        setWrittenDamage(`Upper: ${upper}\nMedian: ${mid}\nLower: ${lower}`);
      }
    }

    // Jump
    else if (
      selectedType === HitType.HIT &&
      selectedCharacter.activeAttack === AttackName.JUMP
    ) {
      let b = selectedBaseMagicDiff;
      b += activeAttack.basepower;
      b += (jumpCount + 1) >> 1;
      b = Math.max(1, b);
      if (selectedCharacter.isFeared) {
        b = Math.max(1, b >> 1);
      }
      if (enemyDefenseBoost) {
        b = Math.max(1, b >> 1);
      }
      if (selectedCharacter.hasAttackBoost || enemyFear) {
        b = Math.floor(b * 1.5);
      }
      if (selectedEnemy.weakness.includes(AttackElement.JUMP)) {
        b *= 2;
      } else if (
        selectedEnemy.resistance.includes(AttackElement.JUMP) &&
        selectedCharacter.activeAccessory !== AccessoryName.JUMP_SHOES
      ) {
        b = 0;
      }
      b = Math.floor(b * parseFloat(selectedAttackTiming));
      setWrittenDamage(`${b}`);
    }

    // Multi-hit ally spells
    else if (selectedType === HitType.HIT && activeAttack.per_hit !== 1.0) {
      let b = selectedBaseMagicDiff;
      b += activeAttack.basepower;
      b = Math.max(1, b);
      if (selectedCharacter.isFeared) {
        b = Math.max(1, b >> 1);
      }
      if (enemyDefenseBoost) {
        b = Math.max(1, b >> 1);
      }
      if (selectedCharacter.hasAttackBoost || enemyFear) {
        b = Math.floor(b * 1.5);
      }
      if (selectedEnemy.weakness.includes(activeAttack.element)) {
        b *= 2;
      } else if (
        selectedEnemy.resistance.includes(activeAttack.element) &&
        !(
          selectedCharacter.activeAccessory !== AccessoryName.JUMP_SHOES &&
          activeAllyAttack.element === AttackElement.JUMP
        )
      ) {
        b = 0;
      }

      if (activeAttack.name === AttackName.FIREBALL) {
        setWrittenDamage(`${b + multiHitAddition(activeAttack, b, fbCount)}`);
      } else if (activeAttack.name === AttackName.SUPER_JUMP) {
        setWrittenDamage(`${b + multiHitAddition(activeAttack, b, sjCount)}`);
      } else if (activeAttack.name === AttackName.SUPER_FIREBALL) {
        setWrittenDamage(`${b + multiHitAddition(activeAttack, b, sfCount)}`);
      } else if (activeAttack.name === AttackName.ULTRA_JUMP) {
        setWrittenDamage(`${b + multiHitAddition(activeAttack, b, ujCount)}`);
      } else if (activeAttack.name === AttackName.ULTRA_FIREBALL) {
        setWrittenDamage(`${b + multiHitAddition(activeAttack, b, ufCount)}`);
      } else if (activeAttack.name === AttackName.SNOWY) {
        setWrittenDamage(
          `${b + multiHitAddition(activeAttack, b, snowyCount)}`
        );
      } else if (activeAttack.name === AttackName.STAR_RAIN) {
        setWrittenDamage(`${b + multiHitAddition(activeAttack, b, srCount)}`);
      } else if (activeAttack.name === AttackName.TERRORIZE) {
        setWrittenDamage(`${b + multiHitAddition(activeAttack, b, terrCount)}`);
      } else if (activeAttack.name === AttackName.POISON_GAS) {
        setWrittenDamage(`${b + multiHitAddition(activeAttack, b, pgCount)}`);
      } else if (activeAttack.name === AttackName.MECHAKOOPA_STOMP) {
        setWrittenDamage(`${b + multiHitAddition(activeAttack, b, bcCount)}`);
      } else if (activeAttack.name === AttackName.PSYCH_BOMB) {
        setWrittenDamage(`${b + multiHitAddition(activeAttack, b, pbCount)}`);
      }
    }

    // Tbolt, Crusher, Shocker
    else if (
      selectedType === HitType.HIT &&
      [AttackName.THUNDERBOLT, AttackName.SHOCKER, AttackName.CRUSHER].includes(
        activeAttack.name
      )
    ) {
      let b = selectedBaseMagicDiff;
      b += activeAttack.basepower;
      b = Math.max(1, b);
      if (selectedCharacter.isFeared) {
        b = Math.max(1, b >> 1);
      }
      if (enemyDefenseBoost) {
        b = Math.max(1, b >> 1);
      }
      if (selectedCharacter.hasAttackBoost || enemyFear) {
        b = Math.floor(b * 1.5);
      }
      if (selectedEnemy.weakness.includes(activeAttack.element)) {
        b *= 2;
      } else if (selectedEnemy.resistance.includes(activeAttack.element)) {
        b = 0;
      }
      b = Math.floor(b * parseFloat(selectedAttackTiming));
      setWrittenDamage(`${b}`);
    }

    // Most Geno spells
    else if (
      selectedType === HitType.HIT &&
      [
        AttackName.GENO_BEAM,
        AttackName.GENO_BLAST,
        AttackName.GENO_FLASH,
      ].includes(activeAttack.name)
    ) {
      let b = selectedBaseMagicDiff;
      b += activeAttack.basepower;
      b = Math.max(1, b);
      if (selectedCharacter.isFeared) {
        b = Math.max(1, b >> 1);
      }
      if (enemyDefenseBoost) {
        b = Math.max(1, b >> 1);
      }
      if (selectedCharacter.hasAttackBoost || enemyFear) {
        b = Math.floor(b * 1.5);
      }
      b = Math.floor(b * parseFloat(selectedAttackTiming));
      setWrittenDamage(`${b}`);
    }

    // Geno Whirl
    else if (
      selectedType === HitType.HIT &&
      activeAttack.name === AttackName.GENO_WHIRL
    ) {
      let b = selectedBaseMagicDiff;
      b += activeAttack.basepower;
      b = Math.max(1, b);
      if (selectedCharacter.isFeared) {
        b = Math.max(1, b >> 1);
      }
      if (enemyDefenseBoost) {
        b = Math.max(1, b >> 1);
      }
      if (selectedCharacter.hasAttackBoost || enemyFear) {
        b = Math.floor(b * 1.5);
      }
      if (
        whirlTiming &&
        !selectedEnemy.resistance.includes(AttackElement.CRITICAL)
      ) {
        setWrittenDamage(`9999`);
      } else {
        setWrittenDamage(`${b}`);
      }
    }

    // Damage items
    else if (
      selectedType === HitType.HIT &&
      activeAttack.type === AttackType.ITEM
    ) {
      let b = activeAttack.basepower;
      if (selectedCharacter.isFeared) {
        b = Math.max(1, b >> 1);
      }
      if (enemyDefenseBoost) {
        b = Math.max(1, b >> 1);
      }
      if (selectedCharacter.hasAttackBoost || enemyFear) {
        b = Math.floor(b * 1.5);
      }
      if (selectedEnemy.weakness.includes(activeAttack.element)) {
        b *= 2;
      } else if (selectedEnemy.resistance.includes(activeAttack.element)) {
        b = 0;
      }
      setWrittenDamage(`${b}`);
    }

    // Triple attacks / toad assists
    else if (
      selectedType === HitType.HIT &&
      activeAttack.name === AttackName.STAR_GUST
    ) {
      const mario = characters[0];
      const w =
        Weapons.find((w) => w.name === mario.activeWeapon) || Weapons[0];
      let br = [
        baseAttackDiff(mario, w.variance - (w.variance > 0 ? 1 : 0)),
        baseAttackDiff(mario),
        baseAttackDiff(mario, -1 * w.variance),
      ];
      const bf = br.map((b) => {
        if (mario.isFeared || enemyDefenseBoost) {
          b = b >> 1;
          b = Math.max(b, 1);
        }
        if (mario.hasAttackBoost) {
          b *= 1.5;
        }
        b *= 3;
        b = Math.floor(b);
        b *= 9;
        b = b >> 3;
        b = Math.max(b, 1);
        return b;
      });

      if (bf[0] === bf[2]) {
        setWrittenDamage(`${bf[1]}`);
      } else {
        setWrittenDamage(`Upper: ${bf[0]}\nMedian: ${bf[1]}\nLower: ${bf[2]}`);
      }
    } else if (
      selectedType === HitType.HIT &&
      activeAttack.name === AttackName.STAR_RIDERS
    ) {
      const mario = characters[0];
      const mallow = characters[1];
      const geno = characters[2];

      let [high, sumAvg, low] = getTriplerBases(mario, mallow, geno);
      if (high < 0) {
        high = (high << 3) | 3;
      } else {
        high *= 8;
      }
      high = Math.floor(high) >> 2;
      if (sumAvg < 0) {
        sumAvg = (sumAvg << 3) | 3;
      } else {
        sumAvg *= 8;
      }
      sumAvg = Math.floor(sumAvg) >> 2;
      if (low < 0) {
        low = (low << 3) | 3;
      } else {
        low *= 8;
      }
      low = Math.floor(low) >> 2;

      high = Math.max(1, high);
      sumAvg = Math.max(1, sumAvg);
      low = Math.max(1, low);

      if (high === low) {
        setWrittenDamage(`${sumAvg}`);
      } else {
        setWrittenDamage(
          `Upper: ${high}\nSum of medians: ${sumAvg}\nLower: ${low}`
        );
      }
    } else if (
      selectedType === HitType.HIT &&
      activeAttack.name === AttackName.SHOOTING_STAR_SHOT
    ) {
      const mario = characters[0];
      const geno = characters[2];
      const bowser = characters[3];

      let [high, sumAvg, low] = getTriplerBases(mario, geno, bowser);

      high = Math.floor(high * 1.7);
      sumAvg = Math.floor(sumAvg * 1.7);
      low = Math.floor(low * 1.7);

      high = Math.max(1, Math.floor((high * (0.9 + 0.01 * 20)) / 5));
      sumAvg = Math.max(1, Math.floor((sumAvg * (0.9 + (0.01 * 20) / 2)) / 5));
      low = Math.max(1, Math.floor((low * 0.9) / 5));

      if (high === low) {
        setWrittenDamage(`${sumAvg}`);
      } else {
        setWrittenDamage(
          `Upper: ${high}\nSum of medians: ${sumAvg}\nLower: ${low}\n(multi hit)`
        );
      }
    } else if (
      selectedType === HitType.HIT &&
      activeAttack.name === AttackName.CLOWN_CAR_BARRAGE
    ) {
      const mario = characters[0];
      const mallow = characters[1];
      const bowser = characters[3];

      // console.log(mario, mallow, bowser);

      let [high, sumAvg, low] = getTriplerBases(mario, mallow, bowser);
      // console.log(high, sumAvg, low);

      high = Math.max(2, Math.floor(high * 5)) >> 2;
      sumAvg = Math.max(2, Math.floor(sumAvg * 5)) >> 2;
      low = Math.max(2, Math.floor(low * 5)) >> 2;

      // console.log(high, sumAvg, low);

      high = Math.max(1, high);
      sumAvg = Math.max(1, sumAvg);
      low = Math.max(1, low);

      if (
        selectedEnemy.weakness.includes(AttackElement.FIRE) ||
        selectedEnemy.weakness.includes(AttackElement.ICE) ||
        selectedEnemy.weakness.includes(AttackElement.THUNDER)
      ) {
        high *= 2;
        sumAvg *= 2;
        low *= 2;
      }
      // console.log(high, sumAvg, low);

      if (high === low) {
        // console.log(`${sumAvg}`);
        setWrittenDamage(`${sumAvg}`);
      } else {
        // console.log(`Upper: ${high}\nSum of medians: ${sumAvg}\nLower: ${low}`);
        setWrittenDamage(
          `Upper: ${high}\nSum of medians: ${sumAvg}\nLower: ${low}`
        );
      }
    } else if (
      selectedType === HitType.HIT &&
      activeAttack.name === AttackName.STARRY_SHELL_SPIKE
    ) {
      const mario = characters[0];
      const bowser = characters[3];
      const peach = characters[4];

      let [high, sumAvg, low] = getTriplerBases(mario, bowser, peach);
      high = Math.max(2, Math.floor(high * 6)) >> 2;
      sumAvg = Math.max(2, Math.floor(sumAvg * 6)) >> 2;
      low = Math.max(2, Math.floor(low * 6)) >> 2;

      high = Math.max(1, high);
      sumAvg = Math.max(1, sumAvg);
      low = Math.max(1, low);

      if (high === low) {
        setWrittenDamage(`${sumAvg}`);
      } else {
        setWrittenDamage(
          `Upper: ${high}\nSum of medians: ${sumAvg}\nLower: ${low}`
        );
      }
    }

    // Enemy -> ally
    else if (selectedType === HitType.BLOCK) {
      let b;
      if (selectedEnemyAttack.type === AttackType.PHYSICAL) {
        b = selectedEnemyAttackDiff;
      } else {
        b = selectedEnemyMagicDiff;
      }
      b += selectedEnemyAttack.basepower;
      b = Math.floor(b * selectedEnemyAttack.multiplier);
      b = Math.max(1, b);
      if (enemyFear) {
        b = Math.max(1, b >> 1);
      }
      if (selectedCharacter.hasDefenseBoost || defending) {
        b = Math.max(1, b >> 1);
      }
      if (selectedCharacter.isFeared) {
        b = Math.floor(b * 1.5);
      }

      if (
        [AttackElement.FIRE, AttackElement.ICE, AttackElement.THUNDER].includes(
          selectedEnemyAttack.element
        ) &&
        ([ArmorName.LAZY_SHELL, ArmorName.SUPER_SUIT].includes(
          selectedCharacter.activeArmor
        ) ||
          selectedCharacter.activeAccessory === AccessoryName.SAFETY_RING)
      ) {
        if (breezy) {
          b = 0;
        } else {
          b = Math.floor(b * 0.3);
          b = Math.max(1, b);
        }
      } else if (
        [AttackElement.FIRE, AttackElement.ICE, AttackElement.THUNDER].includes(
          selectedEnemyAttack.element
        ) &&
        [AccessoryName.NURTURE_RING, AccessoryName.BOOSTERS_CHARM].includes(
          selectedCharacter.activeAccessory
        )
      ) {
        b = Math.floor(b * 0.5);
        b = Math.max(1, b);
      }

      if (selectedEnemyAttack.name === EnemyAttackName.METEOR) {
        b = effectiveStats.hp - 1;
      } else if (
        selectedEnemyAttack.name === EnemyAttackName.FINAL_CLAW &&
        selectedDefenseTiming !== "0"
      ) {
        b = 9999;
      } else if (selectedEnemyAttack.element === AttackElement.CRITICAL) {
        if (!selectedEnemyAttack.blockable) {
          b = 9999;
        } else if (
          [
            AccessoryName.SAFETY_RING,
            AccessoryName.JINX_BELT,
            AccessoryName.ATTACK_SCARF,
            AccessoryName.QUARTZ_CHARM,
          ].includes(selectedCharacter.activeAccessory)
        ) {
          b = 0;
        } else if (selectedDefenseTiming === "0") {
          b = 0;
        } else if (selectedDefenseTiming === "0.5") {
          b = effectiveStats.hp - 1;
        } else {
          b = 9999;
        }
      } else if (selectedEnemyAttack.blockable) {
        b = Math.floor(b * parseFloat(selectedDefenseTiming));
        if (selectedDefenseTiming !== "0") {
          b = Math.max(1, b);
        }
      }

      setWrittenDamage(`${b}`);
    } else {
      setWrittenDamage(`This attack has not been implemented`);
    }
  }, [
    selectedCharacter,
    selectedType,
    selectedGenoBuff,
    enemyStats.defense,
    enemyStats.magicDefense,
    enemyStats.attack,
    enemyStats.magicAttack,
    selectedMallowBuff,
    selectedBowserBuff,
    selectedPeachBuff,
    selectedAttackTiming,
    splashDamage,
    enemyDefenseBoost,
    enemyFear,
    jumpCount,
    selectedEnemy.weakness,
    selectedEnemy.resistance,
    activeAllyAttack.element,
    fbCount,
    sjCount,
    sfCount,
    ujCount,
    ufCount,
    snowyCount,
    srCount,
    terrCount,
    pgCount,
    bcCount,
    pbCount,
    whirlTiming,
    characters,
    selectedEnemyAttack.type,
    selectedEnemyAttack.basepower,
    selectedEnemyAttack.multiplier,
    selectedEnemyAttack.element,
    selectedEnemyAttack.name,
    selectedEnemyAttack.blockable,
    defending,
    selectedDefenseTiming,
    breezy,
    effectiveStats.hp,
  ]);

  useEffect(() => {
    recalcDamage();
  }, [recalcDamage]);

  /* more form state stuff */

  return (
    <>
      <div className="padLeft15">
        <b>SMRPG Remake Damage Calculator (beta) by pidgezero_one</b> (
        <a href="https://pidgezero.one/damagecalc.html">looking for SNES?</a>) (
        <a
          href="https://sites.google.com/site/supermariorpgspeedruns/community/discord-server"
          target="_blank"
          rel="noreferrer"
        >
          SMRPG discord
        </a>
        )
        <br />
        <a
          href="https://opensource.com/article/19/7/create-pull-request-github"
          target="_blank"
          rel="noreferrer"
        >
          Open a pull request
        </a>{" "}
        (NOT an Issue/Bug Report) to suggest formula changes. Code{" "}
        <a
          href="https://github.com/pidgezero-one/pidgezero-one.github.io/blob/main/remake_damagecalc/src/App.tsx"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>{" "}
        (ctrl+f for /* damage formula stuff */)
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
            <TableRow>
              <FormContainer label="Character:">
                <select
                  onChange={(e) => handleCharacterChange(e.target.value)}
                  id="selectCharacter"
                >
                  {CHARACTER_DATA.map((c, idx) => (
                    <option value={idx}>{c.name}</option>
                  ))}
                </select>
              </FormContainer>
            </TableRow>
            <CharacterForm
              character={selectedCharacter}
              updateCharacter={updateCharacter}
              updateAttack={updateAttack}
              mode={selectedType}
            >
              <>
                {selectedType === HitType.BLOCK && (
                  <TableRow>
                    <FormContainer label="Defending:">
                      <input
                        type="checkbox"
                        checked={defending}
                        onChange={handleDefenseChange}
                        id="defending"
                      />
                    </FormContainer>
                  </TableRow>
                )}
                {selectedType === HitType.HIT && (
                  <>
                    {(activeAllyAttack.timingType ===
                      TimingType.BUTTON_PRESSES ||
                      activeAllyAttack.timingType === TimingType.JUMP) && (
                      <TableRow>
                        <FormContainer label={getCounterLabel()}>
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
                        </FormContainer>
                      </TableRow>
                    )}
                    {(activeAllyAttack.timingType === TimingType.THREE_TIER ||
                      activeAllyAttack.timingType === TimingType.FIVE_TIER ||
                      activeAllyAttack.timingType === TimingType.JUMP) && (
                      <TableRow>
                        <FormContainer label="Timing:">
                          {!!activeAllyAttack.tiers &&
                            activeAllyAttack.tiers.map((tier, idx) => (
                              <label
                                className="padRight15"
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
                                {idx === 0
                                  ? `Perfect (x${tier})`
                                  : !!activeAllyAttack.tiers &&
                                    idx === activeAllyAttack.tiers.length - 1
                                  ? `Untimed (x${tier})`
                                  : `x${tier}`}
                              </label>
                            ))}
                        </FormContainer>
                      </TableRow>
                    )}
                    {activeAllyAttack.timingType === TimingType.CRITICAL && (
                      <TableRow>
                        <FormContainer label="Timing:">
                          <input
                            type="checkbox"
                            checked={whirlTiming}
                            onChange={handleWhirlTimingChange}
                            id="whirlTiming"
                          />
                        </FormContainer>
                      </TableRow>
                    )}
                    {activeAllyAttack.type === AttackType.PHYSICAL &&
                      selectedAttackTiming === AttackTimingModifier.PERFECT && (
                        <TableRow>
                          <FormContainer label="Splash damage:">
                            <input
                              type="checkbox"
                              checked={splashDamage}
                              onChange={handleSplashDamageChange}
                              id="splash"
                            />
                          </FormContainer>
                        </TableRow>
                      )}
                  </>
                )}
                {selectedType === HitType.BLOCK &&
                  selectedEnemyAttack.blockable && (
                    <>
                      <TableRow>
                        <FormContainer label="Timing:">
                          {[
                            { v: "0", n: "Perfect" },
                            { v: "0.5", n: "Half" },
                            { v: "1", n: "Untimed" },
                          ].map((tier, idx) => (
                            <label
                              className="padRight15"
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
                        </FormContainer>
                      </TableRow>
                    </>
                  )}
                <TableRow>
                  <FormContainer label="Chain:">
                    {[
                      { v: ChainLevel.ZERO, n: "0 - 1" },
                      { v: ChainLevel.TWO, n: "2" },
                      { v: ChainLevel.THREE, n: "3 - 4" },
                      { v: ChainLevel.FIVE, n: "5+" },
                    ].map((tier, idx) => (
                      <label className="padRight15" htmlFor={`chain${idx}`}>
                        <input
                          type="radio"
                          name="chainLevel"
                          value={tier.v}
                          checked={selectedChain === tier.v}
                          onChange={(e) =>
                            handleChainChange(e.target.value as ChainLevel)
                          }
                          id={`chain${idx}`}
                        />
                        {tier.n}
                      </label>
                    ))}
                  </FormContainer>
                </TableRow>
                <TableRow>
                  <FormContainer label="Apply chain buffs from:">
                    {CHARACTER_DATA.map((character, idx) => (
                      <label className="padRight15" htmlFor={`chainFrom${idx}`}>
                        <input
                          type="checkbox"
                          value={character.id}
                          checked={selectedPartyMembers.includes(character.id)}
                          onChange={handleSelectedPartyMemberChange}
                          id={`chainFrom${idx}`}
                          disabled={character.id === selectedCharacter.id}
                        />
                        {character.name}
                      </label>
                    ))}
                  </FormContainer>
                </TableRow>
                {[Party.MARIO, Party.GENO, Party.BOWSER].includes(
                  selectedCharacter.id
                ) && (
                  <TableRow>
                    <FormContainer label="Shooting Star Shot buff:">
                      <input
                        type="checkbox"
                        checked={sssBuff}
                        onChange={handleSSSBuffChange}
                      />
                    </FormContainer>
                  </TableRow>
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
              disabled={selectedEnemy.attacks.length === 0}
            />
            Enemy is the one attacking
          </label>
          <div className="form">
            <TableRow>
              <FormContainer label="Enemy:">
                <select
                  onChange={(e) => handleEnemyChange(e.target.value)}
                  id="selectEnemy"
                  value={selectedEnemy.name || Enemies[0].name}
                >
                  {Enemies.map((c) => (
                    <option value={c.name}>{c.name}</option>
                  ))}
                </select>
              </FormContainer>
              <FormContainer
                label="Enemy attack:"
                hide={
                  selectedType !== HitType.BLOCK &&
                  selectedEnemy.attacks.length > 0
                }
              >
                {selectedEnemy.attacks.length > 0 && (
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
                )}
                {selectedEnemy.attacks.length === 0 && (
                  <span>(Enemy has no attacks)</span>
                )}
              </FormContainer>
            </TableRow>

            <TableRow>
              {selectedType === HitType.BLOCK && (
                <FormContainer label="Enemy attack boost:">
                  <input
                    type="checkbox"
                    checked={enemyAttackBoost}
                    onChange={handleEnemyAttackBoostChange}
                  />
                </FormContainer>
              )}
              {selectedType === HitType.HIT && (
                <FormContainer label="Enemy defense boost:">
                  <input
                    type="checkbox"
                    checked={enemyDefenseBoost}
                    onChange={handleEnemyDefenseBoostChange}
                  />
                </FormContainer>
              )}
              <FormContainer label="Breezy mode:">
                <input
                  type="checkbox"
                  checked={breezy}
                  onChange={handleDifficultyChange}
                  id="breezy"
                />
              </FormContainer>
            </TableRow>
            <TableRow>
              <FormContainer label="Enemy feared:">
                <input
                  type="checkbox"
                  checked={enemyFear}
                  onChange={handleEnemyFearChange}
                />
              </FormContainer>
              <FormContainer label="Special enemy:">
                <input
                  type="checkbox"
                  checked={special}
                  onChange={handleSpecialEnemyChange}
                  id="special"
                />
              </FormContainer>
            </TableRow>
            <TableRow>
              <FormContainer label="Your HP:">{baseStats.hp}</FormContainer>
              <FormContainer label="Enemy HP:">{enemyStats.hp}</FormContainer>
            </TableRow>
            <TableRow>
              <FormContainer label="Your attack:">
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
                {selectedGenoBuff !== GenoBuff.NO_CHAIN && (
                  <span>
                    {" "}
                    ( * {selectedGenoBuff} ={" "}
                    {Math.floor(
                      Math.max(
                        parseFloat(selectedGenoBuff),
                        1.12 *
                          ([Party.MARIO, Party.GENO, Party.BOWSER].includes(
                            selectedCharacter.id
                          ) && sssBuff
                            ? 1
                            : 0)
                      ) * effectiveStats.attack
                    )}{" "}
                    )
                  </span>
                )}
              </FormContainer>
              <FormContainer label="Enemy attack:">
                {enemyStats.attack}
              </FormContainer>
            </TableRow>
            <TableRow>
              <FormContainer label="Your defense:">
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
                {selectedBowserBuff !== BowserBuff.NO_CHAIN && (
                  <span>
                    {" "}
                    ( * {selectedBowserBuff} ={" "}
                    {Math.floor(
                      Math.max(
                        parseFloat(selectedBowserBuff),
                        1.12 *
                          ([Party.MARIO, Party.GENO, Party.BOWSER].includes(
                            selectedCharacter.id
                          ) && sssBuff
                            ? 1
                            : 0)
                      ) * effectiveStats.defense
                    )}{" "}
                    )
                  </span>
                )}
              </FormContainer>
              <FormContainer label="Enemy defense:">
                {enemyStats.defense}
              </FormContainer>
            </TableRow>
            <TableRow>
              <FormContainer label="Your mag.attack:">
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
                    ` = ${effectiveStats.magicAttack}`}
                </b>
                {selectedMallowBuff !== MallowBuff.NO_CHAIN && (
                  <span>
                    {" "}
                    ( * {selectedMallowBuff} ={" "}
                    {Math.floor(
                      parseFloat(selectedMallowBuff) *
                        effectiveStats.magicAttack
                    )}{" "}
                    )
                  </span>
                )}
              </FormContainer>
              <FormContainer label="Enemy mag.attack:">
                {enemyStats.magicAttack}
              </FormContainer>
            </TableRow>
            <TableRow>
              <FormContainer label="Your mag.defense:">
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
                {selectedPeachBuff !== PeachBuff.NO_CHAIN && (
                  <span>
                    {" "}
                    ( * {selectedPeachBuff} ={" "}
                    {Math.floor(
                      parseFloat(selectedPeachBuff) *
                        effectiveStats.magicDefense
                    )}{" "}
                    )
                  </span>
                )}
              </FormContainer>
              <FormContainer label="Enemy mag.defense:">
                {enemyStats.magicDefense}
              </FormContainer>
            </TableRow>
            <TableRow>
              <FormContainer label="Your speed:">
                {baseStats.speed}
                {activeAllyArmor.speed !== 0 && ` + ${activeAllyArmor.speed}`}
                {activeAllyAccessory.speed !== 0 &&
                  ` + ${activeAllyAccessory.speed}`}
                <b>
                  {(activeAllyAccessory.speed !== 0 ||
                    activeAllyArmor.speed !== 0) &&
                    ` = ${effectiveStats.speed}`}
                </b>
                {selectedSpeedBuff !== SpeedBuff.NO_CHAIN && (
                  <span>
                    {" "}
                    ( * {selectedSpeedBuff} ={" "}
                    {Math.floor(
                      Math.max(
                        parseFloat(selectedSpeedBuff),
                        1.12 *
                          ([Party.MARIO, Party.GENO, Party.BOWSER].includes(
                            selectedCharacter.id
                          ) && sssBuff
                            ? 1
                            : 0)
                      ) * effectiveStats.speed
                    )}{" "}
                    )
                  </span>
                )}
              </FormContainer>
              <FormContainer label="Enemy speed:">
                {enemyStats.speed}
              </FormContainer>
            </TableRow>
            <TableRow>
              <FormContainer label="Weapon range:">
                {activeAllyWeapon.variance === 0
                  ? "None"
                  : `[-${activeAllyWeapon.variance}, +${activeAllyWeapon.variance}]`}
              </FormContainer>
              <FormContainer label="Elemental weakness:">
                {selectedEnemy.weakness.length === 0
                  ? "None"
                  : selectedEnemy.weakness.join(", ")}
              </FormContainer>
            </TableRow>
            <TableRow>
              {selectedType === HitType.HIT &&
                activeAllyAttack.type === AttackType.SPELL && (
                  <FormContainer label="Spell base power:">
                    {activeAllyAttack.basepower}
                  </FormContainer>
                )}
              {selectedType === HitType.HIT &&
                activeAllyAttack.type === AttackType.PHYSICAL && (
                  <FormContainer label="Weapon base power:">
                    {activeAllyWeapon.basepower}
                  </FormContainer>
                )}
              {selectedType === HitType.BLOCK &&
                selectedEnemyAttack.type === AttackType.SPELL && (
                  <FormContainer label="Spell base power:">
                    {selectedEnemyAttack.basepower}
                  </FormContainer>
                )}
              {selectedType === HitType.BLOCK &&
                selectedEnemyAttack.type === AttackType.PHYSICAL && (
                  <FormContainer label="Attack multiplier:">
                    {selectedEnemyAttack.multiplier}
                  </FormContainer>
                )}
              {selectedType === HitType.HIT &&
                activeAllyAttack.type !== AttackType.SPELL &&
                activeAllyAttack.type !== AttackType.PHYSICAL && (
                  <FormContainer label="" />
                )}
              <FormContainer label="Resists:">
                {selectedEnemy.resistance.length === 0
                  ? "None"
                  : selectedEnemy.resistance.join(", ")}
              </FormContainer>
            </TableRow>
          </div>
          <div className="form">
            <TableRow>
              <FormContainer label="Output:">
                <span style={{ fontSize: 24, fontWeight: "bold" }}>
                  {writtenDamage?.split("\n").map((p) => (
                    <p>{p}</p>
                  ))}
                </span>
                <br />
                <span>
                  (Off-by-one errors between this calc and the game may
                  sometimes be caused by floating point errors in Unity.)
                </span>
              </FormContainer>
            </TableRow>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
