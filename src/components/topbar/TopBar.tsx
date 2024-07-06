import { Col, Row, Space } from 'antd';
import Setting from './Setting';
import SwitchTheme from './SwitchTheme';
import Notify from './Notify';
import Language from './Language';
import '../style.css';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
function TopBar() {
    const {
        appStore: { $$ },
    } = useStores();
    return (
        <Row className='top-bar' justify='space-between' align='middle'>
            <Col span={4}>
                <h3>CHAT</h3>
            </Col>
            <Col lg={4} md={6} className='top-bar-control'>
                <Row align='middle' justify='space-around'>
                    <Language />
                    <span style={{ fontSize: '1rem' }}>{`${$$('hi')}, MK04`}</span>
                    <Notify />
                    <SwitchTheme />
                    <Setting />
                </Row>
            </Col>
        </Row>
    );
}

export default observer(TopBar);
