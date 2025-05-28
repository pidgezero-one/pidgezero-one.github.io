export type EntrantStats = {
	entrantName: string;
	prefix?: string;
	gamerTag: string;
	setsWon: number;
	setsLost: number;
	winRate: number;
	schuScore?: SchuScore;
	discriminator?: string;
};

export type SchuScore = {
	score: number;
	place: number;
}

export interface Set {
	winnerId: string;
	createdAt: string; // Timestamp of when the set was played
}