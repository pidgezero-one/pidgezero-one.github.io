import "./App.css";
import React, { useState, useEffect } from "react";
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

const setCookie = (name: string, value: string) => {
  const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
}

const getCookie = (name: string) => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(encodeURIComponent(name) + '='))
    ?.split('=')[1];
}

const App = () => {
  const [token, setToken] = useState("");
  const [tournamentSlug, setTournamentSlug] = useState("");
  const [data, setData] = useState<EntrantStats[]>([])
  const [working, setWorking] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const [entrantsPerFetch, setEntrantsPerFetch] = useState<number>(50)
  const [attempted, setAttempted] = useState<boolean>(false)
  const [progress, setProgress] = useState<string>("")

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
    setAttempted(false)
    setProgress("")

    fetchSinglesWinRatesFromTournament(tournamentSlug, 1386, entrantsPerFetch, token, setProgress)
      .then((rates) => {
        const dat = rates.filter(r => r.gamerTag !== 'bye').map(r => ({ ...r, schuScore: getSchuScoreFromName(r.gamerTag, r.country) }))
        setData(dat)
        setWorking(false)
        setAttempted(true)
      })
      .catch((e) => {
        console.error(e); setError(e);
        setAttempted(false)
      })
      .finally(() =>
        setWorking(false));
  }

  useEffect(() => {
    if (token) {
      setCookie("startgg_token", token);
    }
  }, [token]);

  useEffect(() => {
    const savedToken = getCookie("startgg_token");
    if (savedToken) {
      setToken(decodeURIComponent(savedToken));
    }
  }, []);


  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
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
          <label style={{ width: "300px" }}><a target="_blank" rel="noreferrer" href="https://start.gg/admin/profile/developer">start.gg api token</a> <b title={`Click the link, log in to start.gg, click "Create new token", give it any name you want, and copy paste what it gives you into this text box.`} style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>(?)</b>:</label>
          <input
            type="text"
            placeholder="start.gg api token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ flex: 1 }}
            disabled={working}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: "300px" }}>fetch size <b title={`Raise this to make it go faster. This can cause "complexity too high" errors, though, in which case you should lower it.`} style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>(?)</b>:</label>
          <input
            type="number"
            placeholder="fetch size"
            value={entrantsPerFetch.toString()}
            onChange={(e) => handleUpdateEntrantsPerFetch(e.target.value)}
            style={{ flex: 1 }}
            disabled={working}
          />
        </div>
      </div>
      <button onClick={triggerSort} disabled={working}>Get Entrant Table</button>

      {!!error ? <div style={{ color: 'red' }}>error: {error}</div> : <>{working ? <div><em>fetching each entrant's last 6 months of start.gg set history... this can take a few minutes for small tournaments and ~30 mins for tournaments with 1000+ entrants <b title={`In start.gg's API, the relationship between tournament entrants and their history of set wins across all tournaments is not very direct, so this has to do a few seconds worth of complex fetching per participant. start.gg's API is also rate limited so it has to be careful not to get throttled.`} style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>(why?)</b></em><br /><br />{progress}</div> : <>{!!data.length ? <EntrantStatsTable data={data} /> : <>{attempted ? <div>(no entrants - may not be public yet)</div> : <></>}</>}</>}</>}

    </div>
  );
}

export default App;
