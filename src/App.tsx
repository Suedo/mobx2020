import * as React from 'react';

import { BugsHeader } from './containers/BugsHeaderContainer';
import { BugsList } from './components/BugsList';
import { BugsForm } from './components/BugsForm';
import { bugStore, StoreContext } from './stores/Store';

interface IAppProps {
  name: string;
}

const App: React.FunctionComponent<IAppProps> = ({ name }) => {
  return (
    <StoreContext.Provider value={bugStore}>
      <div className="App">
        <header className="App-Header" />
        <BugsHeader />
        <BugsList />
        <BugsForm />
      </div>
    </StoreContext.Provider>
  );
};

export default App;
