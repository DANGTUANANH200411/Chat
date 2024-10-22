import { makeAutoObservable, ObservableMap } from 'mobx';
import { AnnouceTargetObj, CommonModalProps, DrawerType, I18n, Label, LangType, Message, User } from '../utils/type';
import { initI18n } from '../utils/i18n';
import Mustache from 'mustache';
import * as locale from '../locales';
import { LABELS, USERS } from '../utils/constants';
import dayjs from 'dayjs';
import { matchSearchUser } from '../utils/helper';

Mustache.escape = function(text) {return text;};

interface Setting {
	darkTheme: boolean;
}
export default class AppStore {
	$$ = this.bindLocale(locale);
	lang: LangType = 'en';
	setting: Setting = {
		darkTheme: false,
	};
	i18n!: I18n;

	user: User = USERS[0];
	menuOpen: boolean = true;
	drawerOpen: DrawerType = undefined;
	labels: Label[] = LABELS;
	users: ObservableMap<string, User> = new ObservableMap<string, User>();

	toggleAddFriend: boolean = false;
	toggleAddFriendToGroup: boolean = false;

	mdlAddToGroupProps: CommonModalProps = {
		visible: false,
		id: undefined,
	};

	mdlGrpsInComm: CommonModalProps = {
		visible: false,
		id: undefined,
	};

	mdlPollDetailProps: Message | undefined = undefined;

	mdlPollVotedProps: Message | undefined = undefined;

	openCreatePoll: boolean = false;

	openCreateNote: boolean = false;

	get DarkTheme() {
		return this.setting.darkTheme;
	}
	constructor() {
		makeAutoObservable(this);
		initI18n(this);
		USERS.map((e) => this.users.set(e.id, e));
		const lang = localStorage.getItem('LANGUAGE') as LangType;
		this.lang = lang ?? 'en';
		dayjs.locale(lang);
	}
	get Users() {
		return Array.from(this.users.values()).filter((e) => e.id !== this.user.id);
	}

	get Friends() {
		return Array.from(this.users.values()).filter((e) => e.id !== this.user.id && e.isFriend);
	}

	get CurrentUserId() {
		return this.user.id;
	}
	//#region GET
	getUserById = (id: string) => {
		return this.users.get(id);
	};

	getUserName = (id: string | undefined, you: boolean = false) => {
		if (!id) return 'Unknown';
		if (you && id === this.user.id) return this.$$('you').toLocaleLowerCase();
		const user = this.users.get(id);
		return !!user ? user.alias ?? user.userName : 'Unknown';
	};
	getLabel = (id: string | undefined) => {
		if (!id) return undefined;
		return this.labels.find((e) => e.id === id);
	};

	isFriendFn = (id: string) => {
		return this.users.get(id)?.isFriend ?? false;
	};

	searchUser = (text: string, label?: string) => {
		const ignoreLabel = !label || label === 'all';

		if (ignoreLabel && !text) return this.Friends;
		return this.Friends.filter((e) => (ignoreLabel || e.label === label) && matchSearchUser(text, e));
	};
	//#endregion GET

	//#region SET
	setToggleAddFiend = () => (this.toggleAddFriend = !this.toggleAddFriend);

	setToggleAddFriendToGroup = () => (this.toggleAddFriendToGroup = !this.toggleAddFriendToGroup);

	toggleAddToGroup = (memberId?: string) => {
		this.mdlAddToGroupProps.id = memberId;
		this.mdlAddToGroupProps.visible = !this.mdlAddToGroupProps.visible;
	};

	toggleGrpsInComm = (memberId?: string) => {
		this.mdlGrpsInComm.id = memberId;
		this.mdlGrpsInComm.visible = !this.mdlGrpsInComm.visible;
	};

	setMdlPollDetailProps = (poll?: Message) => (this.mdlPollDetailProps = poll);
	setMdlPollVotedProps = (poll?: Message) => (this.mdlPollVotedProps = poll);
	toggleCreatePollModal = () => (this.openCreatePoll = !this.openCreatePoll);

	toggleCreateNote = () => this.openCreateNote = !this.openCreateNote;

	setLang = (lang: LangType) => {
		this.lang = lang;
		localStorage.setItem('LANGUAGE', lang);
		dayjs.locale(lang);
	};

	toggleDarkTheme = () => {
		this.setting.darkTheme = !this.setting.darkTheme;
	};

	setSetting = (props: any) => (this.setting = { ...this.setting, ...props });

	toggleLeftMenu = () => (this.menuOpen = !this.menuOpen);

	setDrawerOpen = (open: DrawerType) => (this.drawerOpen = open);
	//#endregion SET

	//#region API
	searchUserByPhoneNumber = (phoneNumber: string | undefined) => {
		if (!phoneNumber) return [];
		return this.Users.filter((e) => e.phoneNumber.includes(phoneNumber));
	};

	setFriend = (id: string, isFriend?: boolean) => {
		const user = this.users.get(id);
		if (user) {
			this.users.set(id, { ...user, isFriend: !isFriend });
		}
	};

	onChangeAliasName = (id: string, alias: string) => {
		const user = this.users.get(id);
		user!.alias = alias;
	};
	//#endregion

	//#region Translate

	getLocale<T extends Record<LangType, Record<string, string>>, D extends keyof T['en']>(
		name: D,
		locale: T,
		args?: Record<string, any>
	) {
		let lang = this.lang;
		let langObject = locale[lang];
		if (!langObject) return '';
		let msg = langObject[name as any] || '';
		if (args) {
			if (args['number'] && args['number'] > 1) args['plural'] = true;
		}
		msg = Mustache.render(msg, args ?? {});
		return msg;
	}
	bindLocale<T extends Record<LangType, Record<string, string>>>(locale: T) {
		let bindGet = <D extends keyof T['en']>(name: D, args?: Record<string, any>) => {
			return this.getLocale(name, locale, args);
		};
		return bindGet;
	}
	//#endregion Translate

	getAnnounceContent = (message: Message) => {
		const { getUserName, $$ } = this;
		const { sender, announce } = message;

		function parse(id: string, type: AnnouceTargetObj = 'User') {
			return `<strong class='hover-change-color announce-clickable' data-type=${type} data-id=${id}>${type === 'User' ? getUserName(id) : announce?.poll?.title}</strong>`
		}

		const params = { user1: parse(sender), user2: parse(announce?.userId ?? ''), pollName: parse(announce?.poll?.id ?? '', 'Poll') };
		switch (announce?.type) {
			case 'Add':
				return $$('ann-add', params);
			case 'Remove':
				return $$('ann-remove', params);
			case 'AppointAdmin':
				return $$('ann-appointed', params);
			case 'RemoveAdmin':
				return $$('ann-remove-admin', params);
			case 'Leave':
				return $$('ann-leave', params);
			case 'Poll Expired':
				return $$('ann-poll-expired', params);
			case 'Poll Closed':
				return $$('ann-poll-close', params);
			case 'Poll Vote':
				return $$('ann-poll-vote', params);
			default:
				return '';
		}
	};
}
