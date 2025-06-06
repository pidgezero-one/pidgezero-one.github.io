you're looking for [https://pidgezero.one/bracket-sorter/build/index.html](https://pidgezero.one/bracket-sorter/build/index.html)

`npx puppeteer browsers install chrome` 

`pnpm scrape-current "https://www.schustats.com/all_time" "alltime.json"` to update all-time data  
`pnpm scrape-current "https://www.schustats.com/seeding_algo" "pointintime.json"` to update point-in-time data  
`pnpm scrape-regional` to update regional data  

For all scripts, interact with the tab (click, refresh, etc) when it opens so that you aren't mistaken for a robot. Try to get it to start showing rankings within 2 minutes so that the scroll can start.

If scrapes don't work, go to the webpage, scroll all the way to the bottom, copy paste the whole page's HTML, paste into the correct file in the ./html folder, use that instead