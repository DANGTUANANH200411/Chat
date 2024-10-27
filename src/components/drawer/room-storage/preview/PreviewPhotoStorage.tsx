import { Button, Col, Empty, Image, Row } from 'antd';
import React from 'react';
import { useStores } from '../../../../stores/stores';
import { observer } from 'mobx-react';
import StorageItem from '../tabs/components/StorageItem';

function PreviewPhotoStorage() {
	const {
		appStore: { $$, setDrawerOpen },
		chatStore: { Images, setStorageTab },
	} = useStores();

	if (!Images.length) return <Empty imageStyle={{ height: '2rem' }} />;
	return (
		<>
			<Row align='middle' style={{ columnGap: 12, rowGap: 12 }}>
				{Images.slice(0, 8).map((e) => (
					<Col span={5} key={e.id}>
						<StorageItem key={e.id} id={e.id} type='Photo'>
							<Image src={e.data ?? e.content} preview={false} />
						</StorageItem>
					</Col>
				))}
			</Row>
			<Button
				className='max-width'
				color='default'
				variant='filled'
				style={{ marginTop: 8 }}
				size='small'
				onClick={() => {
					setDrawerOpen('Storage');
					setStorageTab('Photo');
				}}
			>
				{$$('view-all')}
			</Button>
		</>
	);
}

export default React.memo(observer(PreviewPhotoStorage));
