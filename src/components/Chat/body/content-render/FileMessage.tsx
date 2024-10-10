import React from 'react';
import { getFileIcon, isImage } from '../../../../utils/helper';
import { Row, Typography } from 'antd';
import filesize from 'filesize';
import CustomImage from '../../../common/CustomImage';

interface Props {
	content: string;
	fileSize?: number;
	data?: any;
	imgStyle?: React.CSSProperties;
}
function FileMessage(props: Props) {
	const { content, fileSize, data, imgStyle } = props;
	if (isImage(content)) {
		return (
			<CustomImage
				antd
				src={data ?? content}
				style={{ maxHeight: '40vh', padding: 2, ...imgStyle }}
				className='image-message'
			/>
		);
	}
	return (
		<Row align='middle'>
			<img
				src={getFileIcon(content.split('.').pop()?.toLocaleLowerCase())}
				alt='file-icon'
				style={{ width: '2rem', height: '2rem', marginRight: '.4rem' }}
			/>
			<Row className='flex-grow'>
				<Row>
					<Typography.Link ellipsis download>
						{content}
					</Typography.Link>
				</Row>
				<Row>
					<Typography.Text type='secondary' className='text-small'>
						{filesize(fileSize ?? 0)}
					</Typography.Text>
				</Row>
			</Row>
		</Row>
	);
}

function propsAreEquals(prev: Props, next: Props) {
	return prev.content === next.content && prev.fileSize === next.fileSize && prev.data === next.data;
}
export default React.memo(FileMessage, propsAreEquals);
