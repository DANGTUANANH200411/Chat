import { Button, Col, Dropdown, Row, Space, Typography } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { MoreOutlined, UserAddOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import UserAvatar from '../../common/UserAvatar';

function Members() {
	const {
		appStore: { $$, drawerOpen },
		chatStore: { Room, onCopyGroup },
	} = useStores();
	useEffect(() => {
		if (!drawerOpen) {
			document.documentElement.style.setProperty('--drawer-w', '0px');
		} else {
			document.documentElement.style.setProperty('--drawer-w', '20vw');
		}
	}, [drawerOpen]);
	return (
		<div className='drawer drawer-members max-height'>
			{!drawerOpen ? (
				<></>
			) : (
				<>
					<Row className='header' justify='center' align='middle'>
						<Typography.Text strong ellipsis>
							{$$('members')}
						</Typography.Text>
					</Row>
					<Row style={{ padding: '.8rem' }}>
						<Space className='max-width' direction='vertical'>
							<Button className='max-width text-primary' icon={<UserAddOutlined />}>
								{$$('add-friends-to-group')}
							</Button>
							<Row justify='space-between'>
								<Typography.Text
									strong
									ellipsis
								>{`Listing members (${Room?.members.length})`}</Typography.Text>
								<Dropdown
									menu={{
										items: [
											{
												key: 1,
												label: $$('copy-group'),
												onClick: onCopyGroup,
											},
										],
									}}
								>
									<MoreOutlined rotate={90} className='hoverable-icon' />
								</Dropdown>
							</Row>
						</Space>
						<Space>
							<Row>{/* <UserAvatar id={undefined}/> */}</Row>
						</Space>
					</Row>
				</>
			)}
		</div>
	);
}
export default observer(Members);
