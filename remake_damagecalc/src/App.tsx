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
} from "./types";

let CHARACTER_DATA: Character[] = [
  {
    id: "mario",
    name: "Mario",
    minLevel: 1,
    statbonuses: Array.from({ length: 29 }, () => LevelupBonus.HP),
    level: 1,
    attacks: [],
    weapons: [
      WeaponName.UNARMED,
      WeaponName.HAMMER,
      WeaponName.KOOPA_SHELL,
      WeaponName.LAZY_SHELL,
      WeaponName.LUCKY_HAMMER,
      WeaponName.MASHER,
      WeaponName.MEGA_GLOVE,
      WeaponName.PARATROOPA_SHELL,
      WeaponName.PUNCH_GLOVE,
      WeaponName.SUPER_HAMMER,
      WeaponName.ULTRA_HAMMER,
    ],
    armors: [
      ArmorName.NONE,
      ArmorName.FIRE_SHIRT,
      ArmorName.FUZZY_SHIRT,
      ArmorName.HAPPY_SHIRT,
      ArmorName.HERO_SHIRT,
      ArmorName.LAZY_SHELL,
      ArmorName.MEGA_SHIRT,
      ArmorName.SAILOR_SHIRT,
      ArmorName.SHIRT,
      ArmorName.SUPER_SUIT,
      ArmorName.THICK_SHIRT,
      ArmorName.WORK_PANTS,
    ],
    accessories: [
      AccessoryName.NONE,
      AccessoryName.ANTIDOTE_PIN,
      AccessoryName.ATTACK_SCARF,
      AccessoryName.BOOSTERS_CHARM,
      AccessoryName.COIN_TRICK,
      AccessoryName.DEFENSE_SCARF,
      AccessoryName.ECHO_SIGNAL_RING,
      AccessoryName.ENDURING_BROOCH,
      AccessoryName.EXP_BOOSTER,
      AccessoryName.FEARLESS_PIN,
      AccessoryName.FEATHER,
      AccessoryName.FLOWER_RING,
      AccessoryName.GHOST_MEDAL,
      AccessoryName.JINX_BELT,
      AccessoryName.JUMP_SHOES,
      AccessoryName.QUARTZ_CHARM,
      AccessoryName.SAFETY_BADGE,
      AccessoryName.SAFETY_RING,
      AccessoryName.SIGNAL_RING,
      AccessoryName.TROOPA_PIN,
      AccessoryName.TRUEFORM_PIN,
      AccessoryName.WAKE_UP_PIN,
      AccessoryName.ZOOM_SHOES,
    ],
    activeWeapon: WeaponName.UNARMED,
    activeArmor: ArmorName.NONE,
    activeAccessory: AccessoryName.NONE,
  },
  {
    id: "mallow",
    name: "Mallow",
    minLevel: 2,
    statbonuses: Array.from({ length: 28 }, () => LevelupBonus.HP),
    level: 2,
    attacks: [],
    weapons: [
      WeaponName.UNARMED,
      WeaponName.CYMBALS,
      WeaponName.FROGGIE_STICK,
      WeaponName.RIBBIT_STICK,
      WeaponName.SAGE_STICK,
      WeaponName.SONIC_CYMBALS,
      WeaponName.STICKY_GLOVE,
      WeaponName.WHOMP_GLOVE,
    ],
    armors: [
      ArmorName.NONE,
      ArmorName.FIRE_PANTS,
      ArmorName.FUZZY_PANTS,
      ArmorName.HAPPY_PANTS,
      ArmorName.LAZY_SHELL,
      ArmorName.MEGA_PANTS,
      ArmorName.PRINCE_PANTS,
      ArmorName.PANTS,
      ArmorName.SAILOR_PANTS,
      ArmorName.SUPER_SUIT,
      ArmorName.THICK_PANTS,
      ArmorName.WORK_PANTS,
    ],
    accessories: [
      AccessoryName.NONE,
      AccessoryName.ANTIDOTE_PIN,
      AccessoryName.BOOSTERS_CHARM,
      AccessoryName.DEFENSE_SCARF,
      AccessoryName.ECHO_SIGNAL_RING,
      AccessoryName.ENDURING_BROOCH,
      AccessoryName.EXP_BOOSTER,
      AccessoryName.FEARLESS_PIN,
      AccessoryName.FEATHER,
      AccessoryName.FLOWER_RING,
      AccessoryName.GHOST_MEDAL,
      AccessoryName.JINX_BELT,
      AccessoryName.QUARTZ_CHARM,
      AccessoryName.SAFETY_BADGE,
      AccessoryName.SAFETY_RING,
      AccessoryName.SIGNAL_RING,
      AccessoryName.TROOPA_PIN,
      AccessoryName.TRUEFORM_PIN,
      AccessoryName.WAKE_UP_PIN,
      AccessoryName.ZOOM_SHOES,
    ],
    activeWeapon: WeaponName.UNARMED,
    activeArmor: ArmorName.NONE,
    activeAccessory: AccessoryName.NONE,
  },
  {
    id: "geno",
    name: "Geno",
    minLevel: 6,
    statbonuses: Array.from({ length: 24 }, () => LevelupBonus.HP),
    level: 6,
    attacks: [],
    weapons: [
      WeaponName.UNARMED,
      WeaponName.DOUBLE_PUNCH,
      WeaponName.FINGER_SHOT,
      WeaponName.HAND_CANNON,
      WeaponName.HAND_GUN,
      WeaponName.STELLA_023,
      WeaponName.STAR_GUN,
    ],
    armors: [
      ArmorName.NONE,
      ArmorName.FIRE_CAPE,
      ArmorName.FUZZY_CAPE,
      ArmorName.HAPPY_CAPE,
      ArmorName.LAZY_SHELL,
      ArmorName.MEGA_CAPE,
      ArmorName.SAILOR_CAPE,
      ArmorName.STAR_CAPE,
      ArmorName.SUPER_SUIT,
      ArmorName.WORK_PANTS,
    ],
    accessories: [
      AccessoryName.NONE,
      AccessoryName.ANTIDOTE_PIN,
      AccessoryName.BOOSTERS_CHARM,
      AccessoryName.DEFENSE_SCARF,
      AccessoryName.ECHO_SIGNAL_RING,
      AccessoryName.ENDURING_BROOCH,
      AccessoryName.EXP_BOOSTER,
      AccessoryName.FEARLESS_PIN,
      AccessoryName.FEATHER,
      AccessoryName.FLOWER_RING,
      AccessoryName.GHOST_MEDAL,
      AccessoryName.JINX_BELT,
      AccessoryName.QUARTZ_CHARM,
      AccessoryName.SAFETY_BADGE,
      AccessoryName.SAFETY_RING,
      AccessoryName.SIGNAL_RING,
      AccessoryName.TROOPA_PIN,
      AccessoryName.TRUEFORM_PIN,
      AccessoryName.WAKE_UP_PIN,
      AccessoryName.ZOOM_SHOES,
    ],
    activeWeapon: WeaponName.UNARMED,
    activeArmor: ArmorName.NONE,
    activeAccessory: AccessoryName.NONE,
  },
  {
    id: "bowser",
    name: "Bowser",
    minLevel: 8,
    statbonuses: Array.from({ length: 22 }, () => LevelupBonus.HP),
    level: 8,
    attacks: [],
    weapons: [
      WeaponName.UNARMED,
      WeaponName.CHAIN_CHOMP,
      WeaponName.DRILL_CLAW,
      WeaponName.FAKE_CHOMP,
      WeaponName.HURLY_GLOVES,
      WeaponName.SPIKED_CHOMP,
      WeaponName.WONDER_CHOMP,
    ],
    armors: [
      ArmorName.NONE,
      ArmorName.COURAGE_SHELL,
      ArmorName.FIRE_SHELL,
      ArmorName.HAPPY_SHELL,
      ArmorName.HEEL_SHELL,
      ArmorName.LAZY_SHELL,
      ArmorName.SUPER_SUIT,
      ArmorName.WORK_PANTS,
    ],
    accessories: [
      AccessoryName.NONE,
      AccessoryName.ANTIDOTE_PIN,
      AccessoryName.BOOSTERS_CHARM,
      AccessoryName.DEFENSE_SCARF,
      AccessoryName.ECHO_SIGNAL_RING,
      AccessoryName.ENDURING_BROOCH,
      AccessoryName.EXP_BOOSTER,
      AccessoryName.FEARLESS_PIN,
      AccessoryName.FEATHER,
      AccessoryName.FLOWER_RING,
      AccessoryName.GHOST_MEDAL,
      AccessoryName.JINX_BELT,
      AccessoryName.QUARTZ_CHARM,
      AccessoryName.SAFETY_BADGE,
      AccessoryName.SAFETY_RING,
      AccessoryName.SIGNAL_RING,
      AccessoryName.TROOPA_PIN,
      AccessoryName.TRUEFORM_PIN,
      AccessoryName.WAKE_UP_PIN,
      AccessoryName.ZOOM_SHOES,
    ],
    activeWeapon: WeaponName.UNARMED,
    activeArmor: ArmorName.NONE,
    activeAccessory: AccessoryName.NONE,
  },
  {
    id: "peach",
    name: "Peach",
    minLevel: 9,
    statbonuses: Array.from({ length: 21 }, () => LevelupBonus.HP),
    level: 9,
    attacks: [],
    weapons: [
      WeaponName.UNARMED,
      WeaponName.FRYING_PAN,
      WeaponName.PARASOL,
      WeaponName.SLAP_GLOVE,
      WeaponName.SUPER_SLAP,
      WeaponName.WAR_FAN,
    ],
    armors: [
      ArmorName.NONE,
      ArmorName.FIRE_DRESS,
      ArmorName.FUZZY_DRESS,
      ArmorName.LAZY_SHELL,
      ArmorName.LOVELY_DRESS,
      ArmorName.ROYAL_DRESS,
      ArmorName.SAILOR_DRESS,
      ArmorName.SUPER_SUIT,
      ArmorName.WORK_PANTS,
    ],
    accessories: [
      AccessoryName.NONE,
      AccessoryName.ANTIDOTE_PIN,
      AccessoryName.BOOSTERS_CHARM,
      AccessoryName.DEFENSE_SCARF,
      AccessoryName.ECHO_SIGNAL_RING,
      AccessoryName.ENDURING_BROOCH,
      AccessoryName.EXP_BOOSTER,
      AccessoryName.FEARLESS_PIN,
      AccessoryName.FEATHER,
      AccessoryName.FLOWER_RING,
      AccessoryName.GHOST_MEDAL,
      AccessoryName.JINX_BELT,
      AccessoryName.NURTURE_RING,
      AccessoryName.QUARTZ_CHARM,
      AccessoryName.SAFETY_BADGE,
      AccessoryName.SAFETY_RING,
      AccessoryName.SIGNAL_RING,
      AccessoryName.TROOPA_PIN,
      AccessoryName.TRUEFORM_PIN,
      AccessoryName.WAKE_UP_PIN,
      AccessoryName.ZOOM_SHOES,
    ],
    activeWeapon: WeaponName.UNARMED,
    activeArmor: ArmorName.NONE,
    activeAccessory: AccessoryName.NONE,
  },
];

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
  const [selectedAttackTiming, setSelectedAttackTimingType] =
    useState<AttackTimingModifier>(AttackTimingModifier.PERFECT);
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponName>(
    WeaponName.UNARMED
  );
  const [selectedArmor, setSelectedArmor] = useState<ArmorName>(ArmorName.NONE);
  const [selectedAccessory, setSelectedAccessory] = useState<AccessoryName>(
    AccessoryName.NONE
  );

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

  const handleAttackTimingChange = (event: any) => {
    setSelectedAttackTimingType(event.target.value);
  };

  const handleWeaponChange = (value: string) => {
    setSelectedWeapon(value as WeaponName);
    const updatedCharacters = characters.map((character) =>
      character.id === selectedCharacter.id
        ? { ...character, activeWeapon: value as WeaponName }
        : character
    );
    setCharacters(updatedCharacters);
  };

  const handleArmorChange = (value: string) => {
    setSelectedArmor(value as ArmorName);
    const updatedCharacters = characters.map((character) =>
      character.id === selectedCharacter.id
        ? { ...character, activeArmor: value as ArmorName }
        : character
    );
    setCharacters(updatedCharacters);
  };

  const handleAccessoryChange = (value: string) => {
    setSelectedAccessory(value as AccessoryName);
    const updatedCharacters = characters.map((character) =>
      character.id === selectedCharacter.id
        ? { ...character, activeAccessory: value as AccessoryName }
        : character
    );
    setCharacters(updatedCharacters);
  };

  const handleCharacterChange = (value: string) => {
    // Handle character change logic
    const character = characters.find((c) => c.id === value) || characters[0];
    setSelectedCharacter(character);
    setSelectedLevel(character.level);
    setSelectedWeapon(character.activeWeapon);
    setSelectedArmor(character.activeArmor);
    setSelectedAccessory(character.activeAccessory);
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
                  value={selectedWeapon || WeaponName.UNARMED}
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
                  value={selectedArmor || ArmorName.NONE}
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
                  value={selectedAccessory || AccessoryName.NONE}
                >
                  {selectedCharacter.accessories.map((a) => (
                    <option value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedType == HitType.HIT && (
              <div className="row">
                <div className="label">
                  <label htmlFor="selectAttack">Attack:</label>
                </div>
                <div className="formElements">
                  <select id="selectAttack">
                    {selectedCharacter.attacks.map((a) => (
                      <option value={a.name}>{a.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {selectedType == HitType.HIT && (
              <div className="row">
                <div className="label">
                  <label>Boost modifier:</label>
                </div>
                <div className="formElements">
                  <label className="verticalRadio" htmlFor="attackBoostBoosted">
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
                  <label className="verticalRadio" htmlFor="attackBoostFeared">
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
                      checked={selectedAttackBoost === AttackBoostModifier.NONE}
                      onChange={handleAttackBoostChange}
                      id="attackBoostNone"
                    />
                    None (x1)
                  </label>
                </div>
              </div>
            )}

            {selectedType == HitType.HIT && (
              <div className="row">
                <div className="label">
                  <label>Timing:</label>
                </div>
                <div className="formElements">
                  <label
                    className="verticalRadio"
                    htmlFor="attackTimingPerfect"
                  >
                    <input
                      type="radio"
                      name="attackTiming"
                      value={AttackTimingModifier.PERFECT}
                      checked={
                        selectedAttackTiming === AttackTimingModifier.PERFECT
                      }
                      onChange={handleAttackTimingChange}
                      id="attackTimingPerfect"
                    />
                    Perfect (x2)
                  </label>
                  <label
                    className="verticalRadio"
                    htmlFor="attackTimingPartial"
                  >
                    <input
                      type="radio"
                      name="attackTiming"
                      value={AttackTimingModifier.PARTIAL}
                      checked={
                        selectedAttackTiming === AttackTimingModifier.PARTIAL
                      }
                      onChange={handleAttackTimingChange}
                      id="attackTimingPartial"
                    />
                    Partial (x1.5)
                  </label>
                  <label className="verticalRadio" htmlFor="attackTimingNone">
                    <input
                      type="radio"
                      name="attackTiming"
                      value={AttackTimingModifier.NONE}
                      checked={
                        selectedAttackTiming === AttackTimingModifier.NONE
                      }
                      onChange={handleAttackTimingChange}
                      id="attackTimingNone"
                    />
                    None (x1)
                  </label>
                </div>
              </div>
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
        </div>
      </div>
    </>
  );
};

export default App;
