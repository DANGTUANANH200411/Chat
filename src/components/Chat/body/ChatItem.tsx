import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Message } from '../../../utils/type';
import { Row, Typography } from 'antd';
import { displayChatTime } from '../../../utils/dateHelper';
import ChatAction from './ChatAction';
import ChatContent from './ChatContent';
import Reaction from '../popup/Reaction';
import { getEmojiSrc, isImage } from '../../../utils/helper';
import ReplyContent from './ReplyContent';
interface Props {
	isFirst: boolean;
	isLast: boolean;
	message: Message;
	showTime: boolean;
	getUserName: (id: string) => string;
}
function ChatItem(props: Props) {
	const { isFirst, isLast, showTime, message, getUserName } = props;
	const { sender, content, deleted, createDate, logs, isFile, fileSize, reply } = message;
	const [hover, setHover] = useState<boolean>(false);

	return (
		<>
			<Row
				align='middle'
				className='chat-item-content-wrapper'
				wrap={false}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div className={`chat-item-content ${deleted && 'deleted'} ${isImage(content) && 'short'}`} id={message.id}>
					{isFirst && (
						<Typography.Link className='chat-item-username small-text text-ellipsis' onClick={() => {}}>
							{getUserName(sender)}
						</Typography.Link>
					)}
					{reply && <ReplyContent replyMessage={reply}/>}
					<ChatContent content={deleted ? 'Deleted message' : content} isFile={isFile} fileSize={fileSize} />
					{(isLast || showTime) && (
						<Typography.Text type='secondary' className='small-text'>
							{displayChatTime(createDate)}
						</Typography.Text>
					)}
					<Reaction id={message.id} />
					{logs.length > 0 && (
						<div className='list-reaction'>{logs.map((e) => <img key={e.reaction} src={getEmojiSrc(e.reaction)} />)}</div>
					)}
				</div>
				
				{hover && (
					<div className='chat-item-action'>
						<ChatAction message={message} />
					</div>
				)}
			</Row>
		</>
	);
}

export default React.memo(observer(ChatItem));
