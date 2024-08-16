import { Modal } from 'antd';
import React from 'react';
import { useStores } from '../../../stores/stores';
import SelectUsers from '../create-group/SelectUsers';
import { observer } from 'mobx-react';

function AddToGroupModal() {
	const {
		appStore: { $$, toggleAddToGroup, setToggleAddToGroup },
		chatStore: { Room, addFriendToGroup, clearSelectedUsers },
	} = useStores();

    const onClose = () => {
        setToggleAddToGroup();
        clearSelectedUsers();
    }
	return (
		<Modal
			open={toggleAddToGroup}
			centered
			destroyOnClose
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

export default React.memo(observer(AddToGroupModal));
