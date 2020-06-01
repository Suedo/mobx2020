import * as React from 'react';

import { BugsHeader } from './containers/BugsHeaderContainer';
import { BugsList } from './containers/BugsListContainer';
import { BugsForm } from './containers/BugsForm';
import { StoreProvider } from './context/context';

import './App.css';

interface IAppProps {
  name: string;
}

const App: React.FunctionComponent<IAppProps> = ({ name }) => {
  return (
    <StoreProvider>
      <div className="App">
        <header className="App-Header" />
        <BugsHeader />
        <BugsList />
        <BugsForm />
      </div>
      <div className="App">
        <header className="App-Header" />
        <BugsHeader />
        <BugsList />
        <BugsForm />
      </div>
    </StoreProvider>
  );
};

export default App;
