import { Flex } from 'antd';
import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../../stores/stores';
import PinnedItem from './PinnedItem';

function PinnedTab() {
	const {
		chatStore: { Room },
	} = useStores();
	return (
		<Flex vertical gap={8} className='max-height' style={{padding: 8, overflow: 'auto'}}>
			{Room?.pinMessages?.map((e) => <PinnedItem key={e.id} message={e} />)}
		</Flex>
	);
}

export default React.memo(observer(PinnedTab));
