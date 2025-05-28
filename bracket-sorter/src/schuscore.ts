import data from './ssdata.json';
import { SchuScore } from './types';

export const getSchuScoreFromName = (name: string): SchuScore | undefined => {
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
	return { score: data.ratings.arrayValue.values[index].doubleValue, place: index };
};