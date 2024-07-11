import { Row } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import ChatItemWrapper from './ChatItemWrapper';

function ChatBody() {
	const { chatStore } = useStores();
	const { RoomMessages } = chatStore;
	return (
		<Row className='chat-body'>
			{RoomMessages.map((e, idx) => (
				<ChatItemWrapper
					key={idx}
					messages={e}
				/>
			))}
		</Row>
	);
}

export default observer(ChatBody);
