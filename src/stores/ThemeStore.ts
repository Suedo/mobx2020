// MUI
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, purple } from '@material-ui/core/colors';
import { observable, action } from 'mobx';

export class ThemeStore {
  private lightTheme = createMuiTheme({
    palette: {
      primary: blue,
      type: 'light',
    },
  });

  private darkTheme = createMuiTheme({
    palette: {
      primary: purple,
      type: 'dark',
    },
  });

  @observable isDarkMode = false;
  @observable theme = this.lightTheme;

  @action.bound
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.theme = this.isDarkMode ? this.darkTheme : this.lightTheme;
    console.log('Theme DarkMode:', this.theme.palette.type);
  }
}
