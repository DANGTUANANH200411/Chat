import { MoreOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Checkbox, Dropdown, Flex, Row } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../../../stores/stores';
import { downloadUrl } from '../../../../../utils/helper';
import { notify } from '../../../../../utils/notify';

interface Props {
	id: string;
	type: 'Photo' | 'File' | 'Link';
	url?: string;
	children: React.ReactNode;
}
function StorageItem(props: Props) {
	const {
		appStore: { $$ },
		chatStore: {
			storageSelect: { selecting, selected },
			setStorageSelect,
			onStorageItemSelect,
			onDeleteMessages,
			scrollToMessage,
			toggleShareModal,
			getMessage,
		},
	} = useStores();

	const { id, type, url, children } = props;

	const allItems: (ItemType & { tabs?: ('Link' | 'Photo' | 'File')[] })[] = [
		{
			key: 'copy',
			label: $$('copy'),
			onClick: () => {
				if (!url) return;
				navigator.clipboard.writeText(url);
				notify($$('copied'));
			},
			tabs: ['Link'],
		},
		{
			type: 'divider',
			tabs: ['Link'],
		},
		{
			key: 'forward',
			label: $$('forward'),
			onClick: () => {
				const msg = getMessage(id);
				toggleShareModal(msg ? [msg] : []);
			},
			tabs: ['Photo', 'Link'],
		},
		{
			key: 'select',
			label: $$(!selecting ? 'selects' : 'deselect'),
			onClick: () =>
				!selecting ? setStorageSelect({ selecting: true, selected: new Set([id]) }) : onStorageItemSelect(id),
		},
		{
			key: 'jump',
			label: $$('jump-to-msg'),
			onClick: () => scrollToMessage(id),
		},
		{
			key: 'open',
			label: $$('open-in-browser'),
			onClick: () => url && window.open(url, '_blank'),
			tabs: ['Link'],
		},
		{
			key: 'download',
			label: $$('download'),
			onClick: () => url && downloadUrl(url),
			tabs: ['Photo'],
		},
		{
			type: 'divider',
		},
		{
			key: 'delete',
			label: $$('delete-only-me'),
			danger: true,
			onClick: () => onDeleteMessages([id]),
		},
	];

	const items = allItems.filter((e) => !e.tabs || e.tabs.includes(type));
	return (
		<Row className='storage-item'>
			{selecting ? (
				type === 'Photo' ? (
					<>
						<Checkbox
							className='storage-item-checkbox'
							checked={selected.has(id)}
							onChange={() => onStorageItemSelect(id)}
						/>
						{children}
					</>
				) : (
					<>
						<Flex gap={8} className='max-width'>
							<Checkbox checked={selected.has(id)} onChange={() => onStorageItemSelect(id)} />
							{children}
						</Flex>
					</>
				)
			) : (
				<>{children}</>
			)}
			<Flex gap={8} className='storage-item-action'>
				<ShareAltOutlined className='storage-item-icon hoverable-icon' onClick={() => {
					const msg = getMessage(id);
					toggleShareModal(msg ? [msg] : []);
				}} />

				<Dropdown menu={{ items }} trigger={['click']} destroyPopupOnHide>
					<MoreOutlined rotate={90} className='storage-item-icon hoverable-icon' />
				</Dropdown>
			</Flex>
		</Row>
	);
}

export default React.memo(observer(StorageItem));
