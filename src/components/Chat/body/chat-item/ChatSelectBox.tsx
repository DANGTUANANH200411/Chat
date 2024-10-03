import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { useStores } from '../../../../stores/stores';
import { Checkbox } from 'antd';

interface Props {
	id: string;
}
function ChatSelectBox(props: Props) {
	const {
		chatStore: { selectMessages, onSelectMessage },
	} = useStores();

    const {id} = props;
	return !selectMessages.size ? <></> : <Checkbox checked={selectMessages.has(id)} onChange={() => onSelectMessage(id)} className='chat-item-selectbox'/>
}

export default React.memo(observer(ChatSelectBox));
