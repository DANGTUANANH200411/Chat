import { observer } from 'mobx-react';
import React, { useMemo, useState } from 'react';
import { Message } from '../../../utils/type';
import { Row, Typography } from 'antd';
import { displayChatTime } from '../../../utils/dateHelper';
import ChatAction from './ChatAction';
import ChatContent from './ChatContent';
import Reaction from '../popup/Reaction';
import { isImage, isUrl } from '../../../utils/helper';
import ReplyContent from './ReplyContent';
import ListReaction from './chat-item/ListReaction';
import { PushpinFilled } from '@ant-design/icons';
interface Props {
	isFirst: boolean;
	isLast: boolean;
	message: Message;
	showTime: boolean;
	pinned: boolean;
	getUserName: (id: string) => string;
}
function ChatItem(props: Props) {
	const { isFirst, isLast, showTime, message, pinned, getUserName } = props;
	const { sender, content, deleted, createDate, logs, isFile, fileSize, reply, attachment, data } = message;
	const [hover, setHover] = useState<boolean>(false);
	const isShort = useMemo(() => (isFile && (isImage(content) || isUrl(content)) ? 'short' : ''), [content]);
	
	return (
		<>
			<Row
				align='middle'
				className='chat-item-content-wrapper'
				wrap={false}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div className={`chat-item-content ${deleted && 'deleted'} ${isShort}`} id={message.id}>
					{isFirst && (
						<Typography.Link className='chat-item-username small-text text-ellipsis' onClick={() => {}}>
							{getUserName(sender)}
						</Typography.Link>
					)}
					{reply && <ReplyContent replyMessage={reply} />}

					<Row className='chat-content'>
						<ChatContent
							id={message.id}
							content={content}
							deleted={deleted}
							isFile={isFile}
							data={data}
							fileSize={fileSize}
							attachment={attachment}
						/>
						<Reaction id={message.id} />

						{logs.length > 0 && <ListReaction logs={logs} />}

						{pinned && <PushpinFilled className='chat-item-pin-icon'/>}
					</Row>

					{(isLast || showTime) && (
						<Typography.Text type='secondary' className='small-text send-time'>
							{displayChatTime(createDate)}
						</Typography.Text>
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
