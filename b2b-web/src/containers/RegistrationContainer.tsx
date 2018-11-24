import * as React from 'react';

import RegistrationApplicationForm from '../components/common/Admin/RegistrationApplicationForm';
import BaseContainer from './BaseContainer';

import { ICreateApplicationFrom } from '../Actions/ApplicationForms/ICreateApplicationFrom';
import { connect } from 'react-redux';
import { IApplicationFormsState } from '../Reducers/ApplicationForms/IApplicationFormsState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { createApplicationForm } from '../Actions/ApplicationForms/applicationForms';
import { IRegistrationContainerProps } from './props/IRegistrationContainerProps';
import { IError } from '../Actions/IError';

class RegistrationContainer extends BaseContainer<IRegistrationContainerProps> {
    public render() {
        return (
            <RegistrationApplicationForm onCreateApplicationForm={this.onCreateApplicationForm} />
        )
    }

    private onCreateApplicationForm = (body: ICreateApplicationFrom) => {
        this.props.createApplicationForm(body)
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
    }
}

export default connect(
    (state: any) => ({
        applicationFormsState: state.applicationForms as IApplicationFormsState
    }),
    (dispatch: ThunkDispatch<IApplicationFormsState, void, Action>) => ({
        createApplicationForm: (body: ICreateApplicationFrom) => dispatch(createApplicationForm(body))
    })
)(RegistrationContainer);