import React, { useState } from "react";
import { Table, TableCell, TableRow } from "./components";
import {
  CharacterName,
  Enemy,
  EnemyDefinition,
  EventType,
  ExpStarDefinition,
  GameEvent,
  Mode,
  PartyState,
  getFightExp,
} from "./types";
import { bosses, expRemaining, getLevel, monsters, stars } from "./entities";
function App() {
  const [mode, selectMode] = useState<Mode>(Mode.SNES);
  const [workingEventType, selectWorkingEventType] = useState<EventType>(
    EventType.FIGHT
  );
  const defaultEnemy = bosses[0];
  const defaultStar = stars[0];
  const [enemyInDropdown, selectEnemyInDropdown] =
    useState<EnemyDefinition>(defaultEnemy);
  const [enemiesInProgress, setEnemiesInProgress] = useState<Enemy[]>([]);
  const [special, setSpecial] = useState<boolean>(false);

  const [starInDropdown, setStarInDropdown] =
    useState<ExpStarDefinition>(defaultStar);
  const [starHits, setStarHits] = useState<number>(0);

  const [expBoosterCharacter, setExpBoosterCharacter] = useState<CharacterName>(
    CharacterName.NONE
  );

  const [gameEvents, setGameEvents] = useState<GameEvent[]>([]);
  const [eventIndex, setEventIndex] = useState<number>(0);

  const handleModeChange = (value: string) => {
    selectMode(value as Mode);
  };

  const getEnemy = (name: string): EnemyDefinition => {
    let enemy = bosses.find((en) => en.name === name);
    if (!enemy) {
      enemy = monsters.find((en) => en.name === name);
    }
    if (!enemy) {
      enemy = bosses[0];
    }
    return enemy;
  };

  const handleEnemyDropdownSelect = (event: any) => {
    const enemy = getEnemy(event.target.value);
    selectEnemyInDropdown(enemy);
    if (enemiesInProgress.length === 0) {
      enemiesInProgress.push({ defn: enemy, special });
    }
  };
  const handleAddEnemy = (event: any) => {
    const ep = [...enemiesInProgress, { defn: enemyInDropdown, special }];
    setEnemiesInProgress(ep);
  };
  const handleStarDropdownSelect = (event: any) => {
    const star = stars.find((s) => s.name === event.target.value) || stars[0];
    setStarInDropdown(star);
  };

  const swapElements = (
    array: GameEvent[],
    index1: number,
    index2: number
  ): GameEvent[] => {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    return array;
  };

  const moveEventUp = (index: number) => {
    if (index === 0) {
      return;
    }
    const ev = swapElements(gameEvents, index, index - 1);
    console.log(ev);
    setGameEvents(ev);
  };
  const moveEventDown = (index: number) => {
    if (index === gameEvents.length - 1) {
      return;
    }
    const ev = swapElements(gameEvents, index, index + 1);
    console.log(ev);
    setGameEvents(ev);
  };

  const removeEvent = (index: number) => {
    gameEvents.splice(index, 1)
    console.log(gameEvents);
    setGameEvents(gameEvents);
  }

  const addEvent = () => {
    let e = { type: workingEventType } as GameEvent;
    if (workingEventType === EventType.FIGHT) {
      if (enemiesInProgress.length === 0) {
        return;
      }
      e.enemies = enemiesInProgress;
      e.booster = expBoosterCharacter;
    } else if (workingEventType === EventType.STAR) {
      if (e.hits === 0) {
        return;
      }
      e.star = starInDropdown;
      e.hits = starHits;
      e.booster = expBoosterCharacter;
    } else {
      const memberCount = gameEvents.filter(
        (ev) => ev.type === EventType.PARTY
      ).length;
      if (memberCount >= 4) {
        return;
      }
    }
    gameEvents.splice(eventIndex + 1, 0, e);
    setEventIndex(eventIndex + 1);
    setGameEvents(gameEvents);
    setEnemiesInProgress([]);
  };

  const partyState: PartyState[] = gameEvents.map((_, idx: number) => {
    let party = {
      [CharacterName.MARIO]: { exp: 0, level: getLevel(0) },
      [CharacterName.MALLOW]: { exp: 30, level: getLevel(30) },
      [CharacterName.GENO]: { exp: 234, level: getLevel(234) },
      [CharacterName.BOWSER]: { exp: 470, level: getLevel(470) },
      [CharacterName.PEACH]: { exp: 600, level: getLevel(600) },
      partyCount: 1,
      hitLevelups: [],
    } as PartyState;
    for (let i = 0; i <= idx; i++) {
      const ev_ = gameEvents[i];
      const booster = ev_?.booster || CharacterName.NONE;
      let totalExp = 0;
      if (ev_.type === EventType.PARTY) {
        party.partyCount++;
      } else if (ev_.type === EventType.FIGHT) {
        totalExp = getFightExp(ev_, mode);
      } else if (ev_.type === EventType.STAR) {
        totalExp = (ev_.star?.exp || 0) * (ev_?.hits || 0);

        if (i === idx) {
          let starExp = ev_.star?.exp || 0;
          for (let j = 1; j <= (ev_?.hits || 0); j++) {
            let hits: CharacterName[] = [];
            if (
              party.partyCount >= 1 &&
              getLevel(
                party[CharacterName.MARIO].exp +
                  starExp * (booster === CharacterName.MARIO ? 2 : 1) * (j - 1)
              ) <
                getLevel(
                  party[CharacterName.MARIO].exp +
                    starExp * (booster === CharacterName.MARIO ? 2 : 1) * j
                )
            ) {
              hits.push(CharacterName.MARIO);
            }
            if (
              party.partyCount >= 2 &&
              getLevel(
                party[CharacterName.MALLOW].exp +
                  starExp * (booster === CharacterName.MALLOW ? 2 : 1) * (j - 1)
              ) <
                getLevel(
                  party[CharacterName.MALLOW].exp +
                    starExp * (booster === CharacterName.MALLOW ? 2 : 1) * j
                )
            ) {
              hits.push(CharacterName.MALLOW);
            }
            if (
              party.partyCount >= 3 &&
              getLevel(
                party[CharacterName.GENO].exp +
                  starExp * (booster === CharacterName.GENO ? 2 : 1) * (j - 1)
              ) <
                getLevel(
                  party[CharacterName.GENO].exp +
                    starExp * (booster === CharacterName.GENO ? 2 : 1) * j
                )
            ) {
              hits.push(CharacterName.GENO);
            }
            if (
              party.partyCount >= 4 &&
              getLevel(
                party[CharacterName.BOWSER].exp +
                  starExp * (booster === CharacterName.BOWSER ? 2 : 1) * (j - 1)
              ) <
                getLevel(
                  party[CharacterName.BOWSER].exp *
                    (booster === CharacterName.BOWSER ? 2 : 1) +
                    starExp * j
                )
            ) {
              hits.push(CharacterName.BOWSER);
            }
            if (
              party.partyCount >= 5 &&
              getLevel(
                party[CharacterName.PEACH].exp +
                  starExp * (booster === CharacterName.PEACH ? 2 : 1) * (j - 1)
              ) <
                getLevel(
                  party[CharacterName.PEACH].exp +
                    starExp * (booster === CharacterName.PEACH ? 2 : 1) * j
                )
            ) {
              hits.push(CharacterName.PEACH);
            }
            party.hitLevelups.push(hits);
          }
        }
      }
      if (party.partyCount >= 1) {
        if (booster === CharacterName.MARIO) {
          party[CharacterName.MARIO].exp += totalExp * 2;
        } else {
          party[CharacterName.MARIO].exp += totalExp;
        }
      }
      if (party.partyCount >= 2) {
        if (booster === CharacterName.MALLOW) {
          party[CharacterName.MALLOW].exp += totalExp * 2;
        } else {
          party[CharacterName.MALLOW].exp += totalExp;
        }
      }
      if (party.partyCount >= 3) {
        if (booster === CharacterName.GENO) {
          party[CharacterName.GENO].exp += totalExp * 2;
        } else {
          party[CharacterName.GENO].exp += totalExp;
        }
      }
      if (party.partyCount >= 4) {
        if (booster === CharacterName.BOWSER) {
          party[CharacterName.BOWSER].exp += totalExp * 2;
        } else {
          party[CharacterName.BOWSER].exp += totalExp;
        }
      }
      if (party.partyCount >= 5) {
        if (booster === CharacterName.PEACH) {
          party[CharacterName.PEACH].exp += totalExp * 2;
        } else {
          party[CharacterName.PEACH].exp += totalExp;
        }
      }
    }
    return party;
  });

  console.log(partyState);

  return (
    <>
      <Table additionalClass="header">
        <TableRow>
          <TableCell width={10} align={"right"}>
            New event:
          </TableCell>
          <TableCell width={15}>
            <select
              onChange={(e) =>
                selectWorkingEventType(e.target.value as EventType)
              }
              value={workingEventType}
            >
              <option>{EventType.FIGHT}</option>
              <option>{EventType.STAR}</option>
              <option>{EventType.PARTY}</option>
            </select>
          </TableCell>
          <TableCell width={30}>
            {workingEventType === EventType.FIGHT && (
              <Table>
                <TableRow>
                  <TableCell width={70}>
                    <select
                      onChange={handleEnemyDropdownSelect}
                      value={enemyInDropdown.name}
                    >
                      <optgroup id="bosses" label="Bosses or required fights:">
                        {bosses.map((b) => (
                          <option value={b.name}>
                            {mode === Mode.SNES
                              ? b.name
                              : b.switch_name || b.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup id="otherMonsters" label="Other monsters:">
                        {monsters.map((b) => (
                          <option value={b.name}>
                            {mode === Mode.SNES
                              ? b.name
                              : b.switch_name || b.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </TableCell>
                  <TableCell>
                    <button onClick={handleAddEnemy}>Add to fight</button>
                  </TableCell>
                </TableRow>
              </Table>
            )}
            {workingEventType === EventType.STAR && (
              <Table>
                <TableRow>
                  <TableCell width={70}>
                    <select
                      onChange={handleStarDropdownSelect}
                      value={starInDropdown.name}
                    >
                      {stars.map((s) => (
                        <option>{s.name}</option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>{starInDropdown.exp}x</TableCell>
                  <TableCell width={20}>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={starHits}
                      onChange={(e) => setStarHits(parseInt(e.target.value))}
                    />
                  </TableCell>
                  <TableCell> hits</TableCell>
                </TableRow>
              </Table>
            )}
          </TableCell>

          <TableCell width={30}>
            {(workingEventType === EventType.FIGHT ||
              workingEventType === EventType.STAR) && (
              <Table>
                <TableRow>
                  <TableCell>Exp.booster:</TableCell>
                  <TableCell width={70}>
                    <select
                      onChange={(e) =>
                        setExpBoosterCharacter(e.target.value as CharacterName)
                      }
                      value={expBoosterCharacter}
                    >
                      <option>{CharacterName.MARIO}</option>
                      <option>{CharacterName.MALLOW}</option>
                      <option>{CharacterName.GENO}</option>
                      <option>{CharacterName.BOWSER}</option>
                      <option>{CharacterName.PEACH}</option>
                    </select>
                  </TableCell>
                </TableRow>
              </Table>
            )}
          </TableCell>
          <TableCell>
            <button onClick={addEvent}>Add under selected</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell />
          <TableCell>
            {workingEventType === EventType.FIGHT && (
              <Table>
                <TableRow>
                  <TableCell>
                    {workingEventType === EventType.FIGHT &&
                      mode !== Mode.SNES && (
                        <>
                          <input
                            type="checkbox"
                            checked={special}
                            onChange={() => setSpecial(!special)}
                            id="spec"
                          />
                          <label htmlFor="spec">Special enemy</label>
                        </>
                      )}
                  </TableCell>
                </TableRow>
              </Table>
            )}
          </TableCell>
          <TableCell>
            {workingEventType === EventType.FIGHT && (
              <Table>
                <TableRow>
                  <TableCell width={70}>
                    {enemiesInProgress
                      .map(
                        (ep) =>
                          `${
                            mode === Mode.SNES
                              ? ep.defn.name
                              : ep.defn.switch_name || ep.defn.name
                          }${
                            mode !== Mode.SNES && ep.special ? " (spec.)" : ""
                          }`
                      )
                      .join(", ")}
                  </TableCell>
                  <TableCell>
                    <button onClick={() => setEnemiesInProgress([])}>
                      Clear
                    </button>
                  </TableCell>
                </TableRow>
              </Table>
            )}
          </TableCell>
          <TableCell>
            <input
              type="radio"
              name="game"
              value={Mode.SNES}
              checked={mode === Mode.SNES}
              id="radio_snes"
              onChange={(e) => handleModeChange(e.target.value)}
            />
            <label htmlFor="radio_snes" style={{ paddingRight: "10px" }}>
              SNES
            </label>
            <input
              type="radio"
              name="game"
              value={Mode.REMAKE}
              checked={mode === Mode.REMAKE}
              id="radio_rn"
              onChange={(e) => handleModeChange(e.target.value)}
            />
            <label htmlFor="radio_rn" style={{ paddingRight: "10px" }}>
              Switch
            </label>
            <input
              type="radio"
              name="game"
              value={Mode.BREEZY}
              checked={mode === Mode.BREEZY}
              id="radio_rb"
              onChange={(e) => handleModeChange(e.target.value)}
            />
            <label htmlFor="radio_rb">Switch (breezy)</label>
          </TableCell>
          <TableCell />
        </TableRow>
      </Table>
      <table className="header-table display-table first-table listing-table">
        <tbody>
          <tr className="name-row">
            <td className="tdLarge">Event</td>
            <td colSpan={3}>Mario</td>
            <td colSpan={3}>Mallow</td>
            <td colSpan={3}>Geno</td>
            <td colSpan={3}>Koopa</td>
            <td colSpan={3}>Peach</td>
            <td className="tdMid">EXPb</td>
            <td className="display-cell">Notes</td>
            <td className="tdSmall"></td>
            <td className="tdSmall"></td>
            <td className="tdSmall"></td>
            <td className="tdSmall"></td>
          </tr>
          <tr className="content-row">
            <td></td>
            <td className="tdXSmall">lv</td>
            <td className="tdXSmall">exp</td>
            <td className="tdXSmall">next</td>
            <td className="tdXSmall">lv</td>
            <td className="tdXSmall">exp</td>
            <td className="tdXSmall">next</td>
            <td className="tdXSmall">lv</td>
            <td className="tdXSmall">exp</td>
            <td className="tdXSmall">next</td>
            <td className="tdXSmall">lv</td>
            <td className="tdXSmall">exp</td>
            <td className="tdXSmall">next</td>
            <td className="tdXSmall">lv</td>
            <td className="tdXSmall">exp</td>
            <td className="tdXSmall">next</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <table className="event-list display-table listing-table">
        <tbody>
          {partyState.map((state: PartyState, idx: number) => {
            const marioLevel = getLevel(state[CharacterName.MARIO].exp);
            const prevMarioLevel =
              idx > 0
                ? getLevel(partyState[idx - 1][CharacterName.MARIO].exp)
                : 1;

            const mallowLevel = getLevel(state[CharacterName.MALLOW].exp);
            const prevMallowLevel =
              idx > 0
                ? getLevel(partyState[idx - 1][CharacterName.MALLOW].exp)
                : 1;

            const genoLevel = getLevel(state[CharacterName.GENO].exp);
            const prevGenoLevel =
              idx > 0
                ? getLevel(partyState[idx - 1][CharacterName.GENO].exp)
                : 1;

            const bowserLevel = getLevel(state[CharacterName.BOWSER].exp);
            const prevBowserLevel =
              idx > 0
                ? getLevel(partyState[idx - 1][CharacterName.BOWSER].exp)
                : 1;

            const peachLevel = getLevel(state[CharacterName.PEACH].exp);
            const prevPeachLevel =
              idx > 0
                ? getLevel(partyState[idx - 1][CharacterName.PEACH].exp)
                : 1;

            return (
              <tr className="content-row">
                {gameEvents[idx].type === EventType.PARTY && (
                  <td>
                    {state.partyCount === 2 && <span>Mallow joins</span>}
                    {state.partyCount === 3 && <span>Geno joins</span>}
                    {state.partyCount === 4 && <span>Bowser joins</span>}
                    {state.partyCount === 5 && <span>Peach joins</span>}
                  </td>
                )}
                {gameEvents[idx].type === EventType.FIGHT && (
                  <td>
                    Fight{" "}
                    {gameEvents[idx].enemies
                      ?.map((e) =>
                        mode === Mode.SNES
                          ? e.defn.name
                          : e.defn.switch_name || e.defn.name
                      )
                      .join(" + ")}{" "}
                    ({getFightExp(gameEvents[idx], mode)} exp ea.)
                  </td>
                )}
                {gameEvents[idx].type === EventType.STAR && (
                  <td>
                    {gameEvents[idx].star?.name} x{gameEvents[idx].hits} (
                    {gameEvents[idx].star?.exp} per hit,{" "}
                    {(gameEvents[idx].hits || 0) *
                      (gameEvents[idx].star?.exp || 0)}{" "}
                    exp ea.)
                  </td>
                )}
                <td>
                  {marioLevel > prevMarioLevel ? (
                    <b>{marioLevel}</b>
                  ) : (
                    marioLevel
                  )}
                </td>
                <td>{state[CharacterName.MARIO].exp}</td>
                <td>{expRemaining(state[CharacterName.MARIO].exp)}</td>
                {state.partyCount >= 2 ? (
                  <>
                    <td>
                      {mallowLevel > prevMallowLevel ? (
                        <b>{mallowLevel}</b>
                      ) : (
                        mallowLevel
                      )}
                    </td>
                    <td>{state[CharacterName.MALLOW].exp}</td>
                    <td>{expRemaining(state[CharacterName.MALLOW].exp)}</td>
                  </>
                ) : (
                  <>
                    <td />
                    <td />
                    <td />
                  </>
                )}
                {state.partyCount >= 3 ? (
                  <>
                    <td>
                      {genoLevel > prevGenoLevel ? (
                        <b>{genoLevel}</b>
                      ) : (
                        genoLevel
                      )}
                    </td>
                    <td>{state[CharacterName.GENO].exp}</td>
                    <td>{expRemaining(state[CharacterName.GENO].exp)}</td>
                  </>
                ) : (
                  <>
                    <td />
                    <td />
                    <td />
                  </>
                )}
                {state.partyCount >= 4 ? (
                  <>
                    <td>
                      {peachLevel > prevPeachLevel ? (
                        <b>{peachLevel}</b>
                      ) : (
                        peachLevel
                      )}
                    </td>
                    <td>{state[CharacterName.PEACH].exp}</td>
                    <td>{expRemaining(state[CharacterName.PEACH].exp)}</td>
                  </>
                ) : (
                  <>
                    <td />
                    <td />
                    <td />
                  </>
                )}
                {state.partyCount >= 5 ? (
                  <>
                    <td>
                      {bowserLevel > prevBowserLevel ? (
                        <b>{bowserLevel}</b>
                      ) : (
                        bowserLevel
                      )}
                    </td>
                    <td>{state[CharacterName.BOWSER].exp}</td>
                    <td>{expRemaining(state[CharacterName.BOWSER].exp)}</td>
                  </>
                ) : (
                  <>
                    <td />
                    <td />
                    <td />
                  </>
                )}
                <td>
                  {gameEvents[idx].type === EventType.PARTY
                    ? ""
                    : gameEvents[idx].booster || CharacterName.NONE}
                </td>
                <td>
                  {state.hitLevelups.map((arr, idx) => {
                    if (arr.length === 0) {
                      return "";
                    } else {
                      return (
                        <>
                          <span>
                            hit {idx + 1}: {arr.join(", ")}
                          </span>
                          <br />
                        </>
                      );
                    }
                  })}
                </td>
                <td>
                  {idx === 0 ? (
                    ""
                  ) : (
                    <button onClick={() => moveEventUp(idx)}>↑</button>
                  )}
                </td>
                <td>
                  {idx === gameEvents.length - 1 ? (
                    ""
                  ) : (
                    <button onClick={() => moveEventDown(idx)}>↓</button>
                  )}
                </td>
                <td>
                  <button onClick={() => removeEvent(idx)}>x</button>
                </td>
                <td>
                  <input
                    type="radio"
                    name="selectedEvent"
                    value={idx}
                    checked={eventIndex === idx}
                    onChange={() => setEventIndex(idx)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
