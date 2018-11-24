import * as React from 'react';
import BaseContainer from './BaseContainer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from '../components/common/Spinner';

import { ISetPasswordContainerProps } from './props/ISetPasswordContainerProps';
import { withStyles, createStyles } from '@material-ui/core';
import { ISetPasswordContainerState } from './states/ISetPasswordContainerState';
import { connect } from 'react-redux';
import { IUserState } from '../Reducers/User/IUserState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IResetPassword } from '../Actions/User/IResetPassword';
import { resetPassword } from '../Actions/User/user';
import { IError } from '../Actions/IError';
import { IFetchToken } from '../Actions/Token/IFetchToken';
import { fetchToken } from '../Actions/Token/token';
import { logIn } from '../Api/api';
import { Redirect } from 'react-router-dom';
import { ITokenState } from '../Reducers/Token/ITokenState';

const styles = createStyles({
    root: {
        padding: '2rem 20%'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

class SetPasswordContainer extends BaseContainer<ISetPasswordContainerProps, ISetPasswordContainerState> {
    constructor(props: ISetPasswordContainerProps) {
        super(props);

        this.state = {
            alertMessage: '',
            canRenderAlertMessage: false,
            canRenderErrorMessage: false,
            errorMessage: '',
            newPassword: '',
            statusCode: NaN,
            canRedirect: false
        }
    }
    public render() {
        const { classes, tokenState, usersState } = this.props;

        if (this.state.canRedirect) {
            return (<Redirect to="/user/settings" />);
        }

        return (
            <div className={classes.root}>
                <form className={classes.form} onSubmit={this.onSubmit}>
                    {
                        tokenState.loading || usersState.loading ?
                            <Spinner flex /> :
                            <TextField
                                label="New password"
                                placeholder="Input new password"
                                required
                                type="password"
                                value={this.state.newPassword}
                                onChange={this.onChangeNewPassword}
                                margin="normal" />
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={tokenState.loading || usersState.loading}>Change</Button>
                </form>
                {
                    super.render()
                }
            </div>
        );
    }

    private onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const splitedPath = window.location.pathname.split('/');
        const id = splitedPath[splitedPath.length - 1];
        const firstAction = splitedPath[1];
        const secondAction = splitedPath[2];
        let token = window
            .location
            .pathname
            .replace(id, '')
            .replace(firstAction, '')
            .replace(secondAction, '')
            .substr(3);
        token = token.substring(0, token.length - 1);

        const body = {
            newPassword: this.state.newPassword,
            token,
            userId: id
        } as IResetPassword;

        console.log(body);

        this
            .props
            .resetPassword(body)
            .then((resp) => {
                this.setState({
                    canRenderAlertMessage: true,
                    alertMessage: 'Success'
                });

                if (resp.currentUser) {
                    const fetchTokenBody = {
                        password: this.state.newPassword,
                        userName: resp.currentUser.email || resp.currentUser.id
                    } as IFetchToken;

                    this
                        .props
                        .fetchToken(fetchTokenBody)
                        .then((respToken) => {
                            logIn(respToken.token.accessToken);
                            this.setState({ canRedirect: true });
                        })
                        .catch((error: IError) => this.setState({
                            canRenderErrorMessage: true,
                            errorMessage: error.message
                        }));
                }
                else {
                    this.setState({
                        canRenderErrorMessage: true,
                        errorMessage: "Can't take user"
                    });
                }
            })
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
    }

    private onChangeNewPassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => this.setState({ newPassword: target.value });
}

export default withStyles(styles)(connect(
    (state: any) => ({
        usersState: state.users as IUserState,
        tokenState: state.token as ITokenState
    }),
    (dispatch: ThunkDispatch<IUserState, void, Action>) => ({
        resetPassword: (body: IResetPassword) => dispatch(resetPassword(body)),
        fetchToken: (body: IFetchToken) => dispatch(fetchToken(body))
    })
)(SetPasswordContainer));