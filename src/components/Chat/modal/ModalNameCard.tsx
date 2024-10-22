import { Modal, Space } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../stores/stores';
import SelectUsers from '../../modal/create-group/SelectUsers';

function ModalNameCard() {
	const { chatStore, appStore } = useStores();
	const { mdlNmCardVisible, toggleMdlNmCard, onSendNameCard } = chatStore;
	const { $$ } = appStore;
	return (
		<Modal
			destroyOnClose
			title={$$('send-namecard')}
			open={mdlNmCardVisible}
			onOk={() => onSendNameCard()}
			onCancel={toggleMdlNmCard}
		>
			<SelectUsers />
		</Modal>
	);
}

export default React.memo(observer(ModalNameCard));
