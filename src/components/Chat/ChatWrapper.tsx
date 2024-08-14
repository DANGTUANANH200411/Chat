import { Row } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import ChatHeader from './header/ChatHeader';
import './style.css';
import ChatBody from './body/ChatBody';
import ChatFooter from './footer/ChatFooter';
import ModalReactionLog from './modal/ModalReactionLog';
import Reaction from './popup/Reaction';
function ChatWrapper() {
    const {
        chatStore
    } = useStores();
    const {activeRoom} = chatStore;
    return activeRoom ? (
        <>
            <div className='max-height'>
                <ChatHeader />
                <div className='chat-view'>
                    <ChatBody />
                    <ChatFooter />
                </div>
            </div>
            <ModalReactionLog/>
            {/* <Reaction/> */}
        </>
        ) : (
        <Row>WELLCOME TO MY CHAT APP</Row>
    );
}

export default observer(ChatWrapper);
