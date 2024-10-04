import { Avatar, Row } from 'antd';
import './style.css';
import UserAvatar from './UserAvatar';
import { User } from '../../utils/type';
import { GROUP_AVT_SIZE } from '../../utils/constants';
interface Props {
	image?: string;
	members: User[];
}
function GroupAvatar(props: Props) {
	const { image, members } = props;
	const generateGroupAvt = () =>
		members.slice(0, 4).map((user, idx) =>
			members.length > 4 && idx === 3 ? (
				<Avatar
					key={members.length}
					className='child-avt'
					style={{ backgroundColor: 'var(--primary-color)', fontSize: 'medium' }}
				>
					{`+${members.length - 3}`}
				</Avatar>
			) : (
				<UserAvatar key={user.id} id={user.id} className='child-avt' />
			)
		);
	return (
		<>{image ? <Avatar src={image} size={GROUP_AVT_SIZE} /> : <div className='max-height custom-group-avt'> {generateGroupAvt()}</div>}</>
	);
}
export default GroupAvatar;
