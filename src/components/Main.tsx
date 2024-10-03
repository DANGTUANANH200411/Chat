import { Col, Row, Watermark } from 'antd';
import LeftMenu from './left-menu/LeftMenu';
import ChatWrapper from './Chat/ChatWrapper';
import TopBar from './topbar/TopBar';
import CreateGroup from './modal/create-group/CreateGroup';
import Members from './drawer/members/Members';
import './style.css';
import React from 'react';
import AddFriendModal from './modal/add-friend/AddFriendModal';
import AddToGroupModal from './modal/add-friend-to-group/AddToGroupModal';

function Main() {
	return (
		<Watermark content="MK04">
			<Row className='main'>
				<TopBar />
				<LeftMenu />
				<Col className='chat-wrapper'>
					<ChatWrapper />
				</Col>
				<Members />
			</Row>
			<CreateGroup />
			<AddFriendModal/>
			<AddToGroupModal/>
		</Watermark>
	);
}

export default React.memo(Main);
