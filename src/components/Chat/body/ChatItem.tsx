import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Message } from '../../../utils/type';
import { Row } from 'antd';
import ChatAction from './ChatAction';
import ChatSelectBox from './chat-item/ChatSelectBox';
import UserAvatar from '../../common/UserAvatar';
import ChatContentWrapper from './content-render/ChatContentWrapper';
import NameCard from './content-render/NameCard';
interface Props {
	id: string;
	isFirst: boolean;
	isLast: boolean;
	message: Message;
	showTime: boolean;
	pinned: boolean;
	recalled: boolean;
	getUserName: (id: string) => string;
	view?: boolean;
}
function ChatItem(props: Props) {
	const { id, isFirst, isLast, showTime, message, pinned, view, recalled, getUserName } = props;
	const { sender, isNameCard, content, createDate, logs } = message;
	const [hover, setHover] = useState<boolean>(false);
	return (
		<Row wrap={false} style={{ direction: 'ltr' }}>
			<ChatSelectBox id={id} sender={sender} />
			<Row
				className='chat-item-content-wrapper'
				wrap={false}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<Row style={{ width: 'fit-content', margin: '0 8px' }}>
					<div style={{ width: 40 }}>
						{isFirst && <UserAvatar className='chat-item-avatar' id={sender} size={40} />}
					</div>
				</Row>

				{!isNameCard || recalled ? (
					<ChatContentWrapper
						isFirst={isFirst}
						isLast={isLast}
						message={message}
						showTime={showTime}
						pinned={pinned}
						recalled={recalled}
						getUserName={getUserName}
						view={view}
					/>
				) : (
					<NameCard
						isFirst={isFirst}
						isLast={isLast}
						showTime={showTime}
						sender={sender}
						msgId={id}
						id={content}
						createDate={createDate}
					/>
				)}

				{!view && hover && (
					<div className='chat-item-action'>
						<ChatAction message={message} />
					</div>
				)}
			</Row>
		</Row>
	);
}

export default React.memo(observer(ChatItem));
