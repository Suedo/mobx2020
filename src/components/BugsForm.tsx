import React, { useState } from 'react';
import { useStore } from '../stores/Store';

export const BugsForm = () => {
  const { addBug } = useStore((bugStore) => ({
    addBug: bugStore.addBug,
  }));

  const [bug, setBug] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addBug(bug);
        setBug('');
      }}
    >
      <input type="text" value={bug} onChange={(e) => setBug(e.target.value)} />
      <button type="submit">Add Bug</button>
    </form>
  );
};
