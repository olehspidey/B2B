import * as React from 'react';
import UserPanelLayout from '../../layouts/UserPanelLayout';
import UserSettingsContainer from '../../containers/UserSettingsContainer';
import CompaniesContainer from '../../containers/CompaniesContainer';
import CreateUserCompanyContainer from '../../containers/CreateUserCompanyContainer';
import SubscriptionContainer from '../../containers/SubscriptionContainer';
import CompanyContainer from '../../containers/CompanyContainer';
import SearchCompaniesContainer from '../../containers/SearchCompaniesContainer';
import NotFound from '../../components/common/NotFound';
import EditCompanyContainer from '../../containers/EditCompanyContainer';
import Forbid from '../../components/common/Forbid';
import CreateCompanySuggestContainer from '../../containers/CreateCompanySuggestContainer';

import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../Actions/User/user';
import { ThunkDispatch } from 'redux-thunk';
import { IUserState } from '../../Reducers/User/IUserState';
import { Action } from 'redux';
import { IUserPanelScreenProps } from './IUserPanelScreenProps';

// todo need fix user state to redux state
class UserPanelScreen extends React.Component<IUserPanelScreenProps> {
    constructor(props: IUserPanelScreenProps) {
        super(props);
    }

    public componentWillMount() {
        this.props.fetchCurrentUser()
            .then((resp) => {
                if ((resp.currentUser.userRoles as string[]).some(role => role === 'Admin')) {
                    window.location.replace('/admin/application-froms');
                }
            })
    }

    public renderUserSettingsContainer = () => (
        <UserSettingsContainer
            user={this.props.userState.currentUser}
            userLoading={this.props.userState.loading} />
    );

    public renderSubscriptionContainer = () => (
        <SubscriptionContainer
            user={this.props.userState.currentUser}
            userLoading={this.props.userState.loading} />
    );

    public render() {
        const { userState } = this.props;

        return (
            <UserPanelLayout userLoading={userState.loading} user={userState.currentUser}>
                <Switch>
                    <Route exact path="/user/subscription" render={this.renderSubscriptionContainer} />
                    <Route exact path="/user/company/:id" component={CompanyContainer} />
                    <Route exact path="/user/company/:id/edit" component={EditCompanyContainer} />
                    <Route exact path="/user/company/:id/create-suggest" component={CreateCompanySuggestContainer} />
                    <Route exact path="/user/companies" component={CompaniesContainer} />
                    <Route exact path="/user/companies/create" component={CreateUserCompanyContainer} />
                    <Route exact path="/user/search" component={SearchCompaniesContainer} />
                    <Route exact path="/user/settings" render={this.renderUserSettingsContainer} />
                    <Route path="/user/notFound" component={NotFound} />
                    <Route path="/user/forbid" component={Forbid} />
                    <Route component={NotFound} />
                </Switch>
            </UserPanelLayout>
        )
    }
}

const mapStateToProps = (state: any) => ({
    userState: state.users as IUserState
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IUserState, any, Action>) => ({
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanelScreen);