import { Locale } from 'antd/es/locale';
import { makeAutoObservable } from 'mobx';
import { I18n, LangType, User } from '../utils/type';
import { initI18n } from '../utils/i18n';
import Mustache from 'mustache';
import * as locale from '../locales';
import { USERS } from '../utils/constants';
interface Setting {
    darkTheme: boolean;
}
export default class AppStore {
    lang: LangType = 'en';
    setting: Setting = {
        darkTheme: false,
    };
    i18n!: I18n;

    user: User = USERS[0];
	menuOpen: boolean = true;
    get DarkTheme() {
        return this.setting.darkTheme;
    }
    constructor() {
        makeAutoObservable(this);
        initI18n(this);
    }
    $$ = this.bindLocale(locale);
    getLocale<T extends Record<LangType, Record<string, string>>, D extends keyof T['en']>(name: D, locale: T, args?: Record<string, any>) {
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
    setLang = (lang: LangType) => (this.lang = lang);
    toggleDarkTheme = () => {
        this.setting.darkTheme = !this.setting.darkTheme;
    };
    setSetting = (props: any) => (this.setting = { ...this.setting, ...props });
	toggleLeftMenu = () => this.menuOpen = !this.menuOpen;
}
