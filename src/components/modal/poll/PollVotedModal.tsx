import { Button, Empty, Modal, Tabs, TabsProps } from 'antd';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { useStores } from '../../../stores/stores';
import { User } from '../../../utils/type';
import Member from '../../common/Member';
import './style.css';

function PollVotedModal() {
	const {
		appStore: { $$, mdlPollVotedProps, setMdlPollVotedProps, getUserById, setFriend },
		chatStore: { Room },
	} = useStores();

	const renderMember = useCallback((user: User) => {
		return (
			<Member
				key={user.id}
				user={user}
				suffix={
					!user.isFriend && (
						<Button
							color='primary'
							variant='filled'
							size='small'
							onClick={() => setFriend(user.id, user.isFriend)}
						>
							{$$('add-friend')}
						</Button>
					)
				}
			/>
		);
	}, [$$, setFriend]);

	const items: TabsProps['items'] = mdlPollVotedProps?.poll?.options.map((opt) => ({
		key: opt.id,
		label: opt.label,
		children: (
			<div className='poll-voted-list'>
				{mdlPollVotedProps?.poll?.votes
					.filter((e) => e.values.includes(opt.id))
					.map((e) => getUserById(e.id))
					.map((e) => e && renderMember(e))}
			</div>
		),
	}));

	const notVoted = mdlPollVotedProps?.poll?.votes
		.filter((e) => Room?.members.every((mem) => mem.id !== e.id) || !e.values.length)
		.map((e) => getUserById(e.id));

	const notVotedItems: TabsProps['items'] = [
		{
			key: 'not-voted',
			label: $$('not-voted-yet'),
			children: (
				<div className='poll-voted-list'>
					{notVoted && notVoted.length ? notVoted.map((e) => e && renderMember(e)) : <Empty />}
				</div>
			),
		},
	];
	return (
		<Modal
			centered
			destroyOnClose
			open={!!mdlPollVotedProps}
			onCancel={() => setMdlPollVotedProps()}
            closeIcon={<></>}
			footer={<></>}
		>
			<Tabs defaultActiveKey='1' items={[...(items ?? []), ...notVotedItems]}></Tabs>
		</Modal>
	);
}

export default React.memo(observer(PollVotedModal));
