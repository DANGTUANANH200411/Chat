import { Avatar, Checkbox, Flex, Row, Typography } from 'antd';
import React from 'react';
import UserAvatar from '../../../../common/UserAvatar';
import { useStores } from '../../../../../stores/stores';

interface Props {
	id: string;
	label: string;
	voted: string[];
	max: number;
	hideVoters?: boolean;
	hideResultNotVote?: boolean;
	checked?: boolean;
	onChange: (val: string) => void;
}
function CustomProgress(props: Props) {
	const { id, label, voted, max, checked, hideVoters, hideResultNotVote, onChange } = props;
	return (
		<Flex gap={8} align='center' className='max-width'>
			<Row className='progress-container ' wrap={false} style={{ height: 32 }} onClick={() => onChange(id)}>
				{!hideResultNotVote && (
					<div className='progress' style={{ width: `${(voted.length * 100) / max}%` }}></div>
				)}
				<Flex gap={8}>
					<Checkbox className='chk-round' checked={checked} />
					<Typography.Text ellipsis>{label}</Typography.Text>
				</Flex>
				<Flex>
					<Avatar.Group
						size={24}
						max={{
							count: 3,
							style: { color: 'rgb(0 131 255)', backgroundColor: 'rgb(232 244 255)', fontSize: 'unset' },
						}}
					>
						{!hideResultNotVote && !hideVoters && voted.map((id) => <UserAvatar id={id} />)}
					</Avatar.Group>
				</Flex>
			</Row>
		</Flex>
	);
}

export default React.memo(CustomProgress);
