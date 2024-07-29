import { Space } from 'antd';
import React, { useEffect, useRef } from 'react';
import { IMG_ANGRY, IMG_HEART, IMG_LIKE, IMG_SAD, IMG_WOW } from '../../../utils/constants';
import { useStores } from '../../../stores/stores';
import { observer } from 'mobx-react';

function Reaction() {
	const {
		chatStore: { reactionPopup, setReactionPopup },
	} = useStores();
	const { visible, x, y, id } = reactionPopup;
	const ref = useRef<HTMLDivElement>(null);
    // useEffect(()=> {
    //     function clickOutSide (event: MouseEvent) {
    //         if (ref.current && !ref.current.contains(event.target as Node)) {
    //             setReactionPopup({
    //                 visible: false,
    //                 x: 0,
    //                 y: 0,
    //                 id: undefined,
    //             })
    //         }
    //     }
    //     console.log('ADD');
    //     document.addEventListener('click', clickOutSide);
    //     return ()=>{
    //         console.log('REMVOE');
    //         document.removeEventListener('click', clickOutSide);
    //     }
    // }, [ref])
	return (
		<Space
			ref={ref}
			className='reaction-selector'
            direction='vertical'
			style={{
				visibility: visible ? 'visible' : 'hidden',
				top: `${y}px`,
				left: `${x}px`,
			}}
		>
			<img src={IMG_HEART} />
			<img src={IMG_SAD} />
			<img src={IMG_ANGRY} />
			<img src={IMG_WOW} />
			<img src={IMG_LIKE} />
		</Space>
	);
}

export default React.memo(observer(Reaction));
