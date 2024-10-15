import { Skeleton, Image } from 'antd';
import React, { CSSProperties, useState } from 'react';

interface Props {
	src: string;
	antd?: true | boolean;
	style?: CSSProperties;
	className?: string;
}
function CustomImage(props: Props) {
	const { src, style, antd, className } = props;
	const [loading, setLoading] = useState<boolean>(true);
	return (
		<>
			{loading && <Skeleton.Image active style={style} />}
			{antd ? (
				<Image
					src={src}
					className={className}
					style={{ ...style, display: loading ? 'none' : style?.display ?? 'block' }}
					onLoad={() => {
						setLoading(false);
					}}
				/>
			) : (
				<img
					src={src}
					className={className}
					style={{ ...style, display: loading ? 'none' : style?.display ?? 'inline-block' }}
					onLoad={() => {
						setLoading(false);
					}}
				/>
			)}
		</>
	);
}

export default React.memo(CustomImage);
