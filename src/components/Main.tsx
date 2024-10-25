import { Row, Watermark } from 'antd';
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
import GroupsInCommonModal from './modal/groups-in-common/GroupsInCommonModal';
import PollDetailModal from './modal/poll/PollDetailModal';
import PollVotedModal from './modal/poll/PollVotedModal';
import PollRegistModal from './modal/poll/PollRegistModal';
import CreateNoteModal from './modal/create-note/CreateNoteModal';
import ModalNameCard from './Chat/modal/ModalNameCard';
import ModalDetailMessage from './Chat/modal/ModalDetailMessage';
import ModalReactionLog from './Chat/modal/ModalReactionLog';

function Main() {
	return (
		<Watermark content='MK04'>
			<Row className='main'>
				<TopBar />
				<LeftMenu />
				<ChatWrapper />
				<ChatDrawer />
			</Row>
			{/** MODAL */}
			<CreateGroup />
			<AddFriendModal />
			<AddFriendToGroupModal />
			<ShareModal />
			<AddToGroupModal />
			<GroupsInCommonModal />
			<PollDetailModal />
			<PollVotedModal />
			<PollRegistModal />
			<CreateNoteModal />
			<ModalReactionLog />
			<ModalDetailMessage />
			<ModalNameCard />
		</Watermark>
	);
}

export default React.memo(Main);
