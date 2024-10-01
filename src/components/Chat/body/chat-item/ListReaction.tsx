import { useMemo } from 'react';
import { useStores } from '../../../../stores/stores';
import { distictBy, getEmojiSrc } from '../../../../utils/helper';
import { MessageLog } from '../../../../utils/type';
import { Avatar } from 'antd';

interface Props {
	logs: MessageLog[];
}
function ListReaction(props: Props) {
	const {
		chatStore: { toggleReactLog },
	} = useStores();
	const { logs } = props;
	const dLogs: MessageLog[] = useMemo(() => distictBy(logs, (e) => e.reaction), [logs]);

	return (
		<div className='list-reaction' onClick={() => toggleReactLog(logs)}>
			<Avatar.Group
				size={16}
			>
				{dLogs.slice(0, 3).map((e) => (
					<Avatar key={e.reaction} src={getEmojiSrc(e.reaction)} />
				))}
				{logs.length > 1 && <Avatar key='total' style={{ color: 'black'}}>{logs.length}</Avatar>}
			</Avatar.Group>
		</div>
	);
}

export default ListReaction;
