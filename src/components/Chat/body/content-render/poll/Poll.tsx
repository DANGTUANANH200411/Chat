import { observer } from 'mobx-react';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { Message } from '../../../../../utils/type';
import { Button, Flex, Row, Typography } from 'antd';
import { useStores } from '../../../../../stores/stores';
import dayjs from 'dayjs';

import CustomProgress from './CustomProgress';
import './style.css';
import { AlignLeftOutlined, ClockCircleOutlined } from '@ant-design/icons';
interface Props {
	message: Message;
}
function Poll(props: Props) {
	const {
		appStore: { CurrentUserId, $$, setMdlPollDetailProps, setMdlPollVotedProps },
		chatStore: { Room, onVotePoll, closePoll },
	} = useStores();
	const { id, content, poll } = props.message;

	const ref = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (!poll?.deadline || poll?.closed) return;
		function onExpired () {
			if(dayjs(poll?.deadline).second(0).diff(dayjs().second(0)) <= 0) {
				closePoll(id);
				return;
			}
		}
		onExpired()
		ref.current = setInterval(onExpired, 1000);

		return () => {
			ref.current && clearInterval(ref.current);
		};
	}, []);

	useEffect(() => {
		poll?.closed && ref.current && clearInterval(ref.current);
	}, [poll?.closed, ref.current]);

	if (!poll) return <></>;
	const { options, votes, deadline, hideVoters, hideResultNotVote, closed } = poll;
	return (
		<Row justify='center'>
			<Flex vertical gap={8} style={{ width: '30%' }} className='poll-container'>
				<Typography.Text ellipsis strong style={{ fontSize: 'large' }}>
					{content}
				</Typography.Text>
				<Flex vertical gap={4}>
					{deadline && <Flex gap={8}>
						<ClockCircleOutlined className='small-text text-secondary' />
						<Typography.Text className='small-text text-secondary'>
							{$$('ends-at-$time', { time: dayjs(deadline).format('HH:mm DD-MM-YYYY') })}
						</Typography.Text>
					</Flex>}
					<Flex gap={8}>
						<AlignLeftOutlined className='small-text' style={{ color: 'var(--primary-color)' }} />
						<Typography.Link className='small-text' onClick={() => setMdlPollVotedProps(props.message)}>
							{$$('$n-member-voted', { number: votes.length })}
						</Typography.Link>
					</Flex>
				</Flex>
				<Flex vertical gap={4}>
					{options.slice(0, 2).map((opt) => {
						const voted = votes.filter((e) => e.values.includes(opt.id)).map((e) => e.id);
						return (
							<CustomProgress
								key={opt.id}
								id={opt.id}
								label={opt.label}
								max={Room?.members.length ?? 0}
								closed={closed}
								hideVoters={hideVoters}
								hideResultNotVote={
									hideResultNotVote && !votes.some((e) => e.id === CurrentUserId && e.values.length)
								}
								checked={voted.includes(CurrentUserId)}
								voted={voted}
								onChange={(val) => onVotePoll(id, val)}
							/>
						);
					})}
					{options.length > 2 && (
						<Typography.Text ellipsis className='small-text text-secondary'>
							{$$('n-more-poll-opt', { number: options.length - 2 })}
						</Typography.Text>
					)}
				</Flex>
				{!closed && (
					<Button
						block
						color='primary'
						variant='filled'
						style={{ fontWeight: 600 }}
						onClick={() => setMdlPollDetailProps(props.message)}
					>
						CHANGE VOTE
					</Button>
				)}
			</Flex>
		</Row>
	);
}

export default React.memo(observer(Poll));
