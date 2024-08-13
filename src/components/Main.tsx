import { Col, Row } from 'antd';
import LeftMenu from './left-menu/LeftMenu';
import ChatWrapper from './Chat/ChatWrapper';
import TopBar from './topbar/TopBar';
import CreateGroup from './modal/create-group/CreateGroup';
import Members from './drawer/members/Members';
import './style.css';
import React from 'react';

function Main() {
	return (
		<>
			<Row className='main'>
				<TopBar />
				<LeftMenu />
				<Col className='chat-wrapper'>
					<ChatWrapper />
				</Col>
				<Members />
			</Row>
			<CreateGroup />
		</>
	);
}

export default React.memo(Main);
