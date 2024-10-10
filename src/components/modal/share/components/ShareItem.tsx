import { ContactsOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../../stores/stores';
import { Message } from '../../../../utils/type';
import FileMessage from '../../../Chat/body/content-render/FileMessage';
import UserAvatar from '../../../common/UserAvatar';

function ShareItem(props: Message) {
	const {
		appStore: { $$, getUserById },
	} = useStores();
	const { content, isFile, fileSize, data, isNameCard } = props;

	if (isFile) {
		return (
			<Flex className='share-item'>
				<FileMessage content={content} fileSize={fileSize} data={data} />
			</Flex>
		);
	} else if (isNameCard) {
		const user = getUserById(content);
		return (
			<Flex vertical className='share-item'>
				<Typography.Text strong ellipsis>
					Forward namecard
				</Typography.Text>
				<Flex gap={8}>
					<UserAvatar id={content} />
					<Flex vertical>
						<Typography.Text strong>{user?.userName}</Typography.Text>
						<Typography.Text type='secondary' className='small-text text-secondary'>
							<ContactsOutlined className='text-secondary' /> {$$('namecard')}
						</Typography.Text>
					</Flex>
				</Flex>
			</Flex>
		);
	}
	return (
		<Flex vertical className='share-item max-width'>
			<Typography.Text strong ellipsis>
				Forward message
			</Typography.Text>
			<Typography.Text ellipsis>{content}</Typography.Text>
		</Flex>
	);
}

export default React.memo(observer(ShareItem));
