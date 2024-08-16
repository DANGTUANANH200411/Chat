import React from "react";
import { RoleType } from "../../../utils/type";
import { AuditOutlined, DeleteOutlined, MoreOutlined, StopOutlined, UserAddOutlined, UserDeleteOutlined, UserOutlined } from "@ant-design/icons";
import { notify } from "../../../utils/notify";
import { Dropdown } from "antd";
import { useStores } from "../../../stores/stores";
import { observer } from "mobx-react-lite";
import { ItemType } from "antd/es/menu/interface";

interface Props {
    role: RoleType;
    isFriend: boolean | undefined;
}
function MembersAction(props: Props){
    const {appStore: {$$}} = useStores();
    const {role, isFriend} = props;
    const friendItem: ItemType = {
        key: 'add-remove-friend',
        label: $$(isFriend ? 'unfriend' : 'add-friend'),
        icon: isFriend ? <UserDeleteOutlined/> : <UserAddOutlined/>,
        onClick: () => {}
    }
    const items: ItemType[] = [
        friendItem,
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

export default React.memo(observer(MembersAction));