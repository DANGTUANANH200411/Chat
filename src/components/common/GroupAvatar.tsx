import { Avatar, Row } from 'antd';
import './style.css';
import UserAvatar from './UserAvatar';
interface Props {
	members: string[];
}
function GroupAvatar(props: Props) {
	return (
		<div className='max-height custom-group-avt'>
			{props.members.slice(0, 4).map((id, idx) =>
				props.members.length > 4 && idx === 3 ? (
					<Avatar
						key={props.members.length}
						className='child-avt'
						style={{ backgroundColor: 'var(--primary-color)', fontSize: 'medium' }}
					>
						{`+ ${props.members.length - 3}`}
					</Avatar>
				) : (
					<UserAvatar
						key={id}
						id={id}
						className='child-avt'
					/>
				)
			)}
		</div>
	);
}
export default GroupAvatar;
