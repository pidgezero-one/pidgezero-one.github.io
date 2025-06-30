import React, { useState, useEffect } from "react";
import "./App.css";
import { Person, Run, Shift } from "./types";
import { fetchData } from "./SheetReader";
import { developSchedule, getBlocks, getGapBlocks, getShiftPixelOffsets, getShiftTypeBackground } from "./ScheduleCalcs";
import { formatTimeDifference, roundDownToHour, roundUpToHour, timeAsHoursAndMinutes, totalShiftTime, toUserLocaleString, toUserLocaleStringTimeOnly, toUserLocaleStringTimeRange } from "./TimeUtils";
import valkIcon from "./valk.png"
import { DateTime } from "luxon";

const PIXELS_PER_HOUR = 150
const NAME_WIDTH = 200

const App = () => {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [runs, setRuns] = useState<Run[]>([])
  const [people, setPeople] = useState<Person[]>([])
  const [showPerson, setShowPerson] = useState<Person | undefined>()

  const handleChangeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowPerson(people.find(p => p.id === parseInt(e.target.value)))
  };

  const eventStart = roundDownToHour(new Date(Math.min(...shifts.map(shift => shift.start.getTime()))))
  const eventEnd = roundUpToHour(new Date(Math.max(...shifts.map(shift => shift.end.getTime()))))
  const eventLength = Math.round((eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60))
  const gaps = getGapBlocks(shifts)

  const setSchedule = async () => {
    const data = await fetchData()

    const sched = developSchedule(data)

    setShifts(sched.shifts)
    setPeople(data.people)
    setRuns(sched.runs)
  }

  useEffect(() => {
    let interval;

    setSchedule();
    interval = setInterval(setSchedule, 10000);
    return () => clearInterval(interval);
  }, []);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const totalWidthInHours = eventLength - gaps.reduce((accumulator, currentValue) => accumulator + ((currentValue.end.getTime() - currentValue.start.getTime()) / (1000 * 60 * 60) - 1), 0)
  const tableWidth = totalWidthInHours * PIXELS_PER_HOUR + NAME_WIDTH

  const shownPeople = people.filter(p => !showPerson || showPerson.id === p.id).filter(p => shifts.filter(shift => shift.personID === p.id).length > 0)

  const [hoveredShift, setHoveredShift] = useState<Shift | null>(null);
  const [hoveredPerson, setHoveredPerson] = useState<Person | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const Popover = ({ shift, person }: { shift: Shift, person: Person }) => {
    const scheduledRuns = shift.runs?.map(runID => runs.find(r => r.id === runID)).filter(r => !!r) ?? []
    return (
      <div
        style={{
          background: "white",
          border: "1px solid black",
          padding: "5px",
          zIndex: 9999,
          pointerEvents: "auto",
          fontSize: "0.75rem"
        }}
        onMouseLeave={() => {
          setHoveredShift(null);
          setHoveredPerson(null);
        }}
      >
        <div><strong>{person.aliases[0]}</strong></div>
        <div>{shift.types.join("/")}</div>
        <div style={{paddingTop: "5px"}}>{toUserLocaleString(shift.start)}</div>
        <div>to</div>
        <div>{toUserLocaleString(shift.end)}</div>
        <div>({formatTimeDifference(shift.start, shift.end)})</div>
        <div style={{paddingTop: "5px", fontWeight: 500}}>Runs:</div>
        {scheduledRuns?.map(run => <div style={{fontStyle: "italic"}}>{run.name}</div>)}
      </div>
    );
  };



  return <>
    {
      shifts.length === 0 ? "loading..." :
        <div style={{ height: "100vh", width: "100vw", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ flexShrink: 0, height: 30, padding: "5px", width: "100%", display: "flex", gap: "5px", alignItems: "center", borderBottom: "2px solid #000" }}>
            <select
              value={showPerson?.id}
              onChange={handleChangeDropdown}
              style={{ width: "195px" }}
            >
              <option value="-1">(everybody)</option>
              {
                people.map(p => <option value={p.id}>{p.aliases[0]}</option>)
              }
            </select>
            <span>All times are shown in your detected timezone ({timezone})</span>
          </div>
          <div style={{ flexGrow: showPerson ? undefined : 1, fontSize: "0.75rem", overflow: "scroll" }}>

            <div style={{ width: tableWidth, display: "block", height: "fit-content", position: "relative", minHeight: showPerson ? 300 : undefined }}>
              <div style={{ zIndex: -1, position: "absolute", left: NAME_WIDTH, display: "flex", width: `${totalWidthInHours * PIXELS_PER_HOUR}px`, height: showPerson ? "300px" : "100%", overflowX: "hidden" }}>
                <div style={{ display: "flex", width: `${totalWidthInHours * PIXELS_PER_HOUR + 200}px`, height: showPerson ? "300px" : "100%" }}>
                  {
                    getBlocks(shifts).map(shift =>
                      <div style={{ width: PIXELS_PER_HOUR, boxSizing: "border-box", borderRight: "1px solid #000", position: "relative", overflow: "hidden" }}>
                        {Array.from({ length: 10 }, (_, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                position: "absolute",
                                left: `-95px`,
                                top: `${110 + i * 300}px`,
                                transform: "rotate(90deg)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {toUserLocaleString(shift)}
                            </div>
                          );
                        })}
                      </div>
                    )
                  }
                </div>
              </div>

              {shownPeople.map((person, personIndex) =>
                <div style={{ width: "100%", display: "flex", position: "relative", height: showPerson ? "300px" : undefined }}>
                  <div style={{ zIndex: 100000, position: "sticky", left: 0, display: "flex", width: `${NAME_WIDTH}px`, height: showPerson ? "100%" : "30px", borderBottom: "5px solid rgba(255, 255, 255, 0.6)", whiteSpace: "nowrap", borderRight: "1px solid #000" }}>
                    <div style={{ width: "100%", display: 'flex', background: personIndex % 2 === 0 ? "#ddddff" : "#c9c9ff", fontWeight: "bold", alignItems: 'center', textAlign: "right", padding: "0 5px 0 5px", height: "100%", justifyContent: 'flex-end', gap: '2px' }}>{person.valk && <img src={valkIcon} />}<span>{person.aliases[0]}</span></div>
                  </div>
                  <div style={{ display: "flex", verticalAlign: "middle", height: "30px", borderBottom: "5px solid rgba(255, 255, 255, 0.6)" }}>
                    <div style={{ position: "relative", width: `${totalWidthInHours * PIXELS_PER_HOUR}px`, height: "100%", background: personIndex % 2 === 0 ? "rgba(220, 220, 220, 0.6)" : "rgba(180, 180, 180, 0.6)" }}>
                      {shifts.filter(shift => shift.personID === person.id).sort((a, b) => a.start.getTime() - b.start.getTime()).map(shift => {
                        const dimensions = getShiftPixelOffsets(shifts, shifts.indexOf(shift))
                        return <div style={{ position: "absolute", left: `${dimensions.offset * PIXELS_PER_HOUR}px`, top: 0, height: "100%", width: `${dimensions.width * PIXELS_PER_HOUR}px`, background: getShiftTypeBackground(shift.types), whiteSpace: 'nowrap', boxSizing: "border-box", overflow: "hidden" }}
                          onMouseEnter={(e) => {
                            setHoveredShift(shift);
                            setHoveredPerson(person);
                            setPopoverPos({ x: e.clientX + 10, y: e.clientY + 10 });
                          }}
                          onMouseLeave={() => {
                            setTimeout(() => {
                              if (!document.querySelector(":hover")?.closest(".popover")) {
                                setHoveredShift(null);
                                setHoveredPerson(null);
                              }
                            }, 10);
                          }}>
                          <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", padding: "0 5px" }}>
                            {shift.types.join(", ")} ({DateTime
                              .fromJSDate(shift.start, { zone: 'local' })
                              .toFormat("ccc")} {toUserLocaleStringTimeOnly(shift.start)} - {toUserLocaleStringTimeOnly(shift.end)})
                          </div>
                        </div>
                      }
                      )}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          {showPerson ? <div>
            <div style={{ fontWeight: "bold", padding: "5px 0" }}>Total shift time: {timeAsHoursAndMinutes(totalShiftTime(shifts.filter(shift => shift.personID === showPerson.id)))}</div>
            {shifts.filter(shift => shift.personID === showPerson.id).sort((a, b) => a.start.getTime() - b.start.getTime()).map(shift => {
              const scheduledRuns = shift.runs?.map(runID => runs.find(r => r.id === runID)).filter(r => !!r) ?? []
              return <div style={{ display: "flex", gap: "5", alignItems: "center" }}>
                <div style={{ height: 16, width: 16, display: "block", background: getShiftTypeBackground(shift.types) }}></div>
                <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", padding: "0 5px" }}>
                  <span style={{ fontWeight: "500" }}>{shift.types.join(", ")}</span>&nbsp;- {toUserLocaleStringTimeRange(shift.start, shift.end)}&nbsp;<span style={{ fontSize: "0.75rem", color: "#666" }}>({formatTimeDifference(shift.start, shift.end)}) ({scheduledRuns?.map(run => run.name).join(", ")})</span>
                </div>
              </div>
            })}
          </div> : <></>}
          {hoveredShift && hoveredPerson && (
            <div
              className="popover"
              style={{
                position: "fixed", left: popoverPos.x, top: popoverPos.y,
              }}
              onMouseLeave={() => {
                setHoveredShift(null);
                setHoveredPerson(null);
              }}
            >
              <Popover shift={hoveredShift} person={hoveredPerson} />
            </div>
          )}
        </div>
    }
  </>
}

export default App;