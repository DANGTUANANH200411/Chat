import { Col, notification, Row, Watermark } from 'antd';
import LeftMenu from './left-menu/LeftMenu';
import ChatWrapper from './Chat/ChatWrapper';
import TopBar from './topbar/TopBar';
import CreateGroup from './modal/create-group/CreateGroup';
import './style.css';
import React from 'react';
import AddFriendModal from './modal/add-friend/AddFriendModal';
import AddFriendToGroupModal from './modal/add-friend-to-group/AddFriendToGroupModal';
import ChatDrawer from './drawer/ChatDrawer';
import ShareModal from './modal/share/ShareModal';
import AddToGroupModal from './modal/add-to-group/AddToGroupModal';
import GroupsInCommonModal from './modal/GroupsInCommonModal';

function Main() {
	return (
		<Watermark content='MK04'>
			<Row className='main'>
				<TopBar />
				<LeftMenu />
				<Col className='chat-wrapper'>
					<ChatWrapper />
				</Col>
				<ChatDrawer />
			</Row>
			<CreateGroup />
			<AddFriendModal />
			<AddFriendToGroupModal />
			<ShareModal/>
			<AddToGroupModal/>
			<GroupsInCommonModal/>
		</Watermark>
	);
}

export default React.memo(Main);
