import React, { useState } from "react";
import { EntrantStats } from "./types";

type Props = {
	data: EntrantStats[];
};

type SortKey = keyof Pick<EntrantStats, "gamerTag" | "winRate" | "schuScore">;

const EntrantStatsTable: React.FC<Props> = ({ data }) => {
	const [sortKey, setSortKey] = useState<SortKey>("schuScore");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

	const handleSort = (key: SortKey) => {
		if (sortKey === key) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortDirection("desc");
		}
	};

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
			<p>* Schu score attempts to match by entrant name and not start.gg ID, so not all listings may be accurate.</p>
			<table style={{ borderCollapse: "collapse", width: "100%" }}>
				<thead>
					<tr style={{ textAlign: 'left' }}>
						{getHeader("Name", "gamerTag")}
						{getHeader("Win rate", "winRate")}
						{getHeader("Schu score (as of 2025-02-17)*", "schuScore")}
					</tr>
				</thead>
				<tbody>
					{sortedData.map((entrant, i) => (
						<tr key={i} className={i % 2 === 0 ? "even-row" : ""}>
							<td>{entrant.discriminator ? <a target="_blank" rel="noreferrer" href={`https://www.start.gg/user/${entrant.discriminator}`}>{entrant.gamerTag}</a> : <>{entrant.gamerTag}</>}</td>
							<td>
								{entrant.setsWon} / {entrant.setsWon + entrant.setsLost} ({entrant.winRate.toFixed(2)})
							</td>
							<td>
								{entrant.schuScore !== undefined
									? `${entrant.schuScore.score.toFixed(2)} (${entrant.schuScore.place + 1})`
									: "—"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default EntrantStatsTable;
