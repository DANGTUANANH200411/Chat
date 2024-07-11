import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import { Avatar } from 'antd';
interface Props {
	id: string;
	className?: string;
}
function UserAvatar(props: Props) {
	const { chatStore } = useStores();
	const { getUserById } = chatStore;
	const { id, className } = props;

	const user = getUserById(id);
	if (!user) return <></>;
	return (
		<Avatar
			className={className}
			src={user.imageSrc ? require(`../../resources/${user.imageSrc}`) : undefined}
		>
			{user ? user.userName : 'Unknown'}
		</Avatar>
	);
}

export default observer(UserAvatar);
