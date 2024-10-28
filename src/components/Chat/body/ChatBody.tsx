import { Badge, Button, Row } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { useCallback, useEffect, useState } from 'react';
import { IS_FIREFOX } from '../../../utils/constants';
import { useDropzone } from 'react-dropzone';
import { DoubleRightOutlined } from '@ant-design/icons';
import { notify } from '../../../utils/notify';
import React from 'react';
import DateMessageWrapper from './DateMessageWrapper';

function ChatBody() {
	const {
		chatStore,
		appStore: { $$ },
	} = useStores();
	const {
		activeRoom,
		activePin,
		RoomMessages,
		Room,
		Permission: { sendMessage },
		onGetMessage,
		setActivePin,
		onSendFile,
		readMessage,
	} = chatStore;

	const [isEnd, setIsEnd] = useState<boolean>(false);
	const [activeNode, setActiveNode] = useState<HTMLElement | null>(null);
	const [visible, setVisible] = useState<boolean>(false);
	useEffect(() => {
		setIsEnd(false);
	}, [activeRoom]);

	useEffect(() => {
		if (!activePin) return;
		const msg = document.getElementById(activePin);
		document.querySelector('.forcus')?.classList.remove('forcus');
		if (msg) {
			IS_FIREFOX ? (msg as any).scrollIntoView() : (msg as any).scrollIntoViewIfNeeded();
			msg.classList.add('forcus');
			setActiveNode(msg);
			setActivePin(undefined);
		} else {
			notify($$('msg-notfound'));
		}
	}, [activePin]);

	const scrollToBottom = useCallback(() => {
		const view = document.querySelector('.chat-body-view') as HTMLElement;
		if (!view || !visible) return;
		view.style.scrollBehavior = 'smooth';
		view.scrollTo(0, 0);
		view.style.scrollBehavior = 'unset';
		readMessage();
	}, [visible]);

	const handleScroll = useCallback(
		(e: React.UIEvent<HTMLDivElement, UIEvent>) => {
			if (activeNode) {
				activeNode.classList.remove('forcus');
				setActiveNode(null);
			}
			const { scrollHeight, scrollTop, clientHeight } = e.target as HTMLElement;
			if (scrollTop < -1000) {
				setVisible(true);
			} else {
				setVisible(false);
			}
			if (!isEnd && scrollHeight + scrollTop - 100 < clientHeight) {
				onGetMessage().then((res) => res && !res.length && setIsEnd(true));
			}
		},
		[isEnd, activeNode]
	);

	const onDrop = useCallback((acceptedFiles: any) => {
		const reject = (file: any) => {
			onSendFile(
				{
					id: file.id,
					name: file.name,
					data: '',
					size: file.size,
				},
				true
			);
		};
		acceptedFiles.forEach((file: any) => {
			const reader = new FileReader();
			reader.onabort = (error) => {
				reject(file);
			};
			reader.onerror = (error) => {
				reject(file);
			};
			reader.onload = () => {
				try {
					onSendFile({
						id: file.id,
						name: file.name,
						data: reader.result as string,
						size: file.size,
					});
				} catch (error) {
					reject(file);
				}
			};
			reader.readAsDataURL(file);
		});
	}, []);

	const { getRootProps, isDragActive } = useDropzone({ noClick: true, noKeyboard: true, onDrop });

	const onClickView = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		const node = e.currentTarget as HTMLElement;
		if (node.scrollTop > -1000) {
			readMessage();
		}
	}, []);
	return (
		<Row className='chat-body' {...sendMessage ? getRootProps() : {}}>
			{isDragActive && (
				<div className='drag-background'>
					<label style={{ margin: 'auto' }}>Drop over here to send file</label>
				</div>
			)}
			<div id='chat-body-view' className='chat-body-view' onScroll={handleScroll} onClick={onClickView}>
				{Object.entries(RoomMessages)
					.reverse()
					.map(([date, groupMsgs]) => (
						<DateMessageWrapper key={date} date={date} groupMsgs={groupMsgs} />
					))}
			</div>
			<Button
				shape='circle'
				className='btn-scroll-bottom'
				icon={
					<Badge count={Room?.unread} size='small'>
						<DoubleRightOutlined rotate={90} />
					</Badge>
				}
				onClick={scrollToBottom}
				style={{ opacity: visible ? 100 : 0, cursor: visible ? 'pointer' : 'unset', userSelect: 'none' }}
			/>
		</Row>
	);
}

export default React.memo(observer(ChatBody));
