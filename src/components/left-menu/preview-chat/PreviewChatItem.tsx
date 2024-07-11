import { MoreOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Typography } from 'antd';
import { timeFromNow } from '../../../utils/dateHelper';
import { ChatRoom } from '../../../utils/type';
import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import ChatRoomMenu from './ChatRoomMenu';
import GroupAvatar from '../../common/GroupAvatar';

interface Props {
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function PreviewChatItem(props: ChatRoom & Props) {
	const {
		chatStore: { users },
	} = useStores();
	const { id, name, members, isGroup, previewMsg, onClick } = props;
	return (
		<Row
			className='preview-chat-item'
			onClick={onClick}
		>
			<Col span={5}>
				<Row
					justify='center'
					align='middle'
					className='max-height'
				>
					{isGroup ? <GroupAvatar members={members} /> : <Avatar></Avatar>}
				</Row>
			</Col>
			<Col span={19}>
				<Row>
					<Col span={18}>
						<Typography.Text
							strong
							ellipsis
						>
							{name}
						</Typography.Text>
					</Col>
					<Col span={6}>
						<ChatRoomMenu />
						<span className='preview-chat-item-time text-secondary text-small'>
							{timeFromNow('20240706113102')}
						</span>
					</Col>
				</Row>
				{previewMsg && (
					<Typography.Text
						ellipsis
						type='secondary'
						className='text-small'
					>{`${users.get(previewMsg.sender)?.userName ?? ''}: ${previewMsg.content}`}</Typography.Text>
				)}
			</Col>
		</Row>
	);
}

export default React.memo(observer(PreviewChatItem));
