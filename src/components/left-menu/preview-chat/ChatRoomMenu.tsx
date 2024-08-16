import { MoreOutlined, TagFilled } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react';
import { LabelMenu } from '../../common/LabelMenu';
import { useLayoutEffect } from 'react';

interface Props {
	roomId: string;
}
function ChatRoomMenu(props: Props) {
	const {
		appStore: { $$ },
	} = useStores();

	const { roomId } = props;

	const items: MenuProps['items'] = [
		{
			key: 'pin',
			label: $$('pin-chatroom'),
			onClick: () => {},
		},
		{
			type: 'divider',
		},
		{
			key: 'label',
			label: $$('label'),
			children: LabelMenu(roomId),
		},
		{
			key: 'mark',
			label: $$('mark-chatroom'),
			onClick: () => {},
		},
		{
			key: 'off-noti',
			label: $$('off-noti'),
			onClick: () => {},
		},
		{
			key: 'hide-chatroom',
			label: $$('hide-chatroom'),
			onClick: () => {},
		},
		{
			key: 'delete-chatroom',
			label: $$('delete-chatroom'),
			onClick: () => {},
		},
		{
			type: 'divider',
		},
		{
			key: 'report',
			label: $$('report'),
			onClick: () => {},
		},
	];
	return (
		<div onClick={(e) => e.stopPropagation()}>
			<Dropdown trigger={['hover']} menu={{ items }} destroyPopupOnHide arrow>
				<MoreOutlined rotate={90} className='preview-chat-item-more hoverable-icon' />
			</Dropdown>
		</div>
	);
}
export default observer(ChatRoomMenu);
