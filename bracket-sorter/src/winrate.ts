const API_URL = "https://api.start.gg/gql/alpha";
const API_KEY = "YOUR_STARTGG_API_KEY"; // Replace this with your actual API key

interface Entrant {
	participantUserIds: string[];
	gamerTag: string;
	prefix?: string;
}

interface Set {
	winnerId: string;
	playerId: string;
}

const fetchEntrants = async (tourneySlug: string, videogameId: number, API_KEY: string): Promise<Entrant[]> => {
	let page = 1;
	let totalPages = 1;
	const entrants: Entrant[] = [];

	while (page <= totalPages) {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY}`,
			},
			body: JSON.stringify({
				query: `
        query EntrantsWithUserId($tourneySlug: String!, $videogameId: [ID]!, $page: Int!) {
          tournament(slug: $tourneySlug) {
            events(filter: {videogameId: $videogameId}) {
              entrants(query: {perPage: 50, page: $page}) {
                pageInfo { totalPages }
                nodes {
                  name
                  participants {
                    gamerTag
                    prefix
                    user { id }
                  }
                }
              }
            }
          }
        }
        `,
				variables: {
					tourneySlug,
					videogameId: [videogameId],
					page,
				},
			}),
		});

		const json = await res.json();
		const event = json.data?.tournament?.events?.[0];
		const entrantNodes = event?.entrants?.nodes || [];
		totalPages = event?.entrants?.pageInfo?.totalPages || 1;

		for (const node of entrantNodes) {
			for (const participant of node.participants || []) {
				const userId = participant.user?.id;
				if (userId) {
					entrants.push({
						gamerTag: participant.gamerTag,
						prefix: participant.prefix,
						participantUserIds: [userId],
					});
				}
			}
		}

		page++;
	}

	return entrants;
}

const fetchPlayerSets = async (userId: string, videogameId: number, API_KEY: string): Promise<Set[]> => {
	let page = 1;
	let totalPages = 1;
	const sets: Set[] = [];

	while (page <= totalPages) {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY}`,
			},
			body: JSON.stringify({
				query: `
        query PlayerSetHistory($userId: ID!, $page: Int!) {
          user(id: $userId) {
            player {
              id
              sets(page: $page, perPage: 50, filters: {videogameIds: [${videogameId}]}) {
                pageInfo { totalPages }
                nodes {
                  id
                  winnerId
                }
              }
            }
          }
        }
        `,
				variables: {
					userId,
					page,
				},
			}),
		});

		const json = await res.json();
		const player = json.data?.user?.player;
		const playerId = player?.id;
		const setNodes = player?.sets?.nodes || [];
		totalPages = player?.sets?.pageInfo?.totalPages || 1;

		for (const set of setNodes) {
			sets.push({
				winnerId: String(set.winnerId),
				playerId: playerId,
			});
		}

		page++;
	}

	return sets;
}

export const calculateAllWinRates = async (tourneySlug: string, videogameId: number, API_KEY: string) => {
	const entrants = await fetchEntrants(tourneySlug, videogameId, API_KEY);
	const results: Record<string, { wins: number; total: number; winRate: number }> = {};

	for (const entrant of entrants) {
		const userId = entrant.participantUserIds[0]; // assume 1 user per entrant
		const sets = await fetchPlayerSets(userId, videogameId, API_KEY);

		const wins = sets.filter((set) => set.playerId === set.winnerId).length;
		const total = sets.length;
		const winRate = total > 0 ? wins / total : 0;

		results[`${entrant.prefix ?? ""}${entrant.prefix ? "|" : ""}${entrant.gamerTag}`] = {
			wins,
			total,
			winRate,
		};

		// Optional: wait between requests to avoid throttling
		await new Promise((resolve) => setTimeout(resolve, 300));
	}

	return results;
}
