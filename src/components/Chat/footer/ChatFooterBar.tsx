import { FileImageOutlined, FontSizeOutlined, IdcardOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Row } from "antd";
import React from "react";

interface Props {
	uploadInputRef: React.RefObject<HTMLInputElement>
}
function ChatFooterBar(props: Props) {
	const {uploadInputRef} = props;

	return (
		<Row className='chat-footer-bar max-width' align='middle'>
			{/* <FileImageOutlined onClick={()=> {
				if(!uploadInputRef.current) return;
				uploadInputRef.current.accept = "image/*";
				uploadInputRef.current.click()
			}}/> */}
			<PaperClipOutlined className="hoverable-icon" onClick={()=> {
				if(!uploadInputRef.current) return;
				uploadInputRef.current.accept = "";
				uploadInputRef.current.click()
			}}/>
			<IdcardOutlined className="hoverable-icon" onClick={() => {}} />
		</Row>
	);
}

export default React.memo(ChatFooterBar)
