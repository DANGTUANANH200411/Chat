import { ChatRoom, Label, Message, RoomMember, User } from '../utils/type';
import { generatePhoneNumber, newGuid, randomInt } from '../utils/helper';
import { addHours, addMinutes, NOW, SYSTEM_NOW, toSystemDate } from './dateHelper';
import IMG_LIKE from '../resources/like.png';
import IMG_HAHA from '../resources/haha.png';
import IMG_HEART from '../resources/heart.png';
import IMG_WOW from '../resources/wow.png';
import IMG_SAD from '../resources/sad.png';
import IMG_ANGRY from '../resources/angry.png';
import dayjs from 'dayjs';

const LABELS: Label[] = [
	{
		id: newGuid(),
		name: 'customer',
		color: 'rgb(217, 27, 27)',
	},
	{
		id: newGuid(),
		name: 'family',
		color: 'rgb(75, 195, 119)',
	},
	{
		id: newGuid(),
		name: 'work',
		color: 'rgb(255, 105, 5)',
	},
	{
		id: newGuid(),
		name: 'friend',
		color: 'rgb(111, 63, 207)',
	},
	{
		id: newGuid(),
		name: 'reply-later',
		color: 'rgb(250, 192, 0)',
	},
	{
		id: newGuid(),
		name: 'co-worker',
		color: 'rgb(0, 104, 255)',
	},
];

const USERS: User[] = [
	{
		id: newGuid(),
		userName: 'Spider man',
		gender: 'Male',
		phoneNumber: generatePhoneNumber(),
		isFriend: true,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsMJCEL-gwuBuMZISCNc1Ln1RCxxaCfXHQCA&s',
	},
	{
		id: newGuid(),
		userName: 'Iron man',
		gender: 'Male',
		label: LABELS[1].id,
		phoneNumber: generatePhoneNumber(),
		isFriend: true,
		imageSrc:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRv29RTQSTxtUkPMJ5NS3gxA1gYtf1Issran7buj8_kufO4BLZB9qGYdTlgoGxR6hSXuc&usqp=CAU',
	},
	{
		id: newGuid(),
		userName: 'War machine',
		gender: 'Male',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		isFriend: true,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6MJxTQA5iqWf6CBidW35yjHNXVDLEsT-5oA&s',
	},
	{
		id: newGuid(),
		userName: 'Scarlet Witch',
		gender: 'Female',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		isFriend: true,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUPjY0wehRCpurO8HUq4Jws6ORZ6BxpU1GSg&s',
	},
	{
		id: newGuid(),
		userName: 'Captain America',
		gender: 'Male',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		isFriend: true,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktZg6ntf22im44NAxWN-zKCme_nAyXOpgPg&s',
	},
	{
		id: newGuid(),
		userName: 'Black Widow',
		gender: 'Female',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		isFriend: true,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6D5IrpKWfaNkbmom7fW6_jeyUNfweWNqjZA&s',
	},
	{
		id: newGuid(),
		userName: 'Hawkeye',
		gender: 'Male',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		isFriend: true,
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4b0k_ypO8_xyo-c046qL6gvRJ5rpf2WNwog&s',
	},
	{
		id: newGuid(),
		userName: 'Black Panther',
		gender: 'Male',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		isFriend: true,
		imageSrc: 'https://avatarfiles.alphacoders.com/370/370610.jpg',
	},
	{
		id: newGuid(),
		userName: 'Thor',
		gender: 'Male',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bs5YMdtD4LS2rblEweHR3XsfOt_pYlUwsw&s',
	},
	{
		id: newGuid(),
		userName: 'Loki',
		gender: 'Male',
		label: LABELS[2].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVZ98AMwo8rfNzuNWkPEwMb2sZFd5bRaZwVA&s',
	},
	{
		id: newGuid(),
		userName: 'Hulk',
		gender: 'Male',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThX2KkLOgZAdUyBd57ecBcHOa7puac5KUR5A&s',
	},
	{
		id: newGuid(),
		userName: 'Dr. Strange',
		gender: 'Male',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_g7hmBZNO8X2wpJe1YWzXiVfwysqDNFeKxw&s',
	},
	{
		id: newGuid(),
		userName: 'Nick Fury',
		gender: 'Male',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://storage.moemate.io/f55ba2c4f19df020936c41b85df9863eeb2a24a6/Nick-Fury.png',
	},
	{
		id: newGuid(),
		userName: 'Ant-man',
		gender: 'Male',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://i.pinimg.com/736x/86/6c/2c/866c2cae2cce1055872b09f1371cd419.jpg',
	},
	{
		id: newGuid(),
		userName: 'The wasp',
		gender: 'Male',
		label: LABELS[5].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Evangeline_Lilly_as_Wasp.jpeg',
	},
	{
		id: newGuid(),
		userName: 'Star lord',
		gender: 'Male',
		label: LABELS[0].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRDAErV--HEtZCMwuiLP6OFEPeeBvXKXlT3A&s',
	},
	{
		id: newGuid(),
		userName: 'Gamora',
		gender: 'Female',
		label: LABELS[0].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEjtK4migKwEq6zFx_zoMErjiry-mt7v4dPg&s',
	},
	{
		id: newGuid(),
		userName: 'Nebula',
		gender: 'Female',
		label: LABELS[0].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc:
			'https://i.redd.it/concept-arts-for-nebula-in-guardians-of-the-galaxy-vol-3-v0-5w79bpjc0f1b1.jpg?width=1000&format=pjpg&auto=webp&s=a287a48579dcc9b0d698b4764bf33037870793ea',
	},
	{
		id: newGuid(),
		userName: 'Rocket',
		gender: 'Male',
		label: LABELS[0].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9poCRxqUC_lKqKp0qNQVSGL8-MoHlAEkcBQ&s',
	},
	{
		id: newGuid(),
		userName: 'Groot',
		gender: 'Male',
		label: LABELS[0].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://avatarfiles.alphacoders.com/858/85823.jpg',
	},
	{
		id: newGuid(),
		userName: 'Drax the destroyer',
		gender: 'Male',
		label: LABELS[0].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB1mmWDMbTKVKS-IOe0R8Jqkz73VxVvJkmfQ&s',
	},

	{
		id: newGuid(),
		userName: 'Aunt May',
		gender: 'Female',
		label: LABELS[1].id,
		phoneNumber: generatePhoneNumber(),
		imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjPp1qmfLPz0IAKQbuFsqGPIUnsC5xB4TKtA&s',
	},
];
const GROUP_ID: string[] = [newGuid(), newGuid()];

const MESSAGES: Message[] = [
	...Array(300)
		.fill(0)
		.map((e, index) => ({
			id: newGuid(),
			groupId: GROUP_ID[0],
			sender: USERS[randomInt(USERS.length)].id,
			content: index.toString(),
			isFile: false,
			createDate: toSystemDate(NOW().subtract(49 + index, 'h')),
			lastUpdateDate: toSystemDate(NOW().subtract(49 + index, 'h')),
			recalled: false,
			deleted: false,
			logs: [],
		})),
		{
			id: newGuid(),
			groupId: GROUP_ID[0],
			sender: USERS[14].id,
			content: 'https://www.youtube.com/watch?v=Ak1lunhhxQM',
			isFile: false,
			createDate: toSystemDate(NOW().subtract(49, 'h').subtract(2, 'm')),
			lastUpdateDate: toSystemDate(NOW().subtract(49, 'h').subtract(2, 'm')),
			recalled: false,
			deleted: false,
			logs: [],
		},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[7].id,
		content: 'https://www.youtube.com/watch?v=PLIAp5nr0q0',
		isFile: false,
		createDate: toSystemDate(NOW().subtract(49, 'h').subtract(1, 'm')),
		lastUpdateDate: toSystemDate(NOW().subtract(49, 'h').subtract(1, 'm')),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[4].id,
		content: 'https://www.youtube.com/watch?v=uPAOcqmvzys',
		isFile: false,
		createDate: toSystemDate(NOW().subtract(49, 'h')),
		lastUpdateDate: toSystemDate(NOW().subtract(49, 'h')),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[2].id,
		content: 'No arms and no legs',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(48, 'h').subtract(4, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(48, 'h').subtract(4, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[2].id,
		content: 'No arms and no legs',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(48, 'h').subtract(1, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(48, 'h').subtract(1, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[3].id,
		content: 'Forever white hand',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(27, 'h').subtract(45, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(27, 'h').subtract(45, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: 'Gample life is so cruel',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(27, 'h').subtract(12, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(27, 'h').subtract(12, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: 'Make money like water, money still go',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(26, 'h').subtract(35, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(26, 'h').subtract(35, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[1].id,
		content: 'No hand, white hand to zero',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(26, 'h').subtract(22, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(26, 'h').subtract(22, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[4].id,
		content: "An adventure life, don't know tomorow",
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(26, 'h').subtract(5, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(26, 'h').subtract(5, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[5].id,
		content: 'Now I know the sorrow',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(25, 'h').subtract(10, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(25, 'h').subtract(10, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[6].id,
		content: 'Sit in front the mirrow now I see',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(25, 'h').subtract(6, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(25, 'h').subtract(6, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[7].id,
		content: "Somebody's there it's not me",
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(25, 'h').subtract(5, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(25, 'h').subtract(5, 'm'))),
		recalled: false,
		deleted: false,
		logs: [
			{
				userId: USERS[1].id,
				reactionDate: SYSTEM_NOW(),
				reaction: '1f623',
			},
			{
				userId: USERS[2].id,
				reactionDate: SYSTEM_NOW(),
				reaction: '1f622',
			},
			{
				userId: USERS[3].id,
				reactionDate: SYSTEM_NOW(),
				reaction: '1f607',
			},
			{
				userId: USERS[4].id,
				reactionDate: SYSTEM_NOW(),
				reaction: '1f923',
			},
			{
				userId: USERS[5].id,
				reactionDate: SYSTEM_NOW(),
				reaction: '1f602',
			},
		],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[8].id,
		content: 'I am guilty, so then my body',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(25, 'h').subtract(4, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(25, 'h').subtract(4, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[9].id,
		content: 'Has no friend and family',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(7, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(7, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: "I am guilty, and now i'm so empty",
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(6, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(6, 'm'))),
		recalled: false,
		deleted: false,
		logs: [
			{
				userId: USERS[1].id,
				reactionDate: SYSTEM_NOW(),
				reaction: '1f623',
			},
			{
				userId: USERS[2].id,
				reactionDate: SYSTEM_NOW(),
				reaction: '1f622',
			},
		],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: 'Deleted message',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(5, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(5, 'm'))),
		recalled: false,
		deleted: true,
		logs: [
			{
				userId: USERS[1].id,
				reactionDate: SYSTEM_NOW(),
				reaction: '1f622',
			},
		],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: 'Recalleded Msg',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(4, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(4, 'm'))),
		recalled: true,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: 'Please stay away from lottery',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(3, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(3, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[13].id,
		content: 'https://www.youtube.com/watch?v=7gphiFVVtUI',
		isFile: false,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(2, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(2, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[10].id,
		content: 'https://www.shutterstock.com/image-vector/july-7-2023-full-body-260nw-2329083689.jpg',
		isFile: true,
		createDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(1, 'm'))),
		lastUpdateDate: toSystemDate(toSystemDate(dayjs().subtract(24, 'h').subtract(1, 'm'))),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[10].id,
		content: 'fileName.xlsx',
		isFile: true,
		fileSize: 2120,
		createDate: toSystemDate(dayjs().subtract(24, 'h')),
		lastUpdateDate: toSystemDate(dayjs().subtract(24, 'h')),
		recalled: false,
		deleted: false,
		logs: [],
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: '',
		createDate: toSystemDate(dayjs().subtract(23, 'h')),
		lastUpdateDate: toSystemDate(dayjs().subtract(23, 'h')),
		recalled: false,
		deleted: false,
		logs: [],
		announce: {
			userId: USERS[10].id,
			type: 'Add',
		},
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		content: '',
		createDate: toSystemDate(dayjs().subtract(23, 'h')),
		lastUpdateDate: toSystemDate(dayjs().subtract(23, 'h')),
		recalled: false,
		deleted: false,
		logs: [],
		announce: {
			userId: USERS[10].id,
			type: 'Remove',
		},
	},
	{
		id: newGuid(),
		groupId: GROUP_ID[0],
		sender: USERS[1].id,
		content: USERS[4].id,
		createDate: toSystemDate(dayjs().subtract(22, 'h')),
		lastUpdateDate: toSystemDate(dayjs().subtract(22, 'h')),
		recalled: false,
		deleted: false,
		logs: [],
		isNameCard: true,
	},
	{
		id: newGuid(),
		content: 'Poll Title',
		groupId: GROUP_ID[0],
		sender: USERS[0].id,
		createDate: toSystemDate(dayjs().subtract(21, 'h')),
		lastUpdateDate: toSystemDate(dayjs().subtract(21, 'h')),
		poll: {
			options: [
				{
					id: '1',
					label: 'Option 1',
				},
				{
					id: '2',
					label: 'Option 2',
				}
			],
			deadline:  toSystemDate(dayjs().add(1, 'm')),
			hideVoters: false,
			hideResultNotVote: true,
			multiple: true,
			canAddOption: true,
			votes: USERS.slice(0, USERS.length - 5).map((e, idx)=> ({
				id: e.id,
				values: idx < 10 ? ['1'] : ['2'],
			})),
		}
	}
];

const ROOM_MEMBER: RoomMember[] = USERS.map((e) => ({
	...e,
	lastLogTime: MESSAGES.findLast((msg) => msg.sender === e.id)?.lastUpdateDate,
	invitedBy: USERS[0].id,
	role: 'Member',
}));

const CHAT_ROOMS: ChatRoom[] = [
	{
		id: GROUP_ID[0],
		name: 'Marvel',
		isGroup: true,
		members: USERS.map((e, idx) => ({
			...e,
			lastLogTime: toSystemDate(dayjs().subtract(24, 'h')),
			invitedBy: USERS[0].id,
			role: idx === 0 ? 'Owner' : [3, 5].includes(idx) ? 'Admin' : 'Member',
		})),
		previewMsg: MESSAGES.findLast((e) => e.groupId === GROUP_ID[0]),
		pinMessages: [MESSAGES[299], MESSAGES[100], MESSAGES[MESSAGES.length - 8]],
		creatorId: USERS[0].id,
		image: 'https://yt3.googleusercontent.com/P_qIGe_-Jt5V4JT_UtIuURsq9RBRDIZ88tvFJx1AzACWzsuRIrrOfb6jDH2OnoukFdS06AN5nQ=s900-c-k-c0x00ffffff-no-rj',
		pinned: true,
	},
	{
		id: GROUP_ID[1],
		name: 'Guardians of the Galaxy',
		isGroup: true,
		members: [
			{
				...ROOM_MEMBER[0],
				invitedBy: USERS[15].id,
				role: 'Admin',
			},
			...ROOM_MEMBER.slice(15, 20).map((e, idx) => ({
				...e,
				invitedBy: USERS[15].id,
				role: idx === 15 ? 'Owner' : e.role,
			})),
		],
		previewMsg: MESSAGES.findLast((e) => e.groupId === GROUP_ID[1]),
		creatorId: USERS[15].id,
		label: LABELS[2].id,
	},
	{
		id: USERS[1].id,
		name: USERS[1].userName,
		isGroup: false,
		members: [],
		label: LABELS[4].id,
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

const GROUP_AVT_SIZE = 48;

const DELAY_INPUT = 400;
export {
	USERS,
	CHAT_ROOMS,
	MESSAGES,
	IMG_LIKE,
	IMG_HAHA,
	IMG_HEART,
	IMG_WOW,
	IMG_SAD,
	IMG_ANGRY,
	LABELS,
	BROWSER_VERSION,
	IS_FIREFOX,
	GROUP_AVT_SIZE,
	DELAY_INPUT,
};
