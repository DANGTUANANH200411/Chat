import { ChatRoom, Label, Message, User } from '../utils/type';
import { newGuid } from '../utils/helper';
import { addHours, addMinutes, NOW, SYSTEM_NOW, toSystemDate } from './dateHelper';
import IMG_LIKE from '../resources/like.png';
import IMG_HAHA from '../resources/haha.png';
import IMG_HEART from '../resources/heart.png';
import IMG_WOW from '../resources/wow.png';
import IMG_SAD from '../resources/sad.png';
import IMG_ANGRY from '../resources/angry.png';

const LABELS: Label[] = [
	{
		id: newGuid(),
		name: 'Customer',
		color: 'rgb(217, 27, 27)',
	},
	{
		id: newGuid(),
		name: 'Family',
		color: 'rgb(75, 195, 119)',
	},
	{
		id: newGuid(),
		name: 'Work',
		color: 'rgb(255, 105, 5)',
	},
	{
		id: newGuid(),
		name: 'Friend',
		color: 'rgb(111, 63, 207)',
	},
	{
		id: newGuid(),
		name: 'Reply later',
		color: 'rgb(250, 192, 0)',
	},
	{
		id: newGuid(),
		name: 'Co-worker',
		color: 'rgb(0, 104, 255)',
	},
];

const USERS: User[] = [
	{
		id: newGuid(),
		userName: 'Spider man',
		gender: 'Male',
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsMJCEL-gwuBuMZISCNc1Ln1RCxxaCfXHQCA&s',
	},
	{
		id: newGuid(),
		userName: 'Iron man',
		gender: 'Male',
		label: LABELS[1].id,
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRv29RTQSTxtUkPMJ5NS3gxA1gYtf1Issran7buj8_kufO4BLZB9qGYdTlgoGxR6hSXuc&usqp=CAU',
	},
	{
		id: newGuid(),
		userName: 'War machine',
		gender: 'Male',
		label: LABELS[5].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6MJxTQA5iqWf6CBidW35yjHNXVDLEsT-5oA&s',
	},
	{
		id: newGuid(),
		userName: 'Scarlet Witch',
		gender: 'Female',
		label: LABELS[5].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPjY0wehRCpurO8HUq4Jws6ORZ6BxpU1GSg&s',
	},
	{
		id: newGuid(),
		userName: 'Captain America',
		gender: 'Male',
		label: LABELS[5].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktZg6ntf22im44NAxWN-zKCme_nAyXOpgPg&s',
	},
	{
		id: newGuid(),
		userName: 'Black Widow',
		gender: 'Female',
		label: LABELS[5].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6D5IrpKWfaNkbmom7fW6_jeyUNfweWNqjZA&s',
	},
	{
		id: newGuid(),
		userName: 'Hawkeye',
		gender: 'Male',
		label: LABELS[5].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4b0k_ypO8_xyo-c046qL6gvRJ5rpf2WNwog&s',
	},
	{
		id: newGuid(),
		userName: 'Black Panther',
		gender: 'Male',
		label: LABELS[5].id,
		imageSrc: 'https://avatarfiles.alphacoders.com/370/370610.jpg',
	},
	{
		id: newGuid(),
		userName: 'Thor',
		gender: 'Male',
		label: LABELS[5].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bs5YMdtD4LS2rblEweHR3XsfOt_pYlUwsw&s',
	},
	{
		id: newGuid(),
		userName: 'Loki',
		gender: 'Male',
		label: LABELS[2].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVZ98AMwo8rfNzuNWkPEwMb2sZFd5bRaZwVA&s',
	},
	{
		id: newGuid(),
		userName: 'Hulk',
		gender: 'Male',
		label: LABELS[5].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThX2KkLOgZAdUyBd57ecBcHOa7puac5KUR5A&s',
	},
	{
		id: newGuid(),
		userName: 'Dr. Strange',
		gender: 'Male',
		label: LABELS[5].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_g7hmBZNO8X2wpJe1YWzXiVfwysqDNFeKxw&s',
	},
	{
		id: newGuid(),
		userName: 'Nick Fury',
		gender: 'Male',
		label: LABELS[5].id,
		imageSrc: 'https://storage.moemate.io/f55ba2c4f19df020936c41b85df9863eeb2a24a6/Nick-Fury.png',
	},
	{
		id: newGuid(),
		userName: 'Ant-man',
		gender: 'Male',
		label: LABELS[5].id,
		imageSrc: 'https://i.pinimg.com/736x/86/6c/2c/866c2cae2cce1055872b09f1371cd419.jpg',
	},
	{
		id: newGuid(),
		userName: 'The wasp',
		gender: 'Male',
		label: LABELS[5].id,
		imageSrc: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Evangeline_Lilly_as_Wasp.jpeg',
	},
	{
		id: newGuid(),
		userName: 'Star lord',
		gender: 'Male',
		label: LABELS[0].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRDAErV--HEtZCMwuiLP6OFEPeeBvXKXlT3A&s',
	},
	{
		id: newGuid(),
		userName: 'Gamora',
		gender: 'Female',
		label: LABELS[0].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEjtK4migKwEq6zFx_zoMErjiry-mt7v4dPg&s',
	},
	{
		id: newGuid(),
		userName: 'Nebula',
		gender: 'Female',
		label: LABELS[0].id,
		imageSrc:
			'https://i.redd.it/concept-arts-for-nebula-in-guardians-of-the-galaxy-vol-3-v0-5w79bpjc0f1b1.jpg?width=1000&format=pjpg&auto=webp&s=a287a48579dcc9b0d698b4764bf33037870793ea',
	},
	{
		id: newGuid(),
		userName: 'Rocket',
		gender: 'Male',
		label: LABELS[0].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9poCRxqUC_lKqKp0qNQVSGL8-MoHlAEkcBQ&s',
	},
	{
		id: newGuid(),
		userName: 'Groot',
		gender: 'Male',
		label: LABELS[0].id,
		imageSrc: 'https://avatarfiles.alphacoders.com/858/85823.jpg',
	},
	{
		id: newGuid(),
		userName: 'Drax the destroyer',
		gender: 'Male',
		label: LABELS[0].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB1mmWDMbTKVKS-IOe0R8Jqkz73VxVvJkmfQ&s',
	},

	{
		id: newGuid(),
		userName: 'Aunt May',
		gender: 'Female',
		label: LABELS[1].id,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjPp1qmfLPz0IAKQbuFsqGPIUnsC5xB4TKtA&s',
	},
];
const GROUP_ID: string[] = [newGuid(), newGuid()];
const MESSAGES: Message[] = [
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[2].id,
		content: 'No arms and no legs',
		isFile: false,
		createDate: toSystemDate(NOW().subtract(48, 'hours')),
		lastUpdateDate: toSystemDate(NOW().subtract(48, 'hours')),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[3].id,
		content: 'Forever white hand',
		isFile: false,
		createDate: toSystemDate(addHours(new Date(), -47)),
		lastUpdateDate: toSystemDate(addHours(new Date(), -47)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: 'Gample life is so cruel',
		isFile: false,
		createDate: toSystemDate(addHours(new Date(), -23)),
		lastUpdateDate: toSystemDate(addHours(new Date(), -23)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: 'Make money like water, money still go',
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
		content: 'No hand, white hand to zero',
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
		sender: USERS[4].id,
		content: "An adventure life, don't know tomorow",
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -29)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -29)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[5].id,
		content: 'Now I know the sorrow',
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -28)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -28)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[6].id,
		content: 'Sit in front the mirrow now I see',
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -27)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -27)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[7].id,
		content: "Somebody's there it's not me",
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -26)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -26)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [
			{
				userId: USERS[1].id,
				reactionDate: SYSTEM_NOW(),
				reaction: 'LOVE',
			},
			{
				userId: USERS[2].id,
				reactionDate: SYSTEM_NOW(),
				reaction: 'SAD',
			},
		],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[8].id,
		content: 'I am guilty, so then my body',
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -25)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -25)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[9].id,
		content: 'Has no friend and family',
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -24)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -24)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: "I am guilty, and now i'm so empty",
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -23)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -23)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [
			{
				userId: USERS[1].id,
				reactionDate: SYSTEM_NOW(),
				reaction: 'LOVE',
			},
			{
				userId: USERS[2].id,
				reactionDate: SYSTEM_NOW(),
				reaction: 'SAD',
			},
		],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: 'Deleted message',
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -22)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -22)),
		edited: false,
		deleted: true,
		relateId: undefined,
		logs: [
			{
				userId: USERS[1].id,
				reactionDate: SYSTEM_NOW(),
				reaction: 'ANGRY',
			},
		],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: 'Please stay away from lottery',
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -21)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -21)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[10].id,
		content: 'https://th.bing.com/th/id/R.2a5ac658be9ff439f978ac8cc3b58e10?rik=Dn%2fyKYfre9RpPQ&pid=ImgRaw&r=0',
		isFile: false,
		createDate: toSystemDate(addMinutes(new Date(), -20)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -20)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[10].id,
		content: 'fileName.xlsx',
		isFile: true,
		fileSize: 2120,
		createDate: toSystemDate(addMinutes(new Date(), -19)),
		lastUpdateDate: toSystemDate(addMinutes(new Date(), -19)),
		edited: false,
		deleted: false,
		relateId: undefined,
		logs: [],
	},
];

const CHAT_ROOMS: ChatRoom[] = [
	{
		id: GROUP_ID[0],
		name: 'Marvel',
		isGroup: true,
		members: USERS,
		previewMsg: MESSAGES.at(-1),
		pinMessages: [],
	},
	{
		id: GROUP_ID[1],
		name: 'Guardians of the Galaxy',
		isGroup: true,
		members: USERS.slice(15, 20),
		previewMsg: MESSAGES.at(-1),
		pinMessages: [],
	},
	{
		id: USERS[3].id,
		name: USERS[3].userName,
		isGroup: false,
		members: [],
		previewMsg: undefined,
		pinMessages: [],
	},
];

const BROWSER_VERSION = (function () {
	var ua = navigator.userAgent;
	var tem;
	var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE ' + (tem[1] || '');
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
		if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
	return M.join(' ');
})();

const IS_FIREFOX = navigator.userAgent.toLowerCase().includes('firefox');

export { USERS, CHAT_ROOMS, MESSAGES, IMG_LIKE, IMG_HAHA, IMG_HEART, IMG_WOW, IMG_SAD, IMG_ANGRY, LABELS, BROWSER_VERSION, IS_FIREFOX };
