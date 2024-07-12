import { TagFilled } from '@ant-design/icons';
import { useStores } from '../../stores/stores';
import { MenuProps } from 'antd';

export const LabelMenu = (): MenuProps['items'] => {
    const {
        appStore: { $$, labels },
    } = useStores();
    return labels.map(label => ({
        key: label.id,
        label: label.name,
        icon: <TagFilled style={{ color: label.color }} />,
        onClick: () => {},
    }))
    return [
        {
            key: 'label-customer',
            label: $$('label-customer'),
            icon: <TagFilled style={{ color: 'rgb(217, 27, 27)' }} />,
            onClick: () => {},
        },
        {
            key: 'label-family',
            label: $$('label-family'),
            icon: <TagFilled style={{ color: 'rgb(75, 195, 119)' }} />,
            onClick: () => {},
        },
        {
            key: 'label-work',
            label: $$('label-work'),
            icon: <TagFilled style={{ color: 'rgb(255, 105, 5)' }} />,
            onClick: () => {},
        },
        {
            key: 'label-friend',
            label: $$('label-friend'),
            icon: <TagFilled style={{ color: 'rgb(111, 63, 207)' }} />,
            onClick: () => {},
        },
        {
            key: 'label-rep',
            label: $$('label-rep'),
            icon: <TagFilled style={{ color: 'rgb(250, 192, 0)' }} />,
            onClick: () => {},
        },
        {
            key: 'label-coworker',
            label: $$('label-coworker'),
            icon: <TagFilled style={{ color: 'rgb(0, 104, 255)' }} />,
            onClick: () => {},
        },
        {
            type: 'divider',
        },
        {
            key: 'manage-label',
            label: $$('manage-label'),
            onClick: () => {},
        },
    ];
};
