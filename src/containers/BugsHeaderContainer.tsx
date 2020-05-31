import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { PureBugsHeader } from '../components/PureBugsHeader';
import { StoreContext } from '../context/context';

export const BugsHeader = observer(() => {
  const bugstore = useContext(StoreContext);

  return <PureBugsHeader count={bugstore.bugCount} />;
});
