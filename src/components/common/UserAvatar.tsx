import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import { Avatar, AvatarProps } from 'antd';
import { User } from '../../utils/type';
interface Props extends AvatarProps {
	id: string;
	className?: string;
	user?: User;
}
function UserAvatar(props: Props) {
	const { chatStore } = useStores();
	const { user, id } = props;

	if (!user) return <></>;
	return (
		<Avatar src={user.imageSrc} {...props}>
			{user ? user.userName : 'Unknown'}
		</Avatar>
	);
}

export default observer(UserAvatar);
