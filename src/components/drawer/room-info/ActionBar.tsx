import { AudioMutedOutlined, PushpinOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { faBell, faBellSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Typography } from 'antd';
import React from 'react';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react';

interface Props {
	id: string;
	isGroup: boolean;
	pinned?: boolean;
}
function ActionBar(props: Props) {
	const {
		appStore: { $$, setToggleAddFriendToGroup },
		chatStore: { onPinConversation },
	} = useStores();

	const { id, isGroup, pinned } = props;
	return (
		<Flex gap='large' style={{ marginTop: 12, width: '90%' }}>
			<Flex vertical align='center' className='action-bar-item'>
				<FontAwesomeIcon icon={true ? faBell : faBellSlash} />
				<span>{$$(true ? 'mute-group' : 'unmute-group')}</span>
			</Flex>
			<Flex vertical align='center' className='action-bar-item' onClick={() => onPinConversation(id)}>
				<PushpinOutlined />
				<span>{$$(!pinned ? 'pin' : 'unpin')}</span>
			</Flex>
			{isGroup ? (
				<>
					<Flex vertical align='center' className='action-bar-item' onClick={setToggleAddFriendToGroup}>
						<UsergroupAddOutlined />
						<span>{$$('add-friends-to-group')}</span>
					</Flex>
					<Flex vertical align='center' className='action-bar-item'>
						<SettingOutlined />
						<span>{$$('manage-group')}</span>
					</Flex>
				</>
			) : (
				<></>
			)}
		</Flex>
	);
}

export default React.memo(observer(ActionBar));
