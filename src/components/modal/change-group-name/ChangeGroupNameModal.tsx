import { Input, InputRef, Modal, Row } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { useStores } from '../../../stores/stores';
import GroupAvatar from '../../common/GroupAvatar';

function ChangeGroupNameModal() {
	const {
		appStore: { $$ },
		chatStore: { Room, openChangeGroupNameModal, toggleChangeGroupNameModal, changeGroupName },
	} = useStores();

	const { name, members, image } = Room!;

	const ref = useRef<InputRef>(null);

	useEffect(() => {
		ref.current?.focus();
	}, [ref]);
	return (
		<Modal
			centered
			destroyOnClose
			open={openChangeGroupNameModal}
			title={$$('set-group-name')}
			okText={$$('confirm')}
			onOk={() => {
				const value = ref?.current?.input?.value;
				if (value !== name) {
					changeGroupName(value);
				}
				toggleChangeGroupNameModal();
			}}
			onCancel={toggleChangeGroupNameModal}
		>
			<Row justify='center'>
				<GroupAvatar image={image} members={members} />
			</Row>
			<p className='max-width' style={{ textAlign: 'center' }}>
				{$$('set-group-name-ask')}
			</p>
			<Input ref={ref} defaultValue={name} maxLength={50} showCount />
		</Modal>
	);
}

export default React.memo(observer(ChangeGroupNameModal));
