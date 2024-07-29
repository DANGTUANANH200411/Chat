import {
	CopyOutlined,
	DeleteOutlined,
	EditFilled,
	InfoCircleOutlined,
	MoreOutlined,
	PushpinFilled,
	PushpinOutlined,
	ShareAltOutlined,
	StarOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import { Dropdown, MenuProps, Tooltip } from 'antd';
import { useStores } from '../../../stores/stores';
import { Message } from '../../../utils/type';
import { observer } from 'mobx-react';
import React from 'react';
import { notify } from '../../../utils/notify';

interface Props {
	message: Message;
}
function ChatAction({message}: Props) {
	const {
		appStore: { $$ },
        chatStore,
	} = useStores();
    const {Room, onPinMessage} =chatStore;
    const {id, content} = message;
    const isPined = Room?.pinMessages.find(e => e.id === id) ? true : false;
	const items: MenuProps['items'] = [
		{
			key: 'copy',
			label: $$('copy-text'),
			icon: <CopyOutlined />,
            onClick: ()=> {
                navigator.clipboard.writeText(content);
                notify($$('copied'), 'info')
            }
		},
		{
			type: 'divider',
		},
		{
			key: 'pin',
			label: isPined ? $$('unpin-msg') : $$('pin-msg'),
			icon: isPined ? <PushpinFilled/> : <PushpinOutlined />,
            onClick: ()=> onPinMessage(message),
		},
		{
			key: 'star',
			label: $$('start-msg'),
			icon: <StarOutlined />,
		},
		{
			key: 'select',
			label: $$('select-msg'),
			icon: <UnorderedListOutlined />,
		},
		{
			key: 'details',
			label: $$('view-details'),
			icon: <InfoCircleOutlined />,
		},
		{
			key: 'other',
			label: $$('other-options'),
		},
		{
			type: 'divider',
		},
		{
			key: 'delete',
			label: $$('delete-for-me'),
			icon: <DeleteOutlined />,
			danger: true,
		},
	];
	return (
		<>
			<Tooltip title={$$('reply')}>
				<EditFilled className='text-secondary hoverable-icon' />
			</Tooltip>
			<Tooltip title={$$('forwarding')}>
				<ShareAltOutlined className='text-secondary hoverable-icon' />
			</Tooltip>
			<Tooltip title={$$('more')}>
				<Dropdown menu={{ items: items }} trigger={['click']}>
					<MoreOutlined className='text-secondary hoverable-icon' />
				</Dropdown>
			</Tooltip>
		</>
	);
}
function propsAreEquals (prev: Props, next:Props) {
    return prev.message.id == next.message.id;
}
export default React.memo(observer(ChatAction), propsAreEquals);
