import { CloseOutlined, LikeFilled, SendOutlined } from '@ant-design/icons';
import { Input, Row, UploadFile } from 'antd';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStores } from '../../../stores/stores';
import ReplyContent from '../body/ReplyContent';
import ChatFooterBar from './ChatFooterBar';
import InputEmoji from 'react-input-emoji';
import { toNormalize } from '../../../utils/helper';
import CustomUpload from '../../common/CustomUpload';
import { useDropzone } from 'react-dropzone';
import PreviewUploaded from './PreviewUploaded';
import { name } from 'mustache';

function ChatFooter() {
	const { chatStore, appStore } = useStores();
	const [text, setText] = useState<string>('');
	const ref = useRef<HTMLDivElement>(null);
	const { replyMessage, onSendMessage, setReplyMessage } = chatStore;
	const { Users } = appStore;
	const [uploaded, setUploaded] = useState<UploadFile[]>([]);
	const onDrop = useCallback(async (acceptedFiles: any) => {
		const filePromises  = acceptedFiles.map((file: any) => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();

				reader.onabort = (error) => {
					reject(error)
				}
				reader.onerror = (error) => {
					reject(error)
				};
				reader.onload = () => {
					try{
						resolve({
							name: file.name,
							data: reader.result,
						})
					} catch(error) {
						reject(error)
					}
				};
				reader.readAsDataURL(file);
				})
		});
		const fileInfos = await Promise.all(filePromises);
 
		setUploaded([...uploaded, ...fileInfos]);
		console.log(inputRef)
	}, [uploaded]);
	const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({ noClick: true, onDrop });

	return (
		<Row className='chat-footer' {...getRootProps()}>
			<input ref={inputRef} {...getInputProps()}/>
			<PreviewUploaded uploaded={uploaded} setUploaded={setUploaded}/>
			{isDragActive && (
				<div className='drag-background'>
					<label style={{ margin: 'auto' }}>Drop over here</label>
				</div>
			)}
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
