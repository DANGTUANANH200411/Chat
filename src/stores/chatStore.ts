import { makeAutoObservable } from 'mobx';
import {
	Attachment,
	ChatRoom,
	Message,
	MessageLog,
	ModalDetailMsgProps,
	ReactionPopupProps,
	ReactionType,
	ReactLogPopProps,
	ReplyMessage,
	TabItemType,
	User,
} from '../utils/type';
import { CHAT_ROOMS, MESSAGES } from '../utils/constants';
import { isEmpty, newGuid, toNormalize } from '../utils/helper';
import { stores } from './stores';
import { SYSTEM_NOW } from '../utils/dateHelper';
import { notify } from '../utils/notify';

type DateMessage = {
	[key: string]: Message[][];
};

export default class ChatStore {
	tabItem: TabItemType = 'All';
	chatRooms: ChatRoom[] = CHAT_ROOMS;
	messages: Message[] = [];
	activeRoom: string | undefined = undefined;

	openCreateGroup: boolean = false;

	selectedUsers: Map<string, User> = new Map();

	searchRoom: string = '';

	fetching: boolean = false;
	activePin: string | undefined = undefined;
	replyMessage: ReplyMessage | undefined = undefined;
	reactLogPopup: ReactLogPopProps = {
		visible: false,
		logs: [],
	};

	listGIF: {
		id: string;
		previewSrc: string;
		src: string;
	}[] = [];

	modalDetailMsg: ModalDetailMsgProps = {
		visible: false,
		message: undefined,
	};

	selectMessages: Set<string> = new Set();
	get Rooms() {
		if (!this.searchRoom) return this.chatRooms;
		return this.chatRooms.filter((e) => toNormalize(e.name).includes(toNormalize(this.searchRoom)));
	}
	get Room() {
		return this.getActiveRoom();
	}

	get RoomMessages() {
		if (!this.activeRoom || !this.messages || !this.messages.length) return [];
		const roomMessages = this.messages.slice().sort((a, b) => Number(b.createDate) - Number(a.createDate));
		let dayMessages: DateMessage = {};
		let group: Message[][] = [];
		let messages: Message[] = [];
		for (let i = 0; i < roomMessages.length; i++) {
			if (i === 0) {
				messages.push(roomMessages[i]);
			} else if (roomMessages[i].createDate.substring(0, 8) !== roomMessages[i - 1].createDate.substring(0, 8)) {
				group.push(messages.reverse());
				dayMessages = { ...dayMessages, [roomMessages[i - 1].createDate.substring(0, 8)]: group };
				group = [];
				messages = [roomMessages[i]];
			} else if (roomMessages[i].sender === roomMessages[i - 1].sender) {
				messages.push(roomMessages[i]);
			} else {
				group.push(messages.reverse());
				messages = [roomMessages[i]];
			}

			if (i === roomMessages.length - 1) {
				group.push(messages.reverse());
				dayMessages = { ...dayMessages, [roomMessages[i].createDate.substring(0, 8)]: group };
			}
		}
		return dayMessages;
	}

	get listIdPinned() {
		return this.Room?.pinMessages.map((e) => e.id) ?? [];
	}

	get Selecting() {
		return this.selectMessages.size > 0;
	}
	constructor() {
		makeAutoObservable(this);
	}
	//#region GET
	getActiveRoom = (room?: string) => this.chatRooms.find((e) => e.id === (room ?? this.activeRoom));

	getMessage = (id: string) => this.messages.find((e) => e.id === id);
	//#endregion GET

	//#region SET
	lockFetch = () => (this.fetching = true);
	unlockFetch = () => (this.fetching = false);
	setSearchRoom = (value: string) => (this.searchRoom = value);
	setSelectedUsers = (state: Map<string, User>) => {
		this.selectedUsers = state;
	};
	clearSelectedUsers = () => (this.selectedUsers = new Map());
	toggleCreateGroup = () => {
		this.openCreateGroup = !this.openCreateGroup;
		!this.openCreateGroup && this.clearSelectedUsers();
	};
	setTabItem = (tab: TabItemType) => (this.tabItem = tab);
	setActiveRoom = (room: string) => {
		if (this.activeRoom === room) return;
		this.activeRoom = room;
		this.onGetMessage(room);
	};
	setActivePin = (id: string | undefined) => (this.activePin = id);

	setReplyMessage = (msg: ReplyMessage | undefined) => (this.replyMessage = msg);

	setModalDetail = (state: ModalDetailMsgProps) => (this.modalDetailMsg = state);

	clearListSelectedMsg = () => this.selectMessages.clear();
	onSelectMessage = (msgId: string) =>
		this.selectMessages.has(msgId) ? this.selectMessages.delete(msgId) : this.selectMessages.add(msgId);

	//#endregion SET

	//#region FUNCTION
	onCopyGroup = () => {
		if (!this.Room) return;
		this.Room.members.forEach((user) => {
			this.selectedUsers.set(user.id, user);
		});
		this.openCreateGroup = true;
	};
	toggleReactLog = (logs?: MessageLog[]) => {
		this.reactLogPopup = {
			visible: logs ? true : false,
			logs: logs ?? [],
		};
	};

	pushMessage = (message: Message) => {
		this.messages.push(message);

		let room = this.getActiveRoom();
		if (room) room.previewMsg = message;
		if (message.reply) this.replyMessage = undefined;
		document.querySelector('.chat-body-view')?.scrollTo({ top: 0 });
	};
	//#endregion FUNCTION

	//#region FAKE BACKEND
	fakeFetchMessage = async (roomId: string, skip: number) => {
		return MESSAGES.filter((e) => e.groupId === roomId)
			.sort((a, b) => b.createDate.localeCompare(a.createDate))
			.splice(skip, 20);
	};
	fakeFetchPinMessage = async (id: string, roomId: string, skip: number) => {
		const listMsg = MESSAGES.filter((e) => e.groupId === roomId).sort((a, b) =>
			b.createDate.localeCompare(a.createDate)
		);
		const idx = listMsg.findIndex((e) => e.id === id);
		return listMsg.splice(skip, Math.min(idx + 20 - skip, listMsg.length));
	};
	//#endregion FAKE BACKEND

	//#region API
	onSearchGIF = async (searchTxt: string) => {
		const apikey = 'LIVDSRZULELA';
		const lmt = 30;
		const url = `https://g.tenor.com/v1/search?q=${searchTxt}&key=${apikey}&limit=${lmt}`;

		await fetch(url, { headers: { method: 'GET' } })
			.then((res) => res.json())
			.then(
				(res) =>
					(this.listGIF = res.results?.map((e: any) => ({
						id: e.id,
						previewSrc: e.media[0].nanogif.url,
						src: e.media[0].tinygif.url,
					})))
			);
	};
	onGetMessage = async (roomId?: string) => {
		const room = roomId ?? this.activeRoom;
		if (this.fetching || !room) return;
		this.lockFetch();
		const skip = roomId ? 0 : this.messages.length;
		let result: Message[] = [];
		try {
			result = await this.fakeFetchMessage(room, skip);
			if (roomId) {
				this.messages = result;
			} else {
				this.messages.push(...result);
			}
		} catch (err) {
			console.log(err);
			result = [];
		} finally {
			this.unlockFetch();
			return result;
		}
	};
	onSendMessage = (content: string, isFile?: boolean, files?: any[]) => {
		const activeRoom = this.activeRoom;
		if (!activeRoom || (isEmpty(content) && (!files || !files.length))) return;
		const message: Message = {
			id: newGuid(),
			groupId: activeRoom,
			sender: stores.appStore.user.id,
			content,
			isFile: !!isFile,
			createDate: SYSTEM_NOW(),
			lastUpdateDate: SYSTEM_NOW(),
			recalled: false,
			deleted: false,
			logs: [],
			reply: this.replyMessage,
			attachment: files,
		};
		this.pushMessage(message);
	};

	onSendFile = (file: Attachment, error?: boolean) => {
		const activeRoom = this.activeRoom;
		if (!activeRoom || isEmpty(file.data)) return;
		const message: Message = {
			id: newGuid(),
			groupId: activeRoom,
			sender: stores.appStore.user.id,
			content: file.name,
			isFile: true,
			data: file.data,
			fileSize: file.size,
			createDate: SYSTEM_NOW(),
			lastUpdateDate: SYSTEM_NOW(),
			recalled: false,
			deleted: false,
			logs: [],
			reply: undefined,
			error,
		};

		this.pushMessage(message);
	};

	onCreateGroup = (group: ChatRoom) => {
		const { $$ } = stores.appStore;
		try {
			if (!group.name) {
				notify($$('invalid-group-name'), 'warning');
				return;
			} else if (this.selectedUsers.size < 2) {
				notify($$('invalid-group-members'), 'warning');
				return;
			}
			group.members = Array.from(this.selectedUsers.values()).map((e) => ({
				...e,
				invitedBy: stores.appStore.user.id,
			}));
			// Call API
			//then

			this.chatRooms = [...this.chatRooms, group];
			this.toggleCreateGroup();
			notify($$('create-success'), 'success');
		} catch {
			notify($$('create-failed'), 'error');
		}
	};

	onPinMessage = (message: Message) => {
		const room = this.getActiveRoom();
		if (!room) return;
		if (room.pinMessages.find((e) => e.id === message.id)) {
			//Unpin
			room.pinMessages = room.pinMessages.filter((e) => e.id !== message.id);
		} else {
			//Pin
			room.pinMessages = [...(room.pinMessages ?? []), message];
		}
	};

	onChangeLabel = (roomId: string, label: string) => {
		const room = this.getActiveRoom(roomId);
		room!.label = label;
	};
	addFriendToGroup = () => {
		const room = this.getActiveRoom();
		if (!room) return;
		room.members = [
			...room.members,
			...Array.from(this.selectedUsers.values()).map((e) => ({ ...e, invitedBy: stores.appStore.user.id })),
		];
	};
	handleReaction = (id: string, reaction: string) => {
		const userId = stores.appStore.user.id;
		const log: MessageLog = {
			userId,
			reactionDate: SYSTEM_NOW(),
			reaction,
		};
		let message = this.messages.find((e) => e.id === id);
		if (message) {
			let oldLog = message.logs.find((e) => e.userId === userId);
			if (oldLog) {
				if (oldLog.reaction === log.reaction) {
					//Remove
					message.logs = message.logs.filter((e) => e.userId !== userId);
				} else {
					//Update
					message.logs = message.logs.map((e) => (e.userId === userId ? log : e));
				}
			} else {
				// Add
				message.logs = [...message.logs, log];
			}
		}
	};

	onDeleteMessage = (id: string) => {
		const message = this.getMessage(id);
		message!.deleted = true;
	};

	scrollToMessage = async (id: string) => {
		this.setActivePin(id);
		if (!this.activeRoom || this.messages.some((e) => e.id === id)) return;
		this.lockFetch();
		try {
			const res = await this.fakeFetchPinMessage(id, this.activeRoom, this.messages.length);
			this.messages.push(...res);
		} catch (err) {
			console.log(err);
		} finally {
			this.unlockFetch();
		}
	};
	//#endregion API
}
