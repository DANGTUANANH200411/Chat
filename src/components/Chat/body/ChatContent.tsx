import { isImage, isUrl } from '../../../utils/helper';
import React from 'react';
import { Attachment } from '../../../utils/type';
import FileMessage from './content-render/FileMessage';
import UrlMessage from './content-render/UrlMessage';
import TextMessage from './content-render/TextMessage';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react';
interface Props {
	id: string;
	isFile: boolean;
	content: string;
	recalled: boolean;
	fileSize?: number;
	data?: any;
	attachment?: Attachment[];
}
function ChatContent(props: Props) {
	const {appStore: {$$}} = useStores();
	const { id, content, recalled, isFile, fileSize, attachment, data } = props;
	
	if (recalled) {
		return <>{$$('recalled-msg')}</>
	} else if (isFile) {
		return <FileMessage content={content} fileSize={fileSize} data={data} />;
	} else if (isUrl(content) && !isImage(content)) {
		return <UrlMessage id={id} content={content} />;
	} else {
		return <TextMessage content={content} attachment={attachment} />;
	}
}
export default React.memo(observer(ChatContent));
