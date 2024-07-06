import { IdcardOutlined, LikeFilled, LikeOutlined, SendOutlined } from '@ant-design/icons';
import { Input, Row } from 'antd';
import sticker from '../../../resources/sticker.svg';
import image from '../../../resources/image.svg';
import attach from '../../../resources/attach.svg';
import format from '../../../resources/format.svg';
function ChatFooter() {
    return (
        <Row className='chat-footer'>
            <Row className='chat-footer-bar max-width' align='middle'>
                <img onClick={() => {}} src={sticker} />
                <img onClick={() => {}} src={image} />
                <img onClick={() => {}} src={attach} />
                <IdcardOutlined onClick={() => {}} />
                <img onClick={() => {}} src={format} />
            </Row>
            <Input.TextArea className='chat-footer-input max-width' autoSize={{ minRows: 1, maxRows: 6 }} size='large' rows={4} />
            <div className='chat-footer-input-action'>
                <LikeFilled />
                <SendOutlined />
            </div>
        </Row>
    );
}

export default ChatFooter;
