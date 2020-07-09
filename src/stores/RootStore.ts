import { createContext, useContext } from 'react';
import { useLocalStore } from 'mobx-react';

import { BugStore } from './BugStore';
import { ComplaintStore } from './ComplaintStore';
import { ThemeStore } from './ThemeStore';
// import { createStoreContext } from '../context/context';

export class RootStore {
  public bugStore: BugStore;
  public themeStore: ThemeStore;
  public complaintStore: ComplaintStore;

  constructor() {
    this.bugStore = new BugStore();
    this.themeStore = new ThemeStore();
    this.complaintStore = new ComplaintStore();
  }
}

// https://stackoverflow.com/a/55390983/2715083
