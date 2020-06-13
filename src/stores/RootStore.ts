import { createContext, useContext } from 'react';
import { useLocalStore } from 'mobx-react';

import { BugStore } from './BugStore';
import { ComplaintStore } from './ComplaintStore';
import { ThemeStore } from './ThemeStore';
import { EditorStateStore } from './EditorStateStore';

export const RootStore = () => {
  return {
    bugStore: useLocalStore(BugStore),
    themeStore: useLocalStore(ThemeStore),
    complaintStore: useLocalStore(ComplaintStore),
    editorStateStore: useLocalStore(EditorStateStore),
  };
};

export type RootStoreT = ReturnType<typeof RootStore>;
