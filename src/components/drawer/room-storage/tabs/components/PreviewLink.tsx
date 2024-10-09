import { Flex, Row, Typography } from 'antd';
import { getLinkPreview } from 'link-preview-js';
import React, { useEffect, useState } from 'react';
import CustomImage from '../../../../common/CustomImage';
import TimeFromNow from '../../../../left-menu/preview-chat/TimeFromNow';

interface Props {
	id: string;
	url: string;
	sendDate?: string;
}
function PreviewLink(props: Props) {
	const { id, url, sendDate } = props;
	const [viewData, setViewData] = useState<any>(undefined);
	useEffect(() => {
		const existData = sessionStorage.getItem(url);
		if (existData) {
			setViewData(JSON.parse(existData));
		} else {
			getLinkPreview(url).then((result: any) => {
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

	if (!viewData) return <Typography.Link target='_blank'>{url}</Typography.Link>;
	return (
		<Row className='flex-grow' style={{ columnGap: 8 }}>
			<CustomImage src={viewData.image} style={{ width: '4rem' }} />
			<Row className='flex-grow'>
				<Typography.Text strong ellipsis>
					{viewData.title ?? viewData.url}
				</Typography.Text>
				<Row justify='space-between' wrap={false}>
					<Typography.Text type='secondary' ellipsis >
						{new URL(viewData.url).origin}
					</Typography.Text>
					<Typography.Text type='secondary' ellipsis >
						{sendDate && <TimeFromNow date={sendDate} />}
					</Typography.Text>
				</Row>
			</Row>
		</Row>
	);
}

export default React.memo(PreviewLink);
