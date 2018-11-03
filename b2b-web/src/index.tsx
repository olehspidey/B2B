import registerServiceWorker from './registerServiceWorker';
import './index.css';
import reducers from './Reducers/index';
import App from './App';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import blue from '@material-ui/core/colors/blue';
import { createLogger } from 'redux-logger';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { composeWithDevTools } from 'redux-devtools-extension';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

const logger = createLogger();
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)));

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
