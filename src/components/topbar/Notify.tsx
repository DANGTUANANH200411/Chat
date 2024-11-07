import { MessageFilled } from '@ant-design/icons';
import { Badge } from 'antd';
import '../style.css';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../stores/stores';

function Notify() {
    const {chatStore: {TotalUnread}} = useStores();
    return (
        <Badge count={TotalUnread} size='small' offset={[-5, 5]}>
            <MessageFilled className='side-bar-icon' />
        </Badge>
    );
}

export default React.memo(observer(Notify));
