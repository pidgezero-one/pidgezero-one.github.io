import puppeteer from 'puppeteer';
import fs from 'fs';
import type { Page } from 'puppeteer';
import path from 'path';
import { pathToFileURL } from 'url';

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

async function scrape(url: string) {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });
	await delay(3000);

	console.log('Scrolling...');
	await autoScroll(page);

	console.log('Scroll complete.');

	const data = await page.evaluate(() => {

		function parseScore(score: string): number {
			const scoreText = score.replace(",", "")

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
			console.log(svgTextNodes)
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
					if (text === "Rating") {
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

	fs.writeFileSync('./src/pointintime.json', JSON.stringify(data, null, 2), 'utf-8');
	console.log('Saved to pointintime.json');

	await browser.close();
}

//const targetURL = 'https://www.schustats.com/seeding_algo';

const relativePath = './html/seeding_algo.html';
const absolutePath = path.resolve(relativePath);
const targetURL = pathToFileURL(absolutePath).href;
scrape(targetURL);
