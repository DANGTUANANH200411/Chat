import { makeAutoObservable } from 'mobx';
import { ChatRoom, Message, ReactionPopupProps, TabItemType, User } from '../utils/type';
import { CHAT_ROOMS, IS_FIREFOX, MESSAGES, USERS } from '../utils/constants';
import { newGuid } from '../utils/helper';
import { stores } from './stores';
import { SYSTEM_NOW } from '../utils/dateHelper';
import { notify } from '../utils/notify';

type DateMessage = {
	[key: string]: Message[][];
};

export default class ChatStore {
	tabItem: TabItemType = 'All';
	chatRooms: ChatRoom[] = CHAT_ROOMS;
	users: Map<string, User> = new Map<string, User>();
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

	get Room() {
		return this.chatRooms.find((e) => e.id === this.activeRoom);
	}
	get Users() {
		const { user } = stores.appStore;
		return Array.from(this.users.values()).filter((e) => e.id !== user.id);
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
		USERS.map((e) => this.users.set(e.id, e));
	}
	setSelectedUsers = (state: Map<string, User>) => {
		this.selectedUsers = state;
	};
	toggleCreateGroup = () => {
		this.openCreateGroup = !this.openCreateGroup;
		if (!this.openCreateGroup) {
			this.selectedUsers = new Map();
		}
	};
	getUserById = (id: string) => {
		return this.users.get(id);
	};

	getUserName = (id: string | undefined) => {
		if (!id) return 'Unknown';
		return this.users.get(id)?.userName ?? 'Unknown';
	};
	setTabItem = (tab: TabItemType) => (this.tabItem = tab);
	setActiveRoom = (room: string) => (this.activeRoom = room);

	setReactionPopup = (state: ReactionPopupProps) => (this.reactionPopup = state);

	onCopyGroup = () => {
		if (!this.Room) return;
		this.Room.members.forEach((user) => {
			this.selectedUsers.set(user.id, user);
		});
		this.openCreateGroup = true;
	};
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
		let room = this.chatRooms.find((e) => e.id === this.activeRoom);
		if (room) room.previewMsg = message;
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
			group.members = Array.from(this.selectedUsers.values());
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
		const room = this.chatRooms.find((e) => e.id === this.activeRoom);
		if (!room) return;
		if (room.pinMessages.find((e) => e.id === message.id)) {
			//Unpin
			room.pinMessages = room.pinMessages.filter((e) => e.id !== message.id);
		} else {
			//Pin
			room.pinMessages = [...(room.pinMessages ?? []), message];
		}
	};
	scrollToMessage = (id: string) => {
		const msg = document.getElementById(id);
		document.querySelector('.forcus')?.classList.remove('forcus');
		if (msg) {
			IS_FIREFOX ? (msg as any).scrollIntoView() : (msg as any).scrollIntoViewIfNeeded();
			msg.classList.add('forcus');
		}
	};
}
