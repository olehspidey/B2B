import * as React from 'react';
import BaseContainer from '../BaseContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SubscriptionConmponent from '../../components/common/SubscriptionComponent';
import Spinner from '../../components/common/Spinner';
import Button from '@material-ui/core/Button';
import ApplicationFormStatus from '../../components/common/ApplicationFormStatus';

import { withStyles, createStyles, Theme } from '@material-ui/core';
import { connect } from 'react-redux';
import { IApplicationFormsState } from '../../Reducers/ApplicationForms/IApplicationFormsState';
import { ThunkDispatch } from 'redux-thunk';
import { fetchApplicationForm, rejectApplicationForm } from '../../Actions/ApplicationForms/applicationForms';
import { Action } from 'redux';
import { IApplicationFormContainerProps } from './props/IApplicationFormContainerProps';
import { IError } from '../../Actions/IError';
import { ICreateUserByForm } from '../../Actions/User/ICreateUserByForm';
import { createUserByForm } from '../../Actions/User/user';
import { IUserState } from '../../Reducers/User/IUserState';
import { mapApplicationFromStatus } from '../../utils/mappers/applicationFromsMapper';
import { IRejectApplicationForm } from '../../Actions/ApplicationForms/IRejectApplicationForm';

const styles = (theme: Theme) => createStyles({
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
    },
    rejectBut: {
        marginLeft: theme.spacing.unit
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
                                {this.renderAppFormStatus(applicationFormsState)}
                            </Paper>
                            <Paper className={classes.paper}>
                                {
                                    this.renderBody(applicationFormsState, classes.editButBox)
                                }
                            </Paper>
                            <Paper className={classes.paper}>
                                {
                                    this.renderSubscription(applicationFormsState)
                                }
                            </Paper>
                            {
                                this.renderRegisterButton(applicationFormsState)
                            }
                        </>
                }
                {
                    super.render()
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
                redirectUrl: `${origin}/confirm/set-password`,
                serviceUrl: origin
            })
            .then(() => {
                this.setState({
                    canRenderAlertMessage: true,
                    alertMessage: 'The user has been successfully registered'
                });
                this.props.fetchApplicationForm(id);
            })
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
    }

    private onRejectClick = () => {
        const { id } = this.props.match.params;

        const body = {
            id: Number(id)
        };

        this
            .props
            .rejectApplicationForm(body)
            .then(() => {
                this.setState({
                    canRenderAlertMessage: true,
                    alertMessage: 'The application form was successfully rejected'
                });

                this.props.fetchApplicationForm(id);
            })
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
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

    private renderRegisterButton = ({ applicationForm }: IApplicationFormsState) => {
        if (applicationForm && applicationForm.status !== 1 && applicationForm.status !== 2) {
            return (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onRegisterClick}>Register</Button>
                    <Button
                        className={this.props.classes.rejectBut}
                        variant="contained"
                        color="secondary"
                        onClick={this.onRejectClick}>Reject</Button>
                </>
            );
        }

        return null;
    }

    private renderAppFormStatus = ({ applicationForm }: IApplicationFormsState) => {
        if (applicationForm) {
            return (<ApplicationFormStatus
                text={`Status: ${mapApplicationFromStatus(applicationForm.status)}`}
                status={applicationForm.status} />)
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
        createUserByForm: (body: ICreateUserByForm) => dispatch(createUserByForm(body)),
        rejectApplicationForm: (body: IRejectApplicationForm) => dispatch(rejectApplicationForm(body))
    })
)(ApplicationFormContainer));