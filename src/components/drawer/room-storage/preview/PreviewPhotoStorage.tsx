import { Button, Col, Empty, Image, Row } from 'antd';
import React from 'react';
import { useStores } from '../../../../stores/stores';
import { observer } from 'mobx-react';

function PreviewPhotoStorage() {
	const {
		appStore: { $$, setDrawerOpen },
		chatStore: { Images, setStorageTab },
	} = useStores();

	if (!Images.length) return <Empty imageStyle={{ height: '2rem' }} />;
	return (
		<>
			<Image.PreviewGroup>
				<Row gutter={[12, 12]}>
					{Images.slice(0, 8).map((e, idx) => (
						<Col span={6}>
							<Image key={idx} src={e.content} />
						</Col>
					))}
				</Row>
			</Image.PreviewGroup>
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
