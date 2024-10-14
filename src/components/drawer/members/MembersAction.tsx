import React from 'react';
import { RoleType } from '../../../utils/type';
import {
	AuditOutlined,
	DeleteOutlined,
	ExceptionOutlined,
	MessageOutlined,
	MoreOutlined,
	PhoneOutlined,
	StopOutlined,
	UserAddOutlined,
	UserDeleteOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { notify } from '../../../utils/notify';
import { Dropdown } from 'antd';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react-lite';
import { ItemType } from 'antd/es/menu/interface';

interface Props {
	id: string;
	role: RoleType;
}
function MembersAction(props: Props) {
	const {
		appStore: { $$, isFriendFn, setFriend },
		chatStore,
	} = useStores();
	const { id, role } = props;
	const { Role, onRemoveMember, appointAdmin, removeAdmin, openPersonalRoom, onCall } = chatStore;

	const isFriend = isFriendFn(id);

	const defaultItems: ItemType[] = [
		{
			key: 'add-remove-friend',
			label: $$(isFriend ? 'unfriend' : 'add-friend'),
			icon: isFriend ? <UserDeleteOutlined /> : <UserAddOutlined />,
			onClick: () => setFriend(id, isFriend),
		},
		{
			key: 'call',
			label: $$('call'),
			icon: <PhoneOutlined />,
			onClick: () => onCall(),
		},
		{
			key: 'message',
			label: $$('message'),
			icon: <MessageOutlined />,
			onClick: () => openPersonalRoom(id, true),
		},
	];

	const items: ItemType[] = [
		...defaultItems,
		{
			key: 'profile',
			label: $$('view-profile'),
			icon: <UserOutlined />,
			onClick: () => {},
		},
		...(Role === 'Owner'
			? [
					{
						key: 'appointed',
						label: $$(role === 'Admin' ? 'remove-admin' : 'appoint-admin'),
						icon: role === 'Admin' ? <ExceptionOutlined /> : <AuditOutlined />,
						onClick: () => (role === 'Admin' ? removeAdmin(id) : appointAdmin(id)),
					},
			  ]
			: []),
		{
			key: 'block',
			label: $$('block-member'),
			icon: <StopOutlined />,
			onClick: () => notify('Incomming'),
		},
		...(Role === 'Owner' || (Role === 'Admin' && role === 'Member')
			? [
					{
						key: 'remove',
						label: $$('remove-from-group'),
						icon: <DeleteOutlined />,
						onClick: () => onRemoveMember(id),
						danger: true,
					},
			  ]
			: []),
	];

	switch (Role) {
		case 'Owner':
		case 'Admin':
			return (
				<Dropdown trigger={['click']} menu={{ items }} destroyPopupOnHide arrow>
					<MoreOutlined rotate={90} className='hoverable-icon' onClick={(e) => e.stopPropagation()} />
				</Dropdown>
			);
		default:
			return isFriend ? (
				<Dropdown trigger={['click']} menu={{ items: defaultItems }} destroyPopupOnHide arrow>
					<MoreOutlined rotate={90} className='hoverable-icon' onClick={(e) => e.stopPropagation()} />
				</Dropdown>
			) : (
				<UserAddOutlined
					className='hoverable-icon'
					onClick={() => setFriend(id, isFriend)}
					style={{ visibility: 'visible' }}
				/>
			);
	}
}

export default React.memo(observer(MembersAction));
