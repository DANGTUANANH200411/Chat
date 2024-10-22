import SearchBar from './SearchBar';
import MenuTab from './MenuTab';
import PreviewChatWrapper from './preview-chat/PreviewChatWrapper';
import '../style.css';
import React, { useEffect } from 'react';
import { useStores } from '../../stores/stores';
import { observer } from 'mobx-react';
import { Flex } from 'antd';
function LeftMenu() {
	const {
		appStore: { menuOpen },
	} = useStores();

	useEffect(() => {
		if (!menuOpen) {
			document.documentElement.style.setProperty('--left-menu-w', '0px');
		} else {
			document.documentElement.style.setProperty('--left-menu-w', '17vw');
		}
	}, [menuOpen]);
	return (
		<Flex vertical className={`left-menu ${!menuOpen && 'closed'}`}>
			<SearchBar />
			<MenuTab />
			<div className='preview-chat-wrapper flex-grow'>
				<PreviewChatWrapper />
			</div>
		</Flex>
	);
}

export default React.memo(observer(LeftMenu));
