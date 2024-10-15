import React, { useState } from 'react';
import './style.css';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Image } from 'antd';

interface Props {
	previewSrc?: string;
	onRemove?: () => void;
	children: React.ReactNode;
	style?: React.CSSProperties;
}
function FileWrapper(props: Props) {
	const { previewSrc, children, style, onRemove } = props;
	const [preview, setPreview] = useState<string>('');
	return (
		<>
			<div
				style={{
					...style,
					maxWidth: '100%',
				}}
			>
				<div className='file-wrapper'>
					{children}
					<div className='file-mask'>
						<div className='file-mask-action'>
							{previewSrc && (
								<EyeOutlined style={{ color: '#efefef' }} onClick={() => setPreview(previewSrc)} />
							)}
							{onRemove && <DeleteOutlined style={{ color: 'red' }} onClick={() => onRemove()} />}
						</div>
					</div>
				</div>
			</div>
			{preview && (
				<Image
					src={preview}
					wrapperStyle={{ display: 'none' }}
					preview={{ visible: true, onVisibleChange: (visible) => !visible && setPreview('') }}
				/>
			)}
		</>
	);
}

export default React.memo(FileWrapper);
