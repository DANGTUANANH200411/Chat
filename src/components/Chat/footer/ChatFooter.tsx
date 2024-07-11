import {
	FileImageOutlined,
	FontSizeOutlined,
	IdcardOutlined,
	LikeFilled,
	LinkOutlined,
	SendOutlined,
	SmileOutlined,
} from '@ant-design/icons';
import { Input, Row } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../stores/stores';
function ChatFooter() {
    const {chatStore} = useStores();
	return (
		<Row className='chat-footer'>
			<Row
				className='chat-footer-bar max-width'
				align='middle'
			>
				<SmileOutlined />
				<FileImageOutlined />
				<LinkOutlined />
				<IdcardOutlined onClick={() => {}} />
				<FontSizeOutlined />
			</Row>
			<Input.TextArea
				className='chat-footer-input max-width max-height'
				autoSize={{ minRows: 1, maxRows: 8 }}
				size='large'
				onKeyDown={(e) => {
					if(!e.shiftKey && e.key === 'Enter'){
                        e.preventDefault();
                        chatStore.onSendMessage((e.target as HTMLTextAreaElement).value);
						(e.target as HTMLTextAreaElement).value = '';
                    }
				}}
			/>
			<div className='chat-footer-input-action'>
				<LikeFilled
					className='hoverable-icon'
					style={{ color: 'var(--primary-color)' }}
				/>
				<SendOutlined className='hoverable-icon' />
			</div>
		</Row>
	);
}

export default React.memo(observer(ChatFooter));
