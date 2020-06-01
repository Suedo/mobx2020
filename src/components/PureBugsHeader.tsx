import React from 'react';

interface PureBugsHeaderProps {
  count: number;
}

export const PureBugsHeader = ({ count }: PureBugsHeaderProps) => {
  return (
    <>
      <h1>Number of bugs: {count}</h1>
      <ul className="tg-list">
        <li className="tg-list-item">
          <input type="checkbox" id="themeToggle" />
          <label htmlFor="themeToggle"></label>
        </li>
      </ul>
    </>
  );
};
