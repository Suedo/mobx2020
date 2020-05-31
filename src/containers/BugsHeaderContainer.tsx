import React from 'react';
import { useStore, bugStore } from '../stores/Store';
import { observer } from 'mobx-react-lite';
import { PureBugsHeader } from '../components/PureBugsHeader';

export const BugsHeader = observer(() => {
  const { bugCount } = useStore((bugStore) => ({
    bugCount: bugStore.bugCount,
  }));

  return <PureBugsHeader count={bugCount} />;
});
