import { CaretDownFilled, MessageTwoTone, MoreOutlined, ProjectTwoTone, UpOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Row, Space, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useStores } from '../../../stores/stores';
import { decodeHtml, isImage, isUrl } from '../../../utils/helper';
import { Message } from '../../../utils/type';

function ViewPinned() {
	const {
		appStore: { $$, getUserName, setMdlPollDetailProps },
		chatStore: { Room, onPinMessage, scrollToMessage },
	} = useStores();
	const [expanded, setExpanded] = useState<boolean>(false);

	if (!Room || !Room.pinMessages || !Room.pinMessages.length) {
		return <></>;
	}
	const messages = expanded ? [...Room.pinMessages] : [Room.pinMessages.at(-1)];

	const displayContent = (message?: Message) => {
		if (!message) return '';

		if (message.isFile) {
			return `[${$$(isImage(message.content) ? 'image' : 'file')}]`;
		}

		if (message.isNameCard) {
			return `[${$$('namecard')}] ${getUserName(message.content)}`;
		}

		if (isUrl(message.content)) {
			return `[${$$('link')}] ${message.content}`;
		}

		return decodeHtml(message.content);
	};
	return (
		<Row className={`chat-body-pin ${expanded ? 'expanded' : ''}`} align='middle' justify='space-around'>
			<Space className='chat-body-pin-item-wrapper' direction='vertical' size={8}>
				{messages.reverse().map((message) => (
					<Row key={message?.id} className='max-width chat-body-pin-item hoverable' align='middle'>
						<Row className='color-primary chat-body-pin-icon'>
							{message?.poll ? <ProjectTwoTone rotate={180} /> : <MessageTwoTone />}
						</Row>
						<Flex
							vertical
							className='chat-body-pin-preview'
							onClick={() => {
								if (!message) return;

								if (message.poll) {
									setMdlPollDetailProps(message);
								} else {
									scrollToMessage(message.id);
								}
							}}
						>
							<Typography.Paragraph
								style={{ margin: 0, whiteSpace: 'break-spaces' }}
								ellipsis={{ rows: 2, expandable: expanded ? 'collapsible' : false }}
							>{`${getUserName(message?.sender)}: ${displayContent(message)}`}</Typography.Paragraph>

							<Typography.Text ellipsis type='secondary'>
								{$$(message?.poll ? 'create-by-n' : 'message-from-n', {
									name: getUserName(message?.sender),
								})}
							</Typography.Text>
						</Flex>
						{!expanded && Room.pinMessages && Room.pinMessages.length - 1 !== 0 && (
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
export default React.memo(observer(ViewPinned));
