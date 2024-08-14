import React from "react";
import { RoleType } from "../../../utils/type";
import { AuditOutlined, DeleteOutlined, MoreOutlined, StopOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { notify } from "../../../utils/notify";
import { Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import { useStores } from "../../../stores/stores";
import { observer } from "mobx-react-lite";

interface Props {
    role: RoleType;
}
function MemberActions(props: Props){
    const {appStore: {$$}} = useStores();
    const {role} = props;
    const items: MenuProps['items'] = [
        {
            key: 'profile',
            label: $$('view-profile'),
            icon: <UserOutlined />,
            onClick: () => {},
        },
        {
            key: 'appointed',
            label: $$('appointed-vice-leader'),
            icon: <AuditOutlined />,
            onClick: () => {},
        },
        {
            key: 'block',
            label: $$('block-member'),
            icon: <StopOutlined />,
            onClick: () => {},
        },
        {
            key: 'remove',
            label: $$('remove-from-group'),
            icon: <DeleteOutlined />,
            onClick: () => {},
            danger: true,
        },
    ];
    console.log(role)
    switch (role) {
        case 'Owner':
            return (
                <Dropdown trigger={['click']} menu={{ items }} destroyPopupOnHide arrow>
                    <MoreOutlined rotate={90} className='hoverable-icon' onClick={(e)=> e.stopPropagation()}/>
                </Dropdown>
            )
        case 'Vice Leader':
            return <></>;
        default:
            return <UserAddOutlined className="hoverable-icon" onClick={()=> notify('Incomming')}/>
    }

}

export default React.memo(observer(MemberActions));