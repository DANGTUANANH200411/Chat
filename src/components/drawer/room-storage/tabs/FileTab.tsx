import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { useStores } from '../../../../stores/stores';
import { Col, Empty, Flex, Row, Space, Typography } from 'antd';
import FilterSender from '../filter/FilterSender';
import FilterTime from '../filter/FilterTime';
import { Message } from '../../../../utils/type';
import FileMessage from '../../../Chat/body/content-render/FileMessage';
import dayjs from 'dayjs';
import FilterInput from '../filter/FilterInput';
import StorageItem from './components/StorageItem';

function FileTab() {
	const {
		appStore: { lang },
		chatStore: { Files },
	} = useStores();

	const groupByDate: { [date: string]: Message[] } = useMemo(() => {
		return Files.reduce((rv: any, x) => {
			const date = x.createDate.substring(0, 8);
			(rv[date] = rv[date] || []).push(x);
			return rv;
		}, {});
	}, [Files]);

	return (
		<Flex vertical className='max-height max-width'>
			<div className='max-width drawer-group'>
				<Row gutter={[8, 8]}>
					<Col span={24}>
						<FilterInput />
					</Col>
					<Col span={10}>
						<FilterSender />
					</Col>
					<Col span={14}>
						<FilterTime />
					</Col>
				</Row>
			</div>
			<div className='max-width' style={{ flex: '1', overflow: 'auto' }}>
				{Files.length ? (
					<Flex vertical gap={8}>
						{Object.entries(groupByDate).map(([k, values]) => (
							<div key={k} className='drawer-group'>
								<Typography.Text ellipsis strong className='max-width'>
									{dayjs(k).format('DD MMMM')}
								</Typography.Text>
								{values.map((e) => (
									<StorageItem key={e.id} id={e.id} type='File'>
										<FileMessage content={e.content} fileSize={e.fileSize} />
									</StorageItem>
								))}
							</div>
						))}
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

export default React.memo(observer(FileTab));
