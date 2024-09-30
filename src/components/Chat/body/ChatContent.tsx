import { Image, Row, Typography } from 'antd';
import ReactLinkify from 'react-linkify';
import filesize from 'filesize';
import { getFileIcon, isImage, mentionRegex, uuidRegx } from '../../../utils/helper';
import React, { useMemo } from 'react';
interface Props {
	isFile: boolean;
	content: string;
	fileSize?: number;
}
function ChatContent(props: Props) {
	const { content, isFile, fileSize } = props;
	const replacer = (matchString: string) => {
		const name = matchString.substring(matchString.indexOf('[') + 1, matchString.indexOf(']'));
		const mGuid = matchString.match(uuidRegx)
		let id = '';
		if (mGuid) id = mGuid[0];
		return `<a data-id="${id})" class="mention-member">${name}</a>`
	}
	const parsedContent = useMemo(()=> {
		let str = content;
		str = str.replaceAll('http://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72', 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64')
		return str.replace(mentionRegex, replacer)
	}, [content])
	const renderContent = () => {
		if (isFile) {
			if (isImage(content)) {
				return (
					<Image.PreviewGroup>
						{content.split(',').map((item, idx) => (
							<Image key={idx} src={item} style={{ maxHeight: 200, padding: 2 }}></Image>
						))}
					</Image.PreviewGroup>
				);
			}
			return (
				<Row align='middle'>
					<img
						src={getFileIcon(content.split('.').pop()?.toLocaleLowerCase())}
						alt='file-icon'
						style={{ width: '2rem', height: '2rem', marginRight: '.4rem' }}
					/>
					<div>
						<Row>
							<Typography.Link ellipsis download>
								{content}
							</Typography.Link>
						</Row>
						<Row>
							<Typography.Text type='secondary' className='text-small'>
								{filesize(fileSize ?? 0)}
							</Typography.Text>
						</Row>
					</div>
				</Row>
			);
		}
		
		return (
			<ReactLinkify
				componentDecorator={(href, text, key) => (
					<a target='_blank' href={href} key={key} download={'foo.txt'}>
						{text}
					</a>
				)}
			>
				<Typography.Text
					className='text-primary'
					style={{
						whiteSpace: 'pre-wrap',
						direction: 'ltr',
						fontSize: 16
					}}
				>
					<div dangerouslySetInnerHTML={{__html: parsedContent}}></div>
				</Typography.Text>
			</ReactLinkify>
		);
	};
	return <Row>{renderContent()}</Row>;
}
export default React.memo(ChatContent);
