import * as React from 'react';

import { AppHeader } from './containers/HeaderContainer';
import { ImgUploader } from './containers/ImgUploadContainer';
import { Editor } from './containers/RichEditorContainer';
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
            <Editor />
            <ImgUploader />
          </div>
        </Paper>
      </MuiThemeProvider>
    </StoreProvider>
  );
};

export default App;
