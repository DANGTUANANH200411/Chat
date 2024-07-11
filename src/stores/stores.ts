import React from 'react';
import AppStore from './appStore';
import ChatStore from './chatStore';

class RootStore {
    appStore: AppStore;
    chatStore: ChatStore;
    constructor() {
        this.appStore = new AppStore();
        this.chatStore = new ChatStore();
    }
}

const StoresContext = React.createContext(new RootStore());

// đây là function có sẵn để app kết nối tới các stores
export const useStores = () => React.useContext(StoresContext);
export const stores = new RootStore();