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
			centered
			open={open}
			destroyOnClose
			title={$$('share')}
			className='mdlShare'
			onOk={() => {
                forwardMessage(Array.from(selected));
                toggleShareModal();
            }}
			onCancel={() => toggleShareModal()}
			okButtonProps={{
				disabled: !selected.size
			}}
		>
			<SelectShare selected={selected} setSelected={setSelected} />
		</Modal>
	);
}

export default React.memo(observer(ShareModal));
