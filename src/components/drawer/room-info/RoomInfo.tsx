import { Collapse, CollapseProps, Flex, Row, Typography } from 'antd';
import React from 'react';
import GroupAvatar from '../../common/GroupAvatar';
import UserAvatar from '../../common/UserAvatar';
import { CaretRightOutlined, EditOutlined, EyeInvisibleOutlined, FileTextOutlined } from '@ant-design/icons';
import ActionBar from './ActionBar';
import { GROUP_AVT_SIZE } from '../../../utils/constants';
import { useStores } from '../../../stores/stores';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { notify } from '../../../utils/notify';
import PreviewPhotoStorage from '../room-storage/preview/PreviewPhotoStorage';
import PreviewFileStorage from '../room-storage/preview/PreviewFileStorage';
import PreviewLinkStorage from '../room-storage/preview/PreviewLinkStorage';
import { observer } from 'mobx-react';

const panelStyle: React.CSSProperties = {
	marginTop: 4,
	background: 'var(--background-color)',
	borderRadius: 'none',
	border: 'none',
	borderTop: '4px solid var(--border-color)',
};

function RoomInfo() {
	const {
		appStore: { $$, setDrawerOpen },
		chatStore: { Room, onLeaveGroup },
	} = useStores();
	if (!Room) return <></>;
	const { id, name, isGroup, members, image } = Room;
	const items: CollapseProps['items'] = [
		{
			key: 'members',
			label: $$('group-member'),
			children: (
				<div className='div-button' onClick={() => setDrawerOpen('Members')}>
					<FontAwesomeIcon icon={faUserGroup} /> {members.length} {$$('members')}
				</div>
			),
			style: panelStyle,
		},
		{
			key: 'board',
			label: 'Group board',
			children: (
				<Flex vertical gap='small'>
					<div className='div-button' onClick={() => notify('Incomming')}>
						<FontAwesomeIcon icon={faClock} /> Reminer board
					</div>
					<div className='div-button' onClick={() => notify('Incomming')}>
						<FileTextOutlined /> Note, pin, poll
					</div>
				</Flex>
			),
			style: panelStyle,
		},
		{
			key: 'photos',
			label: 'Photos/Videos',
			children: <PreviewPhotoStorage />,
			style: panelStyle,
		},
		{
			key: 'files',
			label: 'Files',
			children: <PreviewFileStorage />,
			style: panelStyle,
		},
		{
			key: 'links',
			label: 'Links',
			children: <PreviewLinkStorage />,
			style: panelStyle,
		},
		{
			key: 'privacy',
			label: $$('privacy-setting'),
			children: (
				<Flex vertical gap='mall'>
					<div className='div-button' onClick={() => notify('Incomming')}>
						<EyeInvisibleOutlined /> {$$('disappearing-msg')}
					</div>
					<div className='div-button danger' onClick={() => notify('Incomming')}>
						<FileTextOutlined /> {$$('delete-chat-history')}
					</div>
					<div className='div-button danger' onClick={() => onLeaveGroup()}>
						<FileTextOutlined /> {$$('leave')}
					</div>
				</Flex>
			),
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
			<div className='body' style={{ overflow: 'auto' }}>
				<Flex vertical justify='center' align='center' className='drawer-group group-info-sticky'>
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
				<Collapse
					items={items}
					bordered={false}
					expandIconPosition='end'
					defaultActiveKey={items.map((e) => e.key) as any}
					expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
				></Collapse>
			</div>
		</div>
	);
}

export default React.memo(observer(RoomInfo));
