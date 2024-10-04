import { Button, Dropdown, Row, Space, Typography } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { MoreOutlined, UserAddOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import Member from '../../common/Member';
import '../style.css';
import MembersAction from './MembersAction';
function Members() {
	const {
		appStore: { $$, drawerOpen, user: currentUser, setToggleAddToGroup, getUserName, setDrawerOpen },
		chatStore: { Room, onCopyGroup, onLeaveGroup, getRole },
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
					<Row className='body' style={{ padding: '.8rem' }}>
						<Space className='max-width drawer-members-buttom' direction='vertical'>
							<Button
								className='max-width text-primary'
								icon={<UserAddOutlined />}
								onClick={setToggleAddToGroup}
							>
								{$$('add-friends-to-group')}
							</Button>
							<Row justify='space-between'>
								<Typography.Text strong ellipsis>{`${$$('list-member')} (${
									Room?.members.length
								})`}</Typography.Text>
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
						<Space size={24} className='max-width drawer-members-list' direction='vertical'>
							{Room &&
								Room.members.map((user) => {
									const role = getRole(user.id);
									let desctiption = "";
									switch (role) {
										case 'Owner':
											desctiption = $$('owner');
											break;
										case 'Admin':
											desctiption = $$('admin');
											break;
										default:
											desctiption = $$('add-by', {name: getUserName(user.invitedBy, true)});
											break;
									}
									return (
										<Member
											key={user.id}
											user={user}
											isMe={user.id === currentUser.id}
											info={desctiption}
											action={<MembersAction id={user.id} role={role} />}
											suffix={
												user.id === currentUser.id ? (
													<Button
														type='primary'
														danger
														size='small'
														onClick={() => {
															onLeaveGroup();
															setDrawerOpen(false);
														}}
													>
														{$$('leave')}
													</Button>
												) : (
													<></>
												)
											}
										/>
									);
								})}
						</Space>
					</Row>
				</>
			)}
		</div>
	);
}
export default observer(Members);
