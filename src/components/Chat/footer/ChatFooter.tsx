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
import React, { useRef, useState } from 'react';
import { useStores } from '../../../stores/stores';
import ReplyContent from '../body/ReplyContent';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import ChatFooterBar from './ChatFooterBar';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { ChatInput } from './ChatInput';
function ChatFooter() {
	const { chatStore } = useStores();
	const [text, setText] = useState<string | null>('');
	const ref = useRef<HTMLDivElement>(null);
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
				<ChatFooterBar
					onEmoji={(e) => {
						setText(text + e)
					}}
				/>
			</Row>
			<ChatInput value={text as any} setValue={setText}/>
			{/* <div contentEditable onInput={(e) => setText(e.currentTarget.innerHTML)}>{text}</div> */}
			{/* <InputEmoji
				value={text}
				onChange={(text) => {
					setText(text);
					console.log(text);
				}}
				shouldReturn={false}
				shouldConvertEmojiToImage={false}
			/> */}
			{/* <Input.TextArea
				ref={ref}
				className='chat-footer-input max-width max-height'
				autoSize={{ minRows: 1, maxRows: 8 }}
				size='large'
				onKeyDown={(e) => {
					if (!e.shiftKey && e.key === 'Enter') {
						e.preventDefault();
						onSendMessage(text);
						setText('');
					}
				}}
			/> */}
			<div className='chat-footer-input-action'>
				<LikeFilled className='hoverable-icon' style={{ color: 'var(--primary-color)' }} />
				<SendOutlined className='hoverable-icon' />
			</div>
		</Row>
	);
}

export default React.memo(observer(ChatFooter));
