import { Col, Flex, Image, Row, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { useStores } from '../../../../stores/stores';
import { Message } from '../../../../utils/type';
import CustomImage from '../../../common/CustomImage';
import FilterSender from '../filter/FilterSender';
import FilterTime from '../filter/FilterTime';
import StorageItem from './components/StorageItem';

function PhotoTab() {
	const {
		appStore: { lang },
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
		<Flex vertical className='max-height max-width'>
			<div className='max-width drawer-group'>
				<Row gutter={8}>
					<Col span={10}>
						<FilterSender />
					</Col>
					<Col span={14}>
						<FilterTime />
					</Col>
				</Row>
			</div>
			<div className='max-width' style={{ flex: '1', overflow: 'auto' }}>
				<Flex vertical gap={8}>
					<Image.PreviewGroup>
						{Object.entries(groupByDate).map(([k, values]) => (
							<div key={k} className='drawer-group'>
								<Typography.Text ellipsis strong className='max-width'>
									{dayjs(k).format('DD MMMM')}
								</Typography.Text>
								<Row gutter={[12, 12]}>
									{values.map((e) => (
										<Col span={8} key={e.id}>
											<StorageItem id={e.id} type='Photo'>
												<CustomImage antd src={e.data ?? e.content} />
											</StorageItem>
										</Col>
									))}
								</Row>
							</div>
						))}
					</Image.PreviewGroup>
				</Flex>
			</div>
		</Flex>
	);
}

export default React.memo(observer(PhotoTab));
