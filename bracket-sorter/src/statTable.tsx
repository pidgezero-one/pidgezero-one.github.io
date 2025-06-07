import React, { useEffect, useState } from "react";
import { EntrantStats } from "./types";

type Props = {
	data: EntrantStats[];
	game: number;
};

type SortKey = keyof Pick<EntrantStats, "gamerTag" | "winRate" | "schuAllTimeScore" | "schuPointInTimeScore" | "schuRegionalScore">;

const EntrantStatsTable: React.FC<Props> = ({ data, game }) => {
	const [sortKey, setSortKey] = useState<SortKey>(game === 1386 ? "schuAllTimeScore" : "winRate");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

	const handleSort = (key: SortKey) => {
		if (sortKey === key) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortDirection("desc");
		}
	};

	useEffect(() => {
		if (game === 1386) {
			setSortKey("schuAllTimeScore")
		} else {
			setSortKey("winRate")
		}
	}, [game])

	const sortedData = [...data].sort((a, b) => {
		const aVal = a[sortKey];
		const bVal = b[sortKey];

		let aSortVal: number | string;
		let bSortVal: number | string;

		if (sortKey === "schuAllTimeScore") {
			aSortVal =
				a.schuAllTimeScore?.score ?? (sortDirection === "asc" ? Infinity : -Infinity);
			bSortVal =
				b.schuAllTimeScore?.score ?? (sortDirection === "asc" ? Infinity : -Infinity);
		} else if (sortKey === "schuPointInTimeScore") {
			aSortVal =
				a.schuPointInTimeScore?.score ?? (sortDirection === "asc" ? Infinity : -Infinity);
			bSortVal =
				b.schuPointInTimeScore?.score ?? (sortDirection === "asc" ? Infinity : -Infinity);
		} else if (sortKey === "schuRegionalScore") {
			aSortVal =
				a.schuRegionalScore?.score ?? (sortDirection === "asc" ? Infinity : -Infinity);
			bSortVal =
				b.schuRegionalScore?.score ?? (sortDirection === "asc" ? Infinity : -Infinity);
		} else {
			aSortVal = aVal as number | string;
			bSortVal = bVal as number | string;
		}

		if (aSortVal < bSortVal) return sortDirection === "asc" ? -1 : 1;
		if (aSortVal > bSortVal) return sortDirection === "asc" ? 1 : -1;
		return 0;
	});

	const getHeader = (label: string, key: SortKey) => (
		<th
			style={{ cursor: "pointer", userSelect: "none" }}
			onClick={() => handleSort(key)}
		>
			{label}
			{sortKey === key && (sortDirection === "asc" ? " ▲" : " ▼")}
		</th>
	);

	return (
		<>
			<table style={{ borderCollapse: "collapse", width: "100%" }}>
				<thead>
					<tr style={{ textAlign: 'left' }}>
						{getHeader("Name", "gamerTag")}
						{getHeader(`start.gg win rate`, "winRate")}
						{game === 1386 && getHeader("All-time schu score (2025-05-25)*", "schuAllTimeScore")}
						{game === 1386 && getHeader("Current schu score (2025-06-03)*", "schuPointInTimeScore")}
						{game === 1386 && getHeader("Local schu score (2025-06-03)**", "schuRegionalScore")}
					</tr>
				</thead>
				<tbody>
					{sortedData.map((entrant, i) => (
						<tr key={i} className={i % 2 === 0 ? "even-row" : ""}>
							<td>{entrant.discriminator ? <a target="_blank" rel="noreferrer" href={`https://www.start.gg/user/${entrant.discriminator}/results?filter=%7B%22videogameId%22%3A%5B1386%5D%7D`}>{entrant.gamerTag}</a> : <>{entrant.gamerTag}</>}</td>
							<td>
								{entrant.setsWon} / {entrant.setsWon + entrant.setsLost} ({entrant.winRate.toFixed(2)})
							</td>
							{game === 1386 && <><td>
								{entrant.schuAllTimeScore !== undefined
									? `${entrant.schuAllTimeScore.score.toFixed(2)} (#${entrant.schuAllTimeScore.place + 1})`
									: "—"}
							</td><td>
									{entrant.schuPointInTimeScore !== undefined
										? `${entrant.schuPointInTimeScore.score.toFixed(2)} (#${entrant.schuPointInTimeScore.place + 1})`
										: "—"}
								</td><td>
									{entrant.schuRegionalScore !== undefined
										? `${entrant.schuRegionalScore.score.toFixed(2)} (${entrant.schuRegionalScore.region} #${entrant.schuRegionalScore.place})`
										: "—"}
								</td></>}
						</tr>
					))}
				</tbody>
			</table>
			{game === 1386 && <p>* All-time and current schu scores attempt to match to a start.gg user by name and country and not by start.gg user ID. There can be false negative and false positive matches as a result.</p>}
			{game === 1386 && <p>** Local schu scores additionally rely on OCR scans of ranking graphics to get the player's name and country. It is even more prone to false negatives.</p>}
		</>
	);
};

export default EntrantStatsTable;
