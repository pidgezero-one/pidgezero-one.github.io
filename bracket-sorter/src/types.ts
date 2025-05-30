export type EntrantStats = {
	entrantName: string;
	prefix?: string;
	gamerTag: string;
	setsWon: number;
	setsLost: number;
	winRate: number;
	schuScore?: SchuScore;
	discriminator?: string;
	country?: string
};

export type SchuScore = {
	score: number;
	place: number;
}

export interface Set {
	winnerId: string;
	playerId: string;
}

export const API_URL = "https://api.start.gg/gql/alpha";