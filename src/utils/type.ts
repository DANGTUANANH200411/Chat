export interface I18n {
	messages: Record<string, Record<string, any>>;
	lang: (module: string | Record<string, any>, name: string, args?: any[] | Record<string, any>) => string;
}
export type LangType = 'vi' | 'en';

export enum TabItem {
	All = 'All',
	Unread = 'Unread',
}
export type TabItemType = keyof typeof TabItem;
export type Gender = 'Male' | 'Female';
export interface User {
	id: string;
	userName: string;
	gender: Gender;
	label?: string;
	imageSrc?: string;
}

export interface Message {
	id: string;
	groupId: string;
	sender: string;
	content: string;
	isFile: boolean;
	fileSize?: number;
	createDate: string;
	lastUpdateDate: string;
	edited: boolean;
	deleted: boolean;
	relateId?: string; //relate message
	logs: MessageLog[];
}
export interface MessageLog {
	userId: string;
	reaction: keyof typeof Reaction;
	reactionDate: string;
}

export enum Reaction {
	LIKE = 'LIKE',
	LOVE = 'LOVE',
	WOW = 'WOW',
	ANGRY = 'ANGRY',
	SAD = 'SAD',
}

export type ReactionType = keyof typeof Reaction;
export interface ChatRoom {
	id: string;
	name: string;
	isGroup: boolean;
	label?: string;
	image?: string;
	members: User[];
	previewMsg?: Message;
	pinMessages: Message[];
}

export interface Label {
	id: string;
	name: string;
	color?: string;
}

export interface ReactionPopupProps {
	visible: boolean;
	x: number;
	y: number;
	id: string | undefined;
}