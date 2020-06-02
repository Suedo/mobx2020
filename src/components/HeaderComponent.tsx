import React, { FunctionComponent } from 'react';
import { ToggleComponent } from './ToggleComponent';

interface HeaderComponentProps {
  brand: string;
}

export const HeaderComponent: FunctionComponent<HeaderComponentProps> = ({ brand }) => {
  return (
    <>
      <div className="header-grid-container">
        <div className="header-grid-item">{brand}</div>
        <div className="header-grid-item"></div>
        <div className="header-grid-item">
          <ToggleComponent />
        </div>
      </div>
    </>
  );
};
