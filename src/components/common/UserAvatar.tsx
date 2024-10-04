import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import { Avatar, AvatarProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
interface Props extends AvatarProps {
	id: string;
	className?: string;
}
function UserAvatar(props: Props) {
	const { appStore: {users} } = useStores();
	const { id} = props;
	const user = users.get(id);
	return (
		<Avatar src={user?.imageSrc} {...props} style={{background: '#90ade1', ...props.style}} icon={<UserOutlined />}>
			{user ? user.userName : 'Unknown'}
		</Avatar>
	);
}

export default observer(UserAvatar);
