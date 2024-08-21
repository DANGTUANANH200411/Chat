import { FileImageOutlined, FontSizeOutlined, IdcardOutlined, LinkOutlined, SmileOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

interface Props {
    onEmoji: (e: any)=> void;
}
export default function ChatFooterBar(props:Props) {
	return (
		<>
			<Popover
				trigger={['click']}
				destroyTooltipOnHide
				content={
					<EmojiPicker
						emojiStyle={EmojiStyle.FACEBOOK}
						onEmojiClick={(e) => {
							props.onEmoji(e.emoji);
						}}
					/>
				}
			>
				<SmileOutlined />
			</Popover>
			<FileImageOutlined />
			<LinkOutlined />
			<IdcardOutlined onClick={() => {}} />
			<FontSizeOutlined />
		</>
	);
}
