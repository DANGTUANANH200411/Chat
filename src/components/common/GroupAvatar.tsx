import { Avatar } from 'antd';
import './style.css';
import UserAvatar from './UserAvatar';
import { User } from '../../utils/type';
import { GROUP_AVT_SIZE } from '../../utils/constants';
import { useMemo } from 'react';
interface Props {
	image?: string;
	members: User[];
	size?: number;
}
function GroupAvatar(props: Props) {
	const { image, members, size } = props;

	const groupSize = size ?? GROUP_AVT_SIZE;
	const childSize = useMemo(() => (size ? size / 2 : GROUP_AVT_SIZE / 2), [size]);

	const generateGroupAvt = () =>
		members
			.slice(0, 4)
			.map((user, idx) => (
				<UserAvatar
					key={user.id}
					id={user.id}
					size={members.length === 3 && idx === 2 ? groupSize : childSize}
					shape='square'
					className='child-avt'
				/>
			));
	return (
		<>
			{image ? (
				<Avatar src={image} size={groupSize} />
			) : (
				<div className='max-height custom-group-avt' style={{ width: groupSize, height: groupSize }}>
					{generateGroupAvt()}
				</div>
			)}
		</>
	);
}
export default GroupAvatar;
