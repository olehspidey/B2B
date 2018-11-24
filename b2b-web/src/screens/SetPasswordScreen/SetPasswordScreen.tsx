import * as React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import SetPasswordContainer from '../../containers/SetPasswordContainer';
import NotFound from '../../components/common/NotFound';

import { Switch, Route } from 'react-router-dom';

export default () => (
    <AuthLayout>
        <Switch>
            <Route path="/confirm/set-password/:token/:userId" component={SetPasswordContainer} />
            <Route component={NotFound} />
        </Switch>
    </AuthLayout>
);