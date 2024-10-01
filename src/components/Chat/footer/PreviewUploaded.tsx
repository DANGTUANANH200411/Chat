import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Image, Row } from 'antd';
import React from 'react';
import { isImage } from '../../../utils/helper';

interface Props {
	uploaded: any[];
	setUploaded: React.Dispatch<React.SetStateAction<any[]>>;
}
function PreviewUploaded(props: Props) {
	const { uploaded, setUploaded } = props;
    console.log(uploaded)
	return !uploaded.length ? <></> : (
		<Row className='preview-upload' justify="space-between">
			<div>
				<Image.PreviewGroup>
					{uploaded.map((e, idx) => {
                        if(isImage(e.name)) {
                            return <Image key={idx} src={e.data} height={'5vh'} />;
                        }
                        return <></>
                    })}
				</Image.PreviewGroup>
			</div>
            <CloseOutlined className='text-secondary hoverable-icon' onClick={()=> setUploaded([])}/>
		</Row>
	);
}
function propsAreEquals(prev: Props, next: Props) {
	return prev.uploaded.length === next.uploaded.length;
}
export default React.memo(PreviewUploaded, propsAreEquals);
