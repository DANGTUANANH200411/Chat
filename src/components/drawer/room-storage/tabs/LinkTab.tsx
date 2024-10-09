import { Col, Image, Flex, Row, Typography, Empty } from 'antd';
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
				{Links.length ? (
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
												<PreviewLink id={e.id} url={e.content} sendDate={e.createDate} />
											</StorageItem>
										))}
									</Flex>
								</div>
							))}
						</Image.PreviewGroup>
					</Flex>
				) : (
					<Row
						className='max-width max-height'
						justify='center'
						align='middle'
						style={{ background: 'white' }}
					>
						<Empty />
					</Row>
				)}
			</div>
		</Flex>
	);
}

export default React.memo(observer(LinkTab));
