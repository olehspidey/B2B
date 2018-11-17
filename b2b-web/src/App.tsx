import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LoginScreen from './screens/Login/LoginScreen';
import UserPanelScreen from './screens/UserPanelScreen/UserPanelScreen';
import AdminPanelScreen from './screens/UserPanelScreen/AdminPanelScreen';
import NotFound from './components/common/NotFound';
import Forbid from './components/common/Forbid';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={LoginScreen} />
      <Route path="/user" component={UserPanelScreen} />
      <Route path="/admin" component={AdminPanelScreen} />
      <Route exact path="/forbid" component={Forbid} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
