import { Row } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import ChatItemWrapper from './ChatItemWrapper';
import { displayChatDate } from '../../../utils/dateHelper';
import ViewPined from './ViewPined';
import { useEffect, useState } from 'react';
import { IS_FIREFOX } from '../../../utils/constants';
import { Message } from '../../../utils/type';

function ChatBody() {
	const { chatStore } = useStores();
	const { activeRoom, activePin, RoomMessages, onGetMessage, setActivePin } = chatStore;
	const [isEnd, setIsEnd] = useState<boolean>(false);
	const [activeNode, setActiveNode] = useState<HTMLElement | null>(null);
	useEffect(() => {
		setIsEnd(false);
	}, [activeRoom]);

	useEffect(() => {
		if (!activePin) return;
		const msg = document.getElementById(activePin);
		document.querySelector('.forcus')?.classList.remove('forcus');
		if (msg) {
			IS_FIREFOX ? (msg as any).scrollIntoView() : (msg as any).scrollIntoViewIfNeeded();
			msg.classList.add('forcus');
			setActiveNode(msg);
			setActivePin(undefined);
		}
	}, [activePin, RoomMessages]);

	const handleScroll = async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		if (activeNode) {
			console.log(activeNode)
			activeNode.classList.remove('forcus');
			setActiveNode(null);
		}
		if (isEnd) return;
		const { scrollHeight, scrollTop, clientHeight } = e.target as HTMLElement;
		if (scrollHeight + scrollTop - 100 < clientHeight) {
			const res = await onGetMessage();
			if (res && !res.length) setIsEnd(true);
		}
	};

	return (
		<Row className='chat-body'>
			<ViewPined />
			<div className='chat-body-view' onScroll={handleScroll}>
				{Object.entries(RoomMessages)
					.reverse()
					.map(([date, groupMsgs]) => (
						<DateMessageWrapper key={date} date={date} groupMsgs={groupMsgs}/>
					))}
			</div>
		</Row>
	);
}
interface DateMessageProps {
	date: string;
	groupMsgs: Message[][]
}
function DateMessageWrapper (props: DateMessageProps) {
	const {date, groupMsgs} = props;
	return <>
		{groupMsgs.map((messages, idx) => (
			<ChatItemWrapper key={idx} messages={messages} />
		))}
		<Row justify='center' style={{ marginBottom: '8px' }}>
			<div className='date-item'>{displayChatDate(date)}</div>
		</Row>
	</>
}
export default observer(ChatBody);
