import dayjs from "dayjs";
import { Entry } from "./types";

export const stringToBoolean = (str: unknown): boolean => {
	if (str === true || str === "true") return true;
	return false;
};

export const getElementByXpath = <T extends Node>(path: string, parent?: HTMLElement): T | null => {
	const nodes = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	let node = nodes.iterateNext();
	while (node) {
		if (!parent) return node as T;
		if (parent.contains(node)) return node as T;
		node = nodes.iterateNext();
	}
	return null;
};

export const isElementInViewport = (el: HTMLElement) => {
	const rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (globalThis.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (globalThis.innerWidth || document.documentElement.clientWidth)
	);
};

export const isEksiSlug = (slug: string) => {
	return /(?<slug>[\w\d-]+)--(?<entryId>\d+)/.test(slug);
};

export const isEksiEntryPath = (path: string) => {
	return /entry\/([1-9]+)/.test(path);
};

export const createEntryElement = (entry: Entry) => {
	const liElement = `
		<li data-id="${entry.id}" data-author="${entry.author}" data-author-id="${
			entry.authorId
		}" data-flags="share msg report vote entrymodlog favorite" data-isfavorite="${entry.isFavorite}" data-ispinned="${
			entry.isPinned
		}" data-ispinnedonprofile="${entry.isPinnedOnProfile}" data-favorite-count="${
			entry.favoriteCount
		}" data-seyler-slug="" data-comment-count="${entry.commentCount}" id="entry-item" data-show="true">
			<div class="content">${entry.content}</div>
			<footer>
				<div class="feedback-container">
					<div class="feedback">
						<div class="entry-share dropdown">
							<a class="entry-share dropdown-toggle toggles" title="share">
								<svg class="eksico" id="svg-share">
									<use xlink:href="#eksico-share"></use>
								</svg>
							</a>
						</div>
						<div class="other dropdown">
							<a class="others dropdown-toggle toggles" title="diğer">
								<svg class="eksico" id="svg-dots">
									<use xlink:href="#eksico-dots"></use>
								</svg>
							</a>
							<ul class="dropdown-menu right toggles-menu">
								<!-- TODO: burası işlevsel hale getirilmeli <li><a title="mesaj gönder" aria-label="mesaj gönder">mesaj gönder</a></li> -->
								<li><a class="report-link" title="aynen öyle" href="/iletisim?RefEntryId=${entry.id}&amp;Category=Content">şikayet</a></li>
								<li><a href="/modlog?q=%23${entry.id}">modlog</a></li>
								<!-- TODO: burası işlevsel hale getirilmeli <li><a href="#">engelle</a></li> -->
							</ul>
						</div>
					</div>
					<span class="rate-options">
						<a class="like" title="şükela!">
							<span></span>
							<svg class="eksico" id="svg-chevron-up">
								<use xlink:href="#eksico-chevron-up"></use>
							</svg>
						</a>
						<a class="dislike" title="çok kötü">
							<span></span>
							<svg class="eksico" id="svg-chevron-down">
								<use xlink:href="#eksico-chevron-down"></use>
							</svg>
						</a>
					</span>
					<span class="favorite-links" style="">
						<a class="favorite-link" title="favorilere ekle" aria-label="favorilere ekle">
							<svg class="eksico">
								<use xlink:href="#eksico-drop"></use>
							</svg>
						</a>
						<a class="favorite-count toggles" style="display: none;"></a>
						<div class="favorite-list-popup toggles-menu">
							<div></div>
						</div>
					</span>
				</div>
				<div class="info">
					<div class="entry-footer-bottom">
						<div class="footer-info">
							<div id="entry-nick-container">
								<div id="entry-author"><a class="entry-author" href="/biri/${entry.authorSlug}">${entry.author}</a></div>
							</div>
							<div>
								<a class="entry-date permalink" href="/entry/${entry.id}">
									${dayjs(entry.entryDate).format("DD.MM.YYYY HH:mm")}
								</a>
							</div>
						</div>
						<div class="avatar-container">
							<a href="/biri/${entry.authorSlug}">
								<img 
									class="avatar"
									src="${entry.authorAvatar}"
									data-default="//ekstat.com/img/default-profile-picture-dark.svg"
									alt="${entry.author}" 
									title="${entry.author}">
							</a>
						</div>
					</div>
				</div>
			</footer>
			<div class="comment-summary">
				<div class="comment-pages">
				</div>
			</div>
		</li>
	`;

	return stringToHtmlElement<HTMLLIElement>(liElement);
};

export const stringToHtmlElement = <T extends HTMLElement>(html: string) => {
	const div = document.createElement("div");
	div.innerHTML = html.trim();
	return div.firstChild as T;
};

export type YesilErrorType = "NOT_APPLICABLE" | "ELEMENT_NOT_FOUND" | "ELEMENT_WRONG_TYPE" | "API_ERROR";
export class YesilError extends Error {
	public type: YesilErrorType;
	constructor(message: string, options: ErrorOptions & { type: YesilErrorType }) {
		super(message, options);
		this.type = options.type;
	}
}
