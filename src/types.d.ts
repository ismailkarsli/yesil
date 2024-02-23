import { Yesil } from ".";

declare global {
	// biome-ignore lint/style/noVar: needs to be "var"
	var yesil: Yesil;
}

export interface YesilOptions {
	fetchEntriesDynamically: boolean;
	updateCurrentEntries: boolean;
	highlightChanges: boolean;
}

/**
 * popular: if the topic got popular, returns best of latest entries. may not return any response if the topic is not active lately.
 * nice: all time best
 * dailynice: daily best
 * null: historical order
 */
export type Sort = "popular" | "nice" | "dailynice" | null;

export interface Entry {
	id: number;
	content: string;
	entryDate: Date;
	author: string;
	authorId: number;
	authorSlug: string;
	authorAvatar?: string;
	isPinned: boolean;
	isPinnedOnProfile: boolean;
	isFavorite: boolean;
	favoriteCount: number;
	commentCount: number;
}

export interface Topic {
	entries: Entry[];
	currentPage: number;
	pageCount: number;
}

/*********************************************
 * The types below are for eksi specific types
 ********************************************/
export interface EksiEntryDataset {
	id: string;
	author: string;
	authorId: string;
	ispinned: string;
	ispinnedonprofile: string;
	isfavorite: string;
	favoriteCount: string;
	commentCount: string;
}
export interface EksiPagination {
	currentpage: string;
	pagecount: string;
}
export interface EksiAPIResponse {
	Success: boolean;
	Message: string;
}
