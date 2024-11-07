import { Row } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useStores } from '../../../stores/stores';
import { Message } from '../../../utils/type';
import UserAvatar from '../../common/UserAvatar';
import ChatAction from './ChatAction';
import Readers from './components/Readers';
import ChatContentWrapper from './content-render/ChatContentWrapper';
import NameCard from './content-render/NameCard';
interface Props {
	id: string;
	isFirst: boolean;
	isLast: boolean;
	message: Message;
	showTime: boolean;
	pinned: boolean;
	recalled?: boolean;
	view?: boolean;
	readers?: string[];
}
function ChatItem(props: Props) {
	const {
		appStore: { getUserName },
		chatStore: { Setting: {showSymbol}, Selecting, selectMessages, onSelectMessage},
	} = useStores();
	const { id, isFirst, isLast, showTime, message, pinned, view, recalled, readers } = props;
	const { sender, isNameCard, content, createDate } = message;
	const [hover, setHover] = useState<boolean>(false);

	return (
		<>
			<Row
				className={`chat-item-content-wrapper ${selectMessages.has(id) ? 'selected' : ''}`}
				wrap={false}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				onClick={() => {
					Selecting && onSelectMessage(message);
				}}
			>
				<Row style={{ width: 'fit-content', margin: '0 8px' }}>
					<div style={{ width: 40 }}>
						{isFirst && <UserAvatar showSymbol={showSymbol} className='chat-item-avatar' id={sender} size={40}/>}
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
						selecting={Selecting}
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
						selecting={Selecting}
						pinned={pinned}
					/>
				)}

				{!Selecting && !view && hover && (
					<div className='chat-item-action'>
						<ChatAction message={message} />
					</div>
				)}
			</Row>
			<Readers sender={sender} readers={readers}/>
		</>
	);
}

export default React.memo(observer(ChatItem));
