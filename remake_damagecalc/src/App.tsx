import React, { useState } from "react";
import {
  LevelupBonus,
  HitType,
  AttackBoostModifier,
  AttackTimingModifier,
  AttackType,
  Attack,
  Character,
  Weapon,
  WeaponName,
  Armor,
  ArmorName,
  Accessory,
  AccessoryName,
  AllyAttacks,
  AttackName,
  GenoBuff,
  MallowBuff,
  BowserBuff,
  PeachBuff,
  TimingType,
  Accessories,
  Armors,
  Weapons,
  Enemies,
  Enemy,
  EnemyAttacks,
  EnemyAttack,
  DefenseBoostModifier,
} from "./types";
import CHARACTER_DATA from "./characters";

interface StatCalculatorProps {
  selectedGame: string;
  selectedCharacter: string;
  selectedStat: string;
}

const StatCalculator: React.FC<StatCalculatorProps> = ({
  selectedGame,
  selectedCharacter,
  selectedStat,
}) => {
  // Define your game-specific logic for stat calculations here

  return (
    <div>
      <h2>Stat Calculator</h2>
      <p>Selected Game: {selectedGame}</p>
      <p>Selected Character: {selectedCharacter}</p>
      <p>Selected Stat: {selectedStat}</p>
      {/* Add your form elements and logic here */}
    </div>
  );
};

const Jump: React.FC = () => {
  return <div>test</div>;
};

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>(CHARACTER_DATA);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    characters[0]
  );
  const [selectedStat, setSelectedStat] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<HitType>(HitType.HIT);
  const [selectedAttackBoost, setSelectedAttackBoostType] =
    useState<AttackBoostModifier>(AttackBoostModifier.BOOSTED);
  const [selectedDefenseBoost, setSelectedDefenseBoostType] =
    useState<DefenseBoostModifier>(DefenseBoostModifier.NONE);
  const [selectedAttackTiming, setSelectedAttackTimingType] =
    useState<string>("2");
  const [selectedDefenseTiming, setSelectedDefenseTimingType] =
    useState<string>("1");
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon>(Weapons[0]);
  const [selectedArmor, setSelectedArmor] = useState<Armor>(Armors[0]);
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory>(
    Accessories[0]
  );
  const [selectedAllyAttack, setSelectedAllyAttack] = useState<Attack>(
    AllyAttacks[0]
  );
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

  const hitCounterValue =
    selectedAllyAttack.name === AttackName.JUMP
      ? jumpCount
      : selectedAllyAttack.name === AttackName.FIREBALL
      ? fbCount
      : selectedAllyAttack.name === AttackName.SUPER_JUMP
      ? sjCount
      : selectedAllyAttack.name === AttackName.SUPER_FIREBALL
      ? sfCount
      : selectedAllyAttack.name === AttackName.ULTRA_JUMP
      ? ujCount
      : selectedAllyAttack.name === AttackName.ULTRA_FIREBALL
      ? ufCount
      : selectedAllyAttack.name === AttackName.SNOWY
      ? snowyCount
      : selectedAllyAttack.name === AttackName.STAR_RAIN
      ? srCount
      : selectedAllyAttack.name === AttackName.TERRORIZE
      ? terrCount
      : selectedAllyAttack.name === AttackName.POISON_GAS
      ? pgCount
      : selectedAllyAttack.name === AttackName.BOWSER_CRUSH
      ? bcCount
      : selectedAllyAttack.name === AttackName.PSYCH_BOMB
      ? pbCount
      : 0;

  const handleChangeHitCounter = (value: number) => {
    if (selectedAllyAttack.name === AttackName.JUMP) {
      setJumpCount(value);
    } else if (selectedAllyAttack.name === AttackName.FIREBALL) {
      setFBCount(value);
    } else if (selectedAllyAttack.name === AttackName.SUPER_JUMP) {
      setSJCount(value);
    } else if (selectedAllyAttack.name === AttackName.SUPER_FIREBALL) {
      setSFCount(value);
    } else if (selectedAllyAttack.name === AttackName.ULTRA_JUMP) {
      setUJCount(value);
    } else if (selectedAllyAttack.name === AttackName.ULTRA_FIREBALL) {
      setUFCount(value);
    } else if (selectedAllyAttack.name === AttackName.SNOWY) {
      setSnowyCount(value);
    } else if (selectedAllyAttack.name === AttackName.STAR_RAIN) {
      setSRCount(value);
    } else if (selectedAllyAttack.name === AttackName.TERRORIZE) {
      setTerrCount(value);
    } else if (selectedAllyAttack.name === AttackName.POISON_GAS) {
      setPGCount(value);
    } else if (selectedAllyAttack.name === AttackName.BOWSER_CRUSH) {
      setBCCount(value);
    } else if (selectedAllyAttack.name === AttackName.PSYCH_BOMB) {
      setPBCount(value);
    }
  };

  const handleGameChange = (value: string) => {
    // Handle game change logic
    setSelectedGame(value);
  };

  const handleTypeChange = (event: any) => {
    setSelectedType(event.target.value);
  };

  const handleAttackBoostChange = (event: any) => {
    setSelectedAttackBoostType(event.target.value);
  };
  const handleDefenseBoostChange = (event: any) => {
    setSelectedDefenseBoostType(event.target.value);
  };

  const handleAttackTimingChange = (value: string) => {
    setSelectedAttackTimingType(value);
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

  const handleWeaponChange = (value: string) => {
    const weapon =
      Weapons.find((a) => a.name === (value as WeaponName)) || Weapons[0];
    setSelectedWeapon(weapon);
    const updatedCharacters = characters.map((character) =>
      character.id === selectedCharacter.id
        ? { ...character, activeWeapon: value as WeaponName }
        : character
    );
    setCharacters(updatedCharacters);
  };

  const handleArmorChange = (value: string) => {
    const armor =
      Armors.find((a) => a.name === (value as ArmorName)) || Armors[0];
    setSelectedArmor(armor);
    const updatedCharacters = characters.map((character) =>
      character.id === selectedCharacter.id
        ? { ...character, activeArmor: value as ArmorName }
        : character
    );
    setCharacters(updatedCharacters);
  };

  const handleAccessoryChange = (value: string) => {
    const accessory =
      Accessories.find((a) => a.name === (value as AccessoryName)) ||
      Accessories[0];
    setSelectedAccessory(accessory);
    const updatedCharacters = characters.map((character) =>
      character.id === selectedCharacter.id
        ? { ...character, activeAccessory: value as AccessoryName }
        : character
    );
    setCharacters(updatedCharacters);
  };

  const handleAllyAttackChange = (value: string) => {
    const attack =
      AllyAttacks.find((a) => a.name === (value as AttackName)) ||
      AllyAttacks[0];
    setSelectedAllyAttack(attack);
    const updatedCharacters = characters.map((character) =>
      character.id === selectedCharacter.id
        ? { ...character, activeAttack: value as AttackName }
        : character
    );
    setCharacters(updatedCharacters);
    if (attack.defaultTier) {
      handleAttackTimingChange(attack.defaultTier);
    }
  };

  const handleCharacterChange = (value: string) => {
    // Handle character change logic
    const character = characters.find((c) => c.id === value) || characters[0];
    setSelectedCharacter(character);
    setSelectedLevel(character.level);
    const weapon =
      Weapons.find((a) => a.name === (character.activeWeapon as WeaponName)) ||
      Weapons[0];
    setSelectedWeapon(weapon);
    const armor =
      Armors.find((a) => a.name === (character.activeArmor as ArmorName)) ||
      Armors[0];
    setSelectedArmor(armor);
    const accessory =
      Armors.find(
        (a) => a.name === (character.activeAccessory as AccessoryName)
      ) || Accessories[0];
    setSelectedAccessory(accessory);
    const attack =
      AllyAttacks.find(
        (a) => a.name === (character.activeAttack as AttackName)
      ) || AllyAttacks[0];
    setSelectedAllyAttack(attack);
    if (attack.defaultTier) {
      handleAllyAttackChange(attack.name);
    }
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

  const handleStatChange = (value: string) => {
    // Handle stat change logic
    setSelectedStat(value);
  };

  const handleLevelChange = (value: number) => {
    // Handle stat change logic
    const updatedCharacters = characters.map((character) =>
      character.id === selectedCharacter.id
        ? { ...character, level: value }
        : character
    );
    setCharacters(updatedCharacters);
    setSelectedLevel(value);
  };

  return (
    <>
      <div>
        <b>
          This damage calculator is a work in progress. Many of these formulas
          are estimations. Join the SMRPG discord if you'd like to contribute
          research or code.
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
                  {CHARACTER_DATA.map((c) => (
                    <option value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="label">
                <label htmlFor="selectLevel">Level:</label>
              </div>
              <div className="formElements">
                <select
                  onChange={(e) => handleLevelChange(Number(e.target.value))}
                  id="selectLevel"
                  value={selectedLevel || ""}
                >
                  {Array.from(
                    { length: 31 - selectedCharacter.minLevel },
                    (_, index) => index + selectedCharacter.minLevel
                  ).map((c) => (
                    <option value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="label">
                <label htmlFor="selectWeapon">Weapon:</label>
              </div>
              <div className="formElements">
                <select
                  id="selectWeapon"
                  onChange={(e) => handleWeaponChange(e.target.value)}
                  value={selectedWeapon.name || WeaponName.UNARMED}
                >
                  {selectedCharacter.weapons.map((a) => (
                    <option value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="label">
                <label htmlFor="selectArmor">Armor:</label>
              </div>
              <div className="formElements">
                <select
                  id="selectArmor"
                  onChange={(e) => handleArmorChange(e.target.value)}
                  value={selectedArmor.name || ArmorName.NONE}
                >
                  {selectedCharacter.armors.map((a) => (
                    <option value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="label">
                <label htmlFor="selectAccessory">Accessory:</label>
              </div>
              <div className="formElements">
                <select
                  id="selectAccessory"
                  onChange={(e) => handleAccessoryChange(e.target.value)}
                  value={selectedAccessory.name || AccessoryName.NONE}
                >
                  {selectedCharacter.accessories.map((a) => (
                    <option value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedType === HitType.HIT && (
              <>
                <div className="row">
                  <div className="label">
                    <label htmlFor="selectAttack">Attack:</label>
                  </div>
                  <div className="formElements">
                    <select
                      id="selectAttack"
                      onChange={(e) => handleAllyAttackChange(e.target.value)}
                      value={selectedAllyAttack.name || AttackName.PHYSICAL}
                    >
                      {selectedCharacter.attacks
                        .filter((a) => {
                          const atk = AllyAttacks.find((aa) => aa.name === a);
                          return !!atk && atk.minLevel <= selectedLevel;
                        })
                        .map((a) => (
                          <option value={a}>{a}</option>
                        ))}
                    </select>
                  </div>
                </div>

                {(selectedAllyAttack.timingType === TimingType.BUTTON_PRESSES ||
                  selectedAllyAttack.timingType === TimingType.JUMP) && (
                  <div className="row">
                    <div className="label">
                      <label htmlFor="hitCounter">Count:</label>
                    </div>
                    <div className="formElements">
                      <input
                        type="number"
                        id="hitCounter"
                        step="1"
                        max={selectedAllyAttack.cap}
                        onChange={(e) =>
                          handleChangeHitCounter(Number(e.target.value))
                        }
                        value={hitCounterValue}
                      />
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="label">
                    <label>Boost modifier:</label>
                  </div>
                  <div className="formElements">
                    <label
                      className="verticalRadio"
                      htmlFor="attackBoostBoosted"
                    >
                      <input
                        type="radio"
                        name="attackBoost"
                        value={AttackBoostModifier.BOOSTED}
                        checked={
                          selectedAttackBoost === AttackBoostModifier.BOOSTED
                        }
                        onChange={handleAttackBoostChange}
                        id="attackBoostBoosted"
                      />
                      Player atk boosted (x1.5)
                    </label>
                    <label
                      className="verticalRadio"
                      htmlFor="attackBoostFeared"
                    >
                      <input
                        type="radio"
                        name="attackBoost"
                        value={AttackBoostModifier.FEARED}
                        checked={
                          selectedAttackBoost === AttackBoostModifier.FEARED
                        }
                        onChange={handleAttackBoostChange}
                        id="attackBoostFeared"
                      />
                      Player feared (x0.5)
                    </label>
                    <label className="verticalRadio" htmlFor="attackBoostNone">
                      <input
                        type="radio"
                        name="attackBoost"
                        value={AttackBoostModifier.NONE}
                        checked={
                          selectedAttackBoost === AttackBoostModifier.NONE
                        }
                        onChange={handleAttackBoostChange}
                        id="attackBoostNone"
                      />
                      None (x1)
                    </label>
                  </div>
                </div>
                {(selectedAllyAttack.timingType === TimingType.THREE_TIER ||
                  selectedAllyAttack.timingType === TimingType.FIVE_TIER ||
                  selectedAllyAttack.timingType === TimingType.JUMP) && (
                  <div className="row">
                    <div className="label">
                      <label>Timing:</label>
                    </div>
                    <div className="formElements">
                      {!!selectedAllyAttack.tiers &&
                        selectedAllyAttack.tiers.map((tier, idx) => (
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
                {selectedAllyAttack.type === AttackType.PHYSICAL && (
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
                          checked={selectedGenoBuff === GenoBuff.THREE_CHAIN}
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
                {selectedAllyAttack.type === AttackType.SPELL && (
                  <div className="row">
                    <div className="label">
                      <label>Mallow ally chain buff:</label>
                    </div>
                    <div className="formElements">
                      <label className="verticalRadio" htmlFor="mallowChain5">
                        <input
                          type="radio"
                          name="mallowChain"
                          value={MallowBuff.FIVE_CHAIN}
                          checked={selectedMallowBuff === MallowBuff.FIVE_CHAIN}
                          onChange={handleMallowBuffChange}
                          id="mallowChain5"
                        />
                        Five chain (x{MallowBuff.FIVE_CHAIN})
                      </label>
                      <label className="verticalRadio" htmlFor="mallowChain3">
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
                      <label className="verticalRadio" htmlFor="mallowChain2">
                        <input
                          type="radio"
                          name="mallowChain"
                          value={MallowBuff.TWO_CHAIN}
                          checked={selectedMallowBuff === MallowBuff.TWO_CHAIN}
                          onChange={handleMallowBuffChange}
                          id="mallowChain2"
                        />
                        Two chain (x{MallowBuff.TWO_CHAIN})
                      </label>
                      <label className="verticalRadio" htmlFor="mallowChain0">
                        <input
                          type="radio"
                          name="mallowChain"
                          value={MallowBuff.NO_CHAIN}
                          checked={selectedMallowBuff === MallowBuff.NO_CHAIN}
                          onChange={handleMallowBuffChange}
                          id="mallowChain0"
                        />
                        No chain (x{MallowBuff.NO_CHAIN})
                      </label>
                    </div>
                  </div>
                )}
                {selectedAllyAttack.type === AttackType.PHYSICAL && (
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
                          selectedDefenseBoost === DefenseBoostModifier.BOOSTED
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
                          selectedDefenseBoost === DefenseBoostModifier.FEARED
                        }
                        onChange={handleDefenseBoostChange}
                        id="defenseBoostFeared"
                      />
                      Player feared (x2/3)
                    </label>
                    <label className="verticalRadio" htmlFor="defenseBoostNone">
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
                      <label className="verticalRadio" htmlFor="bowserChain5">
                        <input
                          type="radio"
                          name="bowserChain"
                          value={BowserBuff.FIVE_CHAIN}
                          checked={selectedBowserBuff === BowserBuff.FIVE_CHAIN}
                          onChange={handleBowserBuffChange}
                          id="bowserChain5"
                        />
                        Five chain (x{BowserBuff.FIVE_CHAIN})
                      </label>
                      <label className="verticalRadio" htmlFor="bowserChain3">
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
                      <label className="verticalRadio" htmlFor="bowserChain2">
                        <input
                          type="radio"
                          name="bowserChain"
                          value={BowserBuff.TWO_CHAIN}
                          checked={selectedBowserBuff === BowserBuff.TWO_CHAIN}
                          onChange={handleBowserBuffChange}
                          id="bowserChain2"
                        />
                        Two chain (x{BowserBuff.TWO_CHAIN})
                      </label>
                      <label className="verticalRadio" htmlFor="bowserChain0">
                        <input
                          type="radio"
                          name="bowserChain"
                          value={BowserBuff.NO_CHAIN}
                          checked={selectedBowserBuff === BowserBuff.NO_CHAIN}
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
                      <label className="verticalRadio" htmlFor="peachChain5">
                        <input
                          type="radio"
                          name="peachChain"
                          value={PeachBuff.FIVE_CHAIN}
                          checked={selectedPeachBuff === PeachBuff.FIVE_CHAIN}
                          onChange={handlePeachBuffChange}
                          id="peachChain5"
                        />
                        Five chain (x{PeachBuff.FIVE_CHAIN})
                      </label>
                      <label className="verticalRadio" htmlFor="peachChain3">
                        <input
                          type="radio"
                          name="peachChain"
                          value={PeachBuff.THREE_CHAIN}
                          checked={selectedPeachBuff === PeachBuff.THREE_CHAIN}
                          onChange={handlePeachBuffChange}
                          id="peachChain3"
                        />
                        Three chain (x{PeachBuff.THREE_CHAIN})
                      </label>
                      <label className="verticalRadio" htmlFor="peachChain2">
                        <input
                          type="radio"
                          name="peachChain"
                          value={PeachBuff.TWO_CHAIN}
                          checked={selectedPeachBuff === PeachBuff.TWO_CHAIN}
                          onChange={handlePeachBuffChange}
                          id="peachChain2"
                        />
                        Two chain (x{PeachBuff.TWO_CHAIN})
                      </label>
                      <label className="verticalRadio" htmlFor="peachChain0">
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
                {selectedAllyAttack.type === AttackType.PHYSICAL && (
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
          </div>

          <label>
            Select Game:
            <select onChange={(e) => handleGameChange(e.target.value)}>
              {/* Add game options */}
              <option value="game1">Game 1</option>
              <option value="game2">Game 2</option>
            </select>
          </label>

          <br />

          <label>
            Select Character:
            <select onChange={(e) => handleCharacterChange(e.target.value)}>
              {/* Add character options based on the selected game */}
              {selectedGame === "game1" && (
                <option value="char1">Character 1</option>
              )}
              {selectedGame === "game2" && (
                <option value="char2">Character 2</option>
              )}
            </select>
          </label>

          <br />

          <StatCalculator
            selectedGame={selectedGame}
            selectedCharacter={selectedCharacter.name}
            selectedStat={selectedStat}
          />
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
              <div className="formElements" style={{ width: "175px" }}>
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
                <label
                  htmlFor="breezy"
                  style={{
                    visibility:
                      selectedType === HitType.BLOCK ? "visible" : "hidden",
                  }}
                >
                  Breezy mode:
                </label>
              </div>
              <div className="formElements">
                <input
                  type="checkbox"
                  checked={breezy}
                  onChange={handleDifficultyChange}
                  id="breezy"
                  style={{
                    visibility:
                      selectedType === HitType.BLOCK ? "visible" : "hidden",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
