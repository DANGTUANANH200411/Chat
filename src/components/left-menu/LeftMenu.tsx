import SearchBar from './SearchBar';
import MenuTab from './MenuTab';
import PreviewChatWrapper from './preview-chat/PreviewChatWrapper';
import '../style.css';
import React from 'react';
import { useStores } from '../../stores/stores';
import { observer } from 'mobx-react';
function LeftMenu() {
    const {
		appStore: { menuOpen },
	} = useStores();
	return (
		<div className={`left-menu ${!menuOpen && 'closed'}`}>
			<div style={{ height: '10%' }}>
				<SearchBar />
				<MenuTab />
			</div>
			<div
				className='preview-chat-wrapper'
				style={{ height: '90%' }}
			>
				<PreviewChatWrapper />
			</div>
		</div>
	);
}

export default React.memo(observer(LeftMenu));
