import { useState } from "react";
import { Table, TableCell, TableRow } from "./components";
import {
  AppState,
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
  const [eventIndex, setEventIndex] = useState<number>(-1);

  const [appState, setAppState] = useState<AppState>(AppState.WORK);

  const [tempImport, setTempImport] = useState<string>("");
  const [importErrorState, setImportErrorState] = useState<string>("");

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
  const handleImportCode = () => {
    try {
      const j = JSON.parse(tempImport) as {
        mode: Mode;
        gameEvents: GameEvent[];
      };
      setGameEvents(j.gameEvents as GameEvent[]);
      selectMode(j.mode as Mode);
      handleCloseImportModal();
    } catch (e) {
      setImportErrorState(`could not parse json: ${e}`);
    }
  };
  const handleCloseImportModal = () => {
    setAppState(AppState.WORK);
    setTempImport("");
    setImportErrorState("");
  };

  const moveEventUp = (index: number) => {
    if (index === 0) {
      return;
    }
    const item1 = gameEvents[index - 1];
    const item2 = gameEvents[index];
    const remainder = index > 1 ? [...gameEvents.slice(0, index - 1)] : [];
    setGameEvents([...remainder, item2, item1, ...gameEvents.slice(index + 1)]);
  };
  const moveEventDown = (index: number) => {
    if (index === gameEvents.length - 1) {
      return;
    }
    const item1 = gameEvents[index];
    const item2 = gameEvents[index + 1];
    const remainder =
      index < gameEvents.length - 2 ? [...gameEvents.slice(index + 2)] : [];
    setGameEvents([...gameEvents.slice(0, index), item2, item1, ...remainder]);
  };

  const removeEvent = (index: number) => {
    setGameEvents([
      ...gameEvents.slice(0, index),
      ...gameEvents.slice(index + 1),
    ]);
    if (eventIndex >= gameEvents.length - 1) {
      setEventIndex(gameEvents.length - 2);
    }
  };

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
    setGameEvents([
      ...gameEvents.slice(0, eventIndex + 1),
      e,
      ...gameEvents.slice(eventIndex + 1),
    ]);
    setEventIndex(eventIndex + 1);
    setEnemiesInProgress([]);
  };

  const getPartyState = (idx: number) => {
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
        totalExp = getFightExp(ev_, mode, party.partyCount);
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
  };

  return (
    <>
      {appState === AppState.EXPORT && (
        <>
          <div>
            Copy and paste this code and save it somewhere like a notepad file.
            You can paste it into this calculator later to resume where you left
            off.
          </div>
          <textarea rows={20} contentEditable={false} style={{ width: "80%" }}>
            {JSON.stringify({ mode, gameEvents })}
          </textarea>
          <div>
            <button onClick={() => setAppState(AppState.WORK)}>Close</button>
          </div>
        </>
      )}
      {appState === AppState.IMPORT && (
        <>
          <div>
            If you've saved exported code from a previous session, paste it here
            and click "Apply" to load it. (Any current data in the calculator
            right now will be lost.)
            <br />
            Be careful not to paste any incorrect JSON as it may crash the page,
            only use JSON that you've exported from this tool without manual
            editing.
          </div>
          <textarea
            rows={20}
            style={{ width: "80%" }}
            onChange={(e) => setTempImport(e.target.value)}
          />
          <div>
            <button onClick={handleImportCode}>Apply</button>
          </div>
          {importErrorState !== "" && (
            <div style={{ color: "red" }}>{importErrorState}</div>
          )}
          <div>
            <button
              onClick={handleCloseImportModal}
              style={{ marginTop: "50px" }}
            >
              Close
            </button>
          </div>
        </>
      )}
      {appState === AppState.WORK && (
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
                          <optgroup
                            id="bosses"
                            label="Bosses or required fights:"
                          >
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
                          onChange={(e) =>
                            setStarHits(parseInt(e.target.value))
                          }
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
                            setExpBoosterCharacter(
                              e.target.value as CharacterName
                            )
                          }
                          value={expBoosterCharacter}
                        >
                          <option>{CharacterName.NONE}</option>
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
                                mode !== Mode.SNES && ep.special
                                  ? " (spec.)"
                                  : ""
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
              <TableCell>
                <button
                  className="importExportButton"
                  style={{ marginRight: "2.5%" }}
                  onClick={() => setAppState(AppState.IMPORT)}
                >
                  Import
                </button>
                <button
                  className="importExportButton"
                  style={{ marginLeft: "2.5%" }}
                  onClick={() => setAppState(AppState.EXPORT)}
                >
                  Export
                </button>
              </TableCell>
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
              {gameEvents.map((e, idx) => {
                const state = getPartyState(idx);
                const prevState = idx > 0 ? getPartyState(idx - 1) : state;
                const marioLevel = getLevel(state[CharacterName.MARIO].exp);
                const prevMarioLevel =
                  idx > 0 ? getLevel(prevState[CharacterName.MARIO].exp) : 1;

                const mallowLevel = getLevel(state[CharacterName.MALLOW].exp);
                const prevMallowLevel =
                  idx > 0 ? getLevel(prevState[CharacterName.MALLOW].exp) : 1;

                const genoLevel = getLevel(state[CharacterName.GENO].exp);
                const prevGenoLevel =
                  idx > 0 ? getLevel(prevState[CharacterName.GENO].exp) : 1;

                const bowserLevel = getLevel(state[CharacterName.BOWSER].exp);
                const prevBowserLevel =
                  idx > 0 ? getLevel(prevState[CharacterName.BOWSER].exp) : 1;

                const peachLevel = getLevel(state[CharacterName.PEACH].exp);
                const prevPeachLevel =
                  idx > 0 ? getLevel(prevState[CharacterName.PEACH].exp) : 1;

                return (
                  <tr className="content-row">
                    {e.type === EventType.PARTY && (
                      <td>
                        {state.partyCount === 2 && <span>Mallow joins</span>}
                        {state.partyCount === 3 && <span>Geno joins</span>}
                        {state.partyCount === 4 && <span>Bowser joins</span>}
                        {state.partyCount === 5 && <span>Peach joins</span>}
                      </td>
                    )}
                    {e.type === EventType.FIGHT && (
                      <td>
                        Fight{" "}
                        {e.enemies
                          ?.map((e) =>
                            mode === Mode.SNES
                              ? e.defn.name
                              : e.defn.switch_name || e.defn.name
                          )
                          .join(" + ")}{" "}
                        ({getFightExp(e, mode, state.partyCount)} exp ea.)
                      </td>
                    )}
                    {e.type === EventType.STAR && (
                      <td>
                        {e.star?.name} x{e.hits} ({e.star?.exp} per hit,{" "}
                        {(e.hits || 0) * (e.star?.exp || 0)} exp ea.)
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
                      {e.type === EventType.PARTY
                        ? ""
                        : e.booster || CharacterName.NONE}
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
      )}
    </>
  );
}

export default App;
