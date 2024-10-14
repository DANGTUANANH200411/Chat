import { observer } from 'mobx-react';
import PreviewChatItem from './PreviewChatItem';
import { useStores } from '../../../stores/stores';
import React from 'react';

function PreviewChatWrapper() {
	const {
		chatStore: { Rooms },
	} = useStores();

	return (
		<>
			{Rooms.slice()
				.sort((a, b) =>
					(a.pinned === b.pinned
						? 0
						: a.pinned
						? -1
						: 1) || Number(b.previewMsg?.lastUpdateDate ?? 0) - Number(a.previewMsg?.lastUpdateDate ?? 0)
				)
				.map((e) => (
					<PreviewChatItem key={e.id} {...e} />
				))}
		</>
	);
}

export default React.memo(observer(PreviewChatWrapper));
