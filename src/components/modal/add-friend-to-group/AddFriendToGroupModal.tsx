import { Modal } from 'antd';
import React from 'react';
import { useStores } from '../../../stores/stores';
import SelectUsers from '../create-group/SelectUsers';
import { observer } from 'mobx-react';

function AddFriendToGroupModal() {
	const {
		appStore: { $$, toggleAddFriendToGroup, setToggleAddFriendToGroup },
		chatStore: { Room, addFriendToGroup, clearSelectedUsers },
	} = useStores();

    const onClose = () => {
        setToggleAddFriendToGroup();
        clearSelectedUsers();
    }
	return (
		<Modal
			centered
			destroyOnClose
			open={toggleAddFriendToGroup}
			title={$$('add-friends-to-group')}
			onOk={()=> {
                addFriendToGroup();
                onClose();
            }}
			onCancel={onClose}
		>
			<SelectUsers joined={Room?.members.map((e) => e.id)} />
		</Modal>
	);
}

export default React.memo(observer(AddFriendToGroupModal));
