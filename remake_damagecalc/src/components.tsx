import React, { ReactNode, useEffect, useState } from "react";
import {
  AccessoryName,
  ArmorName,
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
  const [char, setChar] = useState<Character>(character);
  useEffect(() => {
    setChar(character);
  }, [character]);

  const handleWeaponChange = (value: WeaponName) => {
    setChar({ ...char, activeWeapon: value });
  };

  const handleArmorChange = (value: ArmorName) => {
    setChar({ ...char, activeArmor: value });
  };

  const handleAccessoryChange = (value: AccessoryName) => {
    setChar({ ...char, activeAccessory: value });
  };

  const handleAllyAttackChange = (value: AttackName) => {
    setChar({ ...char, activeAttack: value });
    updateAttack(value);
  };

  const handleAttackBoostChange = (event: any) => {
    setChar({ ...char, hasAttackBoost: !char.hasAttackBoost });
  };
  const handleDefenseBoostChange = (event: any) => {
    setChar({ ...char, hasDefenseBoost: !char.hasDefenseBoost });
  };
  const handleFearChange = (event: any) => {
    setChar({ ...char, isFeared: !char.isFeared });
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
        <FormContainer label="Level:">
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
        <FormContainer label="Weapon:">
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
        <FormContainer label="Armor:">
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
        <FormContainer label="Accessory:">
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
            <FormContainer label="Attack:">
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
          {mode === HitType.HIT && (
            <TableRow>
              <FormContainer label="Attack boost:">
                <input
                  type="checkbox"
                  checked={char.hasAttackBoost}
                  onChange={handleAttackBoostChange}
                />
              </FormContainer>
            </TableRow>
          )}
        </>
      )}
      {mode === HitType.BLOCK && (
        <TableRow>
          <FormContainer label="Defense boost:">
            <input
              type="checkbox"
              checked={char.hasDefenseBoost}
              onChange={handleDefenseBoostChange}
            />
          </FormContainer>
        </TableRow>
      )}
      <TableRow>
        <FormContainer label="Feared:">
          <input
            type="checkbox"
            checked={char.isFeared}
            onChange={handleFearChange}
          />
        </FormContainer>
      </TableRow>
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
