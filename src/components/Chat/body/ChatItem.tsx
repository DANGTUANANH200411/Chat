import { observer } from 'mobx-react';
import React from 'react';
import { Message, ReactionPopupProps, ReactionType } from '../../../utils/type';
import { Row, Tooltip, Typography } from 'antd';
import { displayChatTime } from '../../../utils/dateHelper';
import { IMG_ANGRY, IMG_HEART, IMG_LIKE, IMG_SAD, IMG_WOW } from '../../../utils/constants';
import ChatAction from './ChatAction';
import ChatContent from './ChatContent';
import { HeartOutlined } from '@ant-design/icons';

interface Props {
	isFirst: boolean;
	isLast: boolean;
	message: Message;
	showTime: boolean;
	getUserName: (id: string) => string;
	setReactionPopup: (state: ReactionPopupProps) => void;
}
function ChatItem(props: Props) {
	const { isFirst, isLast, showTime, message, getUserName, setReactionPopup } = props;
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
					<HeartOutlined
						className='reaction-action'
						onClick={(e) =>
						{	
							const view = document.querySelector('.chat-body-view');
							if (!view) return;
							const {left} = view.getBoundingClientRect(); 
							setReactionPopup({
								visible: true,
								x:  e.clientX - left,
								y: e.clientY + 10,
								id: message.id,
							})
						}
						}
					/>
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
