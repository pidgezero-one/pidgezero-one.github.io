import { parseGoogleDateInESTZone, roundDownToHour, roundUpToHour } from "./TimeUtils";
import { Person, Run, SheetData, Shift, ShiftType } from "./types";

const sameTypes = (a: ShiftType[], b: ShiftType[]): boolean => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, i) => val === sortedB[i]);
};

const sanitizeShifts = (shifts: Shift[]): Shift[] => {
    const result: Shift[] = [];

    const shiftsByPerson = new Map<number, Shift[]>();
    for (const shift of shifts) {
        if (!shiftsByPerson.has(shift.personID)) shiftsByPerson.set(shift.personID, []);
        shiftsByPerson.get(shift.personID)!.push(shift);
    }

    for (const [personID, personShifts] of shiftsByPerson) {
        const timePoints = new Set<number>();
        personShifts.forEach(shift => {
            timePoints.add(shift.start.getTime());
            timePoints.add(shift.end.getTime());
        });

        const sortedTimes = Array.from(timePoints).sort((a, b) => a - b);
        for (let i = 0; i < sortedTimes.length - 1; i++) {
            const start = new Date(sortedTimes[i]);
            const end = new Date(sortedTimes[i + 1]);

            const activeShifts = personShifts.filter(s => s.start <= start && s.end > start);
            const activeTypes = activeShifts.flatMap(s => s.types);
            const uniqueTypes = Array.from(new Set(activeTypes)).sort();

            if (uniqueTypes.length === 0) continue;

            const activeRuns = Array.from(
                new Set(
                    activeShifts.flatMap(s => s.runs ?? [])
                )
            );

            const last = result[result.length - 1];
            if (
                last &&
                last.personID === personID &&
                last.end.getTime() === start.getTime() &&
                sameTypes(last.types, uniqueTypes)
            ) {
                last.end = end;
                last.runs = Array.from(new Set([...(last.runs ?? []), ...activeRuns]));
            } else {
                result.push({ start, end, personID, types: uniqueTypes, runs: activeRuns });
            }
        }
    }

    return result;
};

export const developSchedule = (data: SheetData): { runs: Run[], shifts: Shift[] } => {
    const getPersonByName = (name: string) => data?.people.find(p => p.aliases.map(a => a.toLocaleLowerCase()).includes(name.toLocaleLowerCase()))

    const parsePeople = (raw: string): Person[] => raw.split(/,\s*/g).map(n => getPersonByName(n)).filter(p => !!p)

    // parse main schedule shifts
    let endFound = false
    let rawShifts: Shift[] = []
    let runs: Run[] = []
    for (let i = 0; i < data.main.table.rows.length; i++) {
        const row = data.main.table.rows[i]
        if (endFound) continue;
        if (!row.c || !row.c[0]?.v) {
            console.error(row)
            continue
        };
        const nextRow = data.main.table.rows[i + 1]
        if (!nextRow?.c[0] || !nextRow.c[0]?.v) {
            endFound = true
            continue;
        }
        const startTime = parseGoogleDateInESTZone(row.c[0].v)
        const endTime = parseGoogleDateInESTZone(nextRow.c[0].v)
        if (!startTime || !endTime) {
            console.error(row, nextRow)
            continue
        }
        const runners = parsePeople(row.c[4]?.v ?? "")
        if (runners.length === 0 || !row.c[1]?.v) { // offline
            continue
        }
        const commentators = parsePeople(row.c[5]?.v ?? "")
        const hosts = parsePeople(row.c[6]?.v ?? "")
        const preflighters = parsePeople(row.c[8]?.v ?? "")
        runs.push({
            id: i,
            start: startTime,
            end: endTime,
            name: row.c[1].v
        })
        runners.forEach(runner => {
            rawShifts.push({
                start: startTime,
                end: endTime,
                personID: runner.id,
                types: ['Runner'],
                runs: [i]
            })
        })
        commentators.forEach(commentator => {
            rawShifts.push({
                start: startTime,
                end: endTime,
                personID: commentator.id,
                types: ['Commentary'],
                runs: [i]
            })
        })
        hosts.forEach(host => {
            rawShifts.push({
                start: startTime,
                end: endTime,
                personID: host.id,
                types: ['Host'],
                runs: [i]
            })
        })
        preflighters.forEach(preflighter => {
            rawShifts.push({
                start: new Date(startTime.getTime() - 30 * 60 * 1000),
                end: startTime,
                personID: preflighter.id,
                types: ['Preflight'],
                runs: [i]
            })
        })
    }
    endFound = false
    // parse social shifts
    for (let i = 0; i < data.social.table.rows.length; i++) {
        const row = data.social.table.rows[i]
        if (endFound) continue;
        if (!row.c || !row.c[0]?.v) {
            console.error(row)
            continue
        };
        const nextRow = data.social.table.rows[i + 1]
        if (!nextRow?.c[0] || !nextRow.c[0]?.v) {
            endFound = true
            continue;
        }
        const startTime = parseGoogleDateInESTZone(row.c[0].v)
        const endTime = parseGoogleDateInESTZone(nextRow.c[0].v)
        if (!startTime || !endTime) {
            console.error(row, nextRow)
            continue
        }
        const socials = parsePeople(row.c[1]?.v ?? "")
        socials.forEach(volunteer => {
            rawShifts.push({
                start: startTime,
                end: endTime,
                personID: volunteer.id,
                types: ['Socials'],
                runs: runs.filter(r =>
                    (r.start.getTime() >= startTime.getTime() && r.end.getTime() <= endTime.getTime()) ||
                    (r.start.getTime() >= startTime.getTime() && r.start.getTime() <= endTime.getTime()) ||
                    (r.end.getTime() >= startTime.getTime() && r.end.getTime() <= endTime.getTime())
                ).map(r => r.id)
            })
        })
    }
    endFound = false
    // parse restreamer shifts
    for (let i = 0; i < data.resteamer.table.rows.length; i++) {
        const row = data.resteamer.table.rows[i]
        if (endFound) continue;
        if (!row.c || !row.c[0]?.v) {
            console.error(row)
            continue
        };
        const nextRow = data.resteamer.table.rows[i + 1]
        if (!nextRow?.c[0] || !nextRow.c[0]?.v) {
            endFound = true
            continue;
        }
        const startTime = parseGoogleDateInESTZone(row.c[0].v)
        const endTime = parseGoogleDateInESTZone(nextRow.c[0].v)
        if (!startTime || !endTime) {
            console.error(row, nextRow)
            continue
        }
        const restreamers = parsePeople(row.c[1]?.v ?? "")
        restreamers.forEach(volunteer => {
            rawShifts.push({
                start: startTime,
                end: endTime,
                personID: volunteer.id,
                types: ['Restream'],
                runs: runs.filter(r =>
                    (r.start.getTime() >= startTime.getTime() && r.end.getTime() <= endTime.getTime()) ||
                    (r.start.getTime() >= startTime.getTime() && r.start.getTime() <= endTime.getTime()) ||
                    (r.end.getTime() >= startTime.getTime() && r.end.getTime() <= endTime.getTime())
                ).map(r => r.id)
            })
        })
    }
    endFound = false
    // parse valk on duty shifts
    for (let i = 0; i < data.onDuty.table.rows.length; i++) {
        const row = data.onDuty.table.rows[i]
        if (endFound) continue;
        if (!row.c || !row.c[0]?.v) {
            console.error(row)
            continue
        };
        const nextRow = data.onDuty.table.rows[i + 1]
        if (!nextRow?.c[0] || !nextRow.c[0]?.v) {
            endFound = true
            continue;
        }
        const startTime = parseGoogleDateInESTZone(row.c[0].v)
        const endTime = parseGoogleDateInESTZone(nextRow.c[0].v)
        if (!startTime || !endTime) {
            console.error(row, nextRow)
            continue
        }
        const valks = parsePeople(row.c[1]?.v ?? "")
        valks.forEach(onDuty => {
            rawShifts.push({
                start: startTime,
                end: endTime,
                personID: onDuty.id,
                types: ['Valk on Duty'],
                runs: runs.filter(r =>
                    (r.start.getTime() >= startTime.getTime() && r.end.getTime() <= endTime.getTime()) ||
                    (r.start.getTime() >= startTime.getTime() && r.start.getTime() <= endTime.getTime()) ||
                    (r.end.getTime() >= startTime.getTime() && r.end.getTime() <= endTime.getTime())
                ).map(r => r.id)
            })
        })
    }
    return { runs, shifts: sanitizeShifts(rawShifts) }
}


export const getGapBlocks = (shifts: Shift[]): { start: Date; end: Date }[] => {
    if (shifts.length === 0) return [];

    const earliest = roundDownToHour(new Date(Math.min(...shifts.map(s => s.start.getTime()))));
    const latest = roundUpToHour(new Date(Math.max(...shifts.map(s => s.end.getTime()))));

    const rawGaps: { start: Date; end: Date }[] = [];

    let cursor = new Date(earliest);
    while (cursor < latest) {
        const next = new Date(cursor.getTime() + 60 * 60 * 1000); // +1 hour
        const hasShift = shifts.some(s => s.start < next && s.end > cursor);

        if (!hasShift) {
            rawGaps.push({ start: new Date(cursor), end: next });
        }

        cursor = next;
    }

    // ✅ Consolidate contiguous gaps
    const consolidated: { start: Date; end: Date }[] = [];
    for (const gap of rawGaps) {
        const last = consolidated[consolidated.length - 1];
        if (last && last.end.getTime() === gap.start.getTime()) {
            // Extend previous block
            last.end = gap.end;
        } else {
            consolidated.push({ ...gap });
        }
    }

    return consolidated;
}

export const getShiftPixelOffsets = (schedule: Shift[], index: number): { offset: number, width: number } => {
    const eventStart = roundDownToHour(new Date(Math.min(...schedule.map(shift => shift.start.getTime()))))
    const gaps = getGapBlocks(schedule)

    const shift = schedule[index]
    const hoursElapsed = (shift.start.getTime() - eventStart.getTime()) / (1000 * 60 * 60)
    const gapsPassed = gaps.filter(gap => gap.end.getTime() <= shift.start.getTime())
    const hoursInPassedGaps = gapsPassed.reduce((accumulator, currentValue) => accumulator + ((currentValue.end.getTime() - currentValue.start.getTime()) / (1000 * 60 * 60)), 0)
    const hoursElapsedWithConsolidatedOfflineBreaks = hoursElapsed - hoursInPassedGaps + gapsPassed.length

    const width = (shift.end.getTime() - shift.start.getTime()) / (1000 * 60 * 60) // 100 px per hour

    return { offset: hoursElapsedWithConsolidatedOfflineBreaks, width }
}

export const getBlocks = (schedule: Shift[]): Date[] => {
    const eventStart = roundDownToHour(new Date(Math.min(...schedule.map(shift => shift.start.getTime()))))
    const eventEnd = roundUpToHour(new Date(Math.max(...schedule.map(shift => shift.end.getTime()))))
    const gaps = getGapBlocks(schedule)

    let blocks: Date[] = [];
    let hours = eventStart.getTime()
    while (hours <= eventEnd.getTime()) {
        blocks.push(new Date(hours))
        hours += (1000 * 60 * 60)
        const gap = gaps.find(gap => gap.start.getTime() < hours && gap.end.getTime() > hours)
        if (gap) {
            hours = gap.end.getTime()
        }
    }
    return blocks
}

const shiftBackgroundColour = (type: ShiftType): string => {
    switch (type) {
        case 'Valk on Duty':
            return "rgb(244 56 153)"
        case 'Runner':
            return "#5de241"
        case 'Commentary':
            return "#ffe599"
        case 'Host':
            return "#d987fa"
        case 'Preflight':
            return "#f36f55"
        case 'Socials':
            return "rgb(244 187 28)"
        case "Restream":
            return "#63b8ec"
    }
}

export const getShiftTypeBackground = (types: ShiftType[]): string => {
    if (types.length === 0) { return "" }
    if (types.length === 1) {
        return shiftBackgroundColour(types[0])
    }
    const interval = 100 / (types.length - 1)
    const gradient = types.map((t, index) => {
        if (index === 0) {
            return `${shiftBackgroundColour(t)} 0%`
        }
        return `${shiftBackgroundColour(t)} ${interval * index}%`
    })
    return `linear-gradient(to bottom, ${gradient.join(",")})`
}