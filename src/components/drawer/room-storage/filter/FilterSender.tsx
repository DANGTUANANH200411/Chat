import { Select } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../../stores/stores';
import UserAvatar from '../../../common/UserAvatar';
import { toNormalize } from '../../../../utils/helper';

function FilterSender() {
	const {
		appStore: { $$ },
		chatStore,
	} = useStores();
	const { Room, setStorageFilter } = chatStore;
	if (!Room) return <></>;
	const { members } = Room;
	return (
		<Select
			showSearch
			allowClear
			placeholder={$$('sender')}
			className='max-width'
			onChange={(sender) => setStorageFilter({ sender })}
			filterOption={(input, option) => toNormalize(option?.title).includes(toNormalize(input))}
			options={members.map((e) => ({
				title: e.userName,
				label: (
					<>
						<UserAvatar id={e.id} size='small' />
						<span style={{ marginLeft: 4, fontSize: 12 }}>{e.userName}</span>
					</>
				),
				value: e.id,
			}))}
		/>
	);
}

export default React.memo(observer(FilterSender));
