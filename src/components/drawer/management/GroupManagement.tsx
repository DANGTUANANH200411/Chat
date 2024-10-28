import { CaretLeftOutlined, KeyOutlined, LockFilled, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Button, Flex, Row, Typography } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../stores/stores';
import '../style.css';
import MngmtItem from './MngmtItem';
import { notify } from '../../../utils/notify';

function GroupManagement() {
	const {
		appStore: { $$, setDrawerOpen },
		chatStore: { IsAdmin, Room, Setting, changeGroupSetting, deleteGroup},
	} = useStores();

	const { changeNameOrAvt, pin, createNote, createPoll, sendMessage, approval, showSymbol, readRecent } = Setting;

	// const disabled = !IsAdmin;
	const disabled = false;
	return (
		<>
			<Row className='header' justify='center' align='middle'>
				<CaretLeftOutlined
					className='hoverable-icon'
					style={{ position: 'absolute', left: 0 }}
					onClick={() => setDrawerOpen('Info')}
				/>
				<Typography.Text strong ellipsis>
					{$$('manage-group')}
				</Typography.Text>
			</Row>
			<Flex vertical gap={4} className='body'>
				{disabled && (
					<Flex gap={8} className='max-width drawer-group' justify='center' wrap={false}>
						<LockFilled />
						<Typography.Text ellipsis>{$$('manage-only-admin')}</Typography.Text>
					</Flex>
				)}
				<div className='drawer-group'>
					<Typography.Text strong ellipsis className='drawer-group-header'>
						{$$('manage-allow')}
					</Typography.Text>
					<MngmtItem
						disabled={disabled}
						title={$$('manage-change')}
						checked={changeNameOrAvt}
						onChange={() => changeGroupSetting('changeNameOrAvt')}
					/>
					<MngmtItem
						disabled={disabled}
						title={$$('manage-pin')}
						checked={pin}
						onChange={() => changeGroupSetting('pin')}
					/>
					<MngmtItem
						disabled={disabled}
						title={$$('manage-note')}
						checked={createNote}
						onChange={() => changeGroupSetting('createNote')}
					/>
					<MngmtItem
						disabled={disabled}
						title={$$('manage-poll')}
						checked={createPoll}
						onChange={() => changeGroupSetting('createPoll')}
					/>
					<MngmtItem
						disabled={disabled}
						title={$$('manage-chat')}
						checked={sendMessage}
						onChange={() => changeGroupSetting('sendMessage')}
					/>
				</div>
				<div className='drawer-group'>
					<MngmtItem
						disabled={disabled}
						useSwitch
						title={$$('manage-approval')}
						explain={$$('manage-approval-explain')}
						checked={approval}
						onChange={() => changeGroupSetting('approval')}
					/>
					<hr></hr>
					<MngmtItem
						disabled={disabled}
						useSwitch
						title={$$('manage-highlight')}
						explain={$$('manage-highlight-explain')}
						checked={showSymbol}
						onChange={() => changeGroupSetting('showSymbol')}
					/>
					<hr></hr>
					<MngmtItem
						disabled={disabled}
						useSwitch
						title={$$('manage-read-recent')}
						explain={$$('manage-read-recent-explain')}
						checked={readRecent}
						onChange={() => changeGroupSetting('readRecent')}
					/>
				</div>
				{!disabled && (
					<>
						<div className='drawer-group'>
							<Button
								block
								className='collapse-content-item'
								color='default'
								variant='text'
								size='large'
								icon={<UsergroupDeleteOutlined />}
								onClick={()=> notify('Incomming')}
							>
								{$$('blocked-members')}
							</Button>
							<Button
								block
								className='collapse-content-item'
								color='default'
								variant='text'
								size='large'
								icon={<KeyOutlined />}
								onClick={()=> notify('Incomming')}
							>
								{$$('owner-&-admin')}
							</Button>
						</div>
						<div className='drawer-group'>
							<Button block color='danger' variant='filled' onClick={()=> Room && deleteGroup(Room.id)}>
								<Typography.Text strong ellipsis style={{ color: 'inherit' }}>
									{$$('delete-group')}
								</Typography.Text>
							</Button>
						</div>
					</>
				)}
			</Flex>
		</>
	);
}

export default React.memo(observer(GroupManagement));
