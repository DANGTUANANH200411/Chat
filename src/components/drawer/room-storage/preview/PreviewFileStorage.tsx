import { Button, Empty, Flex } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../../stores/stores';
import FileMessage from '../../../Chat/body/content-render/FileMessage';
import StorageItem from '../tabs/components/StorageItem';

function PreviewFileStorage() {
	const {
		appStore: { $$, setDrawerOpen },
		chatStore: { Files, setStorageTab },
	} = useStores();

	if (!Files.length) return <Empty imageStyle={{ height: '2rem' }} />;
	return (
		<>
			<Flex vertical gap={8}>
				{Files.slice(0, 4).map((e, idx) => (
					<div className='max-width' key={e.id}>
						<StorageItem key={e.id} id={e.id} type='Link' url={e.data}>
							<FileMessage key={e.id} content={e.content} fileSize={e.fileSize} data={e.data} />
						</StorageItem>
					</div>
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
					setStorageTab('File');
				}}
			>
				{$$('view-all')}
			</Button>
		</>
	);
}

export default React.memo(observer(PreviewFileStorage));
