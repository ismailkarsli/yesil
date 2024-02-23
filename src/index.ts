import { EksiEntryDataset, EksiPagination, Entry, Sort, Topic, YesilOptions } from "./types";
import {
	YesilError,
	createEntryElement,
	getElementByXpath,
	isEksiEntryPath,
	isEksiSlug,
	isElementInViewport,
	stringToBoolean,
	stringToHtmlElement,
} from "./utils";
import { assert, assertGuard, is } from "typia";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const browserApi = "browser" in globalThis ? browser : chrome;

const domParser = new DOMParser();

export class Yesil {
	private shouldDebug: boolean;
	private options: YesilOptions;
	private slug: string;
	private currentPage: number;
	private pageCount: number;
	private sort: Sort;
	private day?: string;
	private entries: Entry[];
	private newEntriesFromNewPage = false; // if true, add a "-- new page --" seperator before newly added entries.
	private intervalPeriod = 5000;
	// highlight newly added/updated elements but if its within user viewport. for that, we listen scroll event and check it.
	private highlightElementQueue: Array<HTMLElement> = [];

	constructor(options: YesilOptions) {
		this.options = options;
		this.shouldDebug = globalThis.localStorage.getItem("YESIL_PLUGIN_DEBUG") === "true";
		this.intervalPeriod = parseInt(globalThis.localStorage.getItem("YESIL_PLUGIN_INTERVAL_PERIOD") ?? "5000") || 5000; // in case of NaN
		const url = new URL(globalThis.location.href);
		const slug = assert<string>(url.pathname.replace("/", ""));
		if (!(isEksiSlug(slug) || isEksiEntryPath(url.pathname))) {
			throw new YesilError("Page is not a topic or entry page.", { type: "NOT_APPLICABLE" });
		}
		const page = this.parseTopicPage(document.body);
		if (!page) throw new YesilError("Page doesn't have any entries in it.", { type: "NOT_APPLICABLE" });
		this.slug = slug;
		this.sort = assert<Sort>(url.searchParams.get("a"));
		this.currentPage = page.currentPage;
		this.pageCount = page.pageCount;
		this.day = assert<string | null>(url.searchParams.get("day")) ?? undefined;
		this.entries = page.entries;
		if (this.options.fetchEntriesDynamically || this.options.updateCurrentEntries) {
			setInterval(this.refreshPage.bind(this), this.intervalPeriod);
		}
		if (this.options.highlightChanges) {
			globalThis.addEventListener("scroll", this.checkHighlightElements.bind(this), false);
		}
	}

	async refreshPage() {
		const page = await this.fetchTopicPage(this.slug, { page: this.currentPage, sort: this.sort, day: this.day });
		if (!page) return;
		// update old entries, add new ones
		for (const newEntry of page.entries) {
			const oldEntry = this.entries.find((oe) => oe.id === newEntry.id);
			if (oldEntry) {
				if (!this.options.updateCurrentEntries) continue;
				this.updateEntryElement(newEntry);
				continue;
			}
			if (this.options.fetchEntriesDynamically) {
				if (this.newEntriesFromNewPage) {
					const newPageSeperator = stringToHtmlElement<HTMLDivElement>(
						`<li>
						<div style="border-bottom: 1px dashed #9ca3af; text-align: center; font-weight: bold; color: #9ca3af;">
							${page.pageCount}. SAYFA
						</div>
					</li>`,
					);
					const entryItemsList = document.querySelector("ul#entry-item-list") as HTMLUListElement;
					if (!entryItemsList) throw new YesilError("Entry item list not found", { type: "ELEMENT_NOT_FOUND" });
					entryItemsList.append(newPageSeperator);
					this.newEntriesFromNewPage = false;
				}
				this.addEntryElement(newEntry);
				this.entries.push(newEntry);
			}
		}
		if (this.options.fetchEntriesDynamically) {
			const oldPage = this.currentPage;
			const oldPageCount = this.pageCount;
			this.currentPage = page.currentPage;
			this.pageCount = page.pageCount;
			// if we're in last page and there's new page, change current page to that.
			const lastPage = oldPage === oldPageCount;
			if (lastPage && this.pageCount > oldPageCount) {
				this.debug("new page appeared, switching to that.", this.pageCount);
				this.currentPage += 1;
				this.newEntriesFromNewPage = true;
				const url = new URL(globalThis.location.href);
				url.searchParams.set("p", this.currentPage.toString());
				globalThis.history.replaceState(null, "", `?${url.searchParams.toString()}`);
			}
			if (oldPageCount !== this.pageCount) {
				this.updatePaginations({ currentPage: this.currentPage, pageCount: this.pageCount });
			}
		}
	}
	/**
	 * Fetch topic page and return parsed JS object
	 * @param slug string pena--31782
	 */
	private async fetchTopicPage(slug: string, options: { sort?: Sort; page: number; day?: string }) {
		const qs = new URLSearchParams({ p: options.page.toString() });
		if (options.sort) qs.set("a", options.sort);
		if (options.day) qs.set("day", options.day);
		const html = await fetch(`https://eksisozluk.com/${slug}?${qs}`).then((r) => r.text());
		const page = this.parseTopicPage(html);
		if (!page) {
			this.log("No entry found in page");
			return;
		}
		return page;
	}

	/**
	 * @param html HTML element or string
	 * @returns Entry[]
	 */
	private parseTopicPage(html: HTMLElement | string): Topic | undefined {
		// use the `html` itself if its already html element
		const dom = typeof html === "string" ? domParser.parseFromString(html, "text/html") : html;
		const topic: Topic = {
			entries: [],
			currentPage: 1,
			pageCount: 1,
		};
		// pagination
		const pager = dom.querySelector("section#content-body #topic .pager");
		if (pager instanceof HTMLDivElement) {
			const { currentpage, pagecount } = assert<EksiPagination>(pager.dataset);
			topic.currentPage = parseInt(currentpage);
			topic.pageCount = parseInt(pagecount);
		}
		// entries
		const entryItemsList = dom.querySelector("ul#entry-item-list");
		const entryitems = entryItemsList?.querySelectorAll("li#entry-item");
		if (!entryitems?.length) return;
		for (const entryEl of entryitems) {
			if (!(entryEl instanceof HTMLLIElement)) {
				throw new YesilError("Entry is not a HTMLLiElement", { type: "ELEMENT_WRONG_TYPE" });
			}
			const dataset = Object.fromEntries(Object.keys(entryEl.dataset).map((key) => [key, entryEl.dataset[key]]));
			assertGuard<EksiEntryDataset>(dataset);
			const entry: Partial<Entry> = {
				id: parseInt(dataset.id),
				author: dataset.author,
				authorId: parseInt(dataset.authorId),
				commentCount: parseInt(dataset.commentCount),
				favoriteCount: parseInt(dataset.favoriteCount),
				isFavorite: stringToBoolean(dataset.isfavorite),
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
			entry.authorSlug = (entryEl.querySelector("a.entry-author") as HTMLLinkElement).href.split("/").at(-1);
			topic.entries.push(assert<Entry>(entry));
		}
		return topic;
	}

	private updateEntryElement(entry: Entry) {
		const el = document.querySelector(`ul#entry-item-list li#entry-item[data-id='${entry.id}']`) as HTMLLIElement;
		if (!el) {
			this.debug("entry element not found");
			return;
		}
		const contentEl = el.querySelector("div.content") as HTMLDivElement;
		if (contentEl && contentEl.innerHTML !== entry.content) {
			this.debug("updated entry content", contentEl);
			contentEl.innerHTML = entry.content;
			this.highlightElement(contentEl);
		}
		const favCountEl = el.querySelector(".favorite-count") as HTMLLinkElement;
		if (favCountEl && entry.favoriteCount && favCountEl.innerText !== entry.favoriteCount.toString()) {
			this.debug("updated fav count", contentEl, favCountEl);
			favCountEl.innerText = entry.favoriteCount.toString();
			favCountEl.style.display = "inline";
			this.highlightElement(favCountEl);
		}
	}

	private addEntryElement(entry: Entry) {
		const el = createEntryElement(entry);
		const entryItemsList = document.querySelector("ul#entry-item-list");
		if (!entryItemsList) throw new YesilError("Entry item list not found", { type: "ELEMENT_NOT_FOUND" });
		this.debug("new entry added", el);
		const appended = entryItemsList.appendChild(el);
		const like = appended.querySelector<HTMLLinkElement>("a.like");
		const dislike = appended.querySelector<HTMLLinkElement>("a.dislike");
		const favorite = appended.querySelector<HTMLLinkElement>("a.favorite-link");
		if (!(like && dislike && favorite)) {
			throw new YesilError(
				`like, dislike or favorite elements not found: ${JSON.stringify({ like, dislike, favorite })}`,
				{ type: "ELEMENT_NOT_FOUND" },
			);
		}
		// bind event listeners
		like.addEventListener("click", async () => {
			const liked = like.classList.toggle("voted");
			await this.voteEntry(entry.id, liked ? 1 : 0, entry.authorId);
		});
		dislike.addEventListener("click", async () => {
			const disliked = dislike.classList.toggle("voted");
			await this.voteEntry(entry.id, disliked ? -1 : 0, entry.authorId);
		});
		favorite.addEventListener("click", async () => {
			const favorited = favorite.classList.toggle("favorited");
			await this.favoriteEntry(entry.id, favorited);
		});
		this.highlightElement(appended);
	}

	/**
	 * @param rate 1 like, 0 remove vote, -1 dislike
	 */
	private async voteEntry(entryId: number, rate: 1 | 0 | -1, authorId: number) {
		const remove = rate === 0;
		const payload = new URLSearchParams();
		payload.set("id", entryId.toString());
		payload.set("owner", authorId.toString());
		payload.set("rate", (remove ? 1 : rate).toString());
		await fetch(`/entry/${remove ? "removevote" : "vote"}`, {
			method: "POST",
			body: payload,
			headers: {
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				"x-requested-with": "XMLHttpRequest",
			},
		});
		this.debug(`${remove ? "removed" : rate === 1 ? "liked" : "disliked"} entry with id ${entryId}`);
		return true;
	}

	private async favoriteEntry(entryId: number, fav: boolean) {
		const payload = new URLSearchParams();
		payload.set("entryId", entryId.toString());
		await fetch(`/entry/${fav ? "favla" : "favlama"}`, {
			method: "POST",
			body: payload,
			headers: {
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				"x-requested-with": "XMLHttpRequest",
			},
		});
		return true;
	}

	private updatePaginations({ currentPage, pageCount }: { currentPage: number; pageCount: number }) {
		const paginations = document.querySelectorAll("div.pager") as NodeListOf<HTMLDivElement>;
		for (const pag of paginations) {
			pag.dataset.currentpage = currentPage.toString();
			pag.dataset.pagecount = pageCount.toString();
			// add new pages to select input
			const selectInput = pag.querySelector("select") as HTMLSelectElement;
			if (!selectInput) throw new YesilError("couldn't found select input", { type: "ELEMENT_NOT_FOUND" });
			for (const page of Array.from({ length: pageCount }, (x, i) => i + 1)) {
				let option = getElementByXpath<HTMLOptionElement>(`//option[text()='${page}']`, selectInput);
				if (!option) {
					this.debug(`added new page option to the pagination: ${page}`, pag);
					option = stringToHtmlElement<HTMLOptionElement>(`<option>${page}</option>`);
					option = selectInput.appendChild(option);
				}
				if (currentPage.toString() === option.innerText) {
					option.selected = true;
				}
			}
			// modify prev/next and last page
			const prev = pag.querySelector<HTMLLinkElement>("a.prev");
			if (prev) prev.href = `?p=${currentPage - 1}`;
			const next = pag.querySelector<HTMLLinkElement>("a.next");
			if (next) next.href = `?p=${currentPage + 1}`;
			// if there is no next element, for example we were in last page, create it and append
			else if (currentPage !== pageCount) {
				const newNext = stringToHtmlElement<HTMLLinkElement>(
					`<a class="next" href="?p=${currentPage + 1}" rel="prev" title="sonraki sayfa">»</a>`,
				);
				pag.append(newNext);
			}
			const last = pag.querySelector("a.last") as HTMLLinkElement;
			if (last) {
				last.innerText = pageCount.toString();
				last.href = `?p=${pageCount}`;
			}
		}
	}

	private checkHighlightElements() {
		for (const i in this.highlightElementQueue) {
			const el = this.highlightElementQueue[i];
			if (isElementInViewport(el)) {
				el.style.transition = "border-color 500ms ease-in-out, background 500ms ease-in-out";
				el.style.borderStyle = "dashed";
				el.style.borderWidth = "1px";
				el.style.borderColor = "rgba(83, 162, 69, 0.5)";
				el.style.background = "rgba(83, 162, 69, 0.3)";
				setTimeout(() => {
					el.style.borderColor = "rgba(83, 162, 69, 0)";
					el.style.background = "rgba(83, 162, 69, 0)";
				}, 3000);
				this.highlightElementQueue.splice(parseInt(i), 1);
			}
		}
	}

	private highlightElement(el: HTMLElement) {
		if (!this.options.highlightChanges) return;
		this.highlightElementQueue.push(el);
		this.checkHighlightElements();
	}

	debug(...args: unknown[]) {
		if (!this.shouldDebug) return;
		console.debug("%c[Yesil] %cDEBUG", "color: #53a245;", "color: #FFA500;", ...args);
	}
	log(...args: unknown[]) {
		console.log("%c[Yesil]", "color: #53a245;", ...args);
	}
}

try {
	const optionsWithDefaults = {
		fetchEntriesDynamically: true,
		updateCurrentEntries: true,
		highlightChanges: true,
	} satisfies YesilOptions;
	browserApi.storage.local.get(optionsWithDefaults).then((options) => {
		if (is<YesilOptions>(options)) {
			globalThis.yesil = new Yesil(options);
		} else {
			globalThis.yesil = new Yesil(optionsWithDefaults);
		}
	});
} catch (e) {
	const debug = globalThis.localStorage.getItem("YESIL_PLUGIN_DEBUG") === "true";
	if (e instanceof YesilError) {
		if (e.type === "NOT_APPLICABLE") {
			if (debug) console.debug("%c[Yesil] DEBUG", "color: #FFA500;", e.type, e.message);
		} else {
			console.error("%c[Yesil] DEBUG", "color: #ff0000;", e); // always log unexpected errors
		}
	} else throw e;
}
