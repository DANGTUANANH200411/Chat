import { COUNTRIES } from "./countries";

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
	phoneNumber: string;
	isFriend?: boolean;
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
	logs: MessageLog[];
	reply?: ReplyMessage;
}
export interface ReplyMessage {
	id: string;
	sender: string;
	content: string;
	isFile: boolean;
}
export interface MessageLog {
	userId: string;
	reaction: string;
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
	members: RoomMember[];
	previewMsg?: Message;
	pinMessages: Message[];
	creatorId?: string;
}

export interface RoomMember extends User{
	lastLogTime?: string;
	isRemoved?: boolean;
	invitedBy: string;
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

export enum Role {
	'Owner' = 0,
	'Vice Leader' = 1,
	'Member' = 2,
}

export type RoleType = keyof typeof Role;