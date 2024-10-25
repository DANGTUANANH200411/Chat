import { Row } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import ChatHeader from './header/ChatHeader';
import './style.css';
import ChatBody from './body/ChatBody';
import ChatFooter from './footer/ChatFooter';
import { useEffect } from 'react';
import ViewPinned from './body/ViewPinned';
import { AnnouceTargetObj } from '../../utils/type';
function ChatWrapper() {
	const { chatStore, appStore: {setMdlPollDetailProps} } = useStores();
	const { activeRoom, getMessage } = chatStore;
	useEffect(() => {
		function onClick(e: MouseEvent) {
			const target = e.target as HTMLElement;
			if (target.tagName === 'a' && target.className?.includes('mention-member')) {
				console.log(target.dataset.id);
			} else if (target.classList.contains('announce-clickable')) {
				const type = target.dataset.type as AnnouceTargetObj;
				const id = target.dataset.id;
				if (type === 'Poll') {
					id && setMdlPollDetailProps(getMessage(id));
				} else {
					console.log('USER', target.dataset.id);
				}
			}
		}

		document.addEventListener('click', onClick);
		return () => {
			document.removeEventListener('click', onClick);
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
