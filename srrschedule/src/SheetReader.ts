import { APIResponse, Person, SheetData } from "./types";

const SHEET_ID = "1wEE1T5w-i_yEedYGAbdYFqliHbEyVH9KH0WDTeQNEOk"
const MAIN_SCHEDULE_GID = "2012366791"
const SOCIAL_GID = "1504143108"
const ON_DUTY_GID = "1372506750"
const PEOPLE_GID = "2075347063"
const RESTREAMER_GID = "1624049637"

const apiURL = (gid: string): string => `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${gid}`
const MAIN_SCHEDULE_API = apiURL(MAIN_SCHEDULE_GID)
const SOCIAL_API = apiURL(SOCIAL_GID)
const ON_DUTY_API = apiURL(ON_DUTY_GID)
const PEOPLE_API = apiURL(PEOPLE_GID)
const RESTREAMER_API = apiURL(RESTREAMER_GID)

export const getSheet = async (url: string): Promise<APIResponse> => {
    const res = await fetch(url);
    const plainText = await res.text();
    const noComments = plainText.replace(/\/\*[\s\S]*?\*\//g, '').trim();

    const jsonString = noComments
        .replace(/^google\.visualization\.Query\.setResponse\(/, '')
        .replace(/\);?\s*$/, '');
    return JSON.parse(jsonString)
};

const valks = ["caeshura", "Demerine", "dijonketchup", "Dravenheart", "Garbi", "KaguyaNicky", "leggystarscream", "Margaret Ann", "Netara", "pidgezero_one", "Sparkover", "sylverfyre", "theRPGchick", "tinahacks"].map(n => n.toLocaleLowerCase())

export const getPeople = (data: APIResponse): Person[] => data.table.rows.slice(1).map((row, rowIndex) => {
    const aliases = row.c.slice(0, 4).
        filter(c => c !== null).
        map(c => c.v)

    return (
        {
            id: rowIndex,
            aliases,
            valk: valks.filter(v => aliases.map(a => a.toLocaleLowerCase()).includes(v)).length > 0
        }
    )
}).sort((a, b) => {
    if (a.valk !== b.valk) {
        return a.valk ? -1 : 1;
    }
    return a.aliases[0].toLocaleLowerCase().localeCompare(
        b.aliases[0].toLocaleLowerCase()
    );
});

export const fetchData = async () => {
    const mainSchedule = await getSheet(MAIN_SCHEDULE_API)
    const socialSchedule = await getSheet(SOCIAL_API)
    const onDutySchedule = await getSheet(ON_DUTY_API)
    const peopleJSON = await getSheet(PEOPLE_API)
    const restreamerSchedule = await getSheet(RESTREAMER_API)
    return {
        main: mainSchedule,
        social: socialSchedule,
        onDuty: onDutySchedule,
        resteamer: restreamerSchedule,
        people: getPeople(peopleJSON),
    } as SheetData
}