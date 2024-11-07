import { PicLeftOutlined, PicRightOutlined } from '@ant-design/icons';
import { Flex, Popover, Row, Space, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../stores/stores';
import { USERS } from '../../utils/constants';
import UserAvatar from '../common/UserAvatar';
import '../style.css';
import Language from './Language';
import Notify from './Notify';
import SwitchTheme from './SwitchTheme';
function TopBar() {
	const {
		appStore: { $$, user, menuOpen, toggleLeftMenu, changeUser },
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

				<Popover
					arrow
					placement='right'
					trigger={'click'}
					destroyTooltipOnHide
					content={
						<Flex wrap gap={8} style={{maxWidth: '20vw'}}>
							{USERS.map((user, idx) => (
								<UserAvatar id={user.id} user={user} style={{cursor: 'pointer'}} onClick={()=> changeUser(idx)} />
							))}
						</Flex>
					}
				>
					<UserAvatar id={user.id} className='side-bar-avt' />
				</Popover>
				<Notify />
				{/* <ContactsOutlined className='side-bar-icon' />
				<CarryOutOutlined className='side-bar-icon' /> */}
			</Space>
			<Space direction='vertical' size='large' align='center' className='max-width'>
				{/* <ControlFilled className='side-bar-icon' /> */}
				<SwitchTheme />
				<Language />
				{/* <Setting /> */}
			</Space>
		</Row>
	);
}

export default React.memo(observer(TopBar));
