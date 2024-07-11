import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { Message } from '../../../utils/type';
import React from 'react';
import { Col, message, Row, Typography } from 'antd';
import ChatItem from './ChatItemContent';
import UserAvatar from '../../common/UserAvatar';
import dayjs from 'dayjs';

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
						size={40}
					/>
				</Row>
			</Col>
			<Col span={23}>
				{props.messages.map((e, idx, arr) => {
					if(idx != 0){
						console.log(dayjs(arr[idx].createDate).diff(Number(arr[idx - 1].createDate)))
					}
					return <ChatItem
					key={idx}
					isFirst={idx === 0}
					isLast={idx === props.messages.length - 1}
					message={e}
					showTime={idx < arr.length - 1 && dayjs(arr[idx].createDate).diff(dayjs(arr[idx + 1].createDate)) < -60000}
					getUserName={getUserName}
				/>
				})}
			</Col>
		</Row>
	);
}

export default React.memo(observer(ChatItemWrapper));
