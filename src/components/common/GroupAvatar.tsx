import { Avatar, Row } from 'antd';
import './style.css';
import UserAvatar from './UserAvatar';
interface Props {
	image?: string;
	members: string[];
}
function GroupAvatar(props: Props) {
	const { image, members } = props;
	const generateGroupAvt = () =>
		members.slice(0, 4).map((id, idx) =>
			members.length > 4 && idx === 3 ? (
				<Avatar
					key={members.length}
					className='child-avt'
					style={{ backgroundColor: 'var(--primary-color)', fontSize: 'medium' }}
				>
					{`+ ${members.length - 3}`}
				</Avatar>
			) : (
				<UserAvatar key={id} id={id} className='child-avt' />
			)
		);
	return <>{image ? <Avatar src={image} /> :<div className='max-height custom-group-avt'> {generateGroupAvt()}</div>}</>
}
export default GroupAvatar;
