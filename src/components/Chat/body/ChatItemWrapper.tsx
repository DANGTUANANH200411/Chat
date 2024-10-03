import { Row } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../stores/stores';
import { Message } from '../../../utils/type';
import ChatItem from './ChatItem';

interface Props {
	view?: true;
	messages: Message[];
}
function ChatItemWrapper(props: Props) {
	const {
		appStore: { user, getUserName },
		chatStore: {listIdPinned},
	} = useStores();
	const {view, messages} = props;
	return (
		<Row className={`chat-item-wrapper ${messages[0].sender === user.id && 'me'}`} wrap={false}>
			<Row className='flex-grow'>
				{messages.map((e, idx, arr) => (
					<ChatItem
						key={e.id}
						id={e.id}
						isFirst={idx === 0}
						isLast={idx === messages.length - 1}
						message={e}
						showTime={
							idx < arr.length - 1 &&
							dayjs(arr[idx].createDate).diff(dayjs(arr[idx + 1].createDate)) < -60000
						}
						getUserName={getUserName}
						pinned={listIdPinned.includes(e.id)}
						view={view}
					/>
				))}
			</Row>
		</Row>
	);
}

export default React.memo(observer(ChatItemWrapper));
