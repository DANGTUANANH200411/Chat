import { Avatar, Col, Row, Space, Tooltip } from 'antd';
import Setting from './Setting';
import SwitchTheme from './SwitchTheme';
import Notify from './Notify';
import Language from './Language';
import '../style.css';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import {
	CarryOutOutlined,
	ContactsOutlined,
	ControlFilled,
	PicLeftOutlined,
	PicRightOutlined,
} from '@ant-design/icons';
import UserAvatar from '../common/UserAvatar';
import React from 'react';
function TopBar() {
	const {
		appStore: { $$, user, toggleLeftMenu, menuOpen },
	} = useStores();
	return (
		<Row className='side-bar'>
			<Space direction='vertical' size='large' align='center' className='max-width'>
				{menuOpen ? (
					<Tooltip title={$$('action-close-menu')}>
						<PicRightOutlined className='side-bar-icon' onClick={toggleLeftMenu} />
					</Tooltip>
				) : (
					<Tooltip title={$$('action-expand-menu')}>
						<PicLeftOutlined className='side-bar-icon' onClick={toggleLeftMenu} />
					</Tooltip>
				)}

				<UserAvatar id={user.id} className='side-bar-avt' />
				<Notify />
				<ContactsOutlined className='side-bar-icon' />
				<CarryOutOutlined className='side-bar-icon' />
			</Space>
			<Space direction='vertical' size='large' align='center' className='max-width'>
				<ControlFilled className='side-bar-icon' />
				<SwitchTheme />
				<Language />
				<Setting />
			</Space>
		</Row>
	);
}

export default React.memo(observer(TopBar));
