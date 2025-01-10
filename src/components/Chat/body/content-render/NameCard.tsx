import { QRCode, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import Member from '../../../common/Member';
import { useStores } from '../../../../stores/stores';
import ChatTime from '../chat-item/ChatTime';
import { notify } from '../../../../utils/notify';
import Reaction from '../../popup/Reaction';
import { observer } from 'mobx-react';
import { PushpinFilled } from '@ant-design/icons';
interface Props {
	msgId: string;
	id: string;
	createDate: string;
	isFirst: boolean;
	isLast: boolean;
	sender: string;
	showTime: boolean;
	selecting: boolean;
	pinned: boolean;
}
function NameCard(props: Props) {
	const {
		appStore: { CurrentUserId, $$, getUserById, getUserName },
		chatStore: {onCall, openPersonalRoom}
	} = useStores();

	const { msgId, id, createDate, isFirst, isLast, showTime, sender, selecting, pinned } = props;
	const user = getUserById(id);
	return user ? (
		<div className='chat-item-namecard-wrapper' id={msgId}>
			{isFirst && (
				<Typography.Link className='chat-item-username small-text text-ellipsis alone' onClick={() => {}}>
					{getUserName(sender)}
				</Typography.Link>
			)}
			<div style={{ position: 'relative' }}>
				{pinned && <PushpinFilled className='chat-item-pin-icon' />}

				<div className='chat-item-namecard'>
					{selecting && <div className='selected-mark'></div>}
					<Row className='chat-item-namecard-data'>
						<Member user={user} info={user.phoneNumber} />
						<QRCode
							value={'https://github.com/mk04-dev'}
							errorLevel='L'
							size={60}
							style={{ padding: 4, background: 'white', borderRadius: 'unset', alignSelf: 'end' }}
						/>
					</Row>

					{CurrentUserId !== id && <Row className='chat-item-namecard-btn'>
						<div className='chat-item-namecard-btn-call' onClick={() => onCall()}>
							{$$('call')}
						</div>
						<div className='chat-item-namecard-btn-msg' onClick={() => openPersonalRoom(id)}>
							{$$('message')}
						</div>
					</Row>}
				</div>
			</div>
			{!selecting && (
				<div style={{ position: 'relative', marginBottom: 8 }}>
					<Reaction id={msgId} />
				</div>
			)}
			<div
				className='chat-item-namecard-copy'
				onClick={() => {
					navigator.clipboard.writeText(user.phoneNumber);
					notify('Copied', 'success');
				}}
			>
				{$$('copy-phone')}
			</div>
			{(isLast || showTime) && <ChatTime date={createDate} />}
		</div>
	) : (
		<Skeleton.Node />
	);
}

export default React.memo(observer(NameCard));
