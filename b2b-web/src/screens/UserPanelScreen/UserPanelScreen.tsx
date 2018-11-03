import * as React from 'react';
import UserPanelLayout from '../../layouts/UserPanelLayout';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import UserSettingsContainer from '../../containers/UserSettingsContainer';
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
            .then(resp => {
                this.setState({
                    currentUser: resp.currentUser,
                    userLoading: false
                })
            });
    }

    public renderUserSettingsContainer = () => (
        <UserSettingsContainer
            user={this.props.userState.currentUser}
            userLoading={this.props.userState.loading} />
    )

    public render() {
        const { userState } = this.props;

        return (
            <UserPanelLayout userLoading={userState.loading} user={userState.currentUser}>
                <Switch>
                    <Route exact path="/user/settings" render={this.renderUserSettingsContainer} />
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