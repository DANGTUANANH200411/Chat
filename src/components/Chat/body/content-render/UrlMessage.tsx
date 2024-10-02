import React from 'react';

interface Props {
	content: string;
}
function UrlMessage(props: Props) {
	const { content } = props;
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
    return <a href={content} target='_blank'>{content}</a>
}

export default React.memo(UrlMessage);
