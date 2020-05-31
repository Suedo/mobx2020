import React, { useContext } from 'react';

import { StoreContext } from '../context/context';
import { BugsListComponent } from '../components/BugsListComponent';
import { observer } from 'mobx-react-lite';

export const BugsList = observer(() => {
  // observe changes to bugstore and re-render on change
  const bugstore = useContext(StoreContext);

  return <BugsListComponent bugs={bugstore.bugsByLength}></BugsListComponent>;
});
