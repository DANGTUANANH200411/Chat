import { observer } from 'mobx-react';
import React from 'react';
import { Message, ReactionPopupProps, ReactionType } from '../../../utils/type';
import { Popover, Row, Tooltip, Typography } from 'antd';
import { displayChatTime } from '../../../utils/dateHelper';
import { IMG_ANGRY, IMG_HEART, IMG_LIKE, IMG_SAD, IMG_WOW } from '../../../utils/constants';
import ChatAction from './ChatAction';
import ChatContent from './ChatContent';
import { HeartOutlined } from '@ant-design/icons';
import Reaction from '../popup/Reaction';

interface Props {
	isFirst: boolean;
	isLast: boolean;
	message: Message;
	showTime: boolean;
	getUserName: (id: string) => string;
}
function ChatItem(props: Props) {
	const { isFirst, isLast, showTime, message, getUserName } = props;
	const { sender, content, deleted, createDate, logs, isFile, fileSize } = message;

	const renderReaction = (e: ReactionType) => {
		switch (e) {
			case 'LOVE':
				return <img src={IMG_HEART} />;
			case 'SAD':
				return <img src={IMG_SAD} />;
			case 'ANGRY':
				return <img src={IMG_ANGRY} />;
			case 'WOW':
				return <img src={IMG_WOW} />;
			default:
				return <img src={IMG_LIKE} />;
		}
	};

	return (
		<>
			<Row align='middle' className='chat-item-content-wrapper'>
				<div className={`chat-item-content ${deleted && 'deleted'}`} id={message.id}>
					{isFirst && (
						<Typography.Link className='chat-item-username small-text text-ellipsis' onClick={() => {}}>
							{getUserName(sender)}
						</Typography.Link>
					)}
					<ChatContent content={content} isFile={isFile} fileSize={fileSize} />
					{(isLast || showTime) && (
						<Typography.Text type='secondary' className='small-text'>
							{displayChatTime(createDate)}
						</Typography.Text>
					)}
					<Popover
						content={<Reaction id={message.id}/>}
						trigger='hover'
						placement='bottom'
						arrow={false}
						destroyTooltipOnHide
						overlayInnerStyle={{padding: 4, borderRadius: 30}}
					>
						<HeartOutlined className='reaction-action' />
					</Popover>
					{logs.length > 0 && (
						<div className='list-reaction'>{logs.map((e) => renderReaction(e.reaction))}</div>
					)}
				</div>
				<div className='chat-item-action'>
					<ChatAction message={message} />
				</div>
			</Row>
		</>
	);
}

export default React.memo(observer(ChatItem));
