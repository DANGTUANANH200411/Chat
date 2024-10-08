import { Collapse, CollapseProps, Flex, Row, Typography } from 'antd';
import React from 'react';
import GroupAvatar from '../../common/GroupAvatar';
import UserAvatar from '../../common/UserAvatar';
import { EditOutlined, FileTextOutlined } from '@ant-design/icons';
import ActionBar from './ActionBar';
import { GROUP_AVT_SIZE } from '../../../utils/constants';
import { useStores } from '../../../stores/stores';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { notify } from '../../../utils/notify';
import PreviewStorage from '../room-storage/PreviewStorage';

const panelStyle: React.CSSProperties = {
	marginBottom: 4,
	background: 'var(--background-color)',
	borderRadius: 'none',
	border: 'none',
};

function RoomInfo() {
	const {
		appStore: { $$, setDrawerOpen },
		chatStore: { Room },
	} = useStores();
	if (!Room) return <></>;
	const { id, name, isGroup, members, image, label } = Room;
	const items: CollapseProps['items'] = [
		{
			key: '1',
			label: 'Group member',
			children: (
				<div className='div-button' onClick={() => setDrawerOpen('Members')}>
					<FontAwesomeIcon icon={faUserGroup} style={{ fontSize: 16 }} /> {members.length} {$$('members')}
				</div>
			),
			style: panelStyle,
		},
		{
			key: '2',
			label: 'Group board',
			children: (
				<Flex vertical gap='small'>
					<div className='div-button' onClick={() => notify('Incomming')}>
						<FontAwesomeIcon icon={faClock} style={{ fontSize: 16 }} /> Reminer board
					</div>
					<div className='div-button' onClick={() => notify('Incomming')}>
						<FileTextOutlined style={{ fontSize: 16 }} /> Note, pin, poll
					</div>
				</Flex>
			),
			style: panelStyle,
		},
		{
			key: '3',
			label: 'Photo/Video',
			children: <PreviewStorage />,
			style: panelStyle,
		},
	];
	return (
		<div className='drawer drawer-group-info max-height'>
			<Row className='header' justify='center' align='middle'>
				<Typography.Text strong ellipsis>
					{$$('room-info')}
				</Typography.Text>
			</Row>
			<div className='body'>
				<Flex vertical justify='center' align='center' className='max-width drawer-group'>
					{isGroup ? (
						<GroupAvatar image={image} members={members} />
					) : (
						<UserAvatar id={id} size={GROUP_AVT_SIZE} />
					)}
					<Flex style={{ width: '80%' }} justify='center'>
						<Typography.Text strong ellipsis>
							{name}
						</Typography.Text>
						<EditOutlined />
					</Flex>
					<ActionBar />
				</Flex>
				<Collapse bordered={false} items={items} defaultActiveKey={items.map((e) => e.key) as any}></Collapse>
			</div>
		</div>
	);
}

export default React.memo(RoomInfo);
