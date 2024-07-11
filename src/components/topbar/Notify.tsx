import { MessageFilled } from '@ant-design/icons';
import { Badge } from 'antd';
import '../style.css';
function Notify() {
    return (
        <Badge count={20} size='small' offset={[-5, 5]} color='red'>
            <MessageFilled className='side-bar-icon' onClick={() => {}} />
        </Badge>
    );
}

export default Notify;
