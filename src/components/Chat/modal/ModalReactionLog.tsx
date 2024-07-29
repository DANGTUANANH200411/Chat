import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../../../stores/stores";
import { Modal } from "antd";


function ModalReactionLog() {
    const { appStore: {$$} } = useStores();

    return <Modal open={false} title='Reaction' footer={<></>}></Modal>
}

export default React.memo(observer(ModalReactionLog));