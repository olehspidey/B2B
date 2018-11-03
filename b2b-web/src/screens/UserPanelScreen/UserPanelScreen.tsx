import * as React from 'react';
import UserPanelLayout from '../../layouts/UserPanelLayout';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import UserSettingsContainer from '../../containers/UserSettingsContainer';
import { fetchCurrentUser } from '../../Actions/User/user';
import { ThunkDispatch } from 'redux-thunk';
import { IUserState } from '../../Reducers/User/IUserState';
import { Action } from 'redux';
import { IUserPanelScreenProps } from './Props/IUserPanelScreenProps';

class UserPanelScreen extends React.Component<IUserPanelScreenProps> {
    constructor(props: IUserPanelScreenProps) {
        super(props);
    }

    public componentDidMount() {
        this.props.fetchCurrentUserRequest();
    }

    public render() {
        const { userState } = this.props;
        console.log(this.props);
        return (
            <UserPanelLayout userLoading={userState.loading} user={userState.user}>
                <Switch>
                    <Route exact path="/user/settings" component={UserSettingsContainer} />
                </Switch>
            </UserPanelLayout>
        )
    }
}

const mapStateToProps = (state: any) => ({
    userState: state.users as IUserState
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IUserState, void, Action>) => ({
    fetchCurrentUserRequest: () => dispatch(fetchCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanelScreen);