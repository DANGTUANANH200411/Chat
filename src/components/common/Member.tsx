import { Row, Typography } from 'antd';
import React, { useMemo } from 'react';
import { User } from '../../utils/type';
import UserAvatar from './UserAvatar';
import { useStores } from '../../stores/stores';
import { observer } from 'mobx-react';
interface Props {
	user: User;
	info?: string;
	action?: React.ReactNode;
	size?: 'small' | 'default' | 'large';
	isMe?: boolean;
}
function Member(props: Props) {
	const {appStore: {$$}} = useStores();
	const { user, info, action, size, isMe } = props;

	const [primaryClass, secondaryClass] = useMemo(() => {
		switch (size) {
			case 'large':
				return ['text-large', 'text-medium'];
			case 'small':
				return ['text-small', 'text-smaller'];
			default:
				return ['text-medium', 'text-small'];
		}
	}, [size]);
	return (
		<div className='max-width member'>
			<UserAvatar id={user.id} className='member-avatar' size={size} />
			<Row wrap={false} justify='space-between' align='middle' className='flex-grow'>
				<Row>
					<Row>
						<Typography.Text strong ellipsis className={primaryClass}>
							{isMe ? $$('you') : user.userName}
						</Typography.Text>
					</Row>
					{info && (
						<Row>
							<Typography.Text className={secondaryClass} ellipsis type='secondary'>
								{info}
							</Typography.Text>
						</Row>
					)}
				</Row>
				{action && <div className={`member-action ${primaryClass}`}>{action}</div>}
			</Row>
		</div>
	);
}

export default React.memo(observer(Member));
