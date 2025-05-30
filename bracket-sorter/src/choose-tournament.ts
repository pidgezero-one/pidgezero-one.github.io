import { API_URL } from "./types";

export async function fetchSinglesEventIdsByGame(
	slug: string,
	videoGameId: number,
	apiKey: string
): Promise<{ name: string, id: number }[]> {
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

	const validEvents = events.filter((e: any) =>
		!e.teamRosterSize || e.teamRosterSize < 2)

	if (!validEvents) throw new Error(`this tournament does not have a singles bracket for your selected game`)

	return validEvents.map((e: any) => ({ name: e.name, id: e.id }))
}