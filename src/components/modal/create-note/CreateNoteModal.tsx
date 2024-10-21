import { Checkbox, Flex, Input, Modal, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useStores } from '../../../stores/stores';

function CreateNoteModal() {
	const {
		appStore: { $$, openCreateNote, toggleCreateNote },
		chatStore: {createNote},
	} = useStores();

	const [pin, setPin] = useState<boolean>(false);
	const [content, setContent] = useState<string>('');
    
    const onClose = () => {
        toggleCreateNote();
        setPin(false);
        setContent('');
    }
	return (
		<Modal
			centered
			destroyOnClose
			open={openCreateNote}
			title={$$('create-note')}
			okText={$$('create')}
			onOk={async () => {
                const res = await createNote(content.trim(), pin);
				res && onClose();
			}}
			onCancel={onClose}
		>
			<Flex vertical gap={12}>
				<div>
					<Typography.Text strong ellipsis>
						{$$('content')}
					</Typography.Text>
					<Input.TextArea
						showCount
						rows={10}
                        value={content}
						maxLength={500}
						style={{ resize: 'none' }}
						placeholder={$$('placeholder-create-note')}
                        onChange={(e) => setContent(e.target.value)}
					></Input.TextArea>
				</div>
				<Checkbox checked={pin} onChange={(e) => setPin(e.target.checked)}>
					{$$('pin-to-top-converse')}
				</Checkbox>
			</Flex>
		</Modal>
	);
}

export default React.memo(observer(CreateNoteModal));
