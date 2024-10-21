import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { ItemType } from 'antd/es/menu/interface';
import { useStores } from '../../../stores/stores';
import { Message } from '../../../utils/type';
import { notify } from '../../../utils/notify';

interface Props {
	message: Message;
}
function BoardDropdown(props: Props) {
	const {
		appStore: { $$ },
		chatStore: { boardTab, listIdPinned, scrollToMessage, onPinMessage },
	} = useStores();
	const { message } = props;

	const items: ItemType[] = useMemo(() => {
		if (boardTab === 'Pinned') {
			return [{ key: 'jump', label: $$('jump-to-msg'), onClick: () => scrollToMessage(message.id) }];
		}
		const isPinned = listIdPinned.includes(message.id);
		return [
			{
				key: 'pin',
				label: $$(isPinned ? 'unpin' : 'pin'),
				onClick: () => onPinMessage(message),
			},
		];
	}, [boardTab, listIdPinned, $$]);
	return (
		<Dropdown arrow trigger={['click']} menu={{ items }} destroyPopupOnHide>
			<MoreOutlined rotate={90} className='hoverable-icon' />
		</Dropdown>
	);
}

export default React.memo(observer(BoardDropdown));
