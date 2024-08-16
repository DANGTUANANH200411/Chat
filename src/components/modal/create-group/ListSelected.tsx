import React from 'react';
import { Row, Space, Typography } from 'antd';
import { User } from '../../../utils/type';
import { CloseCircleFilled } from '@ant-design/icons';
import Member from '../../common/Member';

interface Props {
	listChecked: Map<string, User>;
	onUncheck: (user: User) => void;
}
function ListSelected(props: Props) {
	const { listChecked, onUncheck } = props;
	return (
		<div className='list-selected-wapper'>
			<Row justify='space-between' className='fit-height'>
				<Typography.Text className='flex-grow' strong ellipsis>Selected</Typography.Text>{' '}
				<Typography.Text className='color-primary' strong>
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
						<Member user={user} size='small' action={<CloseCircleFilled className='text-secondary' />}/>
					</Row>
				))}
			</Space>
		</div>
	);
}

export default React.memo(ListSelected);
