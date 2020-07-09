import React, { useState } from 'react';
import { Bug } from '../stores/BugStore';
import { useStore } from '../context/context';

export const ComplaintsForm = () => {
  const initialState = '';
  const [complaint, setComplaint] = useState(initialState);

  const { complaintStore } = useStore();

  const addComplaint = (name: string) => {
    complaintStore.addComplaint(name);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addComplaint(complaint);
        setComplaint(initialState);
      }}
    >
      <input type="text" value={complaint} onChange={(e) => setComplaint(e.target.value)} />
      <button type="submit">Add Complaint</button>
    </form>
  );
};
