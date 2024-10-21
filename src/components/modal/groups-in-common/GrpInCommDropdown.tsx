import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../../stores/stores';

interface Props {
    groupId: string;
    userId: string;
	className?: string;
    isOwner: boolean;
}
function GrpInCommDropdown(props: Props) {
    const {appStore: {$$, toggleGrpsInComm}, chatStore: {onRemoveMember, setActiveRoom}} = useStores();
	
    const {isOwner, groupId, userId, className} = props;
    
    const items: MenuProps['items'] = [
		{
			key: '1',
			label: $$('view-this-conversation'),
            onClick: () => {
                setActiveRoom(groupId)
                toggleGrpsInComm();
            }
		},
		!isOwner ? {
			key: '2',
			label: $$('chat-w-gr-owner'),
            onClick: () => {
                setActiveRoom(userId)
                toggleGrpsInComm();
            }
		} :
		{
			key: '3',
			label: $$('remove-from-group'),
            danger: true,
            onClick: () => {
                onRemoveMember(userId, groupId)
                toggleGrpsInComm();
            }
		},
	];
	
	return (
		<Flex className={className}>
			<Dropdown menu={{items}} destroyPopupOnHide arrow>
				<MoreOutlined rotate={90} />
			</Dropdown>
		</Flex>
	);
}

export default React.memo(observer(GrpInCommDropdown));
