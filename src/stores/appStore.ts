import { makeAutoObservable } from 'mobx';
import { I18n, Label, LangType, User } from '../utils/type';
import { initI18n } from '../utils/i18n';
import Mustache from 'mustache';
import * as locale from '../locales';
import { LABELS, USERS } from '../utils/constants';
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
	drawerOpen: boolean = false;
	labels: Label[] = LABELS;
	users: Map<string, User> = new Map<string, User>();

	toggleAddFriend: boolean = false;
	toggleAddToGroup: boolean = false;
	get DarkTheme() {
		return this.setting.darkTheme;
	}
	constructor() {
		makeAutoObservable(this);
		initI18n(this);
		USERS.map((e) => this.users.set(e.id, e));
	}
	get Users() {
		return Array.from(this.users.values()).filter((e) => e.id !== this.user.id);
	}
	//#region GET
	getUserById = (id: string) => {
		return this.users.get(id);
	};

	getUserName = (id: string | undefined, you: boolean = false) => {
		if (!id) return 'Unknown';
		if (you && id === this.user.id) return this.$$('you');
		return this.users.get(id)?.userName ?? 'Unknown';
	};
	getLabel = (id: string | undefined) => {
		if(!id) return undefined;
		return this.labels.find(e=> e.id === id);
	}
	//#endregion GET

	//#region SET
	setToggleAddFiend = () => this.toggleAddFriend = !this.toggleAddFriend;
	setToggleAddToGroup = () => this.toggleAddToGroup = !this.toggleAddToGroup;
	setLang = (lang: LangType) => (this.lang = lang);

	toggleDarkTheme = () => {
		this.setting.darkTheme = !this.setting.darkTheme;
	};

	setSetting = (props: any) => (this.setting = { ...this.setting, ...props });

	toggleLeftMenu = () => (this.menuOpen = !this.menuOpen);

	setDrawerOpen = (open: boolean) => (this.drawerOpen = open);
	//#endregion SET

	//#region API
	searchUserByPhoneNumber = (phoneNumber: string | undefined) => {
		if (!phoneNumber) return [];
		return this.Users.filter(e=> e.phoneNumber.includes(phoneNumber))
	}
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
			msg = Mustache.render(msg, args);
		}
		return msg;
	}
	bindLocale<T extends Record<LangType, Record<string, string>>>(locale: T) {
		let bindGet = <D extends keyof T['en']>(name: D, args?: Record<string, any>) => {
			return this.getLocale(name, locale, args);
		};
		return bindGet;
	}
	//#endregion Translate
}
