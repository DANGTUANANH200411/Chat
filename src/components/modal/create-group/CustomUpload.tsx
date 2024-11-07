import { CameraOutlined } from '@ant-design/icons';
import { GetProp, message, Upload, UploadFile, UploadProps } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

export interface UploadRef {
	file: UploadFile | undefined;
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const CustomUpload = forwardRef(function CustomUpload({}, ref: React.ForwardedRef<UploadRef>) {
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	useImperativeHandle(ref, () => ({
		file: fileList[0]
	}));
	
	const beforeUpload = (file: FileType) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	};
	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type='button'>
			<CameraOutlined />
		</button>
	);
    const dummyRequest = ({ file, onSuccess }: any) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };
	return (
		<Upload
			name='avatar'
            customRequest={dummyRequest}
			listType='picture-circle'
			className='avatar-uploader'
			beforeUpload={beforeUpload}
			fileList={fileList}
			onChange={({fileList})=> setFileList(fileList)}
		>
			{!fileList.length && uploadButton} 
		</Upload>
	);
})
export default CustomUpload;
