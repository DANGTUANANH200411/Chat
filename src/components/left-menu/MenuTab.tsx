import { Tabs, TabsProps } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../stores/stores';
import { TabItem } from '../../utils/type';

function MenuTab() {
    const {
        appStore: { $$ },
        chatStore: { tabItem, setTabItem },
    } = useStores();
    const items: TabsProps['items'] = [
        {
            key: TabItem.All,
            label: $$('all'),
        },
        {
            key: TabItem.Unread,
            label: $$('unread'),
        },
    ];

    return <Tabs activeKey={tabItem} items={items} size='small' onChange={(key) => setTabItem(key as TabItem)} />;
}
export default observer(MenuTab);
