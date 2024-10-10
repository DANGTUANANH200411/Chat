import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Col, Image, Row } from 'antd';
import React from 'react';
import { isImage } from '../../../utils/helper';
import { Attachment } from '../../../utils/type';
import FileMessage from '../body/content-render/FileMessage';

interface Props {
	uploaded: Attachment[];
	setUploaded: React.Dispatch<React.SetStateAction<Attachment[]>>;
}
function PreviewUploaded(props: Props) {
	const { uploaded, setUploaded } = props;
	return !uploaded.length ? (
		<></>
	) : (
		<Row className='preview-upload' justify='space-between'>
			<div>
				<Image.PreviewGroup>
					{uploaded.map((file, idx) => {
						return (
							<FileMessage
								key={idx}
								content={file.name}
								fileSize={file.size}
								data={file.data}
								imgStyle={{ height: '5vh' }}
							/>
						);
					})}
				</Image.PreviewGroup>
			</div>
			<CloseOutlined className='btn-clear circle btn' onClick={() => setUploaded([])} />
		</Row>
	);
}
function propsAreEquals(prev: Props, next: Props) {
	return prev.uploaded.length === next.uploaded.length;
}
export default React.memo(PreviewUploaded, propsAreEquals);
