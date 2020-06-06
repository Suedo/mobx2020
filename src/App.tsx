import * as React from 'react';

import { AppHeader } from './containers/HeaderContainer';
import { Banner } from './containers/BannerContainer';
import { BugsList, ComplaintsList } from './containers/ItemListContainer';
import { ImgUploader } from './containers/ImgUploadContainer';
import { BugsForm } from './containers/BugsForm';
import { ComplaintsForm } from './containers/ComplaintsForm';
import { StoreProvider, MuiThemeProvider } from './context/context';

import './App.css';
import Paper from '@material-ui/core/Paper';

interface IAppProps {
  name: string;
}

const App: React.FunctionComponent<IAppProps> = ({ name }) => {
  return (
    <StoreProvider>
      <MuiThemeProvider>
        <Paper style={{ height: '100vh' }}>
          <div className="App">
            <AppHeader />
            <div className="grid-container">
              <div className="grid-item banner">
                <Banner />
              </div>
              <div className="grid-item">
                <BugsList />
                <BugsForm />
              </div>
              <div className="grid-item">
                <ComplaintsList />
                <ComplaintsForm />
              </div>
            </div>
            <ImgUploader />
          </div>
        </Paper>
      </MuiThemeProvider>
    </StoreProvider>
  );
};

export default App;
