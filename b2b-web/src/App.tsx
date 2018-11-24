import * as React from 'react';

import LoginScreen from './screens/Login/LoginScreen';
import UserPanelScreen from './screens/UserPanelScreen/UserPanelScreen';
import AdminPanelScreen from './screens/UserPanelScreen/AdminPanelScreen';
import NotFound from './components/common/NotFound';
import Forbid from './components/common/Forbid';
import RegistrationScreen from './screens/Registration/RegistrationScreen';
import SetPasswordScreen from './screens/SetPasswordScreen/SetPasswordScreen';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

export default () => (
  <Router>
    <Switch>
      <Route path="/confirm" component={SetPasswordScreen} />
      <Route exact path="/registration" component={RegistrationScreen} />
      <Route exact path="/login" component={LoginScreen} />
      <Route path="/user" component={UserPanelScreen} />
      <Route path="/admin" component={AdminPanelScreen} />
      <Route exact path="/forbid" component={Forbid} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
