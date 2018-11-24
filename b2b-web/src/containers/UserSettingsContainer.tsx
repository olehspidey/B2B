import * as React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChangeEmailComponent from '../components/ChangeEmailComponent';
import Spinner from '../components/common/Spinner';
import BaseContainer from './BaseContainer';
import ChangePasswordComponent from '../components/ChangePasswordComponent';

import { ISendEmailToken } from '../Actions/User/ISendEmailToken';
import { IChangeEmail } from '../Actions/User/IChangeEmail';
import { IUserSettingsContainerProps } from './props/IUserSettingsContainerProps';
import { withStyles, createStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IUserState } from '../Reducers/User/IUserState';
import { Action } from 'redux';
import { sendResetEmailToken, changeEmail } from '../Actions/User/user';
import { IError } from '../Actions/IError';

const styles = createStyles({
    root: {
        width: '100%',
        padding: '0 20%'
    }
});

class UserSettingsContainer extends BaseContainer<IUserSettingsContainerProps> {

    public onSendEmailTokenClick = (body: ISendEmailToken) => this.props.sendResetEmailToken(body)
        .then(resp => console.log(resp))
        .catch((error: IError) => {
            this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            });

            return Promise.reject(error);
        });

    public onConfirmEmailToken = (body: IChangeEmail) => {
        console.log(body);

        return this.props.changeEmail(body)
            .then(resp => console.log(resp))
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
    }

    public render() {
        const { user, userLoading, classes, userState } = this.props;

        return (
            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Change email</Typography>
                    </ExpansionPanelSummary>
                    {
                        userLoading ? <Spinner /> : <ExpansionPanelDetails>

                            <ChangeEmailComponent
                                oldEmail={user === null ? '' : user.email}
                                onSendEmailTokenClick={this.onSendEmailTokenClick}
                                onConfirmEmailToken={this.onConfirmEmailToken}
                                loading={userState.editLoading}
                            />
                        </ExpansionPanelDetails>
                    }
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Change password</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ChangePasswordComponent />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                {
                    super.render()
                }
            </div>
        );
    }
}

export default withStyles(styles)(connect(
    (state: any) => ({
        userState: state.users as IUserState
    }),
    (dispatch: ThunkDispatch<IUserState, void, Action>) => ({
        sendResetEmailToken: (body: ISendEmailToken) => dispatch(sendResetEmailToken(body)),
        changeEmail: (body: IChangeEmail) => dispatch(changeEmail(body))
    }))(UserSettingsContainer));