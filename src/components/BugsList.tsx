import React, { FunctionComponent } from 'react';
import { useStore } from '../stores/Store';
import { Observer } from 'mobx-react';

interface BugsListItemProps {
  id: string;
  name: string;
}

const BugsListItem: FunctionComponent<BugsListItemProps> = ({ id, name }) => {
  return <li key={id}>{name}</li>;
};

export const BugsList = () => {
  const { bugs } = useStore((rootStore) => ({
    bugs: rootStore.bugs,
  }));

  return (
    <Observer>
      {() => (
        <ul>
          {bugs.map((bug) => (
            <BugsListItem id={bug.id} name={bug.name} />
          ))}
        </ul>
      )}
    </Observer>
  );
};
