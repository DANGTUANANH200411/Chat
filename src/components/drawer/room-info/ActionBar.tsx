import { AudioMutedOutlined, PushpinOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { faBell, faBellSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Typography } from 'antd';
import React from 'react';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react';
import { notify } from '../../../utils/notify';

interface Props {
	id: string;
	isGroup: boolean;
	pinned?: boolean;
}
function ActionBar(props: Props) {
	const {
		appStore: { $$, setToggleAddFriendToGroup, setDrawerOpen },
		chatStore: { onPinConversation },
	} = useStores();

	const { id, isGroup, pinned } = props;
	return (
		<Flex className='max-width' justify='space-around' style={{ marginTop: 12 }}>
			<Flex vertical align='center' className='action-bar-item flex-grow'>
				<FontAwesomeIcon
					className='circle btn'
					icon={true ? faBell : faBellSlash}
					onClick={() => notify('Incomming')}
				/>
				<Typography.Text>{$$(true ? 'mute-group' : 'unmute-group')}</Typography.Text>
			</Flex>
			<Flex vertical align='center' className='action-bar-item flex-grow'>
				<PushpinOutlined className='circle btn' onClick={() => onPinConversation(id)} />
				<Typography.Text>{$$(!pinned ? 'pin' : 'unpin')}</Typography.Text>
			</Flex>
			{isGroup ? (
				<>
					<Flex vertical align='center' className='action-bar-item flex-grow'>
						<UsergroupAddOutlined className='circle btn' onClick={setToggleAddFriendToGroup} />
						<Typography.Text>{$$('add-friends-to-group')}</Typography.Text>
					</Flex>
					<Flex vertical align='center' className='action-bar-item flex-grow'>
						<SettingOutlined className='circle btn' onClick={() => setDrawerOpen('Management')} />
						<Typography.Text>{$$('manage-group')}</Typography.Text>
					</Flex>
				</>
			) : (
				<></>
			)}
		</Flex>
	);
}

export default React.memo(observer(ActionBar));
