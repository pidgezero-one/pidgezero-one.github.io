import { EntrantStats, Set, API_URL } from "./types";


const fetchPlayerSets = async (userId: string, videogameId: number, API_KEY: string, fetchSize: number, timePeriod: number): Promise<Set[]> => {
	let page = 1;
	let totalPages = 1;
	const sets: Set[] = [];

	const monthsAgo = new Date();
	monthsAgo.setMonth(monthsAgo.getMonth() - timePeriod);
	const unixTimestamp = Math.floor(monthsAgo.getTime() / 1000);

	while (page <= totalPages) {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY}`,
			},
			body: JSON.stringify({
				query: `
        query PlayerSetHistory($userId: ID!, $page: Int!, $updatedAfter: Timestamp!) {
          user(id: $userId) {
            player {
              id
              sets(page: $page, perPage: 50, filters: {updatedAfter: $updatedAfter, showByes: false}) {
                pageInfo { totalPages }
                nodes {
                  id
                  winnerId
				  slots(includeByes: false) {
				  	entrant {
					  id
					  participants {
					  	player {
						  id
						}
					  }
					  event {
					    videogame {
						  id
						}
					  }
					}
				  }
                }
              }
            }
          }
        }
        `,
				variables: {
					userId,
					page,
					perPage: fetchSize,
					updatedAfter: unixTimestamp
				},
			}),
		});

		if (res.status >= 400) {
			await sleep(3000);
			continue
		}
		const json = await res.json();
		const player = json.data?.user?.player;
		const playerId = player?.id;
		const setNodes = player?.sets?.nodes || [];
		totalPages = player?.sets?.pageInfo?.totalPages || 1;

		for (const set of setNodes) {
			if (set.slots.length > 2) continue
			// filter out byes
			if (set.slots.filter((s: any) => !s.entrant).length > 0) continue
			// filter out games that aren't ultimate
			if (set.slots.filter((s: any) => s.entrant.event.videogame.id !== videogameId).length > 0) continue
			// filter out doubles
			const doubles = set.slots.filter((s: any) => s.entrant.participants.length !== 1)
			if (doubles.length > 0) continue
			const winner = set.slots.find((slot: { entrant: { id: number, participants: { player: { id: number } }[] } }) => slot?.entrant?.id === set.winnerId)
			if (!winner) {
				continue
			}
			const participants = winner.entrant.participants
			const winningPlayer = participants[0]?.player.id
			if (!winningPlayer) {
				continue
			}
			const s = {
				winnerId: winningPlayer,
				playerId: playerId,
			}

			sets.push(s);
		}


		await sleep(50);

		page++;
	}

	return sets;
}



function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


export async function fetchSinglesWinRatesFromTournament(
	tournamentSlug: string,
	videoGameId: number,
	fetchSize: number,
	apiKey: string,
	timePeriod: number,
	eventId: number,
	updateProgress: (s: string) => void
): Promise<EntrantStats[]> {

	const winRates: EntrantStats[] = [];
	let page = 1;

	let countedEntrants = 0

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
								pageInfo { totalPages page total }
								nodes {
									id
									name
									participants {
										gamerTag
										prefix
										user { id discriminator location { country state } }
									}
								}
							}
						}
					}
				`,
				variables: { eventId, page, perPage: fetchSize },
			}),
		});

		if (response.status >= 400) {
			await sleep(3000);
			continue;
		}

		const json = await response.json();
		console.log(json)
		if (json.errors) {
			throw new Error(json.errors[0].message);
		}

		const entrants = json?.data?.event?.entrants?.nodes || [];
		const pageInfo = json?.data?.event?.entrants?.pageInfo;

		if (!entrants.length) break;

		for (let index = 0; index < entrants.length; index++) {
			const entrant = entrants[index];
			const participant = entrant.participants?.[0];
			if (!participant?.user?.id) continue;


			const userId = participant.user.id;

			const sets = await fetchPlayerSets(userId, videoGameId, apiKey, fetchSize, timePeriod);

			const wins = sets.filter((set) => set.playerId === set.winnerId).length;
			const total = sets.length;
			const winRate = total > 0 ? wins / total : 0;

			winRates.push({
				entrantName: entrant.name,
				gamerTag: participant.gamerTag,
				prefix: participant.prefix,
				discriminator: participant.user.discriminator,
				setsWon: wins,
				setsLost: total - wins,
				winRate,
				country: participant.user?.location?.country,
				state: participant.user?.location?.state
			});

			countedEntrants++

			if (!!pageInfo?.total) {
				updateProgress(`Calculated ${timePeriod}mo win rates for ${countedEntrants} of ${pageInfo.total} entrants (${(100 * countedEntrants / pageInfo.total).toFixed(1)}%)...`)
			}

			await sleep(50);
		}

		if (!pageInfo || page >= pageInfo.totalPages) break;
		page++;
	}

	return winRates;
}