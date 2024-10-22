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
				<FontAwesomeIcon icon={true ? faBell : faBellSlash} style={{ fontSize: 20 }} />
				<span style={{ textAlign: 'center' }}>{$$(true ? 'mute-group' : 'unmute-group')}</span>
			</Flex>
			<Flex vertical align='center' className='action-bar-item' onClick={() => onPinConversation(id)}>
				<PushpinOutlined style={{ fontSize: 20 }} />
				<span style={{ textAlign: 'center' }}>{$$(!pinned ? 'pin' : 'unpin')}</span>
			</Flex>
			{isGroup ? (
				<>
					<Flex vertical align='center' className='action-bar-item' onClick={setToggleAddFriendToGroup}>
						<UsergroupAddOutlined style={{ fontSize: 20 }} />
						<span style={{ textAlign: 'center' }}>{$$('add-friends-to-group')}</span>
					</Flex>
					<Flex vertical align='center' className='action-bar-item'>
						<SettingOutlined style={{ fontSize: 20 }} />
						<span style={{ textAlign: 'center' }}>{$$('manage-group')}</span>
					</Flex>
				</>
			) : (
				<></>
			)}
		</Flex>
	);
}

export default React.memo(observer(ActionBar));
