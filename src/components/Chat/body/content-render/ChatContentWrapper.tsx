import React, { useMemo } from 'react';
import { Message } from '../../../../utils/type';
import { Row, Typography } from 'antd';
import ChatContent from '../ChatContent';
import ReplyContent from '../ReplyContent';
import ListReaction from '../chat-item/ListReaction';
import { PushpinFilled } from '@ant-design/icons';
import Reaction from '../../popup/Reaction';
import { isImage, isUrl } from '../../../../utils/helper';
import ChatTime from '../chat-item/ChatTime';

interface Props {
	isFirst: boolean;
	isLast: boolean;
	message: Message;
	showTime: boolean;
	pinned: boolean;
	getUserName: (id: string) => string;
	view?: boolean;
}
function ChatContenWrapper(props: Props) {
	const { isFirst, isLast, showTime, message, pinned, view, getUserName } = props;
	const { sender, content, recalled, createDate, logs, isFile, fileSize, reply, attachment, data, isNameCard } =
		message;
	const isShort = useMemo(() => (isFile && (isImage(content) || isUrl(content)) ? 'short' : ''), [content]);

	return (
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
					isNameCard={isNameCard}
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
	);
}

export default React.memo(ChatContenWrapper);
