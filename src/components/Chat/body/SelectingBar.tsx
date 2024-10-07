import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { useStores } from '../../../stores/stores';
import { Button, Row } from 'antd';
import { CloseOutlined, DeleteOutlined, UndoOutlined } from '@ant-design/icons';

function SelectingBar() {
	const {
		chatStore: { selectMessages, clearListSelectedMsg, onDeleteMessages, onRecallMessage },
	} = useStores();

	const disabled = [...selectMessages.values()].some((e) => !e);
	const style: CSSProperties = {
		color: !disabled ? 'orange' : 'gray',
	};
	return (
		<Row className='chat-body-pin'>
			<Button type='text' icon={<CloseOutlined />} onClick={clearListSelectedMsg}>
				Selected: {selectMessages.size}
			</Button>
			<Button
				disabled={disabled}
				type='text'
				icon={<UndoOutlined rotate={90} style={style} />}
				style={style}
				onClick={() => {
					selectMessages.forEach((_, key) => onRecallMessage(key));
					clearListSelectedMsg();
				}}
			>
				Recall messages
			</Button>
			<Button
				type='text'
				danger
				icon={<DeleteOutlined style={{ color: 'red' }} />}
				onClick={() => {
					onDeleteMessages([...selectMessages.keys()]);
					clearListSelectedMsg();
				}}
			>
				Remove messages
			</Button>
		</Row>
	);
}

export default React.memo(observer(SelectingBar));
