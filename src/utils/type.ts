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
	alias?: string;
}

export interface Message extends DynamicMessage {
	id: string;
	groupId: string;
	sender: string;
	createDate: string;
	lastUpdateDate: string;
}

export interface DynamicMessage extends FileMessageProps {
	content: string;
	recalled?: boolean;
	deleted?: boolean;
	logs?: MessageLog[];
	reply?: ReplyMessage;
	attachment?: Attachment[];
	error?: boolean;
	announce?: Announce;
	isNameCard?: boolean;
	poll?: Poll;
}
export interface FileMessageProps {
	isFile?: boolean;
	/** @deprecated Temporary for display image only FE */
	data?: any;
	fileSize?: number;
}
export interface ReplyMessage {
	id: string;
	sender: string;
	content: string;
	/** @deprecated Temporary for display image only FE */
	data?: any;
	isFile?: boolean;
	isNameCard?: boolean;
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
	pinMessages?: Message[];
	creatorId?: string;
	pinned?: boolean;
	unread: number;
	setting: GroupManagement;
}

export interface RoomMember extends User {
	lastLogTime?: string;
	isRemoved?: boolean;
	invitedBy: string;
	role: RoleType;
	joinDate: string;
}
export interface Label {
	id: string;
	name: string;
	color?: string;
}

export enum Role {
	'Owner' = 0,
	'Admin' = 1,
	'Member' = 2,
}

export type RoleType = keyof typeof Role;

export interface ReactLogPopProps {
	visible: boolean;
	logs: MessageLog[];
}

export interface Attachment {
	id: string;
	name: string;
	/** @deprecated Temporary for display image only FE */
	data: string;
	size: number;
}

export interface ModalDetailMsgProps {
	visible: boolean;
	message?: Message;
}

export type AnnouceType =
	| 'Add'
	| 'Remove'
	| 'AppointAdmin'
	| 'RemoveAdmin'
	| 'Leave'
	| 'Poll Closed'
	| 'Poll Expired'
	| 'Poll Vote';

export type DrawerType = 'Info' | 'Members' | 'Storage' | 'Board' | 'Management' | undefined;

export type StorageType = 'Photo' | 'File' | 'Link';

export type BoardType = 'Pinned' | 'Polls' | 'Notes';

export interface StorageFilter {
	sender?: string;
	startTime?: string;
	endTime?: string;
	fileType?: string;
	searchText?: string;
}

export interface StorageSelect {
	selecting: boolean;
	selected: Set<string>;
}

export interface ShareModalProps {
	open: boolean;
	items: Message[];
}
export interface ShareSelectItemProps {
	id: string;
	name: string;
	isGroup?: boolean;
	members?: RoomMember[];
	image?: string;
}

export interface CommonModalProps {
	visible: boolean;
	id?: string;
}
export interface Announce {
	userId?: string;
	type: AnnouceType;
	poll?: {
		id: string;
		title: string;
	};
}
export interface Poll {
	options: {
		id: string;
		label: string;
	}[];
	deadline?: string;
	hideVoters?: boolean;
	hideResultNotVote?: boolean;
	multiple?: boolean;
	canAddOption?: boolean;
	closed?: boolean;
	votes: {
		id: string;
		values: string[];
	}[];
}

export interface CreateAnnounceProps {
	type: AnnouceType;
	toUser?: string;
	roomId?: string;
	poll?: {
		id: string;
		title: string;
	};
}

export type AnnouceTargetObj = 'User' | 'Poll';

export interface GroupManagement extends MemberPermission {
	/** Membership approval */
	approval: boolean;
	/** Highlight message from owner/admins*/
	showSymbol: boolean;
	/** Allow new member to read most recent message */
	readRecent: boolean;
}

export interface MemberPermission {
	changeNameOrAvt: boolean;
	pin: boolean;
	createNote: boolean;
	createPoll: boolean;
	sendMessage: boolean;
}
