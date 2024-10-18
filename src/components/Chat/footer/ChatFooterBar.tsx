import { FileImageOutlined, IdcardOutlined, PaperClipOutlined, ProjectOutlined } from "@ant-design/icons";
import { Row } from "antd";
import React from "react";
import { useStores } from "../../../stores/stores";

interface Props {
	uploadInputRef: React.RefObject<HTMLInputElement>
}
function ChatFooterBar(props: Props) {
	const {appStore: {toggleCreatePollModal}, chatStore: {toggleMdlNmCard}} = useStores();
	const {uploadInputRef} = props;

	return (
		<Row className='chat-footer-bar max-width' align='middle'>
			<FileImageOutlined className="hoverable-icon" onClick={()=> {
				if(!uploadInputRef.current) return;
				uploadInputRef.current.accept = "image/*";
				uploadInputRef.current.click()
			}}/>
			<PaperClipOutlined className="hoverable-icon" onClick={()=> {
				if(!uploadInputRef.current) return;
				uploadInputRef.current.accept = "";
				uploadInputRef.current.click()
			}}/>
			<IdcardOutlined className="hoverable-icon" onClick={toggleMdlNmCard} />
			<ProjectOutlined className="hoverable-icon" rotate={180} onClick={toggleCreatePollModal}/>
		</Row>
	);
}

export default React.memo(ChatFooterBar)
