import { SettingOutlined } from '@ant-design/icons';
import { ColorPicker, Drawer, Row } from 'antd';
import { useState } from 'react';
import '../style.css';

function Setting() {
    const [open, setOpen] = useState<boolean>(false);
    const toggleOpen = () => setOpen(!open);
    return (
        <>
            <SettingOutlined className='top-bar-icon' onClick={toggleOpen} />
            <Drawer title='Setting' open={open} onClose={toggleOpen}>
                <Row justify='space-between'>{/* <Typography.Text>Theme</Typography.Text> */}</Row>
                <ColorPicker
                    value={document.documentElement.style.getPropertyValue('--primary-color')}
                    onChange={(val, hex) => {
                        sessionStorage.setItem('--primary-color', hex);
                        document.documentElement.style.setProperty('--primary-color', hex);
                    }}
                />
            </Drawer>
        </>
    );
}

export default Setting;
