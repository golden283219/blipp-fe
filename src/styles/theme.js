import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#74AD5F',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: `Roboto, 'sans-serif'`,
  },
  margins: {
    marginToHeader: 88,
    bottomNavHeight: 80,
  },
  borderRadius: {
    main: 10,
  },
});
