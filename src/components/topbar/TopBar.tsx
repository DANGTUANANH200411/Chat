import { Avatar, Col, Row, Space } from 'antd';
import Setting from './Setting';
import SwitchTheme from './SwitchTheme';
import Notify from './Notify';
import Language from './Language';
import '../style.css';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import { CarryOutOutlined, ContactsOutlined, ControlFilled } from '@ant-design/icons';
import UserAvatar from '../common/UserAvatar';
function TopBar() {
	const {
		appStore: { $$, user },
	} = useStores();
	return (
		<Row className='side-bar'>
			{/* <span style={{ fontSize: '1rem' }}>{`${$$('hi')}, MK04`}</span> */}
			<Space
				direction='vertical'
				size='large'
				align='center'
				className='max-width'
			>
				<UserAvatar
					id={user.id}
					className='top-bar-avt'
				/>
				<Notify />
				<ContactsOutlined className='top-bar-icon' />
				<CarryOutOutlined className='top-bar-icon' />
			</Space>
			<Space
				direction='vertical'
				size='large'
			>
				<ControlFilled className='top-bar-icon' />
				<SwitchTheme />
				{/* <Language /> */}
				<Setting />
			</Space>
		</Row>
	);
}

export default observer(TopBar);
