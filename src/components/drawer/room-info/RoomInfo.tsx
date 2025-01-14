import { Button, Collapse, CollapseProps, Flex, Modal, Row, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import GroupAvatar from '../../common/GroupAvatar';
import UserAvatar from '../../common/UserAvatar';
import {
	CaretRightOutlined,
	DeleteOutlined,
	EditFilled,
	EyeInvisibleOutlined,
	FileTextOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
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
import Confirm from '../../common/Confirm';
import Personal from './collapse-items/Personal';
import ChangeGroupNameModal from '../../modal/change-group-name/ChangeGroupNameModal';

const panelStyle: React.CSSProperties = {
	marginTop: 4,
	background: 'var(--background-color)',
	borderRadius: 'none',
	border: 'none',
	borderTop: '2px solid var(--border-color)',
};

function RoomInfo() {
	const {
		appStore: { $$, setDrawerOpen },
		chatStore: {
			Room,
			Role,
			Permission: { changeNameOrAvt },
			onLeaveGroup,
			onDeleteChatHistory,
			toggleChangeGroupNameModal,
		},
	} = useStores();

	const { id, name, isGroup, members, image, pinned } = Room!;

	const [activeKey, setActiveKey] = useState<string[]>([]);

	const personalItems: CollapseProps['items'] = [
		{
			key: 'personal',
			label: 'Peronal',
			children: <Personal />,
			style: panelStyle,
		},
	];

	const groupItems: CollapseProps['items'] = [
		{
			key: 'members',
			label: $$('group-member'),
			children: (
				<Button
					block
					className='collapse-content-item'
					color='default'
					variant='text'
					size='large'
					icon={<FontAwesomeIcon icon={faUserGroup} />}
					onClick={() => setDrawerOpen('Members')}
				>
					{members.length} {$$('members')}
				</Button>
			),
			style: panelStyle,
		},
		{
			key: 'board',
			label: 'Group board',
			children: (
				<Flex vertical>
					<Button
						block
						className='collapse-content-item'
						color='default'
						variant='text'
						size='large'
						icon={<FontAwesomeIcon icon={faClock} />}
						onClick={() => notify('Incomming')}
					>
						Reminer board
					</Button>
					<Button
						block
						className='collapse-content-item'
						color='default'
						variant='text'
						size='large'
						icon={<FileTextOutlined />}
						onClick={() => setDrawerOpen('Board')}
					>
						Note, pin, poll
					</Button>
				</Flex>
			),
			style: panelStyle,
		},
	];

	const items: CollapseProps['items'] = useMemo(
		() => [
			...(isGroup ? groupItems : personalItems),
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
					<Flex vertical>
						<Button
							block
							className='collapse-content-item'
							color='default'
							variant='text'
							size='large'
							icon={<EyeInvisibleOutlined />}
							onClick={() => notify('Incomming')}
						>
							{$$('disappearing-msg')}
						</Button>
						<Confirm
							danger
							title={$$('delete-chat-history')}
							okText={$$('delete')}
							onOk={() => onDeleteChatHistory()}
						>
							<Button
								block
								className='collapse-content-item'
								color='danger'
								variant='text'
								size='large'
								icon={<DeleteOutlined />}
								onClick={() => notify('Incomming')}
							>
								{$$('delete-chat-history')}
							</Button>
						</Confirm>

						<Confirm
							danger
							title={$$('leave')}
							body={$$('leave-and-delete')}
							okText={$$('leave')}
							onOk={() => onLeaveGroup()}
						>
							<Button
								block
								className='collapse-content-item'
								color='danger'
								variant='text'
								size='large'
								icon={<LogoutOutlined />}
								onClick={() => notify('leave')}
							>
								{$$('leave')}
							</Button>
						</Confirm>
					</Flex>
				),
				style: panelStyle,
			},
		],
		[Room]
	);

	useEffect(() => {
		setActiveKey(items.map((e) => e.key as string));
	}, [items]);

	return (
		<>
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
					<Flex gap={8} style={{ width: '80%'}} justify='center'>
						<Typography.Text strong ellipsis className='text-large'>
							{name}
						</Typography.Text>
						{(Role !== 'Member' || changeNameOrAvt) && <EditFilled className='circle btn' onClick={toggleChangeGroupNameModal} />}
					</Flex>
					<ActionBar id={id} isGroup={isGroup} pinned={pinned} />
				</Flex>
				<Collapse
					items={items}
					bordered={false}
					expandIconPosition='end'
					activeKey={activeKey}
					onChange={(keys) => setActiveKey(keys)}
					expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
				></Collapse>
			</div>
			<ChangeGroupNameModal />
		</>
	);
}

export default React.memo(observer(RoomInfo));
