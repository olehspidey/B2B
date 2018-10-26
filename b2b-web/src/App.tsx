import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LoginScreen from './screens/Login/LoginScreen';
import UserPanelScreen from './screens/UserPanelScreen/UserPanelScreen';

export default class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route path="/user" component={UserPanelScreen} />
        </Switch>
      </Router>
    );
  }
}
