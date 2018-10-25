import registerServiceWorker from './registerServiceWorker';
import './index.css';
import reducers from './Reducers/index';
import App from './App';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import blue from '@material-ui/core/colors/blue';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
