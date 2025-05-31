import alltime_data from './ssdata.json';
import pit_data from './pointintime.json'
import region_data from './regional.json'
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
	const exact = (o: { name: string, score: number, locale: Locale }) => o.name === name && (typeof o.locale.country === "string" ? countryCode === o.locale.country : Array.isArray(o.locale.country) ? o.locale.country.includes(countryCode) : false) && (state && o.locale.states?.length ? o.locale.states.includes(state) : true)
	const caseless = (o: { name: string, score: number, locale: Locale }) => o.name.toLowerCase() === name.toLowerCase() && (typeof o.locale.country === "string" ? countryCode === o.locale.country : Array.isArray(o.locale.country) ? o.locale.country.includes(countryCode) : false) && (state && o.locale.states?.length ? o.locale.states.includes(state) : true)
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


export const getSchuAllTimeScoreFromName = (name: string, countryName?: string): SchuScore | undefined => {

	const exact = (o: { stringValue: string }) => o.stringValue === name
	const caseless = (o: { stringValue: string }) => o.stringValue.toLowerCase() === name.toLowerCase()
	const tags = alltime_data.tags.arrayValue.values
	let v = undefined;
	let mc = tags.filter(exact);
	let place;
	if (mc?.length) {
		place = tags.indexOf(mc[0])
		v = tags[place]
	}
	if (!v) {
		mc = tags.filter(caseless)
		if (mc?.length) {
			place = tags.indexOf(mc[0])
			v = tags[place]
		}
	}
	if (!v || place === undefined) {
		return undefined
	}

	const cnames = alltime_data.country_names.arrayValue.values

	if (countryName) {
		const countryCode = getCountryCodeFromName(countryName);
		if (countryCode) {
			const c = cnames.find((o: { stringValue: string }) => o.stringValue.toLocaleLowerCase() === countryCode);
			if (c !== undefined) {
				const i = cnames.indexOf(c)
				// Abort if the start.gg user's country doesn't match schustats' country
				if (parseInt(alltime_data.countries.arrayValue.values[place].integerValue) !== i) {
					return undefined
				}
			}
		}
	}
	return { score: alltime_data.ratings.arrayValue.values[place].doubleValue, place };
};