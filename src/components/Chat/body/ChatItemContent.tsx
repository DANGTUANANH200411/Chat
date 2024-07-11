import { observer } from 'mobx-react';
import React from 'react';
import { Message } from '../../../utils/type';
import { Row, Typography } from 'antd';

interface Props {
	isLast: boolean;
	message: Message;
}
function ChatItemContent(props: Props) {
	return (
		<div className='chat-item-content'>
			<Typography.Text>{props.message.content}</Typography.Text>
			{}
		</div>
	);
}

export default React.memo(observer(ChatItemContent));
