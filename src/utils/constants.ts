import { ChatRoom, Message, User } from '../utils/type';
import { newGuid } from '../utils/helper';
import { addHours, addMinutes, SYSTEM_NOW, toSystemDate } from './dateHelper';

const USERS: User[] = [
	{
		id: newGuid(),
		userName: 'Spider man',
		gender: 'Male',
		imageSrc: 'Spiderman.jpg',
	},
	{
		id: newGuid(),
		userName: 'Iron man',
		gender: 'Male',
		imageSrc: 'Ironman.jpg',
	},
	{
		id: newGuid(),
		userName: 'Elizabeth Olsen',
		gender: 'Female',
		imageSrc: 'ElizabethOlsen.avif',
	},
	{
		id: newGuid(),
		userName: 'Scarlett Johansson',
		gender: 'Female',
		imageSrc: 'ScarlettJohansson.jpg',
	},
	{
		id: newGuid(),
		userName: 'Black Panther',
		gender: 'Male',
		imageSrc: 'BlackPanther.jpg',
	},
];
const GROUP_ID: string[] = [newGuid(), newGuid()];
const MESSAGES: Message[] = [
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: 'First message heheheheh',
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
		content: '1234217894217893',
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -45)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -45)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[1].id,
		content: 'Replly',
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -30)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -30)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[2].id,
		content: 'Replly',
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
		id: GROUP_ID[0],
		name: 'Ba thằng bạn',
		isGroup: true,
		members: USERS.map((e) => e.id),
		previewMsg: MESSAGES.at(-1),
	},
	{
		id: GROUP_ID[1],
		name: 'Những chị em',
		isGroup: false,
		members: [],
		previewMsg: undefined,
	},
];

export { USERS, CHAT_ROOMS, MESSAGES };
