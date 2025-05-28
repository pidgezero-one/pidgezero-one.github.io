import { EntrantStats, Set } from "./types";

const API_URL = "https://api.start.gg/gql/alpha";


const fetchPlayerSets = async (
	userId: string,
	videoGameId: number,
	apiKey: string,
	perPage: number = 50
): Promise<Set[]> => {
	let page = 1;
	let totalPages = 1;
	const sets: Set[] = [];

	while (page <= totalPages) {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				query: `
          query PlayerSets($userId: ID!, $page: Int!, $perPage: Int!) {
            user(id: $userId) {
              player {
                sets(page: $page, perPage: $perPage) {
                  pageInfo {
                    totalPages
                  }
                  nodes {
                    id
                    winnerId
                    createdAt
                  }
                }
              }
            }
          }
        `,
				variables: { userId, page, perPage },
			}),
		});

		const json = await res.json();
		const playerSets = json.data?.user?.player?.sets?.nodes || [];
		totalPages = json.data?.user?.player?.sets?.pageInfo?.totalPages || 1;

		sets.push(...playerSets);
		page++;
	}

	return sets;
}



async function fetchHistoricalWinRates(
	userId: string,
	videoGameId: number,
	apiKey: string
): Promise<EntrantStats> {
	const allSets = await fetchPlayerSets(userId, videoGameId, apiKey);

	// Get the current date and calculate the cutoff date (6 months ago)
	const now = new Date();
	const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));

	// Filter sets to include only those within the last 6 months
	const recentSets = allSets.filter((set) => {
		const setDate = new Date(set.createdAt);
		return setDate >= sixMonthsAgo;
	});

	// Limit to the most recent 500 sets
	const limitedSets = recentSets.slice(0, 500);

	// Calculate wins and losses
	const wins = limitedSets.filter((set) => set.winnerId === userId).length;
	const total = limitedSets.length;
	const winRate = total > 0 ? wins / total : 0;

	return {
		entrantName: "Player Name", // Replace with actual player name
		gamerTag: "Player Tag", // Replace with actual player tag
		setsWon: wins,
		setsLost: total - wins,
		winRate,
	};
}

const fetchEntrantNamesAndTags = async (
	entrantIds: number[],
	apiKey: string,
	batchSize = 20
): Promise<Record<number, { prefix?: string; gamerTag: string; discriminator: string }>> => {
	const tagMap: Record<number, { prefix?: string; gamerTag: string; discriminator: string }> = {};

	// Helper to run a batch GraphQL request
	const fetchBatch = async (batch: number[]) => {
		const aliasQueries = batch
			.map(
				(id) => `
        e${id}: entrant(id: ${id}) {
          id
          participants {
            gamerTag
            prefix
			user { discriminator }
          }
        }`
			)
			.join("\n");

		const query = `
      query GetEntrants {
        ${aliasQueries}
      }
    `;

		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({ query }),
		});

		const json = await response.json();

		if (json.errors) {
			console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
			throw new Error("Failed to fetch entrant data.");
		}

		const data = json?.data || {};

		for (const key of Object.keys(data)) {
			const entrant = data[key];
			const id = Number(entrant.id);
			const participant = entrant.participants?.[0];
			if (participant) {
				tagMap[id] = {
					gamerTag: participant.gamerTag || "Unknown",
					prefix: participant.prefix || undefined,
					discriminator: participant.user?.discriminator || undefined
				};
			}
		}
	}

	// Process in batches
	for (let i = 0; i < entrantIds.length; i += batchSize) {
		const batch = entrantIds.slice(i, i + batchSize);
		await fetchBatch(batch);
	}

	return tagMap;
}

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchSinglesWinRatesFromTournament(
	tournamentSlug: string,
	videoGameId: number,
	entrantsPerFetch: number,
	apiKey: string
): Promise<EntrantStats[]> {
	const eventId = await fetchFirstSinglesEventIdByGame(
		tournamentSlug,
		videoGameId,
		apiKey
	);

	const winRates: EntrantStats[] = [];
	let page = 1;

	while (true) {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				query: `
					query EventEntrants($eventId: ID!, $page: Int!, $perPage: Int!) {
	event(id: $eventId) {
		entrants(query: { page: $page, perPage: $perPage }) {
			pageInfo {
				totalPages
				page
			}
			nodes {
				id
				name
				paginatedSets(perPage: 100, page: 1) {
					nodes {
						winnerId
						slots {
							entrant {
								id
							}
						}
					}
				}
			}
		}
	}
}

					`,
				variables: { eventId, page, perPage: entrantsPerFetch },
			}),
		});

		if (response.status === 429) {
			sleep(5000);
			continue;
		}
		const json = await response.json();
		if (json.errors) {
			throw json.errors[0].message;
		}

		const entrants = json?.data?.event?.entrants?.nodes || [];

		if (!entrants.length) break;

		const entrantIds = entrants.map((e: any) => Number(e.id));
		const tagMap = await fetchEntrantNamesAndTags(entrantIds, apiKey);


		for (const entrant of entrants) {
			const entrantId = Number(entrant.id);
			if (!entrantId) continue;

			let setsWon = 0;
			let setsLost = 0;

			for (const set of entrant.paginatedSets.nodes) {
				if (set.winnerId === entrantId) {
					setsWon++;
				} else {
					setsLost++;
				}
			}

			const total = setsWon + setsLost;
			const winRate = total > 0 ? setsWon / total : 0;
			const tagInfo = tagMap[entrantId];

			winRates.push({
				entrantName: entrant.name,
				prefix: tagInfo?.prefix,
				gamerTag: tagInfo?.gamerTag || "Unknown",
				setsWon,
				setsLost,
				winRate,
				discriminator: tagInfo?.discriminator
			});
		}

		const pageInfo = json?.data?.event?.entrants?.pageInfo;
		if (!pageInfo || page >= pageInfo.totalPages) break;

		page++;
		sleep(500);
	}

	return winRates;
}

async function fetchFirstSinglesEventIdByGame(
	slug: string,
	videoGameId: number,
	apiKey: string
): Promise<number> {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			query: `
        query TournamentEvents($slug: String!, $videogameId: [ID]!) {
          tournament(slug: $slug) {
            events(filter: {videogameId: $videogameId}) {
              id
              name
			  teamRosterSize { maxPlayers }
            }
          }
        }
      `,
			variables: {
				slug,
				"videogameId": [videoGameId]
			},
		}),
	});

	const json = await res.json();
	const events = json?.data?.tournament?.events;
	if (!events) throw new Error(`No events found for tournament "${slug}"`);

	const match = events.find(
		(e: any) =>
			!e.teamRosterSize
	);

	if (!match)
		throw new Error(
			`No *Singles* event with videoGame ID ${videoGameId} found in tournament "${slug}"`
		);

	return match.id;
}