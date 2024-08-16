import { observer } from 'mobx-react';
import PreviewChatItem from './PreviewChatItem';
import { useStores } from '../../../stores/stores';
import React from 'react';

function PreviewChatWrapper() {
    const {
        chatStore: { Rooms, setActiveRoom },
    } = useStores();
    return (
        <>
            {Rooms.map((e) => (
                <PreviewChatItem key={e.id} {...e} onClick={() => setActiveRoom(e.id)} />
            ))}
        </>
    );
}

export default React.memo(observer(PreviewChatWrapper));
