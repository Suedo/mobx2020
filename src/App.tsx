import * as React from 'react';

import { BugsHeader } from './containers/BugsHeaderContainer';
import { BugsList } from './components/BugsList';
import { BugsForm } from './components/BugsForm';
import { StoreProvider, MuiThemeProvider } from './context/context';

interface IAppProps {
  name: string;
}

const App: React.FunctionComponent<IAppProps> = ({ name }) => {
  return (
    <StoreProvider>
      <MuiThemeProvider>
        <div className="App">
          <header className="App-Header" />
          <BugsHeader />
          <BugsList />
          <BugsForm />
        </div>
      </MuiThemeProvider>
    </StoreProvider>
  );
};

export default App;
