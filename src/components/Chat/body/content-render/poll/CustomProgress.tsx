import { Avatar, Checkbox, Flex, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
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
	closed?: boolean;
	onChange: (val: string) => void;
}
function CustomProgress(props: Props) {
	const { id, label, voted, max, checked, hideVoters, hideResultNotVote, closed, onChange } = props;
	
	const [width, setWidth] = useState<number | string>(0);

	useEffect(()=> {
		setWidth(`${(voted.length * 100) / max}%`);
	}, [voted, max])
	return (
		<Flex gap={8} align='center' className='max-width'>
			<Row className='progress-container ' wrap={false} style={{ height: 32 }} onClick={() => !closed && onChange(id)}>
				<div className='progress' style={{ width: hideResultNotVote ? 0 : width }}></div>
				<Flex gap={8}>
					{!closed && <Checkbox className='chk-round' checked={checked} />}
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
