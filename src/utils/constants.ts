import { ChatRoom, Message, User } from '../utils/type';
import { newGuid } from '../utils/helper';
import { addHours, SYSTEM_NOW, toSystemDate } from './dateHelper';
const USERS: User[] = [
    {
        id: newGuid(),
        userName: 'Đặng Tuấn Anh',
    },
    {
        id: newGuid(),
        userName: 'Lê Văn Hào',
    },
    {
        id: newGuid(),
        userName: 'Trần Thái Hảo',
    },
];
const GROUP_ID: string[] = [newGuid(), newGuid()];
const MESSAGES: Message[] = [
    {
        id: newGuid(),
        groupId: GROUP_ID[0],
        sender: USERS[0].id,
        message: 'First message',
        isFile: false,
        createDate: toSystemDate(addHours(new Date(), -1)),
        lastUpdateDate: toSystemDate(addHours(new Date(), -1)),
        edited: false,
        deleted: false,
        relateId: undefined,
        logs: [],
    },
    {
        id: newGuid(),
        groupId: GROUP_ID[0],
        sender: USERS[0].id,
        message: 'First message',
        isFile: false,
        createDate: SYSTEM_NOW,
        lastUpdateDate: SYSTEM_NOW,
        edited: false,
        deleted: false,
        relateId: undefined,
        logs: [],
    },
];

const CHAT_ROOMS: ChatRoom[] = [
    {
        id: newGuid(),
        name: 'Ba thằng bạn',
        isGroup: true,
        members: USERS.map((e) => e.id),
        previewMsg: MESSAGES[0],
    },
    {
        id: newGuid(),
        name: 'Những chị em',
        isGroup: false,
        members: [],
        previewMsg: undefined,
    },
];

export { USERS, CHAT_ROOMS, MESSAGES };
