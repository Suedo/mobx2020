import { createContext, useContext } from 'react';
import { useLocalStore } from 'mobx-react';

import { BugStore } from './BugStore';
import { ComplaintStore } from './ComplaintStore';
import { ThemeStore } from './ThemeStore';

export const RootStore = () => {
  return {
    bugStore: useLocalStore(BugStore),
    themeStore: useLocalStore(ThemeStore),
    complaintStore: useLocalStore(ComplaintStore),
  };
};

export type RootStoreT = ReturnType<typeof RootStore>;

// not needed, handled in context.ts
// export const StoreContext = createContext({} as RootStoreT);

// export const useStore = () => {
//   return useContext(StoreContext);
// };
