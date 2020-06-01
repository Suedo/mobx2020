import React from 'react';

import { useStore } from '../context/context';
import { BugsListComponent } from '../components/BugsListComponent';
import { observer } from 'mobx-react-lite';

export const BugsList = observer(() => {
  // observe changes to bugstore and re-render on change
  const { bugStore } = useStore();

  return <BugsListComponent bugs={bugStore.bugsByLength}></BugsListComponent>;
});
