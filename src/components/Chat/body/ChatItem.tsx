import { observer } from 'mobx-react';
import React, { useMemo, useState } from 'react';
import { Message } from '../../../utils/type';
import {  Row, Typography } from 'antd';
import ChatAction from './ChatAction';
import ChatContent from './ChatContent';
import Reaction from '../popup/Reaction';
import { isImage, isUrl } from '../../../utils/helper';
import ReplyContent from './ReplyContent';
import ListReaction from './chat-item/ListReaction';
import { PushpinFilled } from '@ant-design/icons';
import ChatTime from './chat-item/ChatTime';
import ChatSelectBox from './chat-item/ChatSelectBox';
import UserAvatar from '../../common/UserAvatar';
interface Props {
	id: string;
	isFirst: boolean;
	isLast: boolean;
	message: Message;
	showTime: boolean;
	pinned: boolean;
	getUserName: (id: string) => string;
	view?: boolean;
}
function ChatItem(props: Props) {
	const { id, isFirst, isLast, showTime, message, pinned, view, getUserName } = props;
	const { sender, content, recalled, createDate, logs, isFile, fileSize, reply, attachment, data } = message;
	const [hover, setHover] = useState<boolean>(false);
	const isShort = useMemo(() => (isFile && (isImage(content) || isUrl(content)) ? 'short' : ''), [content]);

	return (
		<>
			<Row
				className='chat-item-content-wrapper'
				wrap={false}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<Row style={{ width: 'fit-content', margin: '0 8px' }}>
					<ChatSelectBox id={id} />
					<div style={{ width: 40 }}>
						{isFirst && <UserAvatar className='chat-item-avatar' id={sender} size={40} />}
					</div>
				</Row>
				<div className={`chat-item-content ${recalled && 'recalled'} ${isShort}`} id={message.id}>
					{isFirst && (
						<Typography.Link className='chat-item-username small-text text-ellipsis' onClick={() => {}}>
							{getUserName(sender)}
						</Typography.Link>
					)}
					{reply && <ReplyContent replyMessage={reply} disableClick={view} />}

					<Row className='chat-content'>
						<ChatContent
							id={message.id}
							content={content}
							recalled={recalled}
							isFile={isFile}
							data={data}
							fileSize={fileSize}
							attachment={attachment}
						/>
						{!recalled && !view && (
							<>
								<Reaction id={message.id} />

								{logs.length > 0 && <ListReaction logs={logs} />}

								{pinned && <PushpinFilled className='chat-item-pin-icon' />}
							</>
						)}
					</Row>

					{(isLast || showTime) && <ChatTime view={view} date={createDate} />}
				</div>

				{(recalled || (!view && hover)) && (
					<div className='chat-item-action'>
						<ChatAction message={message} />
					</div>
				)}
			</Row>
		</>
	);
}

export default React.memo(observer(ChatItem));
