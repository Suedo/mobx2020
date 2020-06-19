import React, { useState } from 'react';
import { Bug } from '../stores/BugStore';
import { useStore } from '../context/context';

export const BugsForm = () => {
  const initialState = '';
  const [bugName, setBugName] = useState(initialState);

  const { bugStore } = useStore();

  const addBug = (name: string) => {
    bugStore.addBug(name);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addBug(bugName);
        setBugName(initialState);
      }}
    >
      <input type="text" value={bugName} onChange={(e) => setBugName(e.target.value)} />
      <button type="submit">Add Bug</button>
    </form>
  );
};
