import React from 'react';

interface PureBugsHeaderProps {
  count: number;
}

export const PureBugsHeader = ({ count }: PureBugsHeaderProps) => {
  return <h1>Number of bugs: {count}</h1>;
};
