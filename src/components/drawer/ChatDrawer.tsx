import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useStores } from "../../stores/stores";
import RoomInfo from "./room-info/RoomInfo";
import Members from "./members/Members";
import RoomStorage from "./room-storage/RoomStorage";


function ChatDrawer() {
    const {
		appStore: { drawerOpen },
		chatStore: { Room },
	} = useStores();

	useEffect(() => {
		if (!drawerOpen) {
			document.documentElement.style.setProperty('--drawer-w', '0px');
		} else {
			document.documentElement.style.setProperty('--drawer-w', '20vw');
		}
	}, [drawerOpen]);

	if (!drawerOpen || !Room) return <></>;
    
    return (
        <>
            {drawerOpen === 'Info' && <RoomInfo/>}
            {drawerOpen === 'Members' && <Members/>}
            {drawerOpen === 'Storage' && <RoomStorage/>}
        </>
    )
}

export default React.memo(observer(ChatDrawer));