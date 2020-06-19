import React, { FunctionComponent } from 'react';
import { Bug } from '../stores/BugStore';
import { Observer } from 'mobx-react';

interface ListItemProps {
  id: string;
  name: string;
}

const ListItem: FunctionComponent<ListItemProps> = ({ id, name }) => {
  return <li key={id}>{name}</li>;
};

interface ListProps {
  bugs: Bug[];
}

export const ListComponent: FunctionComponent<ListProps> = ({ bugs }) => {
  return (
    <Observer>
      {() => (
        <ul>
          {bugs.map((bug) => (
            <ListItem id={bug.id} name={bug.name} />
          ))}
        </ul>
      )}
    </Observer>
  );
};
