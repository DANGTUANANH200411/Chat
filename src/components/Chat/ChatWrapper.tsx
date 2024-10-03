import { Row, Watermark } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import ChatHeader from './header/ChatHeader';
import './style.css';
import ChatBody from './body/ChatBody';
import ChatFooter from './footer/ChatFooter';
import ModalReactionLog from './modal/ModalReactionLog';
import { useEffect } from 'react';
import ViewPinned from './body/ViewPinned';
import ModalDetailMessage from './modal/ModalDetailMessage';
import SelectingBar from './body/SelectingBar';
function ChatWrapper() {
	const { chatStore } = useStores();
	const { activeRoom, Selecting } = chatStore;
	useEffect(() => {
		function onClickMention(e: MouseEvent) {
			const target = e.target as HTMLElement;
			if (target.tagName === 'a' && target.className?.includes('mention-member')) {
				console.log(target.dataset.id);
			}
		}
		document.addEventListener('click', onClickMention);
		return () => {
			document.removeEventListener('click', onClickMention);
		};
	}, []);
	return activeRoom ? (
		<>
			<div className='max-height'>
				<ChatHeader />
				<div className='chat-view'>
					{Selecting ? <SelectingBar /> : <ViewPinned />}
					<ChatBody />
					<ChatFooter />
				</div>
			</div>
			<ModalReactionLog />
			<ModalDetailMessage />
			{/* <Reaction/> */}
		</>
	) : (
		<Row>WELLCOME TO MY CHAT APP</Row>
	);
}

export default observer(ChatWrapper);
