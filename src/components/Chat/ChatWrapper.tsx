import { Row } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import ChatHeader from './header/ChatHeader';
import './style.css';
import ChatBody from './body/ChatBody';
import ChatFooter from './footer/ChatFooter';
import ModalReactionLog from './modal/ModalReactionLog';
import Reaction from './popup/Reaction';
import { useEffect } from 'react';
function ChatWrapper() {
    const {
        chatStore
    } = useStores();
    const {activeRoom} = chatStore;
    useEffect(()=> {
        function onClickMention(e:MouseEvent) {
            const target = (e.target) as HTMLElement;
            if (target.tagName === 'a' && target.className?.includes('mention-member')) {
                console.log(target.dataset.id);
            }
        }
        document.addEventListener('click', onClickMention)
        return () => {
            document.removeEventListener('click', onClickMention)
        }
    }, [])
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
