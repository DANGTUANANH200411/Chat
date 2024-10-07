import { useEffect, useLayoutEffect, useMemo } from 'react';
import { ConfigProvider, notification } from 'antd';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import { useStores } from './stores/stores';
import { observer } from 'mobx-react';
import Main from './components/Main';

function App() {
	const { appStore } = useStores();
	const { setting, lang } = appStore;
	const { darkTheme } = setting;
	useLayoutEffect(() => {
		document.documentElement.style.setProperty('--primary-color', sessionStorage.getItem('--primary-color'));
	}, []);
	useEffect(() => {
		darkTheme ? document.body.classList.add('dark-theme') : document.body.classList.remove('dark-theme');
	}, [darkTheme]);
	const locale = useMemo(() => {
		switch (lang) {
			case 'vi':
				return viVN;
			default:
				return enUS;
		}
	}, [lang]);

	const [api, contextHolder] = notification.useNotification();
	return (
		<ConfigProvider locale={locale}>
			{contextHolder}
			<Main />
		</ConfigProvider>
	);
}

export default observer(App);
