import { CaretDownFilled, MessageOutlined, MoreOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Space, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { useStores } from '../../../stores/stores';

function ViewPined() {
	const {
		appStore: { $$, getUserName},
		chatStore: { Room, onPinMessage, scrollToMessage },
	} = useStores();
	const ref = useRef(null);
	const [expanded, setExpanded] = useState<boolean>(false);
	
	useEffect(()=> {
		if (!Room?.pinMessages || !ref.current) return;
		const height = expanded ? Room.pinMessages.length > 2 ? '17vh' : '12vh' : '5vh';
		(ref.current as HTMLElement).style.height = height;
		const view = document.querySelector('.chat-body-view');
		if (view) {
			(view as HTMLElement).style.height = `calc(100% - ${height})`;
		}
	}, [expanded, ref, Room?.pinMessages]);
	if (!Room || !Room.pinMessages || !Room.pinMessages.length) {
		return <></>;
	}
	const messages = expanded ? [...Room.pinMessages] : [Room.pinMessages.at(-1)];

	return (
		<Row ref={ref} className={`chat-body-pin ${expanded ? 'expanded' : ''}`} align='middle' justify='space-around'>
			<Space className='chat-body-pin-item-wrapper' direction='vertical' size={8}>
				{messages.reverse().map((message) => (
					<Row key={message?.id} className='max-width chat-body-pin-item' align='middle' >
						<Row className='color-primary chat-body-pin-icon'>
							<MessageOutlined />
						</Row>
						<div className='chat-body-pin-preview' onClick={() => message && scrollToMessage(message.id)}>
							<Row>
								<Typography.Text strong>Message</Typography.Text>
							</Row>
							<Row>
								<Typography.Text ellipsis type='secondary'>
									{`${getUserName(message?.sender)}: ${message?.content}`}
								</Typography.Text>
							</Row>
						</div>
						{!expanded && Room.pinMessages.length - 1 !== 0 && (
							<Row className='chat-body-pin-more'>
								<Button
									ghost
									size='small'
									type='primary'
									iconPosition='end'
									icon={<CaretDownFilled className='color-primary' />}
									onClick={() => setExpanded(true)}
								>
									{Room.pinMessages.length - 1} more
								</Button>
							</Row>
						)}
						{expanded && (
							<Dropdown
								className='chat-body-pin-dropdown'
								menu={{
									items: [
										{
											label: $$('unpin-msg'),
											key: '0',
											onClick: () => message && onPinMessage(message),
										},
									],
								}}
								trigger={['click']}
								arrow
								destroyPopupOnHide
							>
								<MoreOutlined rotate={90} />
							</Dropdown>
						)}
					</Row>
				))}
			</Space>
			{expanded && (
				<div className='chat-body-pin-close'>
					<UpOutlined className='chat-body-pin-close-btn' onClick={() => setExpanded(false)} />
				</div>
			)}
		</Row>
	);
}
export default React.memo(observer(ViewPined));
