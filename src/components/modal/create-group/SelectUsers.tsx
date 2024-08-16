import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { Checkbox, Col, Input, Row, Space, Tag, Typography } from 'antd';
import UserAvatar from '../../common/UserAvatar';
import { useMemo, useState } from 'react';
import ListSelected from './ListSelected';
import { User } from '../../../utils/type';
import { defaultText, toNormalize } from '../../../utils/helper';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Member from '../../common/Member';

interface Props {
	joined?: string[];
}

function SelectUsers(props: Props) {
	const {
		appStore: { Users, $$, labels },
		chatStore: { selectedUsers, setSelectedUsers },
	} = useStores();
	const { joined } = props;

	const [searchText, setSearchText] = useState<string>('');
	const [selectedLabel, setSelectedLabel] = useState<string>('all');

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
	const matchSearch = (text: string, user: User) => {
		if (!text) return true;
		if (!isNaN(Number(text))) {
			if (text.startsWith('0')) text = text.replace('0', '');
			return user.phoneNumber.includes(text);
		} else {
			return toNormalize(user.userName).includes(toNormalize(searchText));
		}
	};
	const searchedUser = useMemo(() => {
		if (selectedLabel === 'all' && !searchText) return Users;
		return Users.filter(
			(e) => (selectedLabel === 'all' || e.label === selectedLabel) && matchSearch(searchText, e)
		);
	}, [searchText, selectedLabel]);

	return (
		<>
			<Space direction='vertical'>
				<Row>
					<Input
						className='styled-input'
						value={searchText}
						placeholder={$$('search-place-holder')}
						prefix={<SearchOutlined className='text-secondary' />}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</Row>
				<Row className='list-label' wrap={false}>
					{listLabel}
				</Row>
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
									<Typography.Text type='secondary' style={{whiteSpace: 'nowrap'}}>{isJoined && $$('joined')}</Typography.Text>
								</Row>
							);
						})}
					</Space>
					{selectedUsers.size > 0 && <ListSelected listChecked={selectedUsers} onUncheck={onCheck} />}
				</Row>
			</Space>
		</>
	);
}
export default React.memo(observer(SelectUsers));
