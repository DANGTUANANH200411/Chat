import { Col, Input, InputRef, Modal, Row, Space, Tag } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { SearchOutlined } from '@ant-design/icons';
import SelectUsers from './SelectUsers';
import CustomUpload, { UploadRef } from './CustomUpload';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChatRoom } from '../../../utils/type';
import { newGuid } from '../../../utils/helper';
import '../style.css';

function CreateGroup() {
	const {
		appStore: { $$ },
		chatStore: { openCreateGroup, toggleCreateGroup, onCreateGroup },
	} = useStores();
	const [groupName, setGroupName] = useState<string>('');
	const uploadRef = useRef<UploadRef>(null);
	
	useEffect(() => {
		if (!openCreateGroup) {
			setGroupName('');
		}
	}, [openCreateGroup]);
	const handleCreateGroup = () => {
		const params: ChatRoom = {
			id: newGuid(),
			name: groupName.trim() ?? '',
			isGroup: true,
			members: [],
			image: uploadRef.current?.file?.thumbUrl,
			pinMessages: [],
		};
		onCreateGroup(params);
	};
	return (
		<Modal
			centered
			destroyOnClose
			key='modal-create-group'
			open={openCreateGroup}
			title={$$('create-group')}
			width='30vw'
			okText='Create group'
			onOk={handleCreateGroup}
			onCancel={toggleCreateGroup}
		>
			<Space direction='vertical' size='middle' className='max-width text-ellipsis'>
				<Row align='middle' justify='space-around' style={{ flexWrap: 'nowrap', columnGap: '1rem' }}>
					<Col>
						<CustomUpload ref={uploadRef} />
					</Col>
					<Input
						className='max-width styled-input'
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						placeholder={$$('group-name-placeholder')}
					/>
				</Row>
				<Row>
					<SelectUsers />
				</Row>
			</Space>
		</Modal>
	);
}
export default observer(CreateGroup);
