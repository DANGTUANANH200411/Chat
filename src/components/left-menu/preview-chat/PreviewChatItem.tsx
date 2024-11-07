import { Badge, Row, Typography } from 'antd';
import { ChatRoom, Message } from '../../../utils/type';
import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import ChatRoomMenu from './ChatRoomMenu';
import GroupAvatar from '../../common/GroupAvatar';
import UserAvatar from '../../common/UserAvatar';
import TimeFromNow from './TimeFromNow';
import { PushpinFilled, TagFilled } from '@ant-design/icons';
import { GROUP_AVT_SIZE } from '../../../utils/constants';

function PreviewChatItem(props: ChatRoom) {
	const {
		appStore: { $$, getLabel, getUserName, getAnnounceContent },
		chatStore: { setActiveRoom },
	} = useStores();
	const { id, name, members, isGroup, previewMsg, image, label, pinned, unread, personalId } = props;

	const displayContent = (msg: Message) => {
		if (msg.isNameCard) {
			return `${getUserName(msg.sender)}: [${$$('namecard')}] ${getUserName(msg.content)}`;
		}
		if (msg.announce) {
			return <div className='text-ellipsis' dangerouslySetInnerHTML={{ __html: getAnnounceContent(msg) }}></div>;
		}
		return `${getUserName(msg.sender)}: ${msg.content}`;
	};
	return (
		<Row className='preview-chat-item hoverable' onClick={() => setActiveRoom(id)} wrap={false}>
			<Badge
				count={unread}
				size='small'
				offset={[-5, 5]}
			>
				{isGroup ? (
					<GroupAvatar image={image} members={members} />
				) : (
					<UserAvatar id={personalId ?? ''} size={GROUP_AVT_SIZE} />
				)}
			</Badge>
			<Row className='flex-grow' align='middle'>
				<Row wrap={false}>
					<Row className='flex-grow' wrap={false} style={{ columnGap: 4 }}>
						<Typography.Text strong ellipsis>
							{name}
						</Typography.Text>
						{label && <TagFilled style={{ color: getLabel(label)?.color }} />}
						{pinned && <PushpinFilled className='color-primary' />}
					</Row>
					<ChatRoomMenu roomId={id} pinned={pinned} />
					<span className='preview-chat-item-time text-secondary text-small text-ellipsis'>
						{previewMsg && <TimeFromNow date={previewMsg.createDate} />}
					</span>
				</Row>
				{previewMsg && (
					<Typography.Text ellipsis type='secondary' className='text-small'>
						{displayContent(previewMsg)}
					</Typography.Text>
				)}
			</Row>
		</Row>
	);
}

export default React.memo(observer(PreviewChatItem));
