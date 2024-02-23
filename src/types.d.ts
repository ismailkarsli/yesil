declare global {}

/**
 * popular: if the topic got popular, returns best of latest entries. may not return response if the topic is not active lately.
 * nice: all time best
 * dailynice: daily best
 * undefined: historical order
 */
export type Sort = "popular" | "nice" | "dailynice" | undefined;

export interface Entry {
	id: number;
	content: string;
	entryDate: Date;
	author: string;
	authorId: number;
	authorAvatar?: string;
	isPinned: boolean;
	isPinnedOnProfile: boolean;
	favoriteCount: number;
	commentCount: number;
}

export interface EksiEntryDataset {
	id: string;
	author: string;
	authorId: string;
	ispinned: string;
	ispinnedonprofile: string;
	favoriteCount: string;
	commentCount: string;
}
