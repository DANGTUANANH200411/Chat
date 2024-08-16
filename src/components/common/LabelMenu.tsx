import { TagFilled } from '@ant-design/icons';
import { useStores } from '../../stores/stores';
import { MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/interface';

export const LabelMenu = (roomId: string): ItemType[] => {
	const {
		appStore: { $$, labels },
		chatStore: { onChangeLabel },
	} = useStores();
	return labels.map((label) => ({
		key: label.id,
		label: label.name,
		icon: <TagFilled style={{ color: label.color }} />,
		onClick: () => {
			onChangeLabel(roomId, label.id);
		},
	}));
};
