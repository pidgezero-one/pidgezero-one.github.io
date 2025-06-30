import { DateTime } from "luxon";
import { Shift } from "./types";

export const roundDownToHour = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
}

export const roundUpToHour = (date: Date): Date => {
    const needsRounding = date.getMinutes() > 0 || date.getSeconds() > 0 || date.getMilliseconds() > 0;
    if (!needsRounding) return new Date(date); // already on the hour
    const d = new Date(date);
    d.setHours(d.getHours() + 1, 0, 0, 0);
    return d;
}

export const parseGoogleDateInESTZone = (value: string): Date | undefined => {
    const match = value.match(/^Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)$/);
    if (!match) return;

    const [_, year, month, day, hour, minute, second] = match.map(Number);
    const dt = DateTime.fromObject(
        {
            year,
            month: month + 1,
            day,
            hour,
            minute,
            second,
        },
        {
            zone: "America/Toronto",
        }
    );
    return dt.toUTC().toJSDate();
};

export const toUserLocaleString = (utcDate: Date): string =>
    DateTime
        .fromJSDate(utcDate, { zone: 'local' })
        .toFormat("ccc LLL dd - h:mm a - z");


export const toUserLocaleStringTimeOnly = (utcDate: Date): string =>
    DateTime
        .fromJSDate(utcDate, { zone: 'local' })
        .toFormat("h:mm a");

export const toUserLocaleStringTimeRange = (utcDate: Date, utcDate2: Date): string =>
    `${DateTime
        .fromJSDate(utcDate, { zone: 'local' })
        .toFormat("ccc LLL dd, h:mm a")} - ${DateTime
            .fromJSDate(utcDate2, { zone: 'local' })
            .toFormat("h:mm a")}`;

export const formatTimeDifference = (start: Date, end: Date): string => {
    const diffMs = Math.abs(end.getTime() - start.getTime());
    return timeAsHoursAndMinutes(diffMs)
}

export const totalShiftTime = (shifts: Shift[]): number => {
    return shifts.reduce((acc, curr) => acc + (curr.end.getTime() - curr.start.getTime()), 0)
}

export const timeAsHoursAndMinutes = (ms: number) => {
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours ? `${hours}h` : ''}${minutes}m`;
}