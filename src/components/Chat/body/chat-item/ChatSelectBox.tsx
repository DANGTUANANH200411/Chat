import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { useStores } from '../../../../stores/stores';
import { Checkbox, Row } from 'antd';

interface Props {
	id: string;
	sender: string;
}
function ChatSelectBox(props: Props) {
	const {
		chatStore: { selectMessages, onSelectMessage },
	} = useStores();

	const { id, sender } = props;

	return !selectMessages.size ? (
		<></>
	) : (
		<Row style={{width: 25}} justify='end' >
			<Checkbox
				checked={selectMessages.has(id)}
				onChange={() => onSelectMessage(id, sender)}
				className='chat-item-selectbox'
			/>
		</Row>
	);
}

export default React.memo(observer(ChatSelectBox));
