import React, { useEffect, useState } from "react";
import { EntrantStats } from "./types";

type Props = {
	data: EntrantStats[];
	game: number;
	timePeriod: number;
};

type SortKey = keyof Pick<EntrantStats, "gamerTag" | "winRate" | "schuScore">;

const EntrantStatsTable: React.FC<Props> = ({ data, game, timePeriod }) => {
	const [sortKey, setSortKey] = useState<SortKey>(game === 1386 ? "schuScore" : "winRate");
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
			setSortKey("schuScore")
		} else {
			setSortKey("winRate")
		}
	}, [game])

	const sortedData = [...data].sort((a, b) => {
		const aVal = a[sortKey];
		const bVal = b[sortKey];

		let aSortVal: number | string;
		let bSortVal: number | string;

		if (sortKey === "schuScore") {
			aSortVal =
				a.schuScore?.score ?? (sortDirection === "asc" ? Infinity : -Infinity);
			bSortVal =
				b.schuScore?.score ?? (sortDirection === "asc" ? Infinity : -Infinity);
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
			{game === 1386 && <p>* Schu score attempts to match to a start.gg user by name and country and not by start.gg user ID, so not all listings may be accurate.</p>}
			<table style={{ borderCollapse: "collapse", width: "100%" }}>
				<thead>
					<tr style={{ textAlign: 'left' }}>
						{getHeader("Name", "gamerTag")}
						{getHeader(`start.gg win rate (last ${timePeriod} months)`, "winRate")}
						{game === 1386 && getHeader("Schu score (as of 2025-02-17)*", "schuScore")}
					</tr>
				</thead>
				<tbody>
					{sortedData.map((entrant, i) => (
						<tr key={i} className={i % 2 === 0 ? "even-row" : ""}>
							<td>{entrant.discriminator ? <a target="_blank" rel="noreferrer" href={`https://www.start.gg/user/${entrant.discriminator}/results?filter=%7B%22videogameId%22%3A%5B1386%5D%7D`}>{entrant.gamerTag}</a> : <>{entrant.gamerTag}</>}</td>
							<td>
								{entrant.setsWon} / {entrant.setsWon + entrant.setsLost} ({entrant.winRate.toFixed(2)})
							</td>
							{game === 1386 && <td>
								{entrant.schuScore !== undefined
									? `${entrant.schuScore.score.toFixed(2)} (${entrant.schuScore.place + 1})`
									: "—"}
							</td>}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default EntrantStatsTable;
