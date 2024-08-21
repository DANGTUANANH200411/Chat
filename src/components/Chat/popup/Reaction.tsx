import React, { useState } from 'react';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
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
	
	const onClickEmoji = (e: EmojiClickData) => handleReaction(id, e.unified);
	return (
		<Popover
			open={open}
			content={
				<div className='reaction-selector'>
					<EmojiPicker reactionsDefaultOpen emojiStyle={EmojiStyle.FACEBOOK} onReactionClick={onClickEmoji} onEmojiClick={onClickEmoji} />
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
