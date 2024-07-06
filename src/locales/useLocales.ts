import { useStores } from '../stores/stores';
import { ILocale } from './index';
import { en } from './lang/en-US';
import { vi } from './lang/vi-VN';

const languages = {
    'en-US': en,
    'vi-VN': vi,
    default: en,
};
export default function useLocale() {
    const { appStore } = useStores();
    function lang<D extends keyof ILocale>(name: D, args?: Record<string, any> | any[]) {
        const data = appStore.i18n.lang('common', name as any, args);
        if (!data) {
            return appStore.i18n.lang(languages.default, String(name), args);
        }
        return data;
    }

    return {
        lang,
    };
}
