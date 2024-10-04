import {
	CopyOutlined,
	DeleteOutlined,
	DownloadOutlined,
	EnterOutlined,
	InfoCircleOutlined,
	MoreOutlined,
	PushpinFilled,
	PushpinOutlined,
	ShareAltOutlined,
	UndoOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import { Dropdown, MenuProps, Tooltip } from 'antd';
import { useStores } from '../../../stores/stores';
import { Message } from '../../../utils/type';
import { observer } from 'mobx-react';
import React from 'react';
import { notify } from '../../../utils/notify';
import { downloadUrl } from '../../../utils/helper';

interface Props {
	message: Message;
}
function ChatAction({ message }: Props) {
	const {
		appStore: { $$, user },
		chatStore,
	} = useStores();
	const { Room, onPinMessage, onDeleteMessage, setReplyMessage, setModalDetail, onSelectMessage, onRecallMessage } =
		chatStore;
	const { id, sender, content, isFile, data, recalled } = message;
	const isPinned = Room?.pinMessages.find((e) => e.id === id) ? true : false;

	const isMe = user.id === sender;

	const items: MenuProps['items'] = [
		{
			key: 'copy',
			label: $$('copy-text'),
			icon: <CopyOutlined />,
			onClick: () => {
				navigator.clipboard.writeText(content);
				notify($$('copied'), 'info');
			},
		},
		{
			type: 'divider',
		},
		{
			key: 'pin',
			label: isPinned ? $$('unpin-msg') : $$('pin-msg'),
			icon: isPinned ? <PushpinFilled /> : <PushpinOutlined />,
			onClick: () => onPinMessage(message),
		},
		// {
		// 	key: 'star',
		// 	label: $$('start-msg'),
		// 	icon: <StarOutlined />,
		// },
		{
			key: 'select',
			label: $$('select-msg'),
			icon: <UnorderedListOutlined />,
			onClick: () => onSelectMessage(message.id, message.sender),
		},
		{
			key: 'details',
			label: $$('view-details'),
			icon: <InfoCircleOutlined />,
			onClick: () => setModalDetail({ visible: true, message }),
		},
		...(isFile
			? [
					{
						key: 'download',
						label: 'save-file',
						icon: <DownloadOutlined />,
						onClick: () => downloadUrl(data ?? content, content.split('/').at(-1) ?? ''),
					},
			  ]
			: []),
		// {
		// 	key: 'other',
		// 	label: $$('other-options'),
		// },
		{
			type: 'divider',
		},
		...(isMe
			? [
					{
						key: 'recall',
						label: $$('recall-msg'),
						icon: <UndoOutlined rotate={90} />,
						onClick: () => onRecallMessage(id),
					},
			  ]
			: []),
		{
			key: 'delete',
			label: $$('delete-for-me'),
			icon: <DeleteOutlined />,
			danger: true,
			onClick: () => onDeleteMessage(id),
		},
	];
	return recalled ? (
		<>
			<Tooltip title={$$('delete-for-me')} destroyTooltipOnHide>
				<DeleteOutlined
					className='text-secondary hoverable-icon icon-danger'
					onClick={() => onDeleteMessage(id)}
				/>
			</Tooltip>
		</>
	) : (
		<>
			<Tooltip title={$$('reply')} destroyTooltipOnHide>
				<EnterOutlined
					className='text-secondary hoverable-icon'
					onClick={() => setReplyMessage({ id, sender, content, isFile, data })}
				/>
			</Tooltip>
			<Tooltip title={$$('forwarding')} destroyTooltipOnHide>
				<ShareAltOutlined className='text-secondary hoverable-icon' />
			</Tooltip>
			<Tooltip title={$$('more')} destroyTooltipOnHide>
				<Dropdown menu={{ items: items }} trigger={['click']}>
					<MoreOutlined className='text-secondary hoverable-icon' />
				</Dropdown>
			</Tooltip>
		</>
	);
}
function propsAreEquals(prev: Props, next: Props) {
	return prev.message.id == next.message.id;
}
export default React.memo(observer(ChatAction), propsAreEquals);
