import { Modal } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../stores/stores';
import ChatItemWrapper from '../body/ChatItemWrapper';

function ModalDetailMessage() {
	const { chatStore } = useStores();
	const { modalDetailMsg, setModalDetail } = chatStore;
	const { visible, message } = modalDetailMsg;
	return (
		<Modal
			open={visible}
			destroyOnClose
			footer={<></>}
			title='Detail Message'
			onCancel={() => setModalDetail({ visible: false, message: undefined })}
		>
			{message && <ChatItemWrapper messages={[message]} view />}
		</Modal>
	);
}

export default React.memo(observer(ModalDetailMessage));
