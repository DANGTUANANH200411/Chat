import { Typography } from "antd";
import { displayChatTime, displayChatTimeFull } from "../../../../utils/dateHelper";
import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../../../../stores/stores";

interface Props {
    view?: boolean;
    date: string;
}
function ChatTime(props: Props) {
    const {appStore: {$$}} = useStores();
    const {view, date} = props;
	return (
		<Typography.Text type='secondary' className='small-text send-time'>
			{view ? displayChatTimeFull(date, $$) : displayChatTime(date)}
		</Typography.Text>
	);
}

export default React.memo(observer(ChatTime));
