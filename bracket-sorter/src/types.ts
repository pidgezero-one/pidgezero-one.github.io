export type EntrantStats = {
	entrantName: string;
	prefix?: string;
	gamerTag: string;
	setsWon: number;
	setsLost: number;
	winRate: number;
	schuAllTimeScore?: SchuScore;
	schuPointInTimeScore?: SchuScore;
	schuRegionalScore?: RegionalSchuScore;
	discriminator?: string;
	country?: string
	state?: string
};

export interface SchuScore {
	score: number;
	place: number;
}

export interface RegionalSchuScore extends SchuScore {
	region: string
	countryCode?: string
}

export interface Set {
	winnerId: string;
	playerId: string;
}


export interface Locale {
	country: string | string[], states?: string[]
}

export interface Player { name: string; score: number, place: number, region: string, locale?: Locale }


export const API_URL = "https://api.start.gg/gql/alpha";