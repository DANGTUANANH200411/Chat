import { Avatar, Row } from 'antd';
import React from 'react';
import UserAvatar from '../../../common/UserAvatar';

interface Props {
    sender: string;
	readers?: string[];
}
function Readers(props: Props) {
	const { sender, readers } = props;
	return (
		<Row className='chat-item-reader'>
			<Avatar.Group
				size={20}
				max={{
					count: 8,
					popover: { placement: 'left' },
					style: { background: 'var(--bg-3rd)', color: 'var(--text-color)' },
				}}
			>
				{readers?.map((id) => (sender !== id ? <UserAvatar key={id} id={id} /> : <></>))}
			</Avatar.Group>
		</Row>
	);
}

export default React.memo(Readers);
