import { Flex, Typography } from 'antd';
import React, { useMemo } from 'react';
import { Message } from '../../../../utils/type';
import Member from '../../../common/Member';
import { observer } from 'mobx-react';
import { useStores } from '../../../../stores/stores';
import { decodeHtml, isImage } from '../../../../utils/helper';
import BoardDropdown from '../BoardDropdown';

interface Props {
	message: Message;
}
function PinnedItems(props: Props) {
	const {
		appStore: { $$, getUserById, getUserName },
	} = useStores();
	const { message } = props;

	const { sender } = message;

	const user = useMemo(() => getUserById(sender), [sender, getUserById]);

	const displayContent = useMemo(() => {
		if (!message) return '';

		if (message.isFile) {
			return `[${$$(isImage(message.content) ? 'image' : 'file')}]`;
		}

		if (message.isNameCard) {
			return `[${$$('namecard')}] ${getUserName(message.content)}`;
		}

		return decodeHtml(message.content);
	}, [message, $$]);
	return (
		<div className='pinned-item-wrapper'>
			<Flex gap={8} align='center'>
				{user && <Member showSymbol user={user} suffix={<BoardDropdown message={message} />} />}
			</Flex>
			<Flex vertical className='preview-message'>
				<Typography.Text strong ellipsis>
					{getUserName(sender)}
				</Typography.Text>
				<Typography.Paragraph
					className='max-width'
					style={{ margin: 0, whiteSpace: 'break-spaces' }}
					ellipsis={{ rows: 2, expandable: 'collapsible' }}
				>
					{displayContent}
				</Typography.Paragraph>
			</Flex>
		</div>
	);
}

export default React.memo(observer(PinnedItems));
