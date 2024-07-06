import { Dropdown, MenuProps, Space } from 'antd';
import EN from '../../resources/EN.svg';
import VN from '../../resources/VN.svg';
import { useStores } from '../../stores/stores';

function Language() {
    const {
        appStore: { lang, setLang },
    } = useStores();
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'English',
            icon: <img className='lang-img' src={EN} />,
            onClick: () => setLang('en'),
        },
        {
            key: '2',
            label: 'Tiếng Việt',
            icon: <img className='lang-img' src={VN} />,
            onClick: () => setLang('vi'),
        },
    ];
    const renderFlag = () => {
        switch (lang) {
            case 'vi':
                return VN;
            default:
                return EN;
        }
    };
    return (
        <Dropdown menu={{ items }} placement='bottom'>
            <a onClick={(e) => e.preventDefault()}>
                <img className='lang-img' src={renderFlag()} />
            </a>
        </Dropdown>
    );
}

export default Language;
