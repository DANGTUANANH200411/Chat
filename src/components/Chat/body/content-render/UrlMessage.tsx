import { Row, Typography } from 'antd';
import { getLinkPreview } from 'link-preview-js';
import React, { useEffect, useState } from 'react';
import CustomImage from '../../../common/CustomImage';
import './style.css';
interface Props {
	id: string;
	url: string;
}
function UrlMessage(props: Props) {
	const { id, url } = props;

	const [viewData, setViewData] = useState<any>(undefined);
	useEffect(() => {
		const existData = sessionStorage.getItem(url);
		if (existData) {
			setViewData(JSON.parse(existData));
		} else {
			getLinkPreview(url, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': 'true',
				},
			}).then((result: any) => {
				const params = {
					url: result.url,
					title: result.title,
					image: result.images && result.images.length ? result.images[0] : result.favicons[0],
					description: result.description,
					mediaType: result.mediaType,
				};
				sessionStorage.setItem(url, JSON.stringify(params));
				setViewData(params);
			});
		}
	}, [url]);

	useEffect(() => {
		if (!viewData) return;
		document.getElementById(id)!.classList.add('short');
	}, [viewData]);

	return !viewData || viewData.mediaType === 'image' ? (
		<a href={url} target='_blank'>
			{url}
		</a>
	) : (
		<Row
			className='preview-link-wrapper'
			onClick={(e) => {
				e.preventDefault();
				window.open(viewData.url ?? url, '_blank');
			}}
		>
			<CustomImage src={viewData.image} style={{ width: '100%' }} />
			<Row className='flex-grow' style={{ padding: 4, marginBottom: 8 }}>
				<Typography.Text strong ellipsis className='preview-title'>
					{viewData.title}
				</Typography.Text>
				<Typography.Paragraph type='secondary' ellipsis={{ rows: 4 }} style={{ margin: 0 }}>
					{viewData.description}
				</Typography.Paragraph>
			</Row>
		</Row>
	);
}

export default React.memo(UrlMessage);
