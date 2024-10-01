import { FileImageOutlined, FontSizeOutlined, IdcardOutlined, LinkOutlined } from "@ant-design/icons";

interface Props {
    onEmoji: (e: any)=> void;
}
export default function ChatFooterBar(props:Props) {
	return (
		<>
			<FileImageOutlined />
			<LinkOutlined />
			<IdcardOutlined onClick={() => {}} />
			<FontSizeOutlined />
		</>
	);
}
