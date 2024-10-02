import { Row } from 'antd';
import { useStores } from '../../../stores/stores';
import { useEffect } from 'react';
import React from 'react';

interface Props {
    searchText: string
    setText: React.Dispatch<React.SetStateAction<string>>
}
function PreviewGIF(props: Props) {
	const {
		chatStore: { listGIF, onSearchGIF, onSendMessage},
	} = useStores();

    const {searchText, setText} = props;
    useEffect(() => {
        onSearchGIF(searchText);
    }, [searchText])
	return (
		<div className='preview-upload'>
			<Row >
				{listGIF.map((e) => (
					<img key={e.id} src={e.previewSrc} onClick={()=> {
                        onSendMessage(e.src, true);
                        setText("");
                    }} />
				))}
			</Row>
		</div>
	);
}

export default React.memo(PreviewGIF);
