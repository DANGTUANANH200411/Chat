import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import { Avatar, AvatarProps } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { User } from '../../utils/type';
import React, { useMemo } from 'react';
interface Props extends AvatarProps {
	id: string;
	user?: User;
	showSymbol?: true | boolean;
}
function UserAvatar(props: Props) {
	const {
		appStore: { users },
		chatStore: { getRole },
	} = useStores();
	const { id, showSymbol, user: propUser } = props;

	const user = useMemo(() => propUser ?? users.get(id), [propUser, users, id]);

	const role = useMemo(() => (showSymbol ? getRole(id) : 'Member'), [id, showSymbol, getRole]);

	const avatar = useMemo(
		() => (
			<Avatar
				src={user?.imageSrc}
				{...props}
				style={{ background: '#90ade1', ...props.style }}
				icon={<UserOutlined />}
			>
				{user ? user.userName : 'Unknown'}
			</Avatar>
		),
		[user]
	);
	if (showSymbol && role !== 'Member')
		return (
			<div style={{ position: 'relative', height: 'fit-content' }}>
				{avatar}
				<KeyOutlined className={`admin-key${role === 'Owner' ? ' owner' : ''}`} />
			</div>
		);
	return <>{avatar}</>;
}

export default React.memo(observer(UserAvatar));
