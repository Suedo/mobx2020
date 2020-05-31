import React, { useState, useContext } from 'react';
import { Bug } from '../stores/BugStore';
import { StoreContext } from '../context/context';

export const BugsForm = () => {
  const initialState = '';
  const [bugName, setBugName] = useState(initialState);

  const bugstore = useContext(StoreContext);

  const addBug = (name: string) => {
    bugstore.addBug(name);
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
