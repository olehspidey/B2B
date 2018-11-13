import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LoginScreen from './screens/Login/LoginScreen';
import UserPanelScreen from './screens/UserPanelScreen/UserPanelScreen';
import NotFound from './components/common/NotFound';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={LoginScreen} />
      <Route path="/user" component={UserPanelScreen} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
