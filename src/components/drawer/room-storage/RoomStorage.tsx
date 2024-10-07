import { Row, Typography, Image, Col, Divider } from 'antd';
import React, { useMemo } from 'react';
import { useStores } from '../../../stores/stores';
import CustomImage from '../../common/CustomImage';
import { Message } from '../../../utils/type';
import { displayChatDate } from '../../../utils/dateHelper';
import { observer } from 'mobx-react';
import { CaretLeftOutlined } from '@ant-design/icons';

function RoomStorage() {
	const {
		appStore: { $$, setDrawerOpen },
		chatStore: { Images },
	} = useStores();

	const groupByDate: { [date: string]: Message[] } = useMemo(() => {
		return Images.reduce((rv: any, x) => {
			const date = x.createDate.substring(0, 8);
			(rv[date] = rv[date] || []).push(x);
			return rv;
		}, {});
	}, [Images]);

	return (
		<div className='drawer max-height'>
			<Row className='header' justify='center' align='middle'>
				<CaretLeftOutlined
					className='hoverable-icon'
					style={{ position: 'absolute', left: 0 }}
					onClick={() => setDrawerOpen('Info')}
				/>
				<Typography.Text strong ellipsis>
					Storage
				</Typography.Text>
			</Row>
			<div className='body' style={{ padding: '0 .8rem', overflow: 'auto' }}>
				<Image.PreviewGroup>
					{Object.entries(groupByDate).map(([k, values]) => (
						<Row gutter={[12, 12]} className='max-width'>
							<Divider orientation='left'>{displayChatDate(k)}</Divider>
							{values.map((e) => (
								<Col span={6}>
									<CustomImage antd key={e.id} src={e.data ?? e.content} />
								</Col>
							))}
						</Row>
					))}
				</Image.PreviewGroup>
			</div>
		</div>
	);
}

export default React.memo(observer(RoomStorage));
