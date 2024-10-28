import { CaretLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, Row, Tabs, Typography } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../stores/stores';
import PinnedTab from './tabs/PinnedTab';
import './style.css';
import PollTab from './tabs/PollTab';
import { BoardType } from '../../../utils/type';
import { ItemType } from 'antd/es/menu/interface';

function RoomBoard() {
	const {
		appStore: { $$, setDrawerOpen, toggleCreatePollModal, toggleCreateNote },
		chatStore: {
			Permission: { createNote, createPoll },
			boardTab,
			setBoardTab,
		},
	} = useStores();

	const items: ItemType[] = [
		...(createPoll
			? [
					{
						key: 'poll',
						label: $$('create-new-poll'),
						onClick: toggleCreatePollModal,
					},
			  ]
			: []),
		...(createNote
			? [
					{
						key: 'note',
						label: $$('create-note'),
						onClick: toggleCreateNote,
					},
			  ]
			: []),
	];
	return (
		<>
			<Row className='header' justify='center' align='middle'>
				<CaretLeftOutlined
					className='header-button-left hoverable-icon'
					onClick={() => setDrawerOpen('Info')}
				/>
				<Typography.Text strong ellipsis>
					{$$('group-board')}
				</Typography.Text>
				{(createPoll || createNote) && (
					<Dropdown arrow destroyPopupOnHide trigger={['click']} menu={{ items }}>
						<PlusOutlined
							className='hoverable-icon'
							style={{
								position: 'absolute',
								right: '1rem',
							}}
						/>
					</Dropdown>
				)}
			</Row>
			<div className='body'>
				<Tabs className='storage-tabs' activeKey={boardTab} onChange={(key) => setBoardTab(key as BoardType)}>
					<Tabs.TabPane tab={$$('pinned-msgs')} key='Pinned'>
						<PinnedTab />
					</Tabs.TabPane>
					<Tabs.TabPane tab={$$('polls')} key='Polls'>
						<PollTab />
					</Tabs.TabPane>
					<Tabs.TabPane tab={$$('notes')} key='Notes'></Tabs.TabPane>
				</Tabs>
			</div>
		</>
	);
}

export default React.memo(observer(RoomBoard));
