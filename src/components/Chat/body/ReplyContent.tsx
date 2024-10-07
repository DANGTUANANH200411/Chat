import React, { useMemo } from 'react';
import { ReplyMessage } from '../../../utils/type';
import { Row, Typography } from 'antd';
import { useStores } from '../../../stores/stores';
import { getFileIcon, isImage } from '../../../utils/helper';
import { observer } from 'mobx-react';

interface Props {
	replyMessage: ReplyMessage;
	disableClick?: boolean;
}
function ReplyContent(props: Props) {
	const {
		appStore: { $$, getUserName },
		chatStore: { scrollToMessage },
	} = useStores();
	const { id, sender, content, isFile, data, isNameCard} = props.replyMessage;
	const previewSrc = useMemo(() => {
		if (data) {
			return data;
		} else {
			return isImage(content) ? content : getFileIcon(content.split('.').pop()?.toLocaleLowerCase());
		}
	}, [props.replyMessage]);
	const displayContent = () => {
		if (isImage(content)) {
			return `[${$$('image')}]`;
		} else if (isFile) {
			return `[File] ${content}`;
		} else if (isNameCard) {
			return `[${$$('namecard')}] ${getUserName(content)}`;
		} else return content;
	};
	return (
		<div className='reply-content' onClick={() => !props.disableClick && scrollToMessage(id)}>
			{isFile && previewSrc && <img src={previewSrc} alt='file-icon' style={{ width: '3rem', height: '3rem' }} />}
			<div>
				<Row>
					<Typography.Text strong ellipsis>
						{getUserName(sender)}
					</Typography.Text>
				</Row>
				<Row>
					<Typography.Text type='secondary' ellipsis>
						{displayContent()}
					</Typography.Text>
				</Row>
			</div>
		</div>
	);
}

export default React.memo(observer(ReplyContent));
