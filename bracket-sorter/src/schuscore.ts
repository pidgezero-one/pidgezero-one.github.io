import pit_data from './pointintime.json'
import region_data from './regional.json'
import alltime_data from './alltime.json'
import { SchuScore, RegionalSchuScore } from './types';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { Locale, Player } from '../src/types'

countries.registerLocale(enLocale);


const getCountryCodeFromName = (name: string): string | null => {
	const code = countries.getAlpha2Code(name, 'en');
	if (code) {
		return code?.toLowerCase()
	}
	return null;
}

const filterPIT = (name: string, data: any[], countryName?: string) => {
	let countryCode = undefined
	if (countryName) {
		countryCode = getCountryCodeFromName(countryName)
	}
	const exact = (o: { name: string, score: number, countryCode?: string }) => o.name === name && countryCode === o.countryCode
	const caseless = (o: { name: string, score: number, countryCode?: string }) => o.name.toLowerCase() === name.toLowerCase() && countryCode === o.countryCode
	let v = data.filter(exact);
	if (v?.length) {
		// man this is dumb
		const idx = data.indexOf(v.sort((x, y) => y.score - x.score)[0])
		return data[idx]
	}
	v = data.filter(caseless)
	if (v?.length) {
		const idx = data.indexOf(v.sort((x, y) => y.score - x.score)[0])
		return data[idx]
	}
	return
}
const filterRegional = (name: string, data: any[], countryName?: string, state?: string) => {
	let countryCode = undefined
	if (countryName) {
		countryCode = getCountryCodeFromName(countryName)
	}
	// probably don't want to match regional stats against players who we don't even know what country they're from, regional stats have the highest risk of name collision
	if (!countryCode) {
		return
	}
	// case sensitive name matching and state also matches
	const exact = (o: { name: string, score: number, locale: Locale }) => {
		if (o.locale?.country) {
			if (typeof o.locale.country === "string") {
				return countryCode === o.locale.country && (!!state && !!o.locale.states && o.locale.states.includes(state)) && o.name === name
			} else if (Array.isArray(o.locale.country)) {
				return o.locale.country.includes(countryCode) && (!!state && !!o.locale.states && o.locale.states.includes(state)) && o.name === name
			}
		}
		// players who were unparseable, leave out, too unreliable if can't match by country
		return false
	}
	// case insensitive name matching and state also matches
	const caseless = (o: { name: string, score: number, locale: Locale }) => {
		if (o.locale?.country) {
			if (typeof o.locale.country === "string") {
				return countryCode === o.locale.country && (!!state && !!o.locale.states && o.locale.states.includes(state)) && o.name.toLowerCase() === name.toLowerCase()
			} else if (Array.isArray(o.locale.country)) {
				return o.locale.country.includes(countryCode) && (!!state && !!o.locale.states && o.locale.states.includes(state)) && o.name.toLowerCase() === name.toLowerCase()
			}
		}
		// players who were unparseable, leave out, too unreliable if can't match by country
		return false
	}
	// case sensitive name matching, state match is unknown
	const cs_fuzzy = (o: { name: string, score: number, locale: Locale }) => {
		if (o.locale?.country) {
			if (typeof o.locale.country === "string") {
				return countryCode === o.locale.country && (!state || !o.locale.states) && o.name === name
			} else if (Array.isArray(o.locale.country)) {
				return o.locale.country.includes(countryCode) && (!state || !o.locale.states) && o.name === name
			}
		}
		// players who were unparseable, leave out, too unreliable if can't match by country
		return false
	}
	// case insensitive name matching, state match is unknown
	const ci_fuzzy = (o: { name: string, score: number, locale: Locale }) => {
		if (o.locale?.country) {
			if (typeof o.locale.country === "string") {
				return countryCode === o.locale.country && (!state || !o.locale.states) && o.name.toLowerCase() === name.toLowerCase()
			} else if (Array.isArray(o.locale.country)) {
				return o.locale.country.includes(countryCode) && (!state || !o.locale.states) && o.name.toLowerCase() === name.toLowerCase()
			}
		}
		// players who were unparseable, leave out, too unreliable if can't match by country
		return false
	}
	let v = data.filter(exact);
	if (v?.length) {
		// If this player is on multiple PRs, i.e. Canada and Alberta, choose whichever one their score is higher in
		const idx = data.indexOf(v.sort((x, y) => y.score - x.score)[0])
		return data[idx]
	}
	v = data.filter(caseless)
	if (v?.length) {
		const idx = data.indexOf(v.sort((x, y) => y.score - x.score)[0])
		return data[idx]
	}
	v = data.filter(cs_fuzzy)
	if (v?.length) {
		const idx = data.indexOf(v.sort((x, y) => y.score - x.score)[0])
		return data[idx]
	}
	v = data.filter(ci_fuzzy)
	if (v?.length) {
		const idx = data.indexOf(v.sort((x, y) => y.score - x.score)[0])
		return data[idx]
	}
	return
}

export const getSchuRegionalScore = (name: string, countryName?: string, state?: string): RegionalSchuScore | undefined => {
	const v = filterRegional(name, region_data, countryName, state) as Player | undefined
	if (!v) {
		return undefined
	}
	return { score: v.score, place: v.place, region: v.region };
}

export const getSchuPointInTimeScore = (name: string, countryName?: string): SchuScore | undefined => {
	const v = filterPIT(name, pit_data, countryName) as { name: string; score: number; countryCode: string; } | undefined
	if (!v) {
		return undefined
	}
	const index = pit_data.indexOf(v);
	if (index < 0) {
		return undefined;
	}
	return { score: v.score, place: index };
}

export const getSchuAllTimeScore = (name: string, countryName?: string): SchuScore | undefined => {
	const v = filterPIT(name, alltime_data, countryName) as { name: string; score: number; countryCode: string; } | undefined
	if (!v) {
		return undefined
	}
	const index = alltime_data.indexOf(v);
	if (index < 0) {
		return undefined;
	}
	return { score: v.score, place: index };
}