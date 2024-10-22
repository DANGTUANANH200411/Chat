import { Row } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import ChatHeader from './header/ChatHeader';
import './style.css';
import ChatBody from './body/ChatBody';
import ChatFooter from './footer/ChatFooter';
import { useEffect } from 'react';
import ViewPinned from './body/ViewPinned';
function ChatWrapper() {
	const { chatStore } = useStores();
	const { activeRoom } = chatStore;
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
	return (
		<div className='max-height flex-grow'>
			{activeRoom ? (
				<>
					<ChatHeader />
					<div className='chat-view'>
						<ViewPinned />
						<ChatBody />
						<ChatFooter />
					</div>
				</>
			) : (
				<Row className='max-height' justify='center' align='middle'>
					WELLCOME TO MY CHAT APP
				</Row>
			)}
		</div>
	);
}

export default observer(ChatWrapper);
