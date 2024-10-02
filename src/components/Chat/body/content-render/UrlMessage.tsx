import { Row, Typography } from 'antd';
import { getLinkPreview } from 'link-preview-js';
import React, { useEffect, useMemo, useState } from 'react';
import './style.css'
interface Props {
	id: string;
	content: string;
}
function UrlMessage(props: Props) {
	const { id, content } = props;

	const [viewData, setViewData] = useState<any>(undefined);
	useEffect(() => {
		getLinkPreview(content).then((result: any) => setViewData(result));
	}, [content]);

	useEffect(() => {
		if (!viewData) return;
		document.getElementById(id)!.classList.add('short')
	}, [viewData])
	
	return !viewData ? (
		<a href={content} target='_blank'>
			{content}
		</a>
	) : (
		<Row className='preview-link-wrapper' onClick={() => window.open(viewData.url, '_blank')}>
			<img src={viewData.images[0] ?? viewData.favicons[0]} width={'100%'}/>
			<Row className='flex-grow' style={{padding: 4}}>
				<Typography.Text strong ellipsis className='preview-title'>{viewData.title}</Typography.Text>
				<Typography.Paragraph type='secondary' ellipsis={{rows: 4}} >{viewData.description}</Typography.Paragraph>
			</Row>
		</Row>
	);

}

export default React.memo(UrlMessage);
