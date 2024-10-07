import React, { useState } from 'react';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { HeartOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import ListReaction from '../body/chat-item/ListReaction';

interface Props {
	id: string;
}
function Reaction(props: Props) {
	const {
		chatStore: { handleReaction, getMessage},
	} = useStores();
	const { id } = props;
	const [open, setOpen] = useState<boolean>(false);

	const onClickEmoji = (e: EmojiClickData) => handleReaction(id, e.unified);
	const message = getMessage(id);
	return (
		<>
			<Popover
				open={open}
				content={
					<div className='reaction-selector'>
						<EmojiPicker
							reactionsDefaultOpen
							emojiStyle={EmojiStyle.APPLE}
							onReactionClick={onClickEmoji}
							onEmojiClick={onClickEmoji}
						/>
					</div>
				}
				trigger={['click']}
				placement='bottom'
				arrow={false}
				destroyTooltipOnHide
				overlayInnerStyle={{ padding: 4, borderRadius: 30 }}
				onOpenChange={(e) => setOpen(e)}
			>
				<HeartOutlined className='reaction-action' />
			</Popover>
			{message && message.logs.length > 0 && <ListReaction logs={message.logs} />}
		</>
	);
}

export default React.memo(observer(Reaction));
