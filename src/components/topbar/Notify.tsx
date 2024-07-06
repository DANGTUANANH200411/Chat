import { BellOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import '../style.css';
function Notify() {
    return (
        <Badge count={20} size='small'>
            <BellOutlined className='top-bar-icon' onClick={() => {}} />
        </Badge>
    );
}

export default Notify;
