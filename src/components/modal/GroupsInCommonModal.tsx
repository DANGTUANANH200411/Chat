import { Avatar, Checkbox, Flex, Modal, Row, Space, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../stores/stores';
import GroupAvatar from '../common/GroupAvatar';
import { ChatRoom } from '../../utils/type';
import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';

function GroupsInCommonModal() {
	const {
		appStore: { mdlGrpsInComm, $$ },
		chatStore: { getGroupsInCommon },
	} = useStores();

	const { visible, id } = mdlGrpsInComm;

	const [list, setList] = useState<ChatRoom[]>([]);

	useEffect(() => {
		id && setList(getGroupsInCommon(id));
	}, [id]);

    const color = '#67a3fd';
	return (
		<Modal centered open={visible} destroyOnClose title={$$('groups-in-common')}>
			<Flex vertical gap={12}>
				<Flex align='center' gap={8}>
					<Flex align='center' gap='inherit' className='hover-change-color'>
						<Avatar icon={<UsergroupAddOutlined style={{color}}/>} style={{ background: '#c9dcff' }} />
						<Typography.Text ellipsis style={{color}}>
							{$$('create-group-with-n', { name: 'HA' })}
						</Typography.Text>
					</Flex>
				</Flex>
				<Flex align='center' gap={8}>
					<Flex align='center' gap='inherit' className='hover-change-color'>
						<Avatar icon={<UserAddOutlined style={{color}}/>} style={{ background: '#c9dcff' }} />
						<Typography.Text ellipsis style={{color}}>
							{$$('add-n-to-groups', { name: 'HA' })}
						</Typography.Text>
					</Flex>
				</Flex>
				<Space
					direction='vertical'
					className='max-width'
					style={{ position: 'relative', height: '40vh', overflow: 'auto' }}
				>
					{list.map((item) => {
						return (
							<Row
								key={item.id}
								className='hover-change-color'
								align='middle'
								justify='space-between'
								style={{
									paddingRight: '1rem',
									cursor: 'pointer',
								}}
							>
								<Flex align='center' gap={8}>
									<Flex align='center' gap='inherit'>
										<GroupAvatar members={item.members ?? []} image={item.image} />
										<Typography.Text ellipsis strong>
											{item.name}
										</Typography.Text>
									</Flex>
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
