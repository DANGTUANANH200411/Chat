import React, { useState } from 'react';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react';
import EmojiPicker from 'emoji-picker-react';
import { HeartOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

interface Props {
	id: string;
}
function Reaction(props: Props) {
	const {
		chatStore: { handleReaction },
	} = useStores();
	const { id } = props;
	const [open, setOpen] = useState<boolean>(false)
	return (
		<Popover
			open={open}
			content={
				<div className='reaction-selector'>
					<EmojiPicker reactionsDefaultOpen onReactionClick={(e) => console.log(e)} onEmojiClick={(e) => {}} />
				</div>
			}
			trigger={['click']}
			placement='bottom'
			arrow={false}
			destroyTooltipOnHide
			overlayInnerStyle={{ padding: 4, borderRadius: 30 }}
			onOpenChange={(e)=> setOpen(e)}
		>
			<HeartOutlined className='reaction-action' />
		</Popover>
	);
}

export default React.memo(observer(Reaction));
