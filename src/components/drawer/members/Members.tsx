import { CaretLeftOutlined, MoreOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Row, Space, Typography } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import Member from '../../common/Member';
import '../style.css';
import MembersAction from './MembersAction';
import Confirm from '../../common/Confirm';
function Members() {
	const {
		appStore: { $$, user: currentUser, setToggleAddFriendToGroup, getUserName, setDrawerOpen },
		chatStore: { Room, onCopyGroup, onLeaveGroup, getRole },
	} = useStores();

	return (
		<>
			<Row className='header' justify='center' align='middle'>
				<CaretLeftOutlined
					className='hoverable-icon'
					style={{ position: 'absolute', left: 0 }}
					onClick={() => setDrawerOpen('Info')}
				/>
				<Typography.Text strong ellipsis>
					{$$('members')}
				</Typography.Text>
			</Row>
			<Row className='body' style={{ padding: '.8rem' }}>
				<Space className='max-width drawer-members-buttom' direction='vertical'>
					<Button
						className='max-width text-primary'
						icon={<UserAddOutlined />}
						onClick={setToggleAddFriendToGroup}
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
				<Flex vertical className='max-width drawer-members-list'>
					{Room &&
						Room.members.map((user) => {
							const role = getRole(user.id);
							let desctiption = '';
							switch (role) {
								case 'Owner':
									desctiption = $$('owner');
									break;
								case 'Admin':
									desctiption = $$('admin');
									break;
								default:
									desctiption = $$('add-by', { name: getUserName(user.invitedBy, true) });
									break;
							}
							return (
								<Member
									showSymbol
									key={user.id}
									user={user}
									isMe={user.id === currentUser.id}
									info={desctiption}
									action={<MembersAction id={user.id} role={role} />}
									suffix={
										user.id === currentUser.id ? (
											<Confirm
												danger
												title='Leave group'
												body='Leave and delete this conversation?'
												okText={$$('leave')}
												onOk={() => onLeaveGroup()}
											>
												<Button type='primary' danger size='small'>
													{$$('leave')}
												</Button>
											</Confirm>
										) : (
											<></>
										)
									}
								/>
							);
						})}
				</Flex>
			</Row>
		</>
	);
}
export default observer(Members);
