import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { Message } from '../../../utils/type';
import React from 'react';
import { Col, message, Row, Typography } from 'antd';
import ChatItem from './ChatItemContent';
import UserAvatar from '../../common/UserAvatar';

interface Props {
	messages: Message[];
}
function ChatItemWrapper(props: Props) {
	const {
		chatStore: { getUserName },
		appStore: { user },
	} = useStores();
	return (
		<Row className={`chat-item-wrapper ${props.messages[0].sender === user.id && 'me'}`}>
			<Col span={1}>
				<Row
					className='max-height'
					justify='center'
				>
					<UserAvatar
						className='chat-item-avatar'
						id={props.messages[0].sender}
					/>
				</Row>
			</Col>
			<Col span={23}>
				<Typography.Text type='secondary'>{getUserName(props.messages[0].sender)}</Typography.Text>
				{props.messages.map((e, idx) => (
					<ChatItem
						key={idx}
						isLast={idx === props.messages.length - 1}
						message={e}
					/>
				))}
			</Col>
		</Row>
	);
}

export default React.memo(observer(ChatItemWrapper));
