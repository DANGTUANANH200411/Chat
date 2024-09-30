import {
	CloseOutlined,
	LikeFilled,
	SendOutlined,
} from '@ant-design/icons';
import { Row } from 'antd';
import { observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import { useStores } from '../../../stores/stores';
import ReplyContent from '../body/ReplyContent';
import ChatFooterBar from './ChatFooterBar';
import InputEmoji from 'react-input-emoji';
import { toNormalize } from '../../../utils/helper';
function ChatFooter() {
	const { chatStore, appStore } = useStores();
	const [text, setText] = useState<string>('');
	const ref = useRef<HTMLDivElement>(null);
	const { replyMessage, onSendMessage, setReplyMessage } = chatStore;
	const { Users } = appStore;

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
						setText(text + e);
					}}
				/>
			</Row>
			<InputEmoji
				value={text}
				keepOpened
				shouldReturn
				onChange={setText}
				onEnter={(text) => onSendMessage(text.trim())}
				cleanOnEnter
				shouldConvertEmojiToImage
				searchMention={(value) => {
					const searchText = value.replace('@', '');
					return new Promise<any>((resolve) => {
						resolve(
							Users.filter((e) => !searchText || toNormalize(e.userName).includes(toNormalize(searchText)))
							.map((e) => ({
								id: e.id,
								name: e.userName,
								image: e.imageSrc,
							}))
						);
					})
				}
					
				}
			/>
			
			{/* <div className='chat-footer-input-action'>
				<LikeFilled className='hoverable-icon' style={{ color: 'var(--primary-color)' }} />
				<SendOutlined className='hoverable-icon' />
			</div> */}
		</Row>
	);
}

export default React.memo(observer(ChatFooter));
