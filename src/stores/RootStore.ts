import { createContext, useContext } from 'react';
import { useLocalStore } from 'mobx-react';

import { BugStore } from './BugStore';
import { ComplaintStore } from './ComplaintStore';
import { ThemeStore } from './ThemeStore';
import { EditorStore } from './EditorStore';
import { ImagesStore } from './ImagesStore';

export const RootStore = () => {
  return {
    bugStore: useLocalStore(BugStore),
    themeStore: useLocalStore(ThemeStore),
    imagesStore: useLocalStore(ImagesStore),
    complaintStore: useLocalStore(ComplaintStore),
    editorStore: useLocalStore(EditorStore),
  };
};

export type RootStoreT = ReturnType<typeof RootStore>;
