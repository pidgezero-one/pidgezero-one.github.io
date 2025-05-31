import "./App.css";
import React, { useState, useEffect } from "react";
import { getSchuAllTimeScoreFromName, getSchuPointInTimeScore, getSchuRegionalScore } from "./schuscore";
import { fetchSinglesWinRatesFromTournament } from "./localized-winrate";
import { EntrantStats } from "./types";
import EntrantStatsTable from "./statTable";
import { fetchSinglesEventIdsByGame } from "./choose-tournament";

const extractTournamentSlug = (input: string): string => {
  const match = input.match(/^(?:https?:\/\/)?(?:www\.)?start.gg\/(?:admin\/)?tournament\/([^\/?#]+)/i);
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
  const [fetchingBrackets, setFetchingBrackets] = useState<boolean>(false)
  const [working, setWorking] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()
  const [entrantsPerFetch, setEntrantsPerFetch] = useState<number>(50)
  const [attempted, setAttempted] = useState<boolean>(false)
  const [progress, setProgress] = useState<string>("")
  const [game, selectGame] = useState<number>(1386);
  const [timePeriod, setTimePeriod] = useState<number>(6)
  const [staticTimePeriod, setStaticTimePeriod] = useState<number>(6)
  const [bracketChoices, setBracketChoices] = useState<{ name: string, id: number }[]>([])
  const [eventId, setEventId] = useState<number>(0);

  const readyToFetchBrackets = !(!tournamentSlug || !token || timePeriod < 1 || isNaN(timePeriod) || entrantsPerFetch < 1 || isNaN(entrantsPerFetch))
  const disableBaseControls = working || fetchingBrackets || (bracketChoices.length > 0 && !working && !attempted)

  const handleTournamentInput = (str: string) => {
    setTournamentSlug(extractTournamentSlug(str))
    setBracketChoices([])
  }

  const handleUpdateEntrantsPerFetch = (str: string) => {
    setEntrantsPerFetch(parseInt(str) ?? 50)
  }

  const handleChangeGame = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectGame(parseInt(e.target.value) ?? 1386);
  };

  const handleTimePeriod = (str: string) => {
    setTimePeriod(parseInt(str) ?? 6)
  }

  const handleChangeBracket = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventId(parseInt(e.target.value));
  };

  const reset = () => {
    setData([])
    setWorking(false)
    setError(undefined)
    setAttempted(false)
    setProgress("")
    setStaticTimePeriod(timePeriod)
    setFetchingBrackets(false)
    setBracketChoices([])
  }

  const triggerSort = (eventId: number) => {
    setError(undefined)
    setWorking(true)
    fetchSinglesWinRatesFromTournament(tournamentSlug, game, entrantsPerFetch, token, timePeriod, eventId, setProgress)
      .then((rates) => {
        const dat = rates.
          filter(r => r.gamerTag !== 'bye').
          map(r => ({ ...r, schuAllTimeScore: getSchuAllTimeScoreFromName(r.gamerTag, r.country), schuPointInTimeScore: getSchuPointInTimeScore(r.gamerTag, r.country), schuRegionalScore: getSchuRegionalScore(r.gamerTag, r.country, r.state) }))
        setData(dat)
        setWorking(false)
        setAttempted(true)
      })
      .catch((e) => {
        reset()
        console.error(e);
        setError(e?.message);
      })
      .finally(() => {
        setWorking(false);
        setProgress("")
      });
  }

  const fetchBrackets = () => {
    if (!readyToFetchBrackets) return
    setError(undefined)
    setFetchingBrackets(true)
    setData([])
    setAttempted(false)
    fetchSinglesEventIdsByGame(tournamentSlug, game, token).then((res: any) => {
      setBracketChoices(res)
      if (res.length > 0) {
        setEventId(res[0].id)
        if (res.length === 1) {
          triggerSort(res[0].id)
        }
      }
    })
      .catch((e) => {
        console.log(e)
        reset()
        console.error(e);
        setError(e?.message);
      }).finally(() => {
        setFetchingBrackets(false)
      })
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
          <label style={{ width: "350px" }}>start.gg tournament (paste a slug or URL):</label>
          <input
            type="text"
            placeholder="start.gg tournament (paste a slug or URL)"
            value={tournamentSlug}
            onChange={(e) => handleTournamentInput(e.target.value)}
            style={{ flex: 1 }}
            disabled={disableBaseControls}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: "350px" }}>game</label>
          <select
            value={game}
            onChange={handleChangeGame}
            style={{ flex: 1 }}
            disabled={disableBaseControls}
          >
            <option value="4">64</option>
            <option value="1">Melee</option>
            <option value="5">Brawl</option>
            <option value="29">3DS</option>
            <option value="3">Wii U</option>
            <option value="1386">Ultimate</option>
            <option value="33602">Project+</option>
            <option value="53945">Rivals 2</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: "350px" }}>win rate time period (months):</label>
          <input
            type="number"
            placeholder="time period"
            value={timePeriod.toString()}
            onChange={(e) => handleTimePeriod(e.target.value)}
            style={{ flex: 1 }}
            disabled={disableBaseControls}
            min={1}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: "350px" }}><a target="_blank" rel="noreferrer" href="https://start.gg/admin/profile/developer">start.gg api token</a> <b title={`Click the link, log in to start.gg, click "Create new token", give it any name you want, and copy paste what it gives you into this text box. Your browser will remember this as long as you're not incognito.`} style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>(?)</b>:</label>
          <input
            type="text"
            placeholder="start.gg api token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{ flex: 1 }}
            disabled={disableBaseControls}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: "350px" }}>fetch size (1 - 512) <b title={`Raise this to make it go faster. This can cause "complexity too high" errors, though, in which case you should lower it.`} style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>(?)</b>:</label>
          <input
            type="number"
            placeholder="fetch size (1 - 512)"
            value={entrantsPerFetch.toString()}
            onChange={(e) => handleUpdateEntrantsPerFetch(e.target.value)}
            style={{ flex: 1 }}
            disabled={disableBaseControls}
            min={1}
            max={512}
          />
        </div>

      </div>
      <button onClick={fetchBrackets} disabled={fetchingBrackets || !readyToFetchBrackets || disableBaseControls}>Get Entrant Table</button>


      <>{bracketChoices.length >= 2 ?
        <div style={{ display: "flex", marginTop: '1rem', flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "350px" }}>
              This tournament has multiple singles events for your selected game. Choose one:
            </div>
            <select
              value={eventId}
              onChange={handleChangeBracket}
              style={{ flex: 1 }}
              disabled={working}
            >
              {bracketChoices.map(b => <option value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>

            <button onClick={() => triggerSort(eventId)} disabled={working}>confirm</button>

            <button onClick={reset} disabled={working}>cancel</button>
          </div>
        </div> :
        <></>}</>


      {!!error ?
        <div style={{ color: 'red', marginTop: '1rem' }}>error: {error}</div>
        : <>
          {working ?
            <div style={{ marginTop: '1rem' }}>
              <em>fetching each entrant's start.gg set history... this can take a while for brackets with hundreds of entrants or for longer win rate time periods{" "}
                <b title={`In start.gg's API, the relationship between tournament entrants and their history of set wins across all tournaments is not very direct, so this has to do a few seconds worth of complex fetching per participant. start.gg's API is also rate limited so it has to be careful not to get throttled.`} style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>(why?)</b>
              </em>
              <br /><br />
              {progress}
            </div> :
            <>
              {!!data.length ?
                <EntrantStatsTable data={data} game={game} /> :
                <>{attempted ?
                  <div style={{ color: 'red', marginTop: '1rem' }}>(no entrants - may not be public yet)</div> :
                  <></>
                }</>}
            </>}
        </>}

    </div>
  );
}

export default App;
