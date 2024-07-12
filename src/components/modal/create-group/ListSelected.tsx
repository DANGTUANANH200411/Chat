import { Col, Row, Space, Typography } from 'antd';
import UserAvatar from '../../common/UserAvatar';
import { User } from '../../../utils/type';
import { CloseCircleFilled } from '@ant-design/icons';

interface Props {
	listChecked: Map<string, User>;
	onUncheck: (user: User) => void;
}
function ListSelected(props: Props) {
	const { listChecked, onUncheck } = props;
	return (
		<div className='list-selected-wapper'>
			<Row justify='space-between'>
				<Typography.Text strong>Selected</Typography.Text>{' '}
				<Typography.Text strong className='color-primary'>
					{listChecked.size}/100
				</Typography.Text>
			</Row>
			<Space direction='vertical' className='max-width list-selected'>
				{Array.from(listChecked.values()).map((user) => (
					<Row
						key={user.id}
						className='hover-change-color user-row color-primary'
						onClick={() => onUncheck(user)}
						align='middle'
					>
						<Col span={4}>
							<UserAvatar id={user.id} user={user} size='small' />
						</Col>
						<Col span={18}>
							<Typography.Text className='text-small' ellipsis strong>
								{user.userName}
							</Typography.Text>
						</Col>
						<Col span={2}>
							<CloseCircleFilled className='text-secondary' />
						</Col>
					</Row>
				))}
			</Space>
		</div>
	);
}

export default ListSelected;
