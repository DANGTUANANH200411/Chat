import { CloseOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import { observer } from 'mobx-react';
import React, { useCallback, useRef, useState } from 'react';
import { useStores } from '../../../stores/stores';
import ReplyContent from '../body/ReplyContent';
import ChatFooterBar from './ChatFooterBar';
import InputEmoji from 'react-input-emoji';
import { toNormalize } from '../../../utils/helper';
import { useDropzone } from 'react-dropzone';
import PreviewUploaded from './PreviewUploaded';
import { Attachment } from '../../../utils/type';

function ChatFooter() {
	const { chatStore, appStore } = useStores();
	const [text, setText] = useState<string>('');
	const ref = useRef<HTMLDivElement>(null);
	const { replyMessage, onSendMessage, setReplyMessage } = chatStore;
	const { Users } = appStore;
	const [uploaded, setUploaded] = useState<Attachment[]>([]);
	
	const onDrop = useCallback(
		async (acceptedFiles: any) => {
			const filePromises = acceptedFiles.map((file: any) => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();

					reader.onabort = (error) => {
						reject(error);
					};
					reader.onerror = (error) => {
						reject(error);
					};
					reader.onload = () => {
						try {
							resolve({
								name: file.name,
								data: reader.result,
								size: file.size,
							});
						} catch (error) {
							reject(error);
						}
					};
					reader.readAsDataURL(file);
				});
			});
			const fileInfos = await Promise.all(filePromises);

			setUploaded([...uploaded, ...fileInfos]);
		},
		[uploaded]
	);
	const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({ noClick: true, onDrop });

	console.log(inputRef)
	return (
		<Row className='chat-footer' {...getRootProps()}>
			<input {...getInputProps()} />

			{isDragActive && (
				<div className='drag-background'>
					<label style={{ margin: 'auto' }}>Drop over here</label>
				</div>
			)}
			{replyMessage && (
				<Row className='chat-footer-reply-wrapper' align='middle' justify='space-between'>
					<ReplyContent replyMessage={replyMessage} />
					<CloseOutlined
						className='text-secondary hoverable-icon btn-clear'
						onClick={() => setReplyMessage(undefined)}
					/>
				</Row>
			)}

			<PreviewUploaded uploaded={uploaded} setUploaded={setUploaded} />

			<ChatFooterBar uploadInputRef={inputRef} />
			
			<InputEmoji
				value={text}
				keepOpened
				shouldReturn
				onChange={setText}
				shouldConvertEmojiToImage
				onEnter={(text) => {
					onSendMessage(text.trim(), uploaded);
					setText('');
					setUploaded([]);
				}}
				searchMention={(value) => {
					const searchText = value.replace('@', '');
					return new Promise<any>((resolve) => {
						resolve(
							Users.filter(
								(e) => !searchText || toNormalize(e.userName).includes(toNormalize(searchText))
							).map((e) => ({
								id: e.id,
								name: e.userName,
								image: e.imageSrc,
							}))
						);
					});
				}}
			/>
			{/* <div className='chat-footer-input-action'>
				<LikeFilled className='hoverable-icon' style={{ color: 'var(--primary-color)' }} />
				<SendOutlined className='hoverable-icon' />
			</div> */}
		</Row>
	);
}

export default React.memo(observer(ChatFooter));
