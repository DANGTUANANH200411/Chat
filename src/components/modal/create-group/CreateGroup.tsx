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
		appStore: { $$, labels, user },
		chatStore: { openCreateGroup, toggleCreateGroup, onCreateGroup },
	} = useStores();
	const [groupName, setGroupName] = useState<string>('');
	const [searchText, setSearchText] = useState<string>('');
	const [selectedLabel, setSelectedLabel] = useState<string>('all');
	const uploadRef = useRef<UploadRef>(null);
	const listLabel = useMemo(
		() =>
			[{ id: 'all', name: $$('all'), color: 'black' }, ...labels].map((e) => (
				<Tag
					key={e.id}
					color={e.id === selectedLabel ? e.color : undefined}
					onClick={() => setSelectedLabel(e.id)}
				>
					{e.name}
				</Tag>
			)),
		[labels, selectedLabel]
	);
	useEffect(() => {
		if (!openCreateGroup) {
			setGroupName('');
			setSearchText('');
			setSelectedLabel('all');
		}
	}, [openCreateGroup]);
	const handleCreateGroup = () => {
		const params: ChatRoom = {
			id: newGuid(),
			name: groupName.trim() ?? '',
			isGroup: true,
			members: [],
			image: uploadRef.current?.file?.thumbUrl,
		};
		onCreateGroup(params);
	};
	return (
		<Modal
			key='modal-create-group'
			open={openCreateGroup}
			title={$$('create-group')}
			width='30vw'
			okText='Create group'
			style={{ top: 10 }}
			onOk={handleCreateGroup}
			onCancel={toggleCreateGroup}
		>
			<Space direction='vertical' size='middle' className='max-width text-ellipsis'>
				<Row align='middle' justify='space-around' style={{ flexWrap: 'nowrap', columnGap: '1rem' }}>
					<Col>
						<CustomUpload ref={uploadRef} />
					</Col>
					<Input
						className='max-width'
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						placeholder={$$('group-name-placeholder')}
					/>
				</Row>
				<Row>
					<Input
						value={searchText}
						placeholder={$$('search-place-holder')}
						prefix={<SearchOutlined className='text-secondary' />}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</Row>
				<Row className='list-label' wrap={false}>
					{listLabel}
				</Row>
				<Row>
					<SelectUsers searchText={searchText} searchLabel={selectedLabel} />
				</Row>
			</Space>
		</Modal>
	);
}
export default observer(CreateGroup);
