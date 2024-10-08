import { Col, Image, Flex, Row, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import FilterTime from '../filter/FilterTime';
import dayjs from 'dayjs';
import { useStores } from '../../../../stores/stores';
import { Message } from '../../../../utils/type';
import PreviewLink from './components/PreviewLink';
import StorageItem from './components/StorageItem';

function LinkTab() {
	const {
		appStore: { lang },
		chatStore: { Links },
	} = useStores();

	const groupByDate: { [date: string]: Message[] } = useMemo(() => {
		return Links.reduce((rv: any, x) => {
			const date = x.createDate.substring(0, 8);
			(rv[date] = rv[date] || []).push(x);
			return rv;
		}, {});
	}, [Links]);
	return (
		<Flex vertical className='max-height max-width'>
			<div className='max-width drawer-group'>
				<Row gutter={[8, 8]}>
					{/* <Col span={24}>
						<FilterInput />
					</Col> */}
					<Col span={24}>
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
								<Flex vertical gap={8}>
									{values.map((e) => (
										<StorageItem key={e.id} id={e.id} type='Link' url={e.content}>
											<PreviewLink id={e.id} url={e.content} />
										</StorageItem>
									))}
								</Flex>
							</div>
						))}
					</Image.PreviewGroup>
				</Flex>
			</div>
		</Flex>
	);
}

export default React.memo(observer(LinkTab));
