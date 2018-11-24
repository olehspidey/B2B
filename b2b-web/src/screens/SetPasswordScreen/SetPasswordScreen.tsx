import * as React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import SetPasswordContainer from '../../containers/SetPasswordContainer';

import { Switch, Route } from 'react-router-dom';

export default () => (
    <AuthLayout>
        <Switch>
            <Route exact path="/set-password/:token" component={SetPasswordContainer} />
        </Switch>
    </AuthLayout>
);