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
export interface User {
    id: string;
    userName: string;
}
export interface Message {
    id: string;
    groupId: string;
    sender: string;
    message: string;
    isFile: boolean;
    createDate: string;
    lastUpdateDate: string;
    edited: boolean;
    deleted: boolean;
    relateId?: string; //relate message
    logs: MessageLog[];
}
export interface MessageLog {
    userName: string;
    readDate: string;
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

export interface ChatRoom {
    id: string;
    name: string;
    isGroup: boolean;
    members: string[];
    previewMsg?: Message;
}
