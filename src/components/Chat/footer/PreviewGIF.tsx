import { Col, Row } from 'antd';
import { useStores } from '../../../stores/stores';
import { useCallback, useEffect } from 'react';
import React from 'react';
import { observer } from 'mobx-react';

interface Props {
    searchText: string
    setText: React.Dispatch<React.SetStateAction<string>>
}
function PreviewGIF(props: Props) {
	const {
		chatStore: { listGIF, nextGIF, onSearchGIF, onSendMessage, resetGIF},
	} = useStores();

    const {searchText, setText} = props;
	useEffect(() => {
		return () => {
			resetGIF();
		};
	}, [])
	
    useEffect(() => {
        onSearchGIF(searchText);
    }, [searchText])

	const onScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const { scrollHeight, scrollTop, clientHeight } = e.target as HTMLElement;
		if (scrollHeight - scrollTop <= clientHeight) {
			onSearchGIF(searchText, nextGIF);
		}
	}, [searchText, nextGIF]);
	return (
		<div className='preview-upload' >
			<Row gutter={[4, 4]} onScroll={onScroll}>
				{listGIF.map((e) => (
					<Col key={e.id} >
					<img src={e.previewSrc} onClick={()=> {
                        onSendMessage(e.src, true);
                        setText("");
                    }} /></Col>
				))}
			</Row>
		</div>
	);
}

export default React.memo(observer(PreviewGIF));
