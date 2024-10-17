import { CloseOutlined } from '@ant-design/icons';
import { Input, Row } from 'antd';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo, useState } from 'react';
import { useStores } from '../../../stores/stores';
import ReplyContent from '../body/ReplyContent';
import ChatFooterBar from './ChatFooterBar';
import InputEmoji from 'react-input-emoji';
import { newGuid, toNormalize } from '../../../utils/helper';
import { useDropzone } from 'react-dropzone';
import PreviewUploaded from './PreviewUploaded';
import { Attachment } from '../../../utils/type';
import PreviewGIF from './PreviewGIF';
import SelectingBar from '../body/SelectingBar';

function ChatFooter() {
	const { chatStore, appStore } = useStores();
	const [text, setText] = useState<string>('');
	const { replyMessage, onSendMessage, setReplyMessage } = chatStore;
	const { Users } = appStore;
	const [uploaded, setUploaded] = useState<Attachment[]>([]);
	const mentionsList = useMemo(() => Users.map((e) => ({
		id: e.id,
		name: e.userName,
		image: e.imageSrc,
	})), [Users]);
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
								id: newGuid(),
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
	const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
		noClick: true,
		noKeyboard: true,
		onDrop,
	});

	return (
		<Row className='chat-footer' {...getRootProps()}>
			<input {...getInputProps()} />

			{isDragActive && (
				<div className='drag-background'>
					<label style={{ margin: 'auto' }}>Drop over here</label>
				</div>
			)}

			<SelectingBar />

			{replyMessage && (
				<Row className='chat-footer-reply-wrapper' align='middle' justify='space-between'>
					<ReplyContent replyMessage={replyMessage} />
					<CloseOutlined className='btn-clear circle btn' onClick={() => setReplyMessage(undefined)} />
				</Row>
			)}
			{(text.startsWith('@GIF ') || text.startsWith('@[GIF]')) && (
				<PreviewGIF searchText={text.substring(text.indexOf(' '))} setText={setText} />
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
					if (text.startsWith('@GIF ') || text.startsWith('@[GIF]')) return;
					onSendMessage(text.trim(), false, uploaded);
					setText('');
					setUploaded([]);
				}}
				searchMention={(value) => {
					const searchText = value.replace('@', '');
					const extendsItems =
						text === value
							? [
									{
										id: 'GIF',
										name: 'GIF',
										image: '',
									},
							  ]
							: [];
					return new Promise<any>((resolve) => {
						resolve(
							[...extendsItems, ...mentionsList].filter(
								(e) => !searchText || toNormalize(e.name).includes(toNormalize(searchText))
							)
						);
					});
				}}
			/>
		</Row>
	);
}

export default React.memo(observer(ChatFooter));
