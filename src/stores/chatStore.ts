import { makeAutoObservable } from 'mobx';
import { ChatRoom, Message, TabItemType, User } from '../utils/type';
import { CHAT_ROOMS, MESSAGES, USERS } from '../utils/constants';
import { newGuid } from '../utils/helper';
import { stores } from './stores';
import { SYSTEM_NOW } from '../utils/dateHelper';

type DateMessage = { 
	[key: string]: Message[][];
}
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
			.filter((e) => e.groupId === this.activeRoom);
		
		if (!roomMessages.length) return [];
		roomMessages.sort((a, b) => Number(b.createDate) - Number(a.createDate));
		let dayMessages: DateMessage = {};
		let group: Message[][] = [];
		let messages: Message[] = [];
		messages.push(roomMessages[0]);
		for (let i = 1; i < roomMessages.length; i++) {
			if (roomMessages[i].createDate.substring(0,8) !== roomMessages[i - 1].createDate.substring(0,8)) {
				group.push(messages.reverse());
				dayMessages = {...dayMessages, [roomMessages[i-1].createDate.substring(0,8)] : group}
				group = [];
				messages = [roomMessages[i]];
			}else {
				if (roomMessages[i].sender === roomMessages[i - 1].sender) {
					messages.push(roomMessages[i]);
					if (i === roomMessages.length - 1) {
						group.push(messages.reverse());
						dayMessages = {...dayMessages, [roomMessages[i].createDate.substring(0,8)] : group}
					}
				} else {
					group.push(messages.reverse());
					messages = [roomMessages[i]];
					if (i === roomMessages.length - 1) {
						group.push(messages.reverse());
						dayMessages = {...dayMessages, [roomMessages[i].createDate.substring(0,8)] : group}
					}
				}
			}
			
		}
		return dayMessages;
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

	onSendMessage = (content: string) =>{
		if(!this.activeRoom) return;
		const message: Message = {
			id: newGuid(),
			groupId: this.activeRoom,
			sender:  stores.appStore.user.id,
			content,
			isFile: false,
			createDate: SYSTEM_NOW(),
			lastUpdateDate: SYSTEM_NOW(),
			edited: false,
			deleted: false,
			logs: []
		}
		this.messages = [...this.messages, message]
	}
}
