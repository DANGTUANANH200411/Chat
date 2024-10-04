import { Row, Typography } from 'antd';
import { getLinkPreview } from 'link-preview-js';
import React, { useEffect, useMemo, useState } from 'react';
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
			setViewData(JSON.parse(existData))
		} else {
			getLinkPreview(url).then((result: any) => {
				const params = {
					url: result.url,
					title: result.title,
					image: result.images[0] ?? result.favicons[0],
					description: result.description,
				}
				sessionStorage.setItem(url, JSON.stringify(params))
				setViewData(params)
			});
		}
	}, [url]);

	useEffect(() => {
		if (!viewData) return;
		document.getElementById(id)!.classList.add('short');
	}, [viewData]);

	return !viewData ? (
		<a href={url} target='_blank'>
			{url}
		</a>
	) : (
		<Row
			className='preview-link-wrapper'
			onClick={(e) => {
				e.preventDefault();
				window.open(viewData.url, '_blank');
			}}
		>
			<img src={viewData.image} width={'100%'} />
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
