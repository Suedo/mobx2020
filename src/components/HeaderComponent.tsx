import React, { FunctionComponent } from 'react';
import { ToggleComponent } from './ToggleComponent';

// Mui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

interface HeaderComponentProps {
  brand: string;
}

export const HeaderComponent: FunctionComponent<HeaderComponentProps> = ({ brand }) => {
  return (
    <>
      <AppBar position="static">
        <div className="header-grid-container">
          <div className="header-grid-item">{brand}</div>
          <div className="header-grid-item"></div>
          <div className="header-grid-item">
            <ToggleComponent />
          </div>
        </div>
      </AppBar>
    </>
  );
};
