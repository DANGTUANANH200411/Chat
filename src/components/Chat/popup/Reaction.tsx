import React from 'react';
import { IMG_ANGRY, IMG_HEART, IMG_LIKE, IMG_SAD, IMG_WOW } from '../../../utils/constants';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react';

interface Props {
	id: string;
}
function Reaction(props: Props) {
	const {
		chatStore: { handleReaction },
	} = useStores();
	const { id } = props;
	return (
		<div className='reaction-selector'>
			<img src={IMG_HEART} onClick={() => handleReaction(id, 'LOVE')} />
			<img src={IMG_SAD} onClick={() => handleReaction(id, 'SAD')}/>
			<img src={IMG_ANGRY} onClick={() => handleReaction(id, 'ANGRY')}/>
			<img src={IMG_WOW} onClick={() => handleReaction(id, 'WOW')}/>
			<img src={IMG_LIKE} onClick={() => handleReaction(id, 'LIKE')}/>
		</div>
	);
}

export default React.memo(observer(Reaction));
