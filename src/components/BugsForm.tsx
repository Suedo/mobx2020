import React, { useState } from 'react';
import { useStore } from '../context/context';

export const BugsForm = () => {
  const { bugStore } = useStore();

  const [bug, setBug] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        bugStore.addBug(bug);
        setBug('');
      }}
    >
      <input type="text" value={bug} onChange={(e) => setBug(e.target.value)} />
      <button type="submit">Add Bug</button>
    </form>
  );
};
