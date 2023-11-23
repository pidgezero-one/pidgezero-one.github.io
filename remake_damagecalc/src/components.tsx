import React, { ReactNode, useEffect, useState } from "react";
import {
  AccessoryName,
  ArmorName,
  AttackBoostModifier,
  AttackName,
  Character,
  HitType,
  LevelupBonus,
  WeaponName,
} from "./types";
import { AllyAttacks } from "./entities";

export const TableRow: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="row">{children}</div>;
};

interface FormContainerProps {
  label: string;
  hide?: boolean;
  children?: ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  label,
  children = undefined,
  hide = false,
}) => {
  return (
    <>
      <div className="label">
        <label
          style={{
            visibility: hide ? "hidden" : "visible",
          }}
        >
          {label}
        </label>
      </div>
      <div
        className="formElements"
        style={{
          visibility: hide ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </>
  );
};

export interface CharacterFormContainerProps {
  character: Character;
  updateCharacter: (c: Character) => void;
  updateAttack: (a: AttackName) => void;
  mode: HitType;
  children?: ReactNode;
}

export const CharacterForm: React.FC<CharacterFormContainerProps> = ({
  character,
  updateCharacter,
  updateAttack,
  mode,
  children = undefined,
}) => {
  /*const [selectedLevel, setSelectedLevel] = useState<number>(
    character.minLevel
  );
  const [selectedAttackBoost, setSelectedAttackBoostType] =
    useState<AttackBoostModifier>(character.activeAttackBoost);
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponName>(
    character.activeWeapon
  );
  const [selectedArmor, setSelectedArmor] = useState<ArmorName>(
    character.activeArmor
  );
  const [selectedAccessory, setSelectedAccessory] = useState<AccessoryName>(
    character.activeAccessory
  );
  const [selectedAllyAttack, setSelectedAllyAttack] = useState<AttackName>(
    character.activeAttack
  );*/

  const [char, setChar] = useState<Character>(character);
  useEffect(() => {
    setChar(character);
  }, [character]);

  const handleWeaponChange = (value: WeaponName) => {
    /*character.activeWeapon = value;
    setSelectedWeapon(value);*/
    setChar({ ...char, activeWeapon: value });
  };

  const handleArmorChange = (value: ArmorName) => {
    /*character.activeArmor = value;
    setSelectedArmor(value);*/
    setChar({ ...char, activeArmor: value });
  };

  const handleAccessoryChange = (value: AccessoryName) => {
    /*character.activeAccessory = value;
    setSelectedAccessory(value);*/
    setChar({ ...char, activeAccessory: value });
  };

  const handleAllyAttackChange = (value: AttackName) => {
    /*character.activeAttack = value;
    setSelectedAllyAttack(value);*/
    setChar({ ...char, activeAttack: value });
    updateAttack(value);
  };

  const handleAttackBoostChange = (value: AttackBoostModifier) => {
    /*character.activeAttackBoost = value;
    setSelectedAttackBoostType(value);*/
    setChar({ ...char, activeAttackBoost: value });
  };

  const handleLevelChange = (value: number) => {
    /*character.level = value;
    setSelectedLevel(value);*/
    setChar({ ...char, level: value });
  };

  const handleLevelupBonusChange = (idx: number, bonus: LevelupBonus) => {
    const bonuses = character.statbonuses;
    bonuses[idx] = bonus;
    setChar({ ...char, statbonuses: bonuses });
    //character.statbonuses = bonuses;
  };

  useEffect(() => {
    updateCharacter(char);
  }, [char, updateCharacter]);

  return (
    <>
      <TableRow>
        <FormContainer label="Level">
          <select
            onChange={(e) => handleLevelChange(Number(e.target.value))}
            id="selectLevel"
            value={char.level >= char.minLevel ? char.level : char.minLevel}
          >
            {Array.from(
              { length: 31 - char.minLevel },
              (_, index) => index + char.minLevel
            ).map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </FormContainer>
      </TableRow>
      <TableRow>
        <FormContainer label="Weapon">
          <select
            onChange={(e) => handleWeaponChange(e.target.value as WeaponName)}
            value={char.activeWeapon || WeaponName.UNARMED}
          >
            {char.weapons.map((a) => (
              <option value={a}>{a}</option>
            ))}
          </select>
        </FormContainer>
      </TableRow>
      <TableRow>
        <FormContainer label="Armor">
          <select
            onChange={(e) => handleArmorChange(e.target.value as ArmorName)}
            value={char.activeArmor || ArmorName.NONE}
          >
            {char.armors.map((a) => (
              <option value={a}>{a}</option>
            ))}
          </select>
        </FormContainer>
      </TableRow>
      <TableRow>
        <FormContainer label="Accessory">
          <select
            onChange={(e) =>
              handleAccessoryChange(e.target.value as AccessoryName)
            }
            value={char.activeAccessory || AccessoryName.NONE}
          >
            {char.accessories.map((a) => (
              <option value={a}>{a}</option>
            ))}
          </select>
        </FormContainer>
      </TableRow>
      {mode === HitType.HIT && (
        <>
          <TableRow>
            <FormContainer label="Attack">
              <select
                onChange={(e) =>
                  handleAllyAttackChange(e.target.value as AttackName)
                }
                value={char.activeAttack || AttackName.PHYSICAL}
              >
                {char.attacks
                  .filter((a) => {
                    const attack = AllyAttacks.find((aa) => aa.name === a);
                    return !!attack && attack.minLevel <= char.level;
                  })
                  .map((a) => (
                    <option value={a}>{a}</option>
                  ))}
              </select>
            </FormContainer>
          </TableRow>
          <TableRow>
            <FormContainer label="Boost modifier">
              <label className="verticalRadio" htmlFor="attackBoostBoosted">
                <input
                  type="radio"
                  name="attackBoost"
                  value={AttackBoostModifier.BOOSTED}
                  checked={
                    char.activeAttackBoost === AttackBoostModifier.BOOSTED
                  }
                  onChange={(e) =>
                    handleAttackBoostChange(
                      e.target.value as AttackBoostModifier
                    )
                  }
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
                    char.activeAttackBoost === AttackBoostModifier.FEARED
                  }
                  onChange={(e) =>
                    handleAttackBoostChange(
                      e.target.value as AttackBoostModifier
                    )
                  }
                  id="attackBoostFeared"
                />
                Player feared (x0.5)
              </label>
              <label className="verticalRadio" htmlFor="attackBoostNone">
                <input
                  type="radio"
                  name="attackBoost"
                  value={AttackBoostModifier.NONE}
                  checked={char.activeAttackBoost === AttackBoostModifier.NONE}
                  onChange={(e) =>
                    handleAttackBoostChange(
                      e.target.value as AttackBoostModifier
                    )
                  }
                  id="attackBoostNone"
                />
                None (x1)
              </label>
            </FormContainer>
          </TableRow>
        </>
      )}
      {/* this is where timing counters, etc will go */}
      {children}
      {!!char.statbonuses &&
        char.statbonuses
          .slice(0, char.level - char.minLevel)
          .map((selectedBonus, idx) => {
            const levelID = idx + char.minLevel + 1;
            return (
              <div className="row">
                <div className="label">
                  <label>Level {levelID} bonus</label>
                </div>
                <div className="formElements">
                  <label htmlFor={`lvlbonus${idx}_pow`}>
                    <input
                      type="radio"
                      name={`lvlbonus${idx}`}
                      value={LevelupBonus.ATTACK}
                      checked={selectedBonus === LevelupBonus.ATTACK}
                      onChange={(e) =>
                        handleLevelupBonusChange(idx, LevelupBonus.ATTACK)
                      }
                      id={`lvlbonus${idx}_pow`}
                    />
                    POW
                  </label>
                  <label htmlFor={`lvlbonus${idx}_hp`} className="padLeft15">
                    <input
                      type="radio"
                      name={`lvlbonus${idx}`}
                      value={LevelupBonus.HP}
                      checked={selectedBonus === LevelupBonus.HP}
                      onChange={(e) =>
                        handleLevelupBonusChange(idx, LevelupBonus.HP)
                      }
                      id={`lvlbonus${idx}_hp`}
                    />
                    HP
                  </label>
                  <label htmlFor={`lvlbonus${idx}_sp`} className="padLeft15">
                    <input
                      type="radio"
                      name={`lvlbonus${idx}`}
                      value={LevelupBonus.SP}
                      checked={selectedBonus === LevelupBonus.SP}
                      onChange={(e) =>
                        handleLevelupBonusChange(idx, LevelupBonus.SP)
                      }
                      id={`lvlbonus${idx}_sp`}
                    />
                    SP
                  </label>
                </div>
              </div>
            );
          })}
    </>
  );
};
