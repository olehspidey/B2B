import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/login" component={LoginScreen} />
        </Switch>
      </Router>
    );
  }
}
