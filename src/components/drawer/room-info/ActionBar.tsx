import { AudioMutedOutlined, PushpinOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { faBell, faBellSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Typography } from 'antd';
import React from 'react';
import { useStores } from '../../../stores/stores';

function ActionBar() {
	const {
		appStore: { $$ },
	} = useStores();
	return (
		<Flex justify='space-between' gap='large' style={{ marginTop: 12 }}>
			<Flex vertical align='center' className='action-bar-item'>
				<FontAwesomeIcon icon={true ? faBell : faBellSlash} style={{ fontSize: 20 }} />
				<span style={{ textAlign: 'center' }}>{$$(true ? 'mute-group' : 'unmute-group')}</span>
			</Flex>

			<Flex vertical align='center' className='action-bar-item'>
				<PushpinOutlined style={{ fontSize: 20 }} />
				<span style={{ textAlign: 'center' }}>{$$(true ? 'pin' : 'unpin')}</span>
			</Flex>
			<Flex vertical align='center' className='action-bar-item'>
				<UsergroupAddOutlined style={{ fontSize: 20 }} />
				<span style={{ textAlign: 'center' }}>{$$('add-friends-to-group')}</span>
			</Flex>
			<Flex vertical align='center' className='action-bar-item'>
				<SettingOutlined style={{ fontSize: 20 }} />
				<span style={{ textAlign: 'center' }}>{$$('manage-group')}</span>
			</Flex>
		</Flex>
	);
}

export default React.memo(ActionBar);
