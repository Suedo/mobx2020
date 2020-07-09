import { createContext, useContext } from 'react';
import { useLocalStore } from 'mobx-react';

import { BugStore } from './BugStore';
import { ComplaintStore } from './ComplaintStore';
import { ThemeStore } from './ThemeStore';
import { createStoreContext } from '../context/createStoreContext';

// export const RootStore = () => {
//   return {
//     bugStore: useLocalStore(BugStore),
//     themeStore: useLocalStore(ThemeStore),
//     complaintStore: useLocalStore(ComplaintStore),
//   };
// };

// export type RootStoreT = ReturnType<typeof RootStore>;

export class RootStore {
  private bugStore: BugStore;

  constructor() {
    this.bugStore = new BugStore();
  }
}

const rootStore = new RootStore();

const { StoreContext, useStore, useStoreEffect } = createStoreContext<RootStore>(rootStore);

export { bugStore, StoreContext, useStore, useStoreEffect };

// https://stackoverflow.com/a/55390983/2715083
