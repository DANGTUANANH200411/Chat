import { Avatar, Flex, Modal, Tooltip, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { useStores } from '../../../stores/stores';
import { RoomMember } from '../../../utils/type';
import ChatItemWrapper from '../body/ChatItemWrapper';

function ModalDetailMessage() {
	const { appStore: {$$}, chatStore } = useStores();
	const { Members, modalDetailMsg, setModalDetail } = chatStore;
	const { visible, message } = modalDetailMsg;

	const [delivered, readed] = useMemo(() => {
		const deli: RoomMember[] = [];
		const readed: RoomMember[] = [];
		if (message) {
			Members.forEach((e) => {
				if (e.lastLogTime && e.lastLogTime >= message.createDate) {
					readed.push(e);
				} else {
					deli.push(e);
				}
			});
		}
		return [deli, readed];
	}, [message]);
	return (
		<Modal
			centered
			open={visible}
			destroyOnClose
			footer={<></>}
			title={$$('detail-msg')}
			onCancel={() => setModalDetail({ visible: false, message: undefined })}
		>
			{message && (
				<>
					<ChatItemWrapper messages={[message]} view />
					<Flex vertical gap={12}>
						<Typography.Text strong>Delivered</Typography.Text>
						<Flex wrap className='max-width' gap={12} style={{ maxHeight: '15vh', overflow: 'auto' }}>
							{delivered.map((e) => (
								<Tooltip title={e.userName} destroyTooltipOnHide>
									<Avatar src={e.imageSrc} />
								</Tooltip>
							))}
						</Flex>
						<Typography.Text strong>Readed</Typography.Text>
						<Flex wrap className='max-width' gap={12} style={{ maxHeight: '15vh', overflow: 'auto' }}>
							{readed.map((e) => (
								<Tooltip title={e.userName} destroyTooltipOnHide>
									<Avatar src={e.imageSrc} />
								</Tooltip>
							))}
						</Flex>
					</Flex>
				</>
			)}
		</Modal>
	);
}

export default React.memo(observer(ModalDetailMessage));
