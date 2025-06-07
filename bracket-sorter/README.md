you're looking for [https://pidgezero.one/bracket-sorter/build/index.html](https://pidgezero.one/bracket-sorter/build/index.html)

`npx puppeteer browsers install chrome` 

`pnpm scrape-current "https://www.schustats.com/all_time" "alltime.json"` to update all-time data  
`pnpm scrape-current "https://www.schustats.com/seeding_algo" "pointintime.json"` to update point-in-time data  
`pnpm scrape-regional` to update regional data  

For `scrape-current`, manually refresh when it opens so that you aren't mistaken for a robot. When it shows rankings data, let the autoscroller start.

If scrapes don't work, go to the webpage, scroll all the way to the bottom, copy paste the whole page's HTML, paste into the correct file in the ./html folder, use that instead