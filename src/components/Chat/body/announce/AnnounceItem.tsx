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
		appStore: { getAnnounceContent },
	} = useStores();
	const { message } = props;

	return (
		<Row justify='center' className='text-secondary'>
			{getAnnounceContent(message)}
		</Row>
	);
}

export default React.memo(observer(AnnounceItem));
