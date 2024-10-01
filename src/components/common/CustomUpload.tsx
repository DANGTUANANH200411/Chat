import Dragger from 'antd/es/upload/Dragger';
import './style.css';
interface Props {
	dragging: boolean;
	children?: React.ReactNode;
}
function CustomUpload(props: Props) {
	const { dragging, children } = props;
	return (
		<Dragger
			name='file'
			multiple
			listType='picture'
			className='custom-upload'
			openFileDialogOnClick={false}
			style={{
				height: '100%',
				position: 'absolute',
				zIndex: 1,
				backgroundColor: '#0088ff57',
				borderRadius: 'unset',
				visibility: dragging ? 'visible' : 'hidden',
			}}
		>
			{children}
		</Dragger>
	);
}

export default CustomUpload;
