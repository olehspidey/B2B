import * as React from 'react';
import BaseContainer from '../BaseContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SubscriptionConmponent from '../../components/common/SubscriptionComponent';
import Spinner from '../../components/common/Spinner';
import Button from '@material-ui/core/Button';

import { withStyles, createStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { IApplicationFormsState } from '../../Reducers/ApplicationForms/IApplicationFormsState';
import { ThunkDispatch } from 'redux-thunk';
import { fetchApplicationForm } from '../../Actions/ApplicationForms/applicationForms';
import { Action } from 'redux';
import { IApplicationFormContainerProps } from './props/IApplicationFormContainerProps';
import { IError } from '../../Actions/IError';
import { ICreateUserByForm } from '../../Actions/User/ICreateUserByForm';
import { createUserByForm } from '../../Actions/User/user';
import { IUserState } from '../../Reducers/User/IUserState';

const styles = createStyles({
    root: {
        width: '100%',
        padding: '0 20%'
    },
    paper: {
        padding: '2rem',
        marginBottom: '2rem'
    },
    editButBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

class ApplicationFormContainer extends BaseContainer<IApplicationFormContainerProps> {

    public componentWillMount() {
        const { id } = this
            .props
            .match
            .params;

        this
            .props
            .fetchApplicationForm(id)
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
    }

    public render() {
        const { applicationFormsState, classes, usersState } = this.props;

        return (
            <div className={classes.root}>
                {
                    applicationFormsState.loading || usersState.loading ?
                        <Spinner flex /> :
                        <>
                            <Paper className={classes.paper}>
                                {
                                    this.renderBody(applicationFormsState, classes.editButBox)
                                }
                                {
                                    super.render()
                                }
                            </Paper>
                            <Paper className={classes.paper}>
                                {
                                    this.renderSubscription(applicationFormsState)
                                }
                            </Paper>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.onRegisterClick}>Register</Button>
                        </>
                }
            </div>
        );
    }

    private onRegisterClick = () => {
        const { id } = this
            .props
            .match
            .params;
        const { origin } = window.location;

        this
            .props
            .createUserByForm({
                formId: Number(id),
                redirectUrl: `${origin}/user/set-password`,
                serviceUrl: origin
            })
            .then(() => this.setState({
                canRenderAlertMessage: true,
                alertMessage: 'The user has been successfully registered'
            }))
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
        console.log(window.location);
    }

    private renderBody = ({ applicationForm }: IApplicationFormsState, editButBox: string) => {
        if (applicationForm) {
            return (
                <>
                    <div className={editButBox}>
                        <Button
                            variant="outlined"
                            color="primary">Edit</Button>
                    </div>
                    <Typography variant="title">User information:</Typography>
                    <Typography variant="subtitle1">{`Name: ${applicationForm.name}`}</Typography>
                    <Typography variant="subtitle1">{`Last Name: ${applicationForm.lastName}`}</Typography>
                    <Typography variant="title">Contact information:</Typography>
                    <Typography variant="subtitle1">{`Email: ${applicationForm.email}`}</Typography>
                    <Typography variant="subtitle1">{`Contact phone: ${applicationForm.phoneNumber}`}</Typography>
                </>
            )
        }

        return null;
    }

    private renderSubscription = ({ applicationForm }: IApplicationFormsState) => {
        if (applicationForm) {
            return (
                <SubscriptionConmponent
                    subscriptionType={applicationForm.subscriptionType}
                    text="Subscription type: "
                    variant="title"
                    subTypePadding=".5rem 1rem" />
            );
        }

        return null;
    }
}

export default withStyles(styles)(connect(
    (state: any) => ({
        applicationFormsState: state.applicationForms as IApplicationFormsState,
        usersState: state.users as IUserState
    }),
    (dispatch: ThunkDispatch<IApplicationFormsState, void, Action>) => ({
        fetchApplicationForm: (id: string) => dispatch(fetchApplicationForm(id)),
        createUserByForm: (body: ICreateUserByForm) => dispatch(createUserByForm(body))
    })
)(ApplicationFormContainer));