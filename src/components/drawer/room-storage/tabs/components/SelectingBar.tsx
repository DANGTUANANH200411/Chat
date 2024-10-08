import { CloseOutlined, DeleteOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Flex, Row, Typography } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../../../stores/stores';
import { downloadUrl } from '../../../../../utils/helper';
import { notify } from '../../../../../utils/notify';
import { StorageType } from '../../../../../utils/type';

interface Props {
	type: StorageType;
}
function SelectingBar(props: Props) {
	const {
		appStore: { $$ },
		chatStore,
	} = useStores();
	const { storageSelect, clearStorageSelect, onDeleteMessages, getMessage } = chatStore;
	const { selected } = storageSelect;
	const { type } = props;
	return (
		<Row className='selecting-bar' justify='space-between' align='middle'>
			<Flex align='center' gap={8} style={{ fontSize: 'large' }}>
				<span className='color-primary count'>{selected.size}</span>
				<Typography.Text ellipsis>
					{$$(type === 'Photo' ? 'image' : type === 'File' ? 'file' : 'link', { number: selected.size })}
				</Typography.Text>
			</Flex>
			<Flex gap={12}>
				<ShareAltOutlined
					className='circle btn'
					onClick={() => {
						notify('Incomming');
						clearStorageSelect();
					}}
				/>

				{type !== 'Link' && (
					<DownloadOutlined
						className='circle btn'
						onClick={() => {
							runInAction(() => {
								Array.from(selected).forEach((id) => {
									const message = getMessage(id);
									message && downloadUrl(message.content);
								});
								clearStorageSelect();
							});
						}}
					/>
				)}
				<DeleteOutlined
					className='circle btn danger'
					onClick={() => {
						onDeleteMessages(Array.from(selected));
						clearStorageSelect();
					}}
				/>
				<CloseOutlined className='circle btn' onClick={clearStorageSelect} />
			</Flex>
		</Row>
	);
}

export default React.memo(observer(SelectingBar));
