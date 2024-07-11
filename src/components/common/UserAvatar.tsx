import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import { Avatar, AvatarProps } from 'antd';
interface Props extends AvatarProps {
	id: string;
	className?: string;
}
function UserAvatar(props: Props) {
	const { chatStore } = useStores();
	const { getUserById } = chatStore;
	const { id } = props;

	const user = getUserById(id);
	if (!user) return <></>;
	return (
		<Avatar
			src={user.imageSrc ? require(`../../resources/${user.imageSrc}`) : undefined}
			{...props}
		>
			{user ? user.userName : 'Unknown'}
		</Avatar>
	);
}

export default observer(UserAvatar);
