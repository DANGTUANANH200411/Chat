import {
	CloseOutlined,
	FileImageOutlined,
	FontSizeOutlined,
	IdcardOutlined,
	LikeFilled,
	LinkOutlined,
	SendOutlined,
	SmileOutlined,
} from '@ant-design/icons';
import { Input, Popover, Row } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useStores } from '../../../stores/stores';
import ReplyContent from '../body/ReplyContent';
import EmojiPicker from 'emoji-picker-react';

function ChatFooter() {
	const { chatStore } = useStores();
	const [text, setText] = useState<string>('');
	const { replyMessage, onSendMessage, setReplyMessage } = chatStore;
	return (
		<Row className='chat-footer'>
			{replyMessage && (
				<Row className='chat-footer-reply-wrapper' align='middle' justify='space-between'>
					<ReplyContent replyMessage={replyMessage} />
					<CloseOutlined
						className='text-secondary hoverable-icon'
						onClick={() => setReplyMessage(undefined)}
					/>
				</Row>
			)}
			<Row className='chat-footer-bar max-width' align='middle'>
				<Popover
					trigger={['click']}
					destroyTooltipOnHide
					content={
						<EmojiPicker
							onEmojiClick={(e) => setText(text + e.emoji)}
						/>
					}
				>
					<SmileOutlined />
				</Popover>
				<FileImageOutlined />
				<LinkOutlined />
				<IdcardOutlined onClick={() => {}} />
				<FontSizeOutlined />
			</Row>
			<Input.TextArea
				className='chat-footer-input max-width max-height'
				autoSize={{ minRows: 1, maxRows: 8 }}
				size='large'
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={(e) => {
					if (!e.shiftKey && e.key === 'Enter') {
						e.preventDefault();
						onSendMessage(text);
						setText('');
					}
				}}
			/>
			<div className='chat-footer-input-action'>
				<LikeFilled className='hoverable-icon' style={{ color: 'var(--primary-color)' }} />
				<SendOutlined className='hoverable-icon' />
			</div>
		</Row>
	);
}

export default React.memo(observer(ChatFooter));
