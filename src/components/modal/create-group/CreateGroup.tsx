import { Col, Input, InputRef, Modal, Row, Space, Tag } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { SearchOutlined } from '@ant-design/icons';
import SelectUsers from './SelectUsers';
import CustomUpload, { UploadRef } from './CustomUpload';
import { useMemo, useRef, useState } from 'react';
import { notify } from '../../../utils/notify';
import { ChatRoom } from '../../../utils/type';
import { isEmpty, newGuid } from '../../../utils/helper';
import '../style.css';

interface CustomRef {
	getSelected: () => string[];
}

function CreateGroup() {
	const {
		appStore: { $$, labels, user },
		chatStore: { openCreateGroup, toggleCreateGroup, onCreateGroup },
	} = useStores();
	const [searchText, setSearchText] = useState<string>('');
	const [selectedLabel, setSelectedLabel] = useState<string>('all');
	const inputRef = useRef<InputRef>(null);
	const ref = useRef<CustomRef>(null);
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

	const handleCreateGroup = () => {
		const params: ChatRoom = {
			id: newGuid(),
			name: inputRef.current?.input?.value.trim() ?? '',
			isGroup: true,
			members: [user.id, ...ref.current?.getSelected() ?? []],
			image: uploadRef.current?.file?.thumbUrl,
			pinMessages: [],
		};
		if (isEmpty(params.name)) {
			notify($$('invalid-group-name'), 'warning');
			return;
		} else if (params.members.length < 2) {
			notify($$('invalid-group-members'), 'warning');
			return;
		} else {
			onCreateGroup(params);
		}
	};
	return (
		<Modal
			open={openCreateGroup}
			title={$$('create-group')}
			width='30vw'
			okText='Create group'
			style={{ top: 20 }}
			onOk={handleCreateGroup}
			onCancel={toggleCreateGroup}
		>
			<Space direction='vertical' size='middle' className='max-width text-ellipsis'>
				<Row align='middle' justify='space-around' style={{ flexWrap: 'nowrap', columnGap: '1rem' }}>
					<Col>
						<CustomUpload ref={uploadRef} />
					</Col>
					<Input ref={inputRef} className='max-width' placeholder={$$('group-name-placeholder')} />
				</Row>
				<Row>
					<Input
						placeholder={$$('search-place-holder')}
						prefix={<SearchOutlined className='text-secondary' />}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</Row>
				<Row className='list-label'>{listLabel}</Row>
				<Row>
					<SelectUsers ref={ref} searchText={searchText} searchLabel={selectedLabel} />
				</Row>
			</Space>
		</Modal>
	);
}
export default observer(CreateGroup);
