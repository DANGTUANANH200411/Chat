import { makeAutoObservable } from 'mobx';
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
    constructor() {
        makeAutoObservable(this);
        USERS.map((e) => this.users.set(e.id, e));
    }
    setTabItem = (tab: TabItemType) => (this.tabItem = tab);
    setActiveRoom = (room: string) => (this.activeRoom = room);
}
