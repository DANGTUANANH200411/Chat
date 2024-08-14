import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { Checkbox, Col, Row, Space, Typography } from 'antd';
import UserAvatar from '../../common/UserAvatar';
import { forwardRef, useMemo } from 'react';
import ListSelected from './ListSelected';
import { User } from '../../../utils/type';
import { toNormalize } from '../../../utils/helper';
import React from 'react';

interface Props {
	searchText: string;
	searchLabel: string;
}

function SelectUsers(props: Props) {
	const {
		chatStore: { Users, selectedUsers, setSelectedUsers },
	} = useStores();
	const { searchText, searchLabel } = props;

	const onCheck = (user: User) => {
		if (selectedUsers.has(user.id)) {
			let newMap = new Map(selectedUsers);
			newMap.delete(user.id);
			setSelectedUsers(newMap);
		} else {
			setSelectedUsers(new Map(selectedUsers.set(user.id, user)));
		}
	};

	const searchedUser = useMemo(() => {
		if (searchLabel === 'all' && !searchText) return Users;
		return Users.filter(
			(e) =>
				(searchLabel === 'all' || e.label === searchLabel) &&
				(!searchText || toNormalize(e.userName).includes(toNormalize(searchText)))
		);
	}, [searchText, searchLabel]);

	return (
		<Row className='max-width' style={{ position: 'relative', height: '50vh' }}>
			<Col span={selectedUsers.size > 0 ? 14 : 24} className='max-height'>
				<Space
					direction='vertical'
					className={`select-user  ${selectedUsers.size > 0 && 'has-selected'} max-width`}
					style={{ position: 'relative' }}
				>
					{searchedUser.map((user) => (
						<Space
							key={user.id}
							onClick={() => onCheck(user)}
							className='hover-change-color user-row max-width'
						>
							<Checkbox checked={selectedUsers.has(user.id)} />
							<UserAvatar id={user.id} />
							<Typography.Text strong ellipsis style={{ width: '25vh' }}>
								{user.userName}
							</Typography.Text>
						</Space>
					))}
				</Space>
			</Col>
			{selectedUsers.size > 0 && (
				<Col span={10} className='max-height'>
					<ListSelected listChecked={selectedUsers} onUncheck={onCheck} />
				</Col>
			)}
		</Row>
	);
}
export default React.memo(observer(SelectUsers));
