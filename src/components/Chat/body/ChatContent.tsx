import { isImage, isUrl } from '../../../utils/helper';
import React from 'react';
import { Attachment } from '../../../utils/type';
import FileMessage from './content-render/FileMessage';
import UrlMessage from './content-render/UrlMessage';
import TextMessage from './content-render/TextMessage';
interface Props {
	isFile: boolean;
	content: string;
	deleted: boolean;
	fileSize?: number;
	data?: any;
	attachment?: Attachment[];
}
function ChatContent(props: Props) {
	const { content, deleted, isFile, fileSize, attachment, data } = props;
	
	if (deleted) {
		return <>Deleted message</>;
	} else if (isFile) {
		return <FileMessage content={content} fileSize={fileSize} data={data} />;
	} else if (isUrl(content) && !isImage(content)) {
		return <UrlMessage content={content} />;
	} else return <TextMessage content={content} attachment={attachment} />;
}
export default React.memo(ChatContent);
