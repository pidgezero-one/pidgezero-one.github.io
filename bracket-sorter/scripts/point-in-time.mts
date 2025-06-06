import puppeteere from 'puppeteer-extra';
import fs from 'fs';
import type { Page } from 'puppeteer';
import path from 'path';
import { pathToFileURL } from 'url';
import UserAgent from 'user-agents';
import plugin from 'puppeteer-extra-plugin-stealth'

const puppeteer = puppeteere.default
puppeteer.use(plugin())

async function clearCookies(page: Page, cookieNames: string[] = []): Promise<boolean> {
	try {
		const allCookies = await page.cookies();

		if (cookieNames.length === 0) {
			// Delete all cookies
			const deletable = allCookies.map(({ name, domain, path }) => ({
				name,
				domain,
				path: path || '/',
			}));
			await page.deleteCookie(...deletable);
		} else {
			// Delete specific cookies
			const toDelete = allCookies
				.filter((c) => cookieNames.includes(c.name))
				.map(({ name, domain, path }) => ({
					name,
					domain,
					path: path || '/',
				}));
			await page.deleteCookie(...toDelete);
		}

		return true;
	} catch (error) {
		console.error('Error clearing cookies:', error);
		return false;
	}
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

async function scrape(url: string, outputFilename: string) {
	const browser = await puppeteer.launch({ devtools: true });
	const page = await browser.newPage();
	await clearCookies(page)
	await page.setUserAgent(UserAgent.toString())
	await page.goto("https://www.schustats.com/api/auth/session", { waitUntil: 'networkidle0', timeout: 120000 });

	await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });
	await delay(3000);

	console.log('Scrolling...');
	await autoScroll(page);

	console.log('Scroll complete.');

	const data = await page.evaluate(() => {

		function parseScore(score: string): number {
			const scoreText = score.replace(",", "")

			if (scoreText.endsWith('M')) {
				return parseFloat(scoreText.slice(0, -1)) * 1000000;
			}
			if (scoreText.endsWith('k')) {
				return parseFloat(scoreText.slice(0, -1)) * 1000;
			}
			return parseFloat(scoreText);
		}
		const results: { name: string; score: number; countryCode?: string }[] = [];

		const containers = Array.from(document.querySelectorAll('div[style^="position: relative; width: 100%; z-index: -1"]'));

		for (let i = 0; i < containers.length; i++) {
			const container = containers[i]
			const svgTextNodes = container.querySelectorAll('svg text');
			let rankFound = false
			let tag = ""
			let lastText = ""
			let score = 0
			for (const sNode of svgTextNodes) {
				const text = sNode.textContent?.trim()
				if (!text) {
					continue
				}
				if (!rankFound) {
					const findRank = text.match(/^\d+/);
					if (findRank) {
						rankFound = true
					}
					const remainder = text.replace(/^\d+/, "").trim();
					if (remainder) {
						tag = remainder
					}
				} else {
					if (text === "Rating" || text === "Points") {
						if (lastText.length > 0) {
							score = parseScore(lastText)
							tag = tag.slice(0, -1 * lastText.length)
						}
					} else {
						tag += text
					}
				}
				lastText = text
			}

			const flagSpan = container.querySelector('span.flag-icon');
			let countryCode;
			if (flagSpan) {
				const match = flagSpan.className.match(/flag-icon-([a-z]{2})/);
				if (match) {
					countryCode = match[1];
				}
			}

			results.push({ name: tag, score, countryCode });
		}

		return results;
	});

	fs.writeFileSync(`./src/${outputFilename}`, JSON.stringify(data, null, 2), 'utf-8');
	console.log(`Saved to ${outputFilename}`);

	await browser.close();
}

//const targetURL = 'https://www.schustats.com/seeding_algo';
/*const relativePath = './html/seeding_algo.html';
const absolutePath = path.resolve(relativePath);
const targetURL = pathToFileURL(absolutePath).href;*/
const [, , urlArg, outputArg] = process.argv;

if (!urlArg || !outputArg) {
	console.error("Usage: scrape-current <url> <outputFilename>");
	process.exit(1);
}

scrape(urlArg, outputArg);

