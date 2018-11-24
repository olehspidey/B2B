import * as React from 'react';
import AdminPanelLayout from '../../layouts/AdminPanelLayout';
import NotFound from '../../components/common/NotFound';
import Forbid from '../../components/common/Forbid';
import ApplicationFormsContainer from '../../containers/Admin/ApplicationFormsContainer';
import ApplicationFormContainer from '../../containers/Admin/ApplicationFormContainer';

import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../../Actions/User/user';
import { ThunkDispatch } from 'redux-thunk';
import { IUserState } from '../../Reducers/User/IUserState';
import { Action } from 'redux';
import { IUserPanelScreenProps } from './IUserPanelScreenProps';

// todo need fix user state to redux state
class AdminPanelScreen extends React.Component<IUserPanelScreenProps> {
    constructor(props: IUserPanelScreenProps) {
        super(props);
    }

    public componentWillMount() {
        this.props.fetchCurrentUser()
            .then((resp) => {
                if (!(resp.currentUser.userRoles as string[]).some(role => role === 'Admin')) {
                    window.location.replace('/forbid');
                }
            });
    }

    public render() {
        const { userState } = this.props;

        return (
            <AdminPanelLayout userLoading={userState.loading} user={userState.currentUser}>
                <Switch>
                    <Route exact path="/admin/application-forms" component={ApplicationFormsContainer} />
                    <Route exact path="/admin/application-form/:id" component={ApplicationFormContainer} />
                    <Route path="/admin/notFound" component={NotFound} />
                    <Route path="/admin/forbid" component={Forbid} />
                    <Route component={NotFound} />
                </Switch>
            </AdminPanelLayout>
        )
    }
}

const mapStateToProps = (state: any) => ({
    userState: state.users as IUserState
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IUserState, any, Action>) => ({
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanelScreen);