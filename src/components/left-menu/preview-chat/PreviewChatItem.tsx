import { Row, Typography } from 'antd';
import { ChatRoom } from '../../../utils/type';
import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import ChatRoomMenu from './ChatRoomMenu';
import GroupAvatar from '../../common/GroupAvatar';
import UserAvatar from '../../common/UserAvatar';
import TimeFromNow from './TimeFromNow';
import { TagFilled } from '@ant-design/icons';
import { GROUP_AVT_SIZE } from '../../../utils/constants';

interface Props {
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}
function PreviewChatItem(props: ChatRoom & Props) {
	const {
		appStore: { $$, users, getLabel, getUserName },
	} = useStores();
	const { id, name, members, isGroup, previewMsg, image, label, onClick } = props;

	return (
		<Row className='preview-chat-item' onClick={onClick} wrap={false}>
			{isGroup ? <GroupAvatar image={image} members={members} /> : <UserAvatar id={id} size={GROUP_AVT_SIZE} />}
			<Row className='flex-grow' align='middle'>
				<Row wrap={false}>
					<Row className='flex-grow' wrap={false} style={{ paddingRight: '8px' }}>
						<Typography.Text strong ellipsis>
							{name}
						</Typography.Text>
						{label && <TagFilled style={{ color: getLabel(label)?.color }} />}
					</Row>
					<ChatRoomMenu roomId={id} />
					<span className='preview-chat-item-time text-secondary text-small text-ellipsis'>
						{previewMsg && <TimeFromNow date={previewMsg.createDate} />}
					</span>
				</Row>
				{previewMsg && (
					<Typography.Text ellipsis type='secondary' className='text-small'>{`${
						users.get(previewMsg.sender)?.userName ?? ''
					}: ${
						previewMsg.isNameCard
							? `[${$$('namecard')}] ${getUserName(previewMsg.content)}`
							: previewMsg.content
					}`}</Typography.Text>
				)}
			</Row>
		</Row>
	);
}

export default React.memo(observer(PreviewChatItem));
