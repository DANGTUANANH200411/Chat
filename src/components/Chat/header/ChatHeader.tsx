import { Avatar, Col, Dropdown, Row, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { SearchOutlined, TagFilled, TagTwoTone, UnorderedListOutlined, UsergroupAddOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { LabelMenu } from '../../common/LabelMenu';
import GroupAvatar from '../../common/GroupAvata';

function ChatHeader() {
    const {
        chatStore,
        appStore: { $$ },
    } = useStores();
    const { Room } = chatStore;
    if (!Room) return <></>;
    const { name, isGroup } = Room;
    return (
        <Row className='chat-header' align='middle'>
            <Col span={2} className='max-height'>
                <Row justify='center' align='middle' className='max-height'>
                    {isGroup ? <GroupAvatar /> : <Avatar></Avatar>}
                </Row>
            </Col>
            <Col span={19}>
                <Row>
                    <span className='text-ellipsis text-primary' style={{ fontWeight: 500 }}>
                        {name}
                    </span>
                </Row>
                <Row align='bottom' className='text-secondary'>
                    <UserOutlined />
                    <span style={{ fontSize: '1rem', borderRight: '1px solid black', padding: '0 .4rem' }}>{`${Room.members.length} ${$$('members')}`}</span>
                    <Dropdown trigger={['click']} menu={{ items: LabelMenu() }} destroyPopupOnHide>
                        <TagFilled rotate={45} className='hover-change-color' />
                    </Dropdown>
                </Row>
            </Col>
            <Col span={3}>
                <Row justify='space-around'>
                    <UsergroupAddOutlined className='hoverable-icon' title={$$('add-friends-to-group')} onClick={() => console.log('djasdklasjkl')} />
                    <SearchOutlined className='hoverable-icon' title={$$('search-message')} onClick={() => console.log('djasdklasjkl')} />
                    <VideoCameraOutlined className='hoverable-icon' title={$$('video-call')} onClick={() => console.log('djasdklasjkl')} />
                    <UnorderedListOutlined className='hoverable-icon' title={$$('room-info')} onClick={() => console.log('djasdklasjkl')} />
                </Row>
            </Col>
        </Row>
    );
}

export default observer(ChatHeader);
