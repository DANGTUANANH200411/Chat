import { Button, Col, Flex, Image, Row, Space } from 'antd';
import React from 'react';
import { useStores } from '../../../stores/stores';

function PreviewStorage() {
    const {appStore: {setDrawerOpen}} = useStores();
	return (
		<>
			<Image.PreviewGroup>
				<Row gutter={[12, 12]}>
					{Array(8)
						.fill(0)
						.map((e, idx) => (
							<Col span={6}>
								<Image
									key={idx}
									src={
										idx % 2 === 0
											? 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
											: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
									}
								/>
							</Col>
						))}
				</Row>
			</Image.PreviewGroup>
			<Button className='max-width' color='default' variant='filled' style={{ marginTop: 8 }} size='small' onClick={() => setDrawerOpen('Storage')}>
				View all
			</Button>
		</>
	);
}

export default React.memo(PreviewStorage);
