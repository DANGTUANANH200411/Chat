import { Col, Row } from 'antd';
import LeftMenu from './left-menu/LeftMenu';
import './style.css';
import ChatWrapper from './Chat/ChatWrapper';
import TopBar from './topbar/TopBar';
import { useStores } from '../stores/stores';
import { observer } from 'mobx-react';

function Main() {
    
    return (
        <Row className='main'>
            <Col span={1}>
                <TopBar />
            </Col>
            <LeftMenu />
            <Col className='chat-wrapper'>
                <ChatWrapper />
            </Col>
        </Row>
    );
}

export default observer(Main);
