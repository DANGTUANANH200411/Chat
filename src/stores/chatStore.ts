import { makeAutoObservable } from 'mobx';
import { ChatRoom, Message, MessageLog, ReactionPopupProps, ReactionType, TabItemType, User } from '../utils/type';
import { CHAT_ROOMS, IS_FIREFOX, MESSAGES, USERS } from '../utils/constants';
import { newGuid, toNormalize } from '../utils/helper';
import { stores } from './stores';
import { SYSTEM_NOW } from '../utils/dateHelper';
import { notify } from '../utils/notify';

type DateMessage = {
	[key: string]: Message[][];
};

export default class ChatStore {
	tabItem: TabItemType = 'All';
	chatRooms: ChatRoom[] = CHAT_ROOMS;
	messages: Message[] = MESSAGES;
	activeRoom: string | undefined = undefined;

	openCreateGroup: boolean = false;
	reactionPopup: ReactionPopupProps = {
		visible: false,
		x: 0,
		y: 0,
		id: undefined,
	};

	selectedUsers: Map<string, User> = new Map();

	searchRoom: string = '';
	get Rooms() {
		if (!this.searchRoom) return this.chatRooms;
		return this.chatRooms.filter((e) => toNormalize(e.name).includes(toNormalize(this.searchRoom)));
	}
	get Room() {
		return this.getActiveRoom();
	}

	get RoomMessages() {
		if (!this.activeRoom) return [];
		const roomMessages = this.messages.filter((e) => e.groupId === this.activeRoom);

		if (!roomMessages.length) return [];
		roomMessages.sort((a, b) => Number(b.createDate) - Number(a.createDate));
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
	constructor() {
		makeAutoObservable(this);
	}
	//#region GET
	getActiveRoom = (room?: string) => this.chatRooms.find((e) => e.id === (room ?? this.activeRoom));

	getMessage = (id: string) => this.messages.find(e=> e.id === id);
	//#endregion GET

	//#region SET
	setSearchRoom = (value: string) => (this.searchRoom = value);
	setSelectedUsers = (state: Map<string, User>) => {
		this.selectedUsers = state;
	};
	clearSelectedUsers = () => this.selectedUsers = new Map();
	toggleCreateGroup = () => {
		this.openCreateGroup = !this.openCreateGroup;
		!this.openCreateGroup && this.clearSelectedUsers();
	};
	setTabItem = (tab: TabItemType) => (this.tabItem = tab);
	setActiveRoom = (room: string) => (this.activeRoom = room);
	//#endregion SET

	//#region FUNCTION
	onCopyGroup = () => {
		if (!this.Room) return;
		this.Room.members.forEach((user) => {
			this.selectedUsers.set(user.id, user);
		});
		this.openCreateGroup = true;
	};
	//#endregion FUNCTION
	
	//#region API
	onSendMessage = (content: string) => {
		if (!this.activeRoom) return;
		const message: Message = {
			id: newGuid(),
			groupId: this.activeRoom,
			sender: stores.appStore.user.id,
			content,
			isFile: false,
			createDate: SYSTEM_NOW(),
			lastUpdateDate: SYSTEM_NOW(),
			edited: false,
			deleted: false,
			logs: [],
		};
		this.messages = [...this.messages, message];
		let room = this.getActiveRoom();
		if (room) room.previewMsg = message;
		document.querySelector('.chat-body-view')?.scrollTo({ top: 0 });
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
	}
	addFriendToGroup = () => {
		const room = this.getActiveRoom();
		if (!room) return;
		room.members = [
			...room.members,
			...Array.from(this.selectedUsers.values()).map((e) => ({ ...e, invitedBy: stores.appStore.user.id })),
		];
	};
	handleReaction = (id: string, reaction: ReactionType) => {
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
	}
	//#endregion API
}
