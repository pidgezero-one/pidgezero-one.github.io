import puppeteer from 'puppeteer';
import fs from 'fs';
import type { Page } from 'puppeteer';
import fetch from 'node-fetch';
import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import path from 'path';
import { pathToFileURL } from 'url';
import { Locale, Player } from '../src/types'

import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json' assert { type: 'json' };

interface CropArea {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

const stateProvinceMap: Record<string, Locale> = {
	"alabama": { country: "us", states: ["AL"] },
	"alaska": { country: "us", states: ["AK"] },
	"arizona": { country: "us", states: ["AZ"] },
	"arkansas": { country: "us", states: ["AR"] },
	"california": { country: "us", states: ["CA"] },
	"colorado": { country: "us", states: ["CO"] },
	"connecticut": { country: "us", states: ["CT"] },
	"delaware": { country: "us", states: ["DE"] },
	"florida": { country: "us", states: ["FL"] },
	"georgia": { country: "us", states: ["GA"] },
	"hawaii": { country: "us", states: ["HI"] },
	"idaho": { country: "us", states: ["ID"] },
	"illinois": { country: "us", states: ["IL"] },
	"indiana": { country: "us", states: ["IN"] },
	"iowa": { country: "us", states: ["IA"] },
	"kansas": { country: "us", states: ["KS"] },
	"kentucky": { country: "us", states: ["KY"] },
	"louisiana": { country: "us", states: ["LA"] },
	"maine": { country: "us", states: ["ME"] },
	"maryland": { country: "us", states: ["MD"] },
	"massachusetts": { country: "us", states: ["MA"] },
	"michigan": { country: "us", states: ["MI"] },
	"minnesota": { country: "us", states: ["MN"] },
	"mississippi": { country: "us", states: ["MS"] },
	"missouri": { country: "us", states: ["MO"] },
	"montana": { country: "us", states: ["MT"] },
	"nebraska": { country: "us", states: ["NE"] },
	"nevada": { country: "us", states: ["NV"] },
	"new hampshire": { country: "us", states: ["NH"] },
	"new jersey": { country: "us", states: ["NJ"] },
	"new mexico": { country: "us", states: ["NM"] },
	"new york": { country: "us", states: ["NY"] },
	"north carolina": { country: "us", states: ["NC"] },
	"north dakota": { country: "us", states: ["ND"] },
	"ohio": { country: "us", states: ["OH"] },
	"oklahoma": { country: "us", states: ["OK"] },
	"oregon": { country: "us", states: ["OR"] },
	"pennsylvania": { country: "us", states: ["PA"] },
	"rhode island": { country: "us", states: ["RI"] },
	"south carolina": { country: "us", states: ["SC"] },
	"south dakota": { country: "us", states: ["SD"] },
	"tennessee": { country: "us", states: ["TN"] },
	"texas": { country: "us", states: ["TX"] },
	"utah": { country: "us", states: ["UT"] },
	"vermont": { country: "us", states: ["VT"] },
	"virginia": { country: "us", states: ["VA"] },
	"washington": { country: "us", states: ["WA"] },
	"west virginia": { country: "us", states: ["WV"] },
	"wisconsin": { country: "us", states: ["WI"] },
	"wyoming": { country: "us", states: ["WY"] },
	"district of columbia": { country: "us", states: ["DC"] },

	// Canada
	"alberta": { country: "ca", states: ["AB"] },
	"british columbia": { country: "ca", states: ["BC"] },
	"manitoba": { country: "ca", states: ["MB"] },
	"new brunswick": { country: "ca", states: ["NB"] },
	"newfoundland and labrador": { country: "ca", states: ["NL"] },
	"nova scotia": { country: "ca", states: ["NS"] },
	"ontario": { country: "ca", states: ["ON"] },
	"prince edward island": { country: "ca", states: ["PE"] },
	"quebec": { country: "ca", states: ["QC"] },
	"saskatchewan": { country: "ca", states: ["SK"] },
	"northwest territories": { country: "ca", states: ["NT"] },
	"nunavut": { country: "ca", states: ["NU"] },
	"yukon": { country: "ca", states: ["YT"] },

	"aguascalientes": { country: "mx", states: ["AGU"] },
	"baja california": { country: "mx", states: ["BCN"] },
	"baja california sur": { country: "mx", states: ["BCS"] },
	"campeche": { country: "mx", states: ["CAM"] },
	"chiapas": { country: "mx", states: ["CHP"] },
	"chihuahua": { country: "mx", states: ["CHH"] },
	"coahuila": { country: "mx", states: ["COA"] },
	"colima": { country: "mx", states: ["COL"] },
	"durango": { country: "mx", states: ["DUR"] },
	"guanajuato": { country: "mx", states: ["GUA"] },
	"guerrero": { country: "mx", states: ["GRO"] },
	"hidalgo": { country: "mx", states: ["HID"] },
	"jalisco": { country: "mx", states: ["JAL"] },
	"estado de méxico": { country: "mx", states: ["MEX"] },
	"mexico state": { country: "mx", states: ["MEX"] },
	"estado de mexico": { country: "mx", states: ["MEX"] },
	"michoacán": { country: "mx", states: ["MIC"] },
	"michoacan": { country: "mx", states: ["MIC"] },
	"morelos": { country: "mx", states: ["MOR"] },
	"nayarit": { country: "mx", states: ["NAY"] },
	"nuevo león": { country: "mx", states: ["NLE"] },
	"nuevo leon": { country: "mx", states: ["NLE"] },
	"oaxaca": { country: "mx", states: ["OAX"] },
	"puebla": { country: "mx", states: ["PUE"] },
	"querétaro": { country: "mx", states: ["QUE"] },
	"queretaro": { country: "mx", states: ["QUE"] },
	"quintana roo": { country: "mx", states: ["ROO"] },
	"san luis potosí": { country: "mx", states: ["SLP"] },
	"san luis potosi": { country: "mx", states: ["SLP"] },
	"sinaloa": { country: "mx", states: ["SIN"] },
	"sonora": { country: "mx", states: ["SON"] },
	"tabasco": { country: "mx", states: ["TAB"] },
	"tamaulipas": { country: "mx", states: ["TAM"] },
	"tlaxcala": { country: "mx", states: ["TLA"] },
	"veracruz": { country: "mx", states: ["VER"] },
	"yucatán": { country: "mx", states: ["YUC"] },
	"yucatan": { country: "mx", states: ["YUC"] },
	"zacatecas": { country: "mx", states: ["ZAC"] },
	"cdmx": { country: "mx", states: ["CMX"] },
	"mexico city": { country: "mx", states: ["CMX"] },
	"ciudad de méxico": { country: "mx", states: ["CMX"] },

	// France
	"auvergne-rhône-alpes": { country: "fr", states: ["ARA"] },
	"auvergne rhône alpes": { country: "fr", states: ["ARA"] },
	"auvergne-rhone-alpes": { country: "fr", states: ["ARA"] },
	"auvergne rhone alpes": { country: "fr", states: ["ARA"] },
	"bourgogne-franche-comté": { country: "fr", states: ["BFC"] },
	"bourgogne franche comté": { country: "fr", states: ["BFC"] },
	"bourgogne franche-comté": { country: "fr", states: ["BFC"] },
	"bourgogne-franche-comte": { country: "fr", states: ["BFC"] },
	"bourgogne franche comte": { country: "fr", states: ["BFC"] },
	"bourgogne franche-comte": { country: "fr", states: ["BFC"] },
	"bretagne": { country: "fr", states: ["BRE"] },
	"centre-val de loire": { country: "fr", states: ["CVL"] },
	"centre-val-de-loire": { country: "fr", states: ["CVL"] },
	"corse": { country: "fr", states: ["COR"] },
	"grand est": { country: "fr", states: ["GES"] },
	"grand-est": { country: "fr", states: ["GES"] },
	"hauts-de-france": { country: "fr", states: ["HDF"] },
	"hauts de france": { country: "fr", states: ["HDF"] },
	"île-de-france": { country: "fr", states: ["IDF"] },
	"île de france": { country: "fr", states: ["IDF"] },
	"ile-de-france": { country: "fr", states: ["IDF"] },
	"ile de france": { country: "fr", states: ["IDF"] },
	"normandie": { country: "fr", states: ["NOR"] },
	"nouvelle-aquitaine": { country: "fr", states: ["NAQ"] },
	"nouvelle aquitaine": { country: "fr", states: ["NAQ"] },
	"occitanie": { country: "fr", states: ["OCC"] },
	"pays de la loire": { country: "fr", states: ["PDL"] },
	"pays-de-la-loire": { country: "fr", states: ["PDL"] },
	"provence-alpes-côte d'azur": { country: "fr", states: ["PAC"] },
	"provence alpes côte d'azur": { country: "fr", states: ["PAC"] },
	"provence-alpes-cote d'azur": { country: "fr", states: ["PAC"] },
	"provence alpes cote d'azur": { country: "fr", states: ["PAC"] },
	"guadeloupe": { country: "fr", states: ["GP"] },
	"martinique": { country: "fr", states: ["MQ"] },
	"guyane": { country: "fr", states: ["GF"] },
	"réunion": { country: "fr", states: ["RE"] },
	"reunion": { country: "fr", states: ["RE"] },
	"mayotte": { country: "fr", states: ["YT"] },

	// other
	"dfw": { country: "us", states: ["TX"] },
	"houston": { country: "us", states: ["TX"] },
	"las vegas": { country: "us", states: ["NV"] },
	"london": { country: "gb", states: ["ENG"] },
	"new south wales": { country: "au", states: ["NSW"] },
	"queensland": { country: "au", states: ["QLD"] },
	"victoria": { country: "au", states: ["VIC"] },
	"england": { country: "gb", states: ["ENG"] },
	"scotland": { country: "gb", states: ["SCT"] },
	"wales": { country: "gb", states: ["WLS"] },
	"northern ireland": { country: "gb", states: ["NIR"] },
	"norcal": { country: "us", states: ["CA"] },
	"cencal": { country: "us", states: ["CA"] },
	"sfl": { country: "us", states: ["FL"] },
	"san diego": { country: "us", states: ["CA"] },
	"southern tier": { country: "us", states: ["NY"] },
	"tarn-et-garonne": { country: "fr", states: ["OCC"] },
	"tarn et garonne": { country: "fr", states: ["OCC"] },
	"wfl": { country: "us", states: ["FL"] },
	"westchester": { country: "us", states: ["NY"] },
	"eastern washington and northern idaho": { country: "us", states: ["ID", "WA"] },
	"alabama & mississippi": { country: "us", states: ["AL", "MS"] },
	"berks county": { country: "us", states: ["PA"] },
	"boise": { country: "us", states: ["ID"] },
	"central america": { country: ["bz", "gt", "sv", "hn", "cr", "ni", "pa"] },
	"philadelphia": { country: "us", states: ["PA"] },
};


const getTokenCombinations = (input: string): string[] => {
	const words = input.trim().split(/\s+/);
	const tokens: string[] = [];

	for (let len = words.length; len >= 1; len--) {
		for (let start = 0; start <= words.length - len; start++) {
			const slice = words.slice(start, start + len).join(" ");
			tokens.push(slice);
		}
	}

	return tokens;
}

const getLocaleFromName = (n: string): Locale | undefined => {
	const name = n.toLowerCase()
	// :|
	if (name === 'georgia') {
		return stateProvinceMap['georgia']
	}
	const code = countries.getAlpha2Code(name, 'en');
	if (code) {
		return { country: code.toLowerCase() }
	}
	if (stateProvinceMap[name]) {
		return stateProvinceMap[name]
	}
	const normalized = name.replace(/\s[^\p{L}]\s/gu, " ")
	const tokens = getTokenCombinations(normalized)
	if (tokens.length > 1) {
		for (const t of tokens) {
			const code = countries.getAlpha2Code(t, 'en');
			if (code) {
				return { country: code.toLowerCase() }
			}
			if (stateProvinceMap[t]) {
				return stateProvinceMap[t]
			}
		}
	}
	return undefined;
}

async function fetchImageBuffer(url: string): Promise<Buffer> {
	const res = await fetch(url);
	return Buffer.from(await res.arrayBuffer());
}

async function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoScroll(page: Page) {
	let previousHeight = await page.evaluate(() => document.body.scrollHeight);
	let attempts = 0;

	while (attempts < 5) {
		await page.evaluate(() => {
			window.scrollTo(0, document.body.scrollHeight);
		});

		await delay(2000);

		const newHeight = await page.evaluate(() => document.body.scrollHeight);

		if (newHeight === previousHeight) {
			attempts++;
		} else {
			attempts = 0;
			previousHeight = newHeight;
		}
	}
}

function parseScore(score: string): number {
	const scoreText = score.replace(",", "")

	if (scoreText.endsWith('k')) {
		return parseFloat(scoreText.slice(0, -1)) * 1000;
	}
	return parseFloat(scoreText);
}

const rowHeight100 = 93
const playerNameWidth100 = 303
const scoreWidth100 = 142
const xCoords100 = [155, 1062, 1970, 2869, 3777]
const yCoords100 = [262,
	379,
	501,
	615,
	737,
	851,
	973,
	1091,
	1213,
	1331,
	1453,
	1567,
	1689,
	1803,
	1925,
	2043,
	2165,
	2279,
	2401,
	2519,
	2641
]

const rowHeight50 = 98
const playerNameWidth50 = 295
const scoreWidth50 = 144
const xCoords50 = [157, 1061, 1967]
const yCoords50 = [261, 377, 497, 616, 736, 854, 974, 1092, 1212, 1328, 1448, 1565, 1685, 1804, 1924, 2042, 2162, 2280]

const parseTop50 = async (img: Buffer<ArrayBufferLike>, j: number) => {
	const results: Player[] = [];

	let location = "";
	try {
		const locationBuffer = await sharp(img)
			.extract({ left: 0, top: 0, width: 2758, height: 119 })
			.toBuffer()
		const locationRes = await Tesseract.recognize(locationBuffer, 'eng');
		const locationHeaderText = locationRes.data.text.trim()
		console.log(locationHeaderText)
		const locationTokens = locationHeaderText.split(" ")
		location = locationTokens.slice(5, locationTokens.length - 1).join(" ")

	} catch (e) {
		location = `(UNPARSEABLE_LOCATION_${j})`
	}
	let rank = 1
	let skip = 0
	for (const x of xCoords50) {
		for (const y of yCoords50) {
			if (rank >= 26 && rank < 31) {
				skip++
				rank++
				continue
			}

			const playerNameCoords: CropArea = { x1: x, y1: y, x2: x + playerNameWidth50, y2: y + rowHeight50 }
			const scoreCoords: CropArea = { x1: playerNameCoords.x2, y1: y, x2: playerNameCoords.x2 + scoreWidth50, y2: y + rowHeight50 }

			const croppedBuffer1 = await sharp(img)
				.extract({ left: playerNameCoords.x1, top: playerNameCoords.y1, width: playerNameCoords.x2 - playerNameCoords.x1, height: playerNameCoords.y2 - playerNameCoords.y1 })
				.toBuffer();
			const croppedBuffer2 = await sharp(img)
				.extract({ left: scoreCoords.x1, top: scoreCoords.y1, width: scoreCoords.x2 - scoreCoords.x1, height: scoreCoords.y2 - scoreCoords.y1 })
				.toBuffer();

			const playerRes = await Tesseract.recognize(croppedBuffer1, 'eng');
			const scoreRes = await Tesseract.recognize(croppedBuffer2, 'eng');
			const score = parseScore(scoreRes.data.text.trim())
			if (isNaN(score)) {
				rank++
				continue
			}
			const name = playerRes?.data?.text?.trim()?.replace(/\s+\|$/, "")
			if (!name) {
				rank++
				continue
			}
			const locale = getLocaleFromName(location)

			console.log(rank - skip, name, score, location, locale)

			results.push({ name, score, place: rank - skip, region: location, locale })

			rank++
		}
	}
	return results
}
const parseTop100 = async (img: Buffer<ArrayBufferLike>, j: number) => {
	const results: Player[] = [];

	let location = "";
	try {
		const locationBuffer = await sharp(img)
			.extract({ left: 0, top: 0, width: 4570, height: 140 })
			.toBuffer()
		const locationRes = await Tesseract.recognize(locationBuffer, 'eng');
		const locationHeaderText = locationRes.data.text.trim()
		console.log(locationHeaderText)
		const locationTokens = locationHeaderText.split(" ")
		location = locationTokens.slice(5, locationTokens.length - 1).join(" ")

	} catch (e) {
		location = `(UNPARSEABLE_LOCATION_${j})`
	}
	let rank = 1
	let skip = 0
	for (const x of xCoords100) {
		for (const y of yCoords100) {
			if (rank >= 51 && rank < 56) {
				skip++
				rank++
				continue
			}

			const playerNameCoords: CropArea = { x1: x, y1: y, x2: x + playerNameWidth100, y2: y + rowHeight100 }
			const scoreCoords: CropArea = { x1: playerNameCoords.x2, y1: y, x2: playerNameCoords.x2 + scoreWidth100, y2: y + rowHeight100 }
			const sharpCoords1 = { left: playerNameCoords.x1, top: playerNameCoords.y1, width: playerNameCoords.x2 - playerNameCoords.x1, height: playerNameCoords.y2 - playerNameCoords.y1 }
			const sharpCoords2 = { left: scoreCoords.x1, top: scoreCoords.y1, width: scoreCoords.x2 - scoreCoords.x1, height: scoreCoords.y2 - scoreCoords.y1 }

			const croppedBuffer1 = await sharp(img)
				.extract(sharpCoords1)
				.toBuffer();
			const croppedBuffer2 = await sharp(img)
				.extract(sharpCoords2)
				.toBuffer();

			const playerRes = await Tesseract.recognize(croppedBuffer1, 'eng');
			const scoreRes = await Tesseract.recognize(croppedBuffer2, 'eng');
			const score = parseScore(scoreRes.data.text.trim())
			if (isNaN(score)) {
				rank++
				continue
			}
			const name = playerRes?.data?.text?.trim()?.replace(/\n/g, " ")?.replace(/\s+\|$/, "")
			if (!name) {
				rank++
				continue
			}
			const locale = getLocaleFromName(location)

			console.log(rank - skip, name, score, location, locale?.country, locale?.states)

			results.push({ name, score, place: rank - skip, region: location, locale })

			rank++
		}
	}
	return results
}

async function scrape(url: string) {
	countries.registerLocale(enLocale);


	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });
	await delay(3000);

	console.log('Scrolling...');
	await autoScroll(page);
	console.log('Scroll complete.');

	const imageSrcs = await page.evaluate(() => {
		return Array.from(document.querySelectorAll('div[style^="width:100vh;max-width:100%"] > img'))
			.map(img => img.getAttribute('src'))
			.filter(Boolean) as string[];
	});

	let results: { name: string; score: number, place: number, region: string, countryCode?: string }[] = [];
	for (const [j, url] of imageSrcs.entries()) {
		const img = await fetchImageBuffer(url);

		const md = await sharp(img).metadata()
		if (md.width / md.height > 3000 / 2557) {
			results = [...results, ...await parseTop100(img, j)]
		} else {
			results = [...results, ...await parseTop50(img, j)]
		}
	}

	fs.writeFileSync('./src/regional.json', JSON.stringify(results, null, 2), 'utf-8');
	console.log('Saved to regional.json');

	await browser.close();
}

//const targetURL = 'https://www.schustats.com/regional_rankings'; // Replace with actual URL
const relativePath = './html/regional.html';
const absolutePath = path.resolve(relativePath);
const targetURL = pathToFileURL(absolutePath).href;

scrape(targetURL).catch(err => {
	console.error('Scraping failed:', err);
	process.exit(1);
});