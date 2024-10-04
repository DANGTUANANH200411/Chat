import { Button, QRCode, Row, Skeleton } from 'antd';
import React from 'react';
import Member from '../../../common/Member';
import { useStores } from '../../../../stores/stores';
import ChatTime from '../chat-item/ChatTime';

interface Props {
	id: string;
	createDate: string;
}
function NameCard(props: Props) {
	const {
		appStore: { getUserById },
	} = useStores();
	const { id, createDate } = props;
	const user = getUserById(id);
	return user ? (
		<Row className='chat-item-namecard'>
			<Member user={user} info={user.phoneNumber} />
			<QRCode
				value={id}
				errorLevel='L'
				size={56}
				style={{ padding: 4, background: 'white', borderRadius: 'unset', alignSelf: 'end' }}
			/>
			{/* <Row>
				<Button>Call</Button>
				<Button>Message</Button>
			</Row> */}
			<ChatTime date={createDate}/>
		</Row>
	) : (
		<Skeleton.Node />
	);
}

export default React.memo(NameCard);
