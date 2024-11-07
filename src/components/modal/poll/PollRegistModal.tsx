import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { DatePicker, Flex, Input, Modal, Row, Switch, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useStores } from '../../../stores/stores';
import { Poll } from '../../../utils/type';
import { DATE_FORMAT, NOW } from '../../../utils/dateHelper';
import dayjs from 'dayjs';
import { notify } from '../../../utils/notify';

const defaultPoll: Poll = {
	options: [],
	multiple: true,
	canAddOption: true,
	votes: [],
};

function PollRegistModal() {
	const {
		appStore: { $$, openCreatePoll, toggleCreatePollModal },
		chatStore: { createPoll },
	} = useStores();

	const [poll, setPoll] = useState<Poll>(defaultPoll);
	const [title, setTitle] = useState<string>('');
	const [pin, setPin] = useState<boolean>(false);
	const [options, setOtions] = useState<string[]>(['', '']);
	const updatePoll = (name: keyof Poll, val: any) => setPoll({ ...poll, [name]: val });

	const onClose = () => {
		toggleCreatePollModal();
		setPoll(defaultPoll);
		setTitle('');
		setOtions(['', '']);
		setPin(false);
	};

	return (
		<Modal
			destroyOnClose
			open={openCreatePoll}
			title={$$('create-new-poll')}
			onOk={() => {
				if (!title) {
					notify($$('noti-empty-input-n', { n: $$('question') }));
					return;
				}
				const opts = options.map((e) => e.trim()).filter((e) => e);
				if (opts.length < 2) {
					notify($$('noty-del-poll-opt'), 'warning');
					return;
				}
				createPoll(title, poll, opts, pin);
				onClose();
			}}
			onCancel={onClose}
		>
			<Flex vertical gap={12}>
				<Row className='block'>
					<Typography.Text ellipsis strong>
						{$$('question')}
					</Typography.Text>
					<Input
						placeholder={$$('input-question')}
						className='styled-input'
						value={title}
						onChange={(e) => setTitle(e.target.value.trim())}
					/>
				</Row>
				<Flex vertical gap={4} className='block'>
					<Flex vertical gap='inhertit' style={{ maxHeight: '16vh', overflow: 'auto' }}>
						{options.map((item, idx) => (
							<Input
								key={idx}
								value={item}
								placeholder={`${$$('poll-option')} ${idx + 1}`}
								className='styled-input'
								onChange={(e) => {
									setOtions(options.map((_, _idx) => (_idx === idx ? e.target.value : _)));
								}}
								suffix={
									<CloseOutlined
										className='text-secondary hoverable-icon'
										onClick={() => {
											if (options.length === 2) {
												notify($$('noty-del-poll-opt'), 'warning');
												return;
											}
											setOtions(options.filter((e, _idx) => _idx !== idx));
										}}
									/>
								}
							/>
						))}
					</Flex>
					<Typography.Link ellipsis onClick={() => setOtions(options.concat(''))}>
						<PlusOutlined /> {$$('add-poll-options')}
					</Typography.Link>
				</Flex>

				<Flex vertical gap={8} className='block'>
					<Typography.Text ellipsis strong>
						{$$('setting')}
					</Typography.Text>
					<Row justify='space-between' align='middle'>
						<Typography.Text ellipsis>{$$('set-deadline')}</Typography.Text>
						<DatePicker
							showTime
							minDate={NOW()}
							needConfirm={false}
							value={poll.deadline ? dayjs(poll.deadline) : undefined}
							onChange={(date) => updatePoll('deadline', dayjs(date).format(DATE_FORMAT))}
						/>
					</Row>
					<Row justify='space-between' align='middle'>
						<Typography.Text ellipsis>{$$('hide-voters')}</Typography.Text>
						<Switch checked={poll.hideVoters} onChange={(val) => updatePoll('hideVoters', val)} />
					</Row>
					<Row justify='space-between' align='middle'>
						<Typography.Text ellipsis>{$$('hide-res-not-voted')}</Typography.Text>
						<Switch
							checked={poll.hideResultNotVote}
							onChange={(val) => updatePoll('hideResultNotVote', val)}
						/>
					</Row>
					<Row justify='space-between' align='middle'>
						<Typography.Text ellipsis>{$$('multi-select')}</Typography.Text>
						<Switch checked={poll.multiple} onChange={(val) => updatePoll('multiple', val)} />
					</Row>
					<Row justify='space-between' align='middle'>
						<Typography.Text ellipsis>{$$('can-add-opt')}</Typography.Text>
						<Switch checked={poll.canAddOption} onChange={(val) => updatePoll('canAddOption', val)} />
					</Row>
					<Row justify='space-between' align='middle'>
						<Typography.Text ellipsis>{$$('pin-to-top-converse')}</Typography.Text>
						<Switch checked={pin} onChange={setPin} />
					</Row>
				</Flex>
			</Flex>
		</Modal>
	);
}

export default React.memo(observer(PollRegistModal));
