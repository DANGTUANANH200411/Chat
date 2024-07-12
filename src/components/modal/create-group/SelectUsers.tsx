import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { Checkbox, Col, Row, Space, Typography } from 'antd';
import UserAvatar from '../../common/UserAvatar';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import ListSelected from './ListSelected';
import { User } from '../../../utils/type';
import { toNormalize } from '../../../utils/helper';

interface Props {
	searchText: string;
	searchLabel: string;
}

const SelectUsers = forwardRef(function SelectUsers(props: Props, ref) {
	const {
		chatStore: { Users },
	} = useStores();
	const { searchText, searchLabel } = props;
	const [listChecked, setListChecked] = useState<Map<string, User>>(new Map());

	const onCheck = (user: User) => {
		if (listChecked.has(user.id)) {
			let newMap = new Map(listChecked);
			newMap.delete(user.id);
			setListChecked(newMap);
		} else {
			setListChecked(new Map(listChecked.set(user.id, user)));
		}
	};

	const searchedUser = useMemo(() => {
		if (searchLabel === 'all' && !searchText) return Users;
		return Users.filter(
			(e) =>
				(searchLabel === 'all' || e.label === searchLabel) &&
				(!searchText || toNormalize(e.userName).includes(toNormalize(searchText)))
		);
	}, [searchText, searchLabel]);
	useImperativeHandle(ref, () => ({
		getSelected(){
			return Array.from(listChecked.keys());
		}
	}));
	return (
		<Row className='max-width' style={{ position: 'relative', height: '60vh' }}>
			<Col span={listChecked.size > 0 ? 14 : 24} className='max-height'>
				<Space
					direction='vertical'
					className={`select-user  ${listChecked.size > 0 && 'has-selected'} max-width`}
					style={{ position: 'relative' }}
				>
					{searchedUser.map((user) => (
						<Space
							key={user.id}
							onClick={() => onCheck(user)}
							className='hover-change-color user-row max-width'
						>
							<Checkbox checked={listChecked.has(user.id)} />
							<UserAvatar id={user.id} user={user} />
							<Typography.Text strong ellipsis style={{ width: '25vh' }}>
								{user.userName}
							</Typography.Text>
						</Space>
					))}
				</Space>
			</Col>
			{listChecked.size > 0 && (
				<Col span={10} className='max-height'>
					<ListSelected listChecked={listChecked} onUncheck={onCheck} />
				</Col>
			)}
		</Row>
	);
})
export default observer(SelectUsers);
