import AppStore from '../stores/appStore';
import { isString, template } from './helper';

export function initI18n(appStore: AppStore) {
    // default i18n
    const lang = (module: string | Record<string, any>, name: string, args?: any[] | Record<string, any>) => {
        const { lang } = appStore;
        const i18n = appStore.i18n;
        const moduleLang = isString(module) ? i18n.messages[lang] || i18n.messages.default || undefined : module;

        if (moduleLang && moduleLang[name]) {
            const data = moduleLang[name];
            if (args) {
                return template(data, args);
            }
            return data;
        } else {
            return '';
        }
    };

    appStore.i18n = {
        messages: {},
        lang,
        // t: () => '',
    };
}
