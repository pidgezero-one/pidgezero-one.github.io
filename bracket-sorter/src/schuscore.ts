import data from './ssdata.json';
import { SchuScore } from './types';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);


export const getSchuScoreFromName = (name: string, countryName?: string): SchuScore | undefined => {
	let v = data.tags.arrayValue.values.find((o: { stringValue: string }) => o.stringValue === name); // case-sensitive
	if (v === undefined) {
		v = data.tags.arrayValue.values.find((o: { stringValue: string }) => o.stringValue.toLocaleLowerCase() === name.toLocaleLowerCase());
	}
	if (v === undefined) {
		return undefined;
	}
	const index = data.tags.arrayValue.values.indexOf(v);
	if (index < 0) {
		return undefined;
	}

	if (countryName) {
		const countryCode = countries.getAlpha2Code(countryName, 'en')?.toLowerCase();
		if (countryCode) {
			const c = data.country_names.arrayValue.values.find((o: { stringValue: string }) => o.stringValue.toLocaleLowerCase() === countryCode);
			if (c !== undefined) {
				const i = data.country_names.arrayValue.values.indexOf(c)
				// Abort if the start.gg user's country doesn't match schustats' country
				if (parseInt(data.countries.arrayValue.values[index].integerValue) !== i) {
					return undefined
				}
			}
		}
	}
	return { score: data.ratings.arrayValue.values[index].doubleValue, place: index };
};