import { Modal } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../../stores/stores';
import SelectShare from './components/SelectShare';
import './style.css';
function ShareModal() {
	const {
		appStore: { $$ },
		chatStore: {
			mdlShareProps: { open },
            forwardMessage,
			toggleShareModal,
		},
	} = useStores();

	const [selected, setSelected] = useState<Set<string>>(new Set());
	
    useEffect(() => {
        setSelected(new Set());
    }, [open])
    return (
		<Modal
			title={$$('share')}
			className='mdlShare'
			centered
			open={open}
			onOk={() => {
                forwardMessage(Array.from(selected));
                toggleShareModal();
            }}
			onCancel={() => toggleShareModal()}
		>
			<SelectShare selected={selected} setSelected={setSelected} />
		</Modal>
	);
}

export default React.memo(observer(ShareModal));
