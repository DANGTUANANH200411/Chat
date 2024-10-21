import { Row, Space, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import { useStores } from '../../../../stores/stores';
import { Message } from '../../../../utils/type';
import { observer } from 'mobx-react';

interface Props {
	messages: Message[];
}
function AnnounceList(props: Props) {
	const {
		appStore: { $$, getAnnounceContent },
	} = useStores();
	const { messages } = props;
	const [expanded, setExpanded] = useState<boolean>(false);

	const displayMsgs = useMemo(
		() => (expanded ? messages : messages.slice(messages.length - 2)),
		[expanded, messages]
	);
	return (
		<Space direction='vertical' style={{marginBottom: 8}}>
			{!expanded && messages.length > 2 && <Row justify='center' className='text-secondary'>
                <Typography.Link style={{background: 'white', padding: '2px 8px', borderRadius: 16, fontSize: 'smaller'}} onClick={()=> setExpanded(true)}>{$$('view-all')}</Typography.Link>
                </Row>}
			{displayMsgs.map((e) => (
				<Row key={e.id} justify='center' className='text-secondary'>
					<div dangerouslySetInnerHTML={{ __html: getAnnounceContent(e) }}></div>
				</Row>
			))}
		</Space>
	);
}

export default React.memo(observer(AnnounceList));
