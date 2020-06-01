import React from 'react';

interface HeaderComponentProps {
  count?: number;
  displayLabel: string;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ count, displayLabel }) => {
  return (
    <>
      <h1>{displayLabel}</h1>
      <ul className="tg-list">
        <li className="tg-list-item">
          <input type="checkbox" id="themeToggle" />
          <label htmlFor="themeToggle"></label>
        </li>
      </ul>
    </>
  );
};
