import { Image, Row, Typography } from 'antd';
import filesize from 'filesize';
import { getFileIcon, isImage, isUrl, mentionRegex, urlRegx, uuidRegx } from '../../../utils/helper';
import React, { useMemo } from 'react';
interface Props {
	isFile: boolean;
	content: string;
	fileSize?: number;
}
function ChatContent(props: Props) {
	const { content, isFile, fileSize } = props;
	const listSrc: string[] = [];
	const renderContent = () => {
		if (isFile) {
			if (isImage(content)) {
				return <Image src={content} style={{ maxHeight: 200, padding: 2 }}></Image>;
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
		} else if (isUrl(content)) {
			const ytbRegx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
			let match = content.match(ytbRegx);
			if (match && match[2].length == 11) {
				return (
					<iframe
						src={`https://www.youtube.com/embed/${match[2]}?autoplay=0`}
						title='Youtube Video'
						allowFullScreen
					></iframe>
				);
			}
		}
		const replacer = (matchString: string) => {
			const name = matchString.substring(matchString.indexOf('[') + 1, matchString.indexOf(']'));
			const mGuid = matchString.match(uuidRegx);
			let id = '';
			if (mGuid) id = mGuid[0];
			return `<a data-id="${id})" class="mention-member">${name}</a>`;
		};

		const urlReplacer = (matchString: string) => {
			if (isImage(matchString)) {
				listSrc.push(matchString);
			}
			return `<a href="${matchString}" target="_blank">${matchString}</a>`;
		};

		const parseContent = () => {
			let str = content;
			str = str.replaceAll(
				'http://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72',
				'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64'
			);
			str = str.replace(urlRegx, urlReplacer);
			return str.replace(mentionRegex, replacer);
		};

		return (
			<Typography.Text
				className='text-primary'
				style={{
					whiteSpace: 'pre-wrap',
					direction: 'ltr',
					fontSize: 16,
				}}
			>
				<div dangerouslySetInnerHTML={{ __html: parseContent() }}></div>
				{listSrc.length === 1 && <Image src={listSrc[0]} style={{ maxHeight: 200, padding: 2 }}></Image>}
			</Typography.Text>
		);
	};
	return <Row>{renderContent()}</Row>;
}
export default React.memo(ChatContent);
