import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Row, Space, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useStores } from '../../stores/stores';
import { notify } from '../../utils/notify';
import { ChatRoom, User } from '../../utils/type';
import GroupAvatar from '../common/GroupAvatar';
import GrpInCommDropdown from './GrpInCommDropdown';

function GroupsInCommonModal() {
	const {
		appStore: { user, mdlGrpsInComm, $$, getUserName, getUserById, toggleAddToGroup, toggleGrpsInComm },
		chatStore: { chatRooms, setSelectedUsers, toggleCreateGroup },
	} = useStores();

	const { visible, id } = mdlGrpsInComm;

	const [list, setList] = useState<ChatRoom[]>([]);
	const [name, setName] = useState<string>('Unknow');
	useEffect(() => {
		const rooms = chatRooms.filter(
			(e) => e.members.some((e) => e.id === user.id) && e.members.some((e) => e.id === id)
		);
		setList(rooms);
		setName(getUserName(id));
	}, [id, user, chatRooms, getUserName]);

	const onCreateGroupWith = useCallback(() => {
		const user = getUserById(id ?? '');
		if (!id || !user) {
			notify('User not found', 'error');
			return;
		}
		const map = new Map<string, User>();
		map.set(id, user);
		user && setSelectedUsers(map);
		toggleCreateGroup();
	}, [id, getUserById, setSelectedUsers, toggleCreateGroup]);

	return (
		<Modal
			centered
			open={visible}
			destroyOnClose
			title={$$('groups-in-common')}
			width={'20vw'}
			footer={<></>}
			onCancel={() => toggleGrpsInComm()}
		>
			<Flex vertical gap={12}>
				<Button
					color='primary'
					variant='filled'
					icon={<UsergroupAddOutlined style={{ color: 'inherit' }} />}
					onClick={onCreateGroupWith}
				>
					<Typography.Text ellipsis style={{ color: 'inherit' }}>
						{$$('create-group-with-n', { name })}
					</Typography.Text>
				</Button>
				<Button
					color='primary'
					variant='filled'
					icon={<UserAddOutlined style={{ color: 'inherit' }} />}
					onClick={() => toggleAddToGroup(id)}
				>
					<Typography.Text ellipsis style={{ color: 'inherit' }}>
						{$$('add-n-to-groups', { name })}
					</Typography.Text>
				</Button>
				<Space
					direction='vertical'
					className='max-width'
					style={{ position: 'relative', height: '40vh', overflow: 'auto' }}
				>
					{list.map((item) => {
						return (
							<Row
								key={item.id}
								className='toggle-wrapper'
								align='middle'
								justify='space-between'
								style={{
									paddingRight: '1rem',
								}}
							>
								<Flex gap={8} align='center' justify='space-between' className='max-width'>
									<Flex align='center' gap='inherit'>
										<GroupAvatar members={item.members ?? []} image={item.image} />
										<Flex vertical>
											<Typography.Text ellipsis strong>
												{item.name}
											</Typography.Text>
											<Typography.Text ellipsis className='small-text text-secondary'>
												{`${$$('owner')}: ${getUserName(item.creatorId)}`}
											</Typography.Text>
										</Flex>
									</Flex>
									{id && (
										<GrpInCommDropdown
											isOwner={user.id === item.creatorId}
											groupId={item.id}
											userId={id}
											className='toggle'
										/>
									)}
								</Flex>
							</Row>
						);
					})}
				</Space>
			</Flex>
		</Modal>
	);
}

export default React.memo(observer(GroupsInCommonModal));
