import React, { useContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { RootStore, RootStoreT } from '../stores/RootStore';

export const StoreContext = React.createContext({} as RootStoreT);

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(RootStore);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

// simplifies imports
export const useStore = () => {
  return useContext(StoreContext);
};
