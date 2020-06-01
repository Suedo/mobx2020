import * as React from 'react';

import { AppHeader } from './containers/HeaderContainer';
import { BugsList, ComplaintsList } from './containers/ItemListContainer';
import { BugsForm } from './containers/BugsForm';
import { ComplaintsForm } from './containers/ComplaintsForm';
import { StoreProvider } from './context/context';

import './App.css';

interface IAppProps {
  name: string;
}

const App: React.FunctionComponent<IAppProps> = ({ name }) => {
  return (
    <StoreProvider>
      <div className="App">
        <AppHeader />
        <div className="grid-container">
          <div className="grid-item">
            <BugsList />
            <BugsForm />
          </div>
          <div className="grid-item">
            <ComplaintsList />
            <ComplaintsForm />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
};

export default App;
