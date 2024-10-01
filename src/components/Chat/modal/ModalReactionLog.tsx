import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores/stores';
import { Avatar, Col, Modal, Row, Space, Tabs, TabsProps } from 'antd';
import Member from '../../common/Member';
import { distictBy, getEmojiSrc } from '../../../utils/helper';
import UserAvatar from '../../common/UserAvatar';
import { reaction } from 'mobx';
import { MessageLog } from '../../../utils/type';

function ModalReactionLog() {
	const {
		appStore: { $$, users },
		chatStore: { reactLogPopup, toggleReactLog },
	} = useStores();
	const { visible, logs } = reactLogPopup;
    const renderList = (arr: MessageLog[]) => 
        <Space direction='vertical'>
            {arr
                .map((log) => {
                    const user = users.get(log.userId);
                    return user ? (
                        <Row key={log.userId} id={log.userId} justify='space-between'>
                            <Member user={user} suffix={<Avatar src={getEmojiSrc(log.reaction)} />} />
                        </Row>
                    ) : (
                        <></>
                    );
                })}
        </Space>

	const items: any = useMemo(
		() =>
			([   {
                    key: 'all',
                    label: 'All',
                    children: renderList(logs)
                },
				...distictBy(logs, (e) => e.reaction).map((log) => ({
					key: log.reaction,
					label: <Avatar src={getEmojiSrc(log.reaction)} size='small' />,
					children: renderList(logs.filter(e=> e.reaction === log.reaction))
				})),
			]), [logs]
	);
    
    
	return (
		<Modal open={visible} title='Reaction' footer={<></>} onCancel={() => toggleReactLog()}>
			<Tabs items={items}></Tabs>
		</Modal>
	);
}

export default React.memo(observer(ModalReactionLog));
