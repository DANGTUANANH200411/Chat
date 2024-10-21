import { CaretLeftOutlined } from '@ant-design/icons';
import { Row, Tabs, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../../stores/stores';
import FileTab from './tabs/FileTab';
import LinkTab from './tabs/LinkTab';
import PhotoTab from './tabs/PhotoTab';
import SelectingBar from './tabs/components/SelectingBar';
import { StorageType } from '../../../utils/type';

function RoomStorage() {
	const {
		appStore: { $$, setDrawerOpen },
		chatStore: {
			storageTab,
			setStorageTab,
			storageSelect: { selecting },
			setStorageSelect,
			clearStorageSelect,
		},
	} = useStores();

	useEffect(() => {
		return () => {
			clearStorageSelect();
		};
	}, []);

	return (
		<>
			<Row className='header' justify='center' align='middle'>
				<CaretLeftOutlined
					className='header-button-left hoverable-icon'
					onClick={() => setDrawerOpen('Info')}
				/>
				<Typography.Text strong ellipsis>
					{$$('media-storage')}
				</Typography.Text>
				<div
					className='header-button-right'
					onClick={() => (selecting ? clearStorageSelect() : setStorageSelect({ selecting: !selecting }))}
				>
					{$$(selecting ? 'cancel' : 'select')}
				</div>
			</Row>
			<div className='body'>
				<Tabs
					className='storage-tabs'
					activeKey={storageTab}
					onChange={(key) => {
						setStorageTab(key as StorageType);
						clearStorageSelect();
					}}
				>
					<Tabs.TabPane tab='Photos/Videos' key='Photo'>
						<PhotoTab />
					</Tabs.TabPane>
					<Tabs.TabPane tab='Files' key='File'>
						<FileTab />
					</Tabs.TabPane>
					<Tabs.TabPane tab='Links' key='Link'>
						<LinkTab />
					</Tabs.TabPane>
				</Tabs>
				{selecting && <SelectingBar type={storageTab} />}
			</div>
		</>
	);
}

export default React.memo(observer(RoomStorage));
