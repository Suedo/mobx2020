import React, { FunctionComponent } from 'react';
import { useStore } from '../context/context';
import { Observer } from 'mobx-react';

interface BugsListItemProps {
  id: string;
  name: string;
}

const BugsListItem: FunctionComponent<BugsListItemProps> = ({ id, name }) => {
  return <li key={id}>{name}</li>;
};

export const BugsList = () => {
  const { bugStore } = useStore();

  return (
    <Observer>
      {() => (
        <ul>
          {bugStore.bugs.map((bug) => (
            <BugsListItem id={bug.id} name={bug.name} />
          ))}
        </ul>
      )}
    </Observer>
  );
};
