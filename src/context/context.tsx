import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { BugStore, BugStoreT } from '../stores/BugStore';

// https://blog.mselee.com/posts/2019/06/08/using-mobx-with-react-hooks-typescript/

export const StoreContext = React.createContext<BugStoreT>({} as BugStoreT);

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(BugStore);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
