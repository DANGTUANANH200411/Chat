import { Col, Row, Typography } from 'antd';
import { timeFromNow } from '../../../utils/dateHelper';
import { ChatRoom } from '../../../utils/type';
import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import ChatRoomMenu from './ChatRoomMenu';
import GroupAvatar from '../../common/GroupAvatar';
import UserAvatar from '../../common/UserAvatar';
import TimeFromNow from './TimeFromNow';

interface Props {
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function PreviewChatItem(props: ChatRoom & Props) {
	const {
		chatStore: { users },
	} = useStores();
	const { id, name, members, isGroup, previewMsg,image, onClick } = props;
	return (
		<Row className='preview-chat-item' onClick={onClick}>
			<Col span={4}>
				<Row justify='center' align='middle' className='max-height text-ellipsis'>
					{isGroup ? <GroupAvatar image={image} members={members} /> : <UserAvatar id={id} size={40} />}
				</Row>
			</Col>
			<Col span={20}>
				<Row>
					<Col lg={18} md={17} sm={16}>
						<Typography.Text strong ellipsis>
							{name}
						</Typography.Text>
					</Col>
					<Col lg={6} md={7} sm={10}>
						<Row justify='end'>
							<ChatRoomMenu />
							<span className='preview-chat-item-time text-secondary text-small text-ellipsis'>
								{previewMsg && <TimeFromNow date={previewMsg.createDate}/>}
							</span>
						</Row>
					</Col>
				</Row>
				{previewMsg && (
					<Typography.Text ellipsis type='secondary' className='text-small'>{`${
						users.get(previewMsg.sender)?.userName ?? ''
					}: ${previewMsg.content}`}</Typography.Text>
				)}
			</Col>
		</Row>
	);
}

export default React.memo(observer(PreviewChatItem));
