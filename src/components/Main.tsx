import { Col, Row } from 'antd';
import LeftMenu from './left-menu/LeftMenu';
import './style.css';
import ChatWrapper from './Chat/ChatWrapper';
import TopBar from './topbar/TopBar';
function Main() {
    return (
        <Row className='main'>
            <Col span={1}>
                <TopBar />
            </Col>
            <Col span={5}>
                <LeftMenu />
            </Col>
            <Col span={18}>
                <ChatWrapper />
            </Col>
        </Row>
    );
}

export default Main;
