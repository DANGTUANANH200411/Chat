import { notification } from "antd";
import { ArgsProps, NotificationPlacement } from "antd/es/notification/interface";
import { observer } from "mobx-react"
import React from "react";


interface Props {
    onUndo: () => void;
}
function UndoNotification (props: Props) {
    const [api, contextHolder] = notification.useNotification();
    api.info({
        message: `Notification`,
        description: '12312312312h3k1j',
        placement: 'bottomLeft',
    });
    
    return <></>
}

export default React.memo(observer(UndoNotification));