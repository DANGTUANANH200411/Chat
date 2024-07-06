import { Col, Row } from 'antd';
import LeftMenu from './left-menu/LeftMenu';
import './style.css';
import ChatWrapper from './Chat/ChatWrapper';
function Main() {
    return (
        <Row className='main'>
            <Col span={5}>
                <LeftMenu />
            </Col>
            <Col span={19}>
                <ChatWrapper />
            </Col>
        </Row>
    );
}

export default Main;
