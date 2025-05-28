import "./App.css";
import React, { useState } from "react";
import { getSchuScoreFromName } from "./schuscore";
import { fetchSinglesWinRatesFromTournament } from "./localized-winrate";
import { EntrantStats } from "./types";
import EntrantStatsTable from "./statTable";

const extractTournamentSlug = (input: string): string => {
  const match = input.match(/^(?:https?:\/\/)?(?:www\.)?start.gg\/tournament\/([^\/?#]+)/i);
  if (match && match[1]) {
    return match[1];
  }
  return input;
}

const App = () => {
  const [token, setToken] = useState("");
  const [tournamentSlug, setTournamentSlug] = useState("");
  const [data, setData] = useState<EntrantStats[]>([])
  const [working, setWorking] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const [entrantsPerFetch, setEntrantsPerFetch] = useState<number>(50)

  const handleTournamentInput = (str: string) => {
    setTournamentSlug(extractTournamentSlug(str))
  }

  const handleUpdateEntrantsPerFetch = (str: string) => {
    setEntrantsPerFetch(parseInt(str) ?? 50)
  }

  const triggerSort = () => {
    if (!tournamentSlug || !token) return
    setData([])
    setWorking(true)
    setError(undefined)

    fetchSinglesWinRatesFromTournament(tournamentSlug, 1386, entrantsPerFetch, token)
      .then((rates) => {
        const dat = rates.filter(r => r.gamerTag !== 'bye').map(r => ({ ...r, schuScore: getSchuScoreFromName(r.gamerTag) }))
        setData(dat)
        setWorking(false)
      })
      .catch((e) => { console.error(e); setError(e) })
      .finally(() =>
        setWorking(false));
  }

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: "300px" }}>start.gg dev token:</label>
          <input
            type="text"
            placeholder="start.gg dev token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ flex: 1 }}
            disabled={working}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: "300px" }}>tournament (paste a slug or URL):</label>
          <input
            type="text"
            placeholder="tournament (paste a slug or URL)"
            value={tournamentSlug}
            onChange={(e) => handleTournamentInput(e.target.value)}
            style={{ flex: 1 }}
            disabled={working}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: "300px" }}>entrants per fetch <b title={`Lower this if you get "complexity too high" errors`} style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>(?)</b>:</label>
          <input
            type="number"
            placeholder="entrants per fetch"
            value={entrantsPerFetch.toString()}
            onChange={(e) => handleUpdateEntrantsPerFetch(e.target.value)}
            style={{ flex: 1 }}
            disabled={working}
          />
        </div>
      </div>
      <button onClick={triggerSort} disabled={working}>Get Entrant Table</button>

      {!!error ? <div style={{ color: 'red' }}>error: {error}</div> : <>{working ? <div><em>working... (this can take a few minutes for huge tournaments)</em></div> : <>{!!data.length ? <EntrantStatsTable data={data} /> : <div>(no entrants)</div>}</>}</>}

    </div>
  );
}

export default App;
