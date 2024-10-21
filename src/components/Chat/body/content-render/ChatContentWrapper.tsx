import React, { useMemo } from 'react';
import { Message } from '../../../../utils/type';
import { Row, Typography } from 'antd';
import ChatContent from '../ChatContent';
import ReplyContent from '../ReplyContent';
import { PushpinFilled } from '@ant-design/icons';
import Reaction from '../../popup/Reaction';
import { isImage, isUrl } from '../../../../utils/helper';
import ChatTime from '../chat-item/ChatTime';
import { observer } from 'mobx-react';

interface Props {
	isFirst?: boolean;
	isLast?: boolean;
	message: Message;
	showTime?: boolean;
	pinned?: boolean;
	recalled?: boolean;
	getUserName: (id: string) => string;
	view?: boolean;
	selecting?: boolean;
}
function ChatContentWrapper(props: Props) {
	const { isFirst, isLast, showTime, message, pinned, recalled, view, selecting, getUserName } = props;
	const { id, sender, content, createDate, isFile, fileSize, reply, attachment, data } = message;
	const isShort = useMemo(() => (isFile && (isImage(content) || isUrl(content)) ? 'short' : ''), [content]);
	return (
		<div className={`chat-item-content ${recalled && 'recalled'} ${isShort}`} id={message.id}>
			{selecting && <div className='selected-mark'></div>}
			{isFirst && (
				<Typography.Link className='chat-item-username small-text text-ellipsis' onClick={() => {}}>
					{getUserName(sender)}
				</Typography.Link>
			)}
			{reply && <ReplyContent replyMessage={reply} disableClick={view} />}

			<Row className='chat-content'>
				<ChatContent
					id={id}
					content={content}
					recalled={recalled}
					isFile={isFile}
					data={data}
					fileSize={fileSize}
					attachment={attachment}
				/>
				{!selecting && !recalled && !view && (
					<>
						<Reaction id={message.id} />

						{pinned && <PushpinFilled className='chat-item-pin-icon' />}
					</>
				)}
			</Row>

			{(isLast || showTime) && <ChatTime view={view} date={createDate} />}
		</div>
	);
}
export default React.memo(ChatContentWrapper);
