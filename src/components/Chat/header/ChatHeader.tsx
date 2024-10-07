import { Dropdown, Row, Typography } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import {
	SearchOutlined,
	TagFilled,
	UnorderedListOutlined,
	UsergroupAddOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import { LabelMenu } from '../../common/LabelMenu';
import GroupAvatar from '../../common/GroupAvatar';
import UserAvatar from '../../common/UserAvatar';
import { GROUP_AVT_SIZE } from '../../../utils/constants';

function ChatHeader() {
	const {
		chatStore,
		appStore: { $$, drawerOpen, setDrawerOpen, setToggleAddToGroup, getLabel },
	} = useStores();
	const { Room } = chatStore;
	if (!Room) return <></>;
	const { id, name, isGroup, members, image, label } = Room;

	return (
		<Row className='header chat-header' align='middle'>
			{isGroup ? <GroupAvatar image={image} members={members} /> : <UserAvatar id={id} size={GROUP_AVT_SIZE} />}
			<Row className='flex-grow' wrap={false}>
				<Row style={{overflow: 'hidden'}}>
					<Row wrap={false}>
						<Typography.Text ellipsis strong>
							{name}
						</Typography.Text>
					</Row>
					<Row wrap={false} >
						<UserOutlined className='text-secondary' />
						<Typography.Text ellipsis
							className='hover-change-color text-secondary text-small'
							onClick={() => setDrawerOpen('Members')}
						>{`${Room.members.length} ${$$('members')}`}</Typography.Text>
						<Dropdown trigger={['click']} menu={{ items: LabelMenu(id) }} destroyPopupOnHide>
							<TagFilled rotate={45} className='hover-change-color'  style={{color: getLabel(label)?.color ?? 'var(--text-secondary)'}} />
						</Dropdown>
					</Row>
				</Row>
				<div
					style={{
						display: 'flex',
						columnGap: '4px',
					}}
				>
					<UsergroupAddOutlined
						className='hoverable-icon'
						title={$$('add-friends-to-group')}
						onClick={setToggleAddToGroup}
					/>
					<SearchOutlined
						className='hoverable-icon'
						title={$$('search-message')}
						onClick={() => console.log('djasdklasjkl')}
					/>
					<VideoCameraOutlined
						className='hoverable-icon'
						title={$$('video-call')}
						onClick={() => console.log('djasdklasjkl')}
					/>
					<UnorderedListOutlined
						className='hoverable-icon'
						title={$$('room-info')}
						style={{ color: drawerOpen ? 'var(--primary-color)' : 'unset' }}
						onClick={() => setDrawerOpen(drawerOpen ? undefined : 'Info')}
					/>
				</div>
			</Row>
		</Row>
	);
}

export default observer(ChatHeader);
