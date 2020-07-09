import React from 'react';
import { useStore } from '../context/context';
import { observer } from 'mobx-react-lite';
import { PureBugsHeader } from '../components/PureBugsHeader';

export const BugsHeader = observer(() => {
  const { bugStore } = useStore();

  return <PureBugsHeader count={bugStore.bugCount} />;
});
