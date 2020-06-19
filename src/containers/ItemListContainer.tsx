import React from 'react';

import { useStore } from '../context/context';
import { ListComponent } from '../components/ItemListComponent';
import { observer } from 'mobx-react-lite';

export const BugsList = observer(() => {
  // observe changes to store and re-render on change
  const { bugStore } = useStore();

  return <ListComponent bugs={bugStore.bugsByLength}></ListComponent>;
});

export const ComplaintsList = observer(() => {
  // observe changes to store and re-render on change
  const { complaintStore } = useStore();

  return <ListComponent bugs={complaintStore.complaintByLength}></ListComponent>;
});
