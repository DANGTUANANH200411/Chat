import { Avatar, Row } from 'antd';
import './style.css';
function GroupAvatar() {
    return (
        <div className='max-height custom-group-avt'>
            <img src='https://th.bing.com/th/id/OIP.QZIRZKUSWt1HBifjDRKGzAHaFj?w=193&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' className='child-avt' />
            <img
                src='https://th.bing.com/th?q=Avatar+Icon.png&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247'
                className='child-avt'
            />
            <img
                src='https://th.bing.com/th?q=Avatar+Icon.png&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247'
                className='child-avt'
            />
            <Avatar className='child-avt' style={{ backgroundColor: 'var(--primary-color)' }}>
                +2
            </Avatar>
        </div>
    );
}
export default GroupAvatar;
