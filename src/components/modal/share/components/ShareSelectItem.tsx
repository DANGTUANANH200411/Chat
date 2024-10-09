import React from 'react';
import { ShareSelectItemProps } from '../../../../utils/type';
import UserAvatar from '../../../common/UserAvatar';
import { Typography } from 'antd';
import GroupAvatar from '../../../common/GroupAvatar';

interface Props {
	item: ShareSelectItemProps;
}
function ShareSelectItem(props: Props) {
	const { id, name, isGroup, members, image } = props.item;

	if (isGroup) {
		return (
			<>
				<GroupAvatar members={members ?? []} image={image} size={36} />
				<Typography.Text ellipsis strong>
					{name}
				</Typography.Text>
			</>
		);
	}
	return (
		<>
			<UserAvatar id={id} className='member-avatar' size={36}/>
			<Typography.Text ellipsis strong>
				{name}
			</Typography.Text>
		</>
	);
}

function propsAreEquals(prev: Props, next: Props) {
	return prev.item.id === next.item.id;
}
export default React.memo(ShareSelectItem, propsAreEquals);
