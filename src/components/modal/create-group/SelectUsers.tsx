import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Input, Row, Space, Spin, Tag, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useStores } from '../../../stores/stores';
import { defaultText, toNormalize } from '../../../utils/helper';
import { User } from '../../../utils/type';
import Member from '../../common/Member';
import ListSelected from './ListSelected';
import { DELAY_INPUT } from '../../../utils/constants';

interface Props {
	joined?: string[];
	disableTag?: true;
}

function SelectUsers(props: Props) {
	const {
		appStore: { $$, labels },
		chatStore: { selectedUsers, setSelectedUsers, searchUser },
	} = useStores();
	const { joined, disableTag } = props;

	const [searchText, setSearchText] = useState<string>('');
	const [selectedLabel, setSelectedLabel] = useState<string>('all');
	const [searchedUser, setSearchedUser] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const listLabel = useMemo(
		() =>
			[{ id: 'all', name: $$('all'), color: 'black' }, ...labels].map((e) => (
				<Tag
					key={e.id}
					color={e.id === selectedLabel ? e.color : undefined}
					onClick={() => setSelectedLabel(e.id)}
				>
					{defaultText($$(e.name as any), e.name)}
				</Tag>
			)),
		[labels, selectedLabel]
	);

	const onCheck = (user: User) => {
		if (selectedUsers.has(user.id)) {
			let newMap = new Map(selectedUsers);
			newMap.delete(user.id);
			setSelectedUsers(newMap);
		} else {
			setSelectedUsers(new Map(selectedUsers.set(user.id, user)));
		}
	};

	useEffect(() => {
		setLoading(true);
		
		const timer = setTimeout(() => {
			const res = searchUser(searchText, selectedLabel);
			setSearchedUser(res);
			setLoading(false);
		}, DELAY_INPUT);

		return () => {
			clearTimeout(timer);
		};
	}, [searchText, selectedLabel]);

	return (
		<>
			<Space direction='vertical'>
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
				<Row className='list-label' wrap={false}>
					{!disableTag && listLabel}
				</Row>
				<Spin spinning={loading}>
					<Row style={{ position: 'relative', height: '50vh' }}>
						<Space
							direction='vertical'
							className={`select-user  ${selectedUsers.size > 0 && 'has-selected'} max-width flex-grow`}
							style={{ position: 'relative' }}
						>
							{searchedUser.map((user) => {
								const isJoined = joined?.includes(user.id);
								return (
									<Row
										key={user.id}
										onClick={() => {
											!isJoined && onCheck(user);
										}}
										className={`user-row ${!isJoined && 'hover-change-color'}`}
										style={{
											paddingRight: '1rem',
											cursor: isJoined ? 'unset' : 'pointer',
										}}
									>
										<Checkbox checked={selectedUsers.has(user.id)} disabled={isJoined} />
										<Member user={user} />
										{isJoined && (
											<Typography.Text type='secondary' style={{ whiteSpace: 'nowrap' }}>
												{$$('joined')}
											</Typography.Text>
										)}
									</Row>
								);
							})}
						</Space>
						{selectedUsers.size > 0 && <ListSelected listChecked={selectedUsers} onUncheck={onCheck} />}
					</Row>
				</Spin>
			</Space>
		</>
	);
}
export default React.memo(observer(SelectUsers));
