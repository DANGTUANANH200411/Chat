import { MoonFilled, MoonOutlined } from '@ant-design/icons';
import '../style.css';
import { useStores } from '../../stores/stores';
import { observer } from 'mobx-react';

function SwitchTheme() {
    const { appStore } = useStores();
    const { DarkTheme, toggleDarkTheme } = appStore;

    return DarkTheme ? (
        <MoonFilled className='side-bar-icon' onClick={toggleDarkTheme} style={{ color: 'yellow' }} />
    ) : (
        <MoonOutlined className='side-bar-icon' onClick={toggleDarkTheme} />
    );
}

export default observer(SwitchTheme);
