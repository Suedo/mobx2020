import React, { FunctionComponent } from 'react';
import { Bug } from '../stores/BugStore';
import { Observer } from 'mobx-react';

interface BugsListItemProps {
  id: string;
  name: string;
}

const BugsListItem: FunctionComponent<BugsListItemProps> = ({ id, name }) => {
  return <li key={id}>{name}</li>;
};

interface BugsListProps {
  bugs: Bug[];
}

export const BugsListComponent: FunctionComponent<BugsListProps> = ({ bugs }) => {
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
