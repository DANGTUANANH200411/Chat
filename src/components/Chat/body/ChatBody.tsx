import { Row } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import ChatItemWrapper from './ChatItemWrapper';
import { displayChatDate } from '../../../utils/dateHelper';

function ChatBody() {
	const { chatStore } = useStores();
	const { RoomMessages } = chatStore;
	return (
		<Row className='chat-body'>
			<div className='chat-body-view' >
				{Object.entries(RoomMessages).reverse().map(([date, groupMsgs]) => (
					<>
						
						{groupMsgs.map((messages, idx) => (
							<ChatItemWrapper
								key={idx}
								messages={messages}
							/>
						))}
						<Row justify='center'>
							<div className='date-item'>{displayChatDate(date)}</div>
						</Row>
					</>
				))}
			</div>
		</Row>
	);
}

export default observer(ChatBody);
