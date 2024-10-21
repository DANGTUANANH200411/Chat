import { Flex } from 'antd';
import React from 'react';
import { useStores } from '../../../../stores/stores';
import Poll from '../../../Chat/body/content-render/poll/Poll';
import Member from '../../../common/Member';
import BoardDropdown from '../BoardDropdown';

function PollTab() {
	const {
		appStore: { getUserById },
		chatStore: { Polls },
	} = useStores();

	return (
		<Flex vertical gap={8} className='max-height' style={{ padding: 8, overflow: 'auto' }}>
			{Polls.map((e) => (
				<Poll
					key={e.id}
					displayClosed
					message={e}
					style={{ width: '100%' }}
					prefix={<Member user={getUserById(e.sender)} suffix={<BoardDropdown message={e}/>} />}
				/>
			))}
		</Flex>
	);
}

export default React.memo(PollTab);
