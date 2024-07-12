import { SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Col, Input, Row, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/stores';

function SearchBar() {
    const {
        appStore: { $$},
        chatStore: {toggleCreateGroup}
    } = useStores();
    return (
        <Row align='middle' justify='space-around' className='search-bar' gutter={12}>
            <Input prefix={<SearchOutlined />} placeholder={$$('search')} style={{ width: '75%' }} />
            <Tooltip title={$$('add-friend')} placement='bottom'>
                <UserAddOutlined style={{ fontSize: '1.2rem' }} className='hoverable-icon' onClick={() => console.log('djasdklasjkl')} />
            </Tooltip>
            <Tooltip title={$$('create-group-chat')} placement='bottom'>
                <UsergroupAddOutlined style={{ fontSize: '1.2rem' }} className='hoverable-icon' onClick={toggleCreateGroup} />
            </Tooltip>
        </Row>
    );
}

export default observer(SearchBar);
