import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useStores } from '../../stores/stores';
import RoomInfo from './room-info/RoomInfo';
import Members from './members/Members';
import RoomStorage from './room-storage/RoomStorage';
import RoomBoard from './board/RoomBoard';

function ChatDrawer() {
	const {
		appStore: { drawerOpen, setDrawerOpen },
		chatStore: { Room },
	} = useStores();

	useEffect(() => {
		if (!drawerOpen) {
			document.documentElement.style.setProperty('--drawer-w', '0px');
		} else {
			document.documentElement.style.setProperty('--drawer-w', '20vw');
		}
	}, [drawerOpen]);

	useEffect(() => {
		!Room?.isGroup && drawerOpen === 'Members' && setDrawerOpen('Info')
	}, [Room, drawerOpen, setDrawerOpen])

	if (!Room) return <></>;

	return (
		<div className='drawer max-height'>
			{drawerOpen === 'Info' && <RoomInfo />}
			{drawerOpen === 'Members' && <Members />}
			{drawerOpen === 'Storage' && <RoomStorage />}
			{drawerOpen === 'Board' && <RoomBoard/>}
		</div>
	);
}

export default React.memo(observer(ChatDrawer));
