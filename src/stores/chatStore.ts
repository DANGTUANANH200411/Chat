import { makeAutoObservable, toJS } from 'mobx';
import { ChatRoom, Message, TabItemType, User } from '../utils/type';
import { CHAT_ROOMS, MESSAGES, USERS } from '../utils/constants';

export default class ChatStore {
	tabItem: TabItemType = 'All';
	chatRooms: ChatRoom[] = CHAT_ROOMS;
	users: Map<string, User> = new Map<string, User>();
	messages: Message[] = MESSAGES;

	activeRoom: string | undefined = undefined;
	get Room() {
		return this.chatRooms.find((e) => e.id === this.activeRoom);
	}

	get RoomMessages() {
		if (!this.activeRoom) return [];
		const roomMessages = this.messages
			.filter((e) => e.groupId === this.activeRoom)
			.sort((a, b) => Number(a.createDate) - Number(b.createDate));
		if (!roomMessages.length) return [];
		const group: Message[][] = [];
		let messages: Message[] = [];
		messages.push(roomMessages[0]);
		for (let i = 1; i < roomMessages.length; i++) {
			if (roomMessages[i].sender === roomMessages[i - 1].sender) {
				messages.push(roomMessages[i]);
				if (i === roomMessages.length - 1) {
					group.push([...messages]);
				}
			} else {
				group.push([...messages]);
				messages = [roomMessages[i]];
				if (i === roomMessages.length - 1) {
					group.push([...messages]);
				}
			}
		}
		return group;
	}
	constructor() {
		makeAutoObservable(this);
		USERS.map((e) => this.users.set(e.id, e));
	}
	getUserById = (id: string) => {
		return this.users.get(id);
	};

	getUserName = (id: string) => {
		return this.users.get(id)?.userName ?? 'Unknown';
	};
	setTabItem = (tab: TabItemType) => (this.tabItem = tab);
	setActiveRoom = (room: string) => (this.activeRoom = room);
}
