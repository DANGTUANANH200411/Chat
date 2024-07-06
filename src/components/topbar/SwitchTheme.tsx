import { MoonFilled, MoonOutlined } from '@ant-design/icons';
import '../style.css';
import { useStores } from '../../stores/stores';
import { observer } from 'mobx-react';

function SwitchTheme() {
    const { appStore } = useStores();
    const { DarkTheme, toggleDarkTheme } = appStore;

    return DarkTheme ? (
        <MoonFilled className='top-bar-icon' onClick={toggleDarkTheme} style={{ color: 'yellow' }} />
    ) : (
        <MoonOutlined className='top-bar-icon' onClick={toggleDarkTheme} />
    );
}

export default observer(SwitchTheme);
