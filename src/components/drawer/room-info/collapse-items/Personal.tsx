import { Flex, Input, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useStores } from '../../../../stores/stores';
import { observer } from 'mobx-react';
import { EditOutlined, TeamOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { User } from '../../../../utils/type';
import Confirm from '../../../common/Confirm';

function Personal() {
	const {
		appStore: { $$, getUserById, onChangeAliasName, toggleAddToGroup, toggleGrpsInComm },
		chatStore: { Room, setSelectedUsers, toggleCreateGroup, setRoomName },
	} = useStores();

	const { id, name } = Room!;

	const [alias, setAlias] = useState<string>(name);

	const onCreateGroupWith = useCallback(() => {
		const user = getUserById(id);
		if (user) {
			const map = new Map<string, User>();
			map.set(id, user);
			user && setSelectedUsers(map);
			toggleCreateGroup();
		}
	}, [id, getUserById, setSelectedUsers, toggleCreateGroup]);

	const onChangeAlias = useCallback(() => {
		onChangeAliasName(id, alias);
		setRoomName(id, alias);
	}, [alias]);

	return (
		<Flex vertical gap='small'>
			<Confirm
				title={$$('change-alias-name')}
				body={
					<>
						<Input value={alias} onChange={(e) => setAlias(e.target.value)} maxLength={50} showCount />
					</>
				}
				okText='Change'
				onOk={onChangeAlias}
				afterOpenChange={()=> setAlias(name)}
			>
				<Typography.Text ellipsis className='div-button'>
					<EditOutlined /> {$$('change-alias-name')}
				</Typography.Text>
			</Confirm>

			<Typography.Text ellipsis className='div-button' onClick={onCreateGroupWith}>
				<UsergroupAddOutlined /> {$$('create-group-with-n', { name })}
			</Typography.Text>
			<Typography.Text ellipsis className='div-button' onClick={() => toggleAddToGroup(id)}>
				<UserAddOutlined /> {$$('add-n-to-groups', { name })}
			</Typography.Text>
			<Typography.Text ellipsis className='div-button' onClick={() => toggleGrpsInComm(id)}>
				<TeamOutlined /> {$$('view-groups-in-common')}
			</Typography.Text>
		</Flex>
	);
}

export default React.memo(observer(Personal));
