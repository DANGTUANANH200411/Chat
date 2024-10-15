import { Checkbox, Flex, Input, Modal, Row, Space, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react-lite';
import { SearchOutlined } from '@ant-design/icons';
import { ShareSelectItemProps } from '../../../utils/type';
import { DELAY_INPUT } from '../../../utils/constants';
import ShareSelectItem from '../share/components/ShareSelectItem';
import GroupAvatar from '../../common/GroupAvatar';

function AddToGroupModal() {
	const {
		appStore: { $$, mdlAddToGroupProps, toggleAddToGroup },
		chatStore: { searchGroup, addFriendToGroups },
	} = useStores();

	const { visible, memberId } = mdlAddToGroupProps;
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [searchText, setSearchText] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [list, setList] = useState<ShareSelectItemProps[]>([]);

	useEffect(() => {
		setSelected(new Set());
	}, [visible]);

	useEffect(() => {
		setLoading(true);

		const timer = setTimeout(async () => {
			const res = searchGroup(searchText);
			setList(res);
			setLoading(false);
		}, DELAY_INPUT);

		return () => {
			clearTimeout(timer);
		};
	}, [searchText, memberId]);

	return (
		<Modal
			centered
			destroyOnClose
			open={visible}
			title={$$('add-to-group')}
			onOk={() => {
				addFriendToGroups(memberId ?? '', [...selected]);
				toggleAddToGroup();
			}}
			onCancel={() => toggleAddToGroup()}
			okButtonProps={{
				disabled: !selected.size,
			}}
		>
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
						{list.map((item) => {
							const joined = item.members?.some((e) => e.id === memberId);
							return (
								<Row
									key={item.id}
									onClick={() => {
										!joined &&
											setSelected((state) => {
												const newState = new Set(state);
												newState.has(item.id)
													? newState.delete(item.id)
													: newState.add(item.id);
												return newState;
											});
									}}
									className={`${!joined && 'hover-change-color'}`}
									align='middle'
									justify='space-between'
									style={{
										paddingRight: '1rem',
										cursor: joined ? 'unset' : 'pointer',
									}}
								>
									<Flex align='center' gap={8}>
										<Checkbox checked={selected.has(item.id)} />
										<Flex align='center' gap='inherit'>
											<GroupAvatar members={item.members ?? []} image={item.image} size={36} />
											<Typography.Text ellipsis strong>
												{item.name}
											</Typography.Text>
										</Flex>
									</Flex>
									{joined && (
										<Typography.Text ellipsis type='secondary'>
											{$$('joined')}
										</Typography.Text>
									)}
								</Row>
							);
						})}
					</Space>
				</Spin>
			</Flex>
		</Modal>
	);
}
export default React.memo(observer(AddToGroupModal));
