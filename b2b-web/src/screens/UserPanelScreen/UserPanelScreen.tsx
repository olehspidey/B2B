import * as React from 'react';
import UserPanelLayout from '../../layouts/UserPanelLayout';
import { Switch, Route } from 'react-router-dom';
import UserSettingsContainer from '../../containers/UserSettingsContainer';

class UserPanelScreen extends React.Component {
    public render() {
        return (
            <UserPanelLayout userLoading={false} user={{
                id: 'asds34-234ads',
                name: 'oleh',
                lastName: 'kokhan',
                userName: 'darkKnight'
            }}>
                <Switch>
                    <Route exact path="/user/settings" component={UserSettingsContainer} />
                </Switch>
            </UserPanelLayout>
        )
    }
}

export default UserPanelScreen;