import { Row, Skeleton, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { useStores } from '../../stores/stores';
import { User } from '../../utils/type';
import UserAvatar from './UserAvatar';
interface Props {
	user?: User;
	info?: string;
	action?: React.ReactNode;
	size?: 'small' | 'default' | 'large';
	isMe?: boolean;
	suffix?: React.ReactNode;
	showSymbol?: true | boolean;
}
function Member(props: Props) {
	const {
		appStore: { $$ },
	} = useStores();
	const { user, info, action, size, isMe, suffix, showSymbol } = props;

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
	if (!user) {
		return (
			<div className='max-width member'>
				<Skeleton.Avatar active />
				<Row wrap={false} justify='space-between' align='middle' className='flex-grow'>
					<Skeleton.Input active className='skeleton-input' />
				</Row>
			</div>
		);
	}
	return (
		<div className='max-width member'>
			<UserAvatar showSymbol={showSymbol} id={user.id} user={user} className='member-avatar' size={size} />
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
				{suffix}
				{!isMe && action && <div className={`member-action ${primaryClass}`}>{action}</div>}
			</Row>
		</div>
	);
}

export default React.memo(observer(Member));
