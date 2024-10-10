import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Col, Flex, Input, Row, Space, Spin } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../../../stores/stores';
import { DELAY_INPUT } from '../../../../utils/constants';
import { ShareSelectItemProps } from '../../../../utils/type';
import ShareItem from './ShareItem';
import ShareSelectItem from './ShareSelectItem';

interface Props {
	selected: Set<string>;
	setSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
}
function SelectShare(props: Props) {
	const {
		appStore: { $$ },
		chatStore: {
			mdlShareProps: { items },
			searchGroupAndUser,
		},
	} = useStores();

	const { selected, setSelected } = props;
	const [searchText, setSearchText] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [list, setList] = useState<ShareSelectItemProps[]>([]);

	useEffect(() => {
		setLoading(true);

		const timer = setTimeout(async () => {
			const res = searchGroupAndUser(searchText);
			setList(res);
			setLoading(false);
		}, DELAY_INPUT);

		return () => {
			clearTimeout(timer);
		};
	}, [searchText]);
	return (
		<Flex vertical gap={12}>
			<Row>
				<Input
					allowClear
					className='styled-input'
					value={searchText}
					placeholder={$$('search-place-holder')}
					prefix={<SearchOutlined className='text-secondary' />}
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</Row>
			<Spin spinning={loading}>
				<Space
					direction='vertical'
					className='max-width'
					style={{ position: 'relative', height: '40vh', overflow: 'auto' }}
				>
					{list.map((item) => (
						<Row
							key={item.id}
							onClick={() => {
								setSelected((state) => {
									const newState = new Set(state);
									newState.has(item.id) ? newState.delete(item.id) : newState.add(item.id);
									return newState;
								});
							}}
							className={`user-row ${'hover-change-color'}`}
							style={{
								paddingRight: '1rem',
								cursor: 'pointer',
							}}
						>
							<Checkbox checked={selected.has(item.id)} />
							<ShareSelectItem item={item} />
						</Row>
					))}
				</Space>
			</Spin>
			<Row className='share-item-list' gutter={8} align='middle'>
				{items.map((item) => (
					<ShareItem key={item.id} {...item} />
				))}
			</Row>
		</Flex>
	);
}

export default React.memo(observer(SelectShare));
