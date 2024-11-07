import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ConfigProvider, notification, ThemeConfig } from 'antd';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import { useStores } from './stores/stores';
import { observer } from 'mobx-react';
import Main from './components/Main';

function App() {
	const { appStore } = useStores();
	const { setting, lang } = appStore;
	const { darkTheme } = setting;

	const [themeConfig, setThemeConfig] = useState<ThemeConfig  | undefined>({});

	useLayoutEffect(() => {
		document.documentElement.style.setProperty('--primary-color', sessionStorage.getItem('--primary-color'));
	}, []);
	useEffect(() => {
		if (darkTheme) {
			document.body.classList.add('dark-theme');
			setThemeConfig({
				token: {
					colorText: '#d6d6d6',
					colorTextBase: '#c4c4c4',
					colorBgBase: '#4d4985',
				},
				components: {
					Tooltip: {
						colorBgSpotlight: '#4d4985',
					}
				}
			});
		} else {
			document.body.classList.remove('dark-theme');
			setThemeConfig(undefined);
		}
	}, [darkTheme]);
	const locale = useMemo(() => {
		switch (lang) {
			case 'vi':
				return viVN;
			default:
				return enUS;
		}
	}, [lang]);

	const [_, contextHolder] = notification.useNotification();
	return (
		<ConfigProvider
			locale={locale}
			theme={themeConfig}
		>
			{contextHolder}
			<Main />
		</ConfigProvider>
	);
}

export default observer(App);
