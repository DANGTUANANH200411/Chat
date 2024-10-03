import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../stores/stores';
import { Button, Row } from 'antd';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';

function SelectingBar() {
	const {
		chatStore: { selectMessages, clearListSelectedMsg },
	} = useStores();
	return (
		<Row className='chat-body-pin' >
                <Button type='text' icon={<CloseOutlined />} onClick={clearListSelectedMsg}>
					Selected: {selectMessages.size}
				</Button>
				<Button type='text' danger icon={<DeleteOutlined style={{ color: 'red' }} />}>
					Remove messages
				</Button>
		</Row>
	);
}

export default React.memo(observer(SelectingBar));
