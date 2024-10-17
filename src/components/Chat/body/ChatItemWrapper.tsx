import { Row, Space } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../stores/stores';
import { Message } from '../../../utils/type';
import ChatItem from './ChatItem';
import Poll from './content-render/poll/Poll';

interface Props {
	view?: true;
	messages: Message[];
}
function ChatItemWrapper(props: Props) {
	const {
		appStore: { user, getAnnounceContent },
		chatStore: { listIdPinned },
	} = useStores();
	const { view, messages } = props;

	if (messages[0].announce)
		return (
			<Space direction='vertical'>
				{messages.map((e) => (
					<Row key={e.id} justify='center' className='text-secondary'>
						{getAnnounceContent(e)}
					</Row>
				))}
			</Space>
		);

	if (messages[0].poll) {
		return <Poll message={messages[0]}/>
	}
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
						pinned={listIdPinned.includes(e.id)}
						recalled={e.recalled}
						view={view}
					/>
				))}
			</Row>
		</Row>
	);
}

export default React.memo(observer(ChatItemWrapper));
