import React from 'react';
import { observer } from 'mobx-react-lite';
import { PureBugsHeader } from '../components/PureBugsHeader';
import { useStore } from '../context/context';

export const BugsHeader = observer(() => {
  const { bugStore } = useStore();

  return <PureBugsHeader count={bugStore.bugCount} />;
});
