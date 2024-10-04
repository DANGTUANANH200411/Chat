import React from 'react';
import { RoleType } from '../../../utils/type';
import {
	AuditOutlined,
	DeleteOutlined,
	ExceptionOutlined,
	MoreOutlined,
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
	const { Role, onRemoveMember, appointAdmin, removeAdmin } = chatStore;

	const isFriend = isFriendFn(id)
	
	const friendItem: ItemType = {
		key: 'add-remove-friend',
		label: $$(isFriend ? 'unfriend' : 'add-friend'),
		icon: isFriend ? <UserDeleteOutlined /> : <UserAddOutlined />,
		onClick: () => setFriend(id, isFriend),
	};

	const items: ItemType[] = [
		friendItem,
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
						onClick: () => role === 'Admin' ? removeAdmin(id) : appointAdmin(id),
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
			return isFriend ? <></> : <UserAddOutlined className='hoverable-icon' onClick={() => () => setFriend(id)} />;
	}
}

export default React.memo(observer(MembersAction));
