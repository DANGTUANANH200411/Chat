import { observer } from 'mobx-react';
import React, { useCallback, useMemo } from 'react';
import { Message } from '../../../../utils/type';
import { useStores } from '../../../../stores/stores';
import { Row } from 'antd';

interface Props {
	message: Message;
}
function AnnounceItem(props: Props) {
	const {
		appStore: { $$, getUserName },
	} = useStores();
	const { message } = props;
	const { sender, announce } = message;

	const announceContent = useCallback(() => {
		if(!announce) return '';
		const params = { user1: getUserName(sender), user2: getUserName(announce.userId) };
		switch (announce?.type) {
			case 'Add':
				return $$('ann-add', params);
			case 'Remove':
				return $$('ann-remove', params);
			case 'AppointAdmin':
				return $$('ann-appointed', params);
			case 'RemoveAdmin':
				return $$('ann-remove-admin', params);
			default:
				return '';
		}
	}, [announce, $$]);
	return (
		<Row justify='center' className='text-secondary'>
			{announceContent()}
		</Row>
	);
}

export default React.memo(observer(AnnounceItem));
