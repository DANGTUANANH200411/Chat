import { AlignLeftOutlined, ClockCircleOutlined, PlusOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Modal, Popconfirm, Typography } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../../stores/stores';
import { displayChatTimeFull } from '../../../utils/dateHelper';
import CustomProgress from '../../Chat/body/content-render/poll/CustomProgress';
import Confirm from '../../common/Confirm';
import { notify } from '../../../utils/notify';

function PollDetailModal() {
	const {
		appStore: { $$, CurrentUserId, mdlPollDetailProps, setMdlPollDetailProps, setMdlPollVotedProps, getUserName },
		chatStore: { Room, onVotesPoll, addPollOption },
	} = useStores();

	const [listChecked, setListChecked] = useState<Set<string>>(new Set());
	const [inputLabel, setInputLabel] = useState<string>('');

	useEffect(() => {
		setListChecked(new Set(mdlPollDetailProps?.poll?.votes.find((e) => e.id === CurrentUserId)?.values));
	}, [mdlPollDetailProps]);
	if (!mdlPollDetailProps || !mdlPollDetailProps.poll || mdlPollDetailProps.poll.closed) return <></>;

	const { id, content, sender, poll, createDate } = mdlPollDetailProps!;
	const { deadline, votes, options, multiple, canAddOption, hideVoters, hideResultNotVote } = poll!;

	const handleVote = () => {
		onVotesPoll(id, [...listChecked]);
		setMdlPollDetailProps();
	};

	return (
		<Modal
			destroyOnClose
			title={$$('poll-detail')}
			open={!!mdlPollDetailProps}
			footer={
				<Button block color='primary' variant='filled' onClick={handleVote}>
					{$$('vote')}
				</Button>
			}
			onCancel={() => setMdlPollDetailProps()}
		>
			<Flex vertical gap={8}>
				<Flex vertical gap={4}>
					<Typography.Text ellipsis strong style={{ fontSize: 'large' }}>
						{content}
					</Typography.Text>
					<Typography.Text ellipsis className='small-text text-secondary'>
						{getUserName(sender)} - {displayChatTimeFull(createDate, $$)}
					</Typography.Text>
				</Flex>
				<Flex vertical gap={4}>
					<Flex gap={8}>
						<ClockCircleOutlined className='small-text text-secondary' />
						<Typography.Text ellipsis className='small-text text-secondary'>
							{$$('ends-at-$time', { time: dayjs(deadline).format('HH:mm DD-MM-YYYY') })}
						</Typography.Text>
					</Flex>
					{multiple && (
						<Flex gap={8}>
							<AlignLeftOutlined className='small-text text-secondary' />
							<Typography.Text ellipsis className='small-text text-secondary'>
								{$$('choose-multiple-options')}
							</Typography.Text>
						</Flex>
					)}
					<Flex gap={8}>
						<TeamOutlined className='small-text' style={{ color: 'var(--primary-color)' }} />
						<Typography.Link
							ellipsis
							className='small-text'
							onClick={() => setMdlPollVotedProps(mdlPollDetailProps)}
						>
							{$$('$n-member-voted', { number: votes.length })}
						</Typography.Link>
					</Flex>
				</Flex>
				<Flex vertical gap={4} style={{ maxHeight: '32vh', overflow: 'auto' }}>
					{options.map((opt) => (
						<CustomProgress
							key={opt.id}
							id={opt.id}
							label={opt.label}
							max={Room?.members.length ?? 0}
							checked={listChecked.has(opt.id)}
							hideVoters={hideVoters}
							hideResultNotVote={
								hideResultNotVote && !votes.some((e) => e.id === CurrentUserId && e.values.length)
							}
							voted={votes.filter((e) => e.values.includes(opt.id)).map((e) => e.id)}
							onChange={(val) => {
								if (multiple) {
									let clonedSet = new Set(listChecked);
									clonedSet.has(val) ? clonedSet.delete(val) : clonedSet.add(val);
									setListChecked(clonedSet);
								} else {
									setListChecked(new Set(val));
								}
							}}
						/>
					))}
				</Flex>
				{canAddOption && (
					<Popconfirm
						icon={<></>}
						title={$$('input-poll-option')}
						description={
							<Input
								placeholder={$$('input-poll-option')}
								value={inputLabel}
								onChange={(e) => setInputLabel(e.currentTarget.value)}
								style={{ width: '20vw' }}
							/>
						}
						okText='Add'
						okType='primary'
						onConfirm={() => {
							const input = inputLabel.trim();
							if (!input) {
								notify($$('noti-empty-input-n', { n: $$('poll-option') }));
								return;
							}
							addPollOption(id, inputLabel);
						}}
						afterOpenChange={() => setInputLabel('')}
					>
						<Button
							block
							color='default'
							variant='text'
							className='text-secondary'
							icon={<PlusOutlined style={{ color: 'inherit' }} />}
						>
							{$$('add-poll-options').toLocaleUpperCase()}
						</Button>
					</Popconfirm>
				)}
			</Flex>
		</Modal>
	);
}

export default React.memo(observer(PollDetailModal));
