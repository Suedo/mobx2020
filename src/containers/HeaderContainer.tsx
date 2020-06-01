import React from 'react';
import { observer } from 'mobx-react-lite';
import { HeaderComponent } from '../components/HeaderComponent';
import { useStore } from '../context/context';

export const AppHeader = observer(() => {
  const { bugStore, complaintStore } = useStore();

  const display = `Number of Bugs: ${bugStore.bugCount}, Number of Complaints: ${complaintStore.complaintCount}`;

  return <HeaderComponent displayLabel={display} />;
});
