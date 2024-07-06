import { Col, Row } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import ChatHeader from './header/ChatHeader';
import './style.css';
import ChatBody from './body/ChatBody';
import ChatFooter from './footer/ChatFooter';
function ChatWrapper() {
    const {
        chatStore: { activeRoom },
    } = useStores();
    return activeRoom ? (
        <div className='max-height'>
            <ChatHeader />
            <div className='chat-view'>
                <ChatBody />
                <ChatFooter />
            </div>
        </div>
    ) : (
        <Row>WELLCOME TO MY CHAT APP</Row>
    );
}

export default observer(ChatWrapper);
