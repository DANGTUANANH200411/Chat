import { Button, Empty, Flex } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../../stores/stores';
import PreviewLink from '../tabs/components/PreviewLink';
import StorageItem from '../tabs/components/StorageItem';

function PreviewPhotoStorage() {
	const {
		appStore: { $$, setDrawerOpen },
		chatStore: { Links, setStorageTab },
	} = useStores();

	if (!Links.length) return <Empty imageStyle={{ height: '2rem' }} />;
	return (
		<>
			<Flex vertical gap={8}>
				{Links.slice(0, 4).map((e) => (
					<StorageItem key={e.id} id={e.id} type='Link'>
						<PreviewLink key={e.id} id={e.id} url={e.content} sendDate={e.createDate} />
					</StorageItem>
				))}
			</Flex>
			<Button
				className='max-width'
				color='default'
				variant='filled'
				style={{ marginTop: 8 }}
				size='small'
				onClick={() => {
					setDrawerOpen('Storage');
					setStorageTab('Link');
				}}
			>
				{$$('view-all')}
			</Button>
		</>
	);
}

export default React.memo(observer(PreviewPhotoStorage));
