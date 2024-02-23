import { EksiEntryDataset, Entry, Sort } from "./types";
import { stringToBoolean } from "./utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const domParser = new DOMParser();

class Yesil {
	private page = 1;
	private sort: Sort;
	/**
	 * Fetch topic page and return parsed JS object
	 * @param slug string pena--31782
	 */
	async fetchTopic(slug: string, options: { sort?: Sort; page: number }) {
		const qs = new URLSearchParams({ p: options.page.toString() });
		if (options.sort) qs.set("a", options.sort);
		const html = await fetch(`https://eksisozluk.com/${slug}?${qs}`).then((r) => r.text());
		const entries = this.parseTopicPage(html);
		if (!entries) return this.log("No entry found in page");
		console.log(entries);
	}

	/**
	 * @param html HTML element or string
	 * @returns Entry[]
	 */
	parseTopicPage(html: HTMLElement | string): Entry[] | undefined {
		// use the `html` itself if its already html element
		const dom = typeof html === "string" ? domParser.parseFromString(html, "text/html") : html;
		const entryItemsList = dom.querySelector("ul#entry-item-list");
		const entryitems = entryItemsList?.querySelectorAll("li#entry-item");
		if (!entryitems?.length) return;
		const entries: Entry[] = [];
		for (const entryEl of entryitems) {
			if (!(entryEl instanceof HTMLElement)) throw new Error("Entry item is not an HTML Element");
			const dataset = Object.fromEntries(
				Object.keys(entryEl.dataset).map((key) => [key, entryEl.dataset[key]]),
			) as unknown as EksiEntryDataset;
			// TODO validate dataset with typia or with its alternative
			const entry: Partial<Entry> = {
				id: parseInt(dataset.id),
				author: dataset.author,
				authorId: parseInt(dataset.authorId),
				commentCount: parseInt(dataset.commentCount),
				favoriteCount: parseInt(dataset.favoriteCount),
				isPinned: stringToBoolean(dataset.ispinned),
				isPinnedOnProfile: stringToBoolean(dataset.ispinnedonprofile),
			};
			// entry date; possible values: "15.02.1999", "26.04.2000 22:19", "03.07.2023 01:31 ~ 01:54" or "01.07.2023 16:48 ~ 12.07.2023 12:51". we just need publish date.
			const entryDate = entryEl.querySelector(".entry-date")?.textContent?.split("~")?.[0]?.trim();
			if (!entryDate) return;
			const date = dayjs(entryDate, ["DD.MM.YYYY HH:mm", "DD.MM.YYYY"], true);
			if (!date.isValid()) {
				this.log(`Invalid entry date for entry ${entry.id}: ${entryDate}`);
				return;
			}
			entry.entryDate = date.toDate();
			entry.content = entryEl.querySelector("div.content")?.innerHTML;
			entry.authorAvatar = (entryEl.querySelector(".avatar-container a img") as HTMLImageElement)?.src;
			entries.push(entry as Entry);
		}
		return entries;
	}

	log(...args: unknown[]) {
		console.log("[Yesil]", ...args);
	}
}

console.log(new Yesil().parseTopicPage(document.body));
