import { observer } from 'mobx-react';
import React from 'react';
import { Message } from '../../../utils/type';
import { useStores } from '../../../stores/stores';
import ChatItemWrapper from './ChatItemWrapper';
import { Row } from 'antd';
import { displayChatDate } from '../../../utils/dateHelper';

interface DateMessageProps {
	date: string;
	groupMsgs: Message[][];
}
function DateMessageWrapper(props: DateMessageProps) {
	const {
		appStore: { $$ },
	} = useStores();
	const { date, groupMsgs } = props;
	return (
		<>
			{groupMsgs.map((messages, idx) => (
				<ChatItemWrapper key={idx} messages={messages} />
			))}
			<Row justify='center' style={{ marginBottom: '8px' }}>
				<div className='date-item'>{displayChatDate(date, $$)}</div>
			</Row>
		</>
	);
}

export default React.memo(observer(DateMessageWrapper));
