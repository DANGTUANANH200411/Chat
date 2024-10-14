import { CloseOutlined, DeleteOutlined, DownloadOutlined, ShareAltOutlined, UndoOutlined } from '@ant-design/icons';
import { Flex, Row, Space, Tooltip, Typography } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../stores/stores';
import { downloadUrl } from '../../../utils/helper';
import Confirm from '../../common/Confirm';

function SelectingBar() {
	const {
		appStore: { $$, CurrentUserId },
		chatStore: { selectMessages, clearListSelectedMsg, onDeleteMessages, onRecallMessage, toggleShareModal },
	} = useStores();

	if (!selectMessages.size) return <></>;
	return (
		<Row className='chat-selecting-bar' justify='space-between' align='middle'>
			<Flex align='center' gap={8} style={{ fontSize: 'large' }}>
				<span className='color-primary count'>{selectMessages.size}</span>
				<Typography.Text ellipsis>{$$('selected')}</Typography.Text>
			</Flex>
			<Space size={24}>
				<Tooltip title={$$('forward')} destroyTooltipOnHide>
					<ShareAltOutlined
						className='circle btn'
						onClick={() => {
							toggleShareModal([...selectMessages.values()]);
							clearListSelectedMsg();
						}}
					/>
				</Tooltip>
				{[...selectMessages.values()].every((e) => e.isFile) && (
					<DownloadOutlined
						className='circle btn'
						onClick={() => {
							[...selectMessages.values()].forEach((msg) => downloadUrl(msg.content));
							clearListSelectedMsg();
						}}
					/>
				)}
				{[...selectMessages.values()].every((e) => e.sender === CurrentUserId) && (
					<Tooltip title={$$('recall-msg')} destroyTooltipOnHide>
						<UndoOutlined
							rotate={90}
							className={`circle btn warning`}
							onClick={() => {
								selectMessages.forEach((msg) => onRecallMessage(msg.id));
								clearListSelectedMsg();
							}}
						/>
					</Tooltip>
				)}
				<Confirm
					danger
					title={$$('delete-n-msg-4me', { number: selectMessages.size })}
					okText={$$('delete')}
					onOk={() => {
						onDeleteMessages([...selectMessages.keys()]);
						clearListSelectedMsg();
					}}
				>
					<Tooltip title={$$('delete-only-me')} destroyTooltipOnHide>
						<DeleteOutlined className='circle btn danger' onClick={() => {}} />
					</Tooltip>
				</Confirm>

				<Tooltip title={$$('cancel')} destroyTooltipOnHide>
					<CloseOutlined className='circle btn' onClick={clearListSelectedMsg} />
				</Tooltip>
			</Space>
		</Row>
	);
}

export default React.memo(observer(SelectingBar));
