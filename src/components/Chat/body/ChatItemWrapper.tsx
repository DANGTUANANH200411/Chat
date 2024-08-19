import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { Message } from '../../../utils/type';
import React from 'react';
import { Col, message, Row, Typography } from 'antd';
import ChatItem from './ChatItem';
import UserAvatar from '../../common/UserAvatar';
import dayjs from 'dayjs';

interface Props {
	messages: Message[];
}
function ChatItemWrapper(props: Props) {
	const {
		appStore: { user, getUserName },
	} = useStores();
	return (
		<Row className={`chat-item-wrapper ${props.messages[0].sender === user.id && 'me'}`} wrap={false}>
			<UserAvatar className='chat-item-avatar' id={props.messages[0].sender} size={40} style={{margin: '0 8px'}}/>
			<Row className='flex-grow'>
				{props.messages.map((e, idx, arr) => (
					<ChatItem
						key={e.id}
						isFirst={idx === 0}
						isLast={idx === props.messages.length - 1}
						message={e}
						showTime={
							idx < arr.length - 1 &&
							dayjs(arr[idx].createDate).diff(dayjs(arr[idx + 1].createDate)) < -60000
						}
						getUserName={getUserName}
					/>
				))}
			</Row>
		</Row>
	);
}

export default React.memo(observer(ChatItemWrapper));
