import { observer } from 'mobx-react';
import '../style.css';
import SearchBar from './SearchBar';
import MenuTab from './MenuTab';
import PreviewChatWrapper from './preview-chat/PreviewChatWrapper';
function LeftMenu() {
    return (
        <div className='left-menu'>
            <div style={{ height: '10%' }}>
                <SearchBar />
                <MenuTab />
            </div>
            <div className='preview-chat-wrapper' style={{ height: '90%' }}>
                <PreviewChatWrapper />
            </div>
        </div>
    );
}

export default observer(LeftMenu);
