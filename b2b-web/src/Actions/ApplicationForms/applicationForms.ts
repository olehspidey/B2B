import applicationFormsService from '../../services/applicationForms';

import { IApplicationForm } from '../../Core/Models/ReducerModels/ApplicationForms/IApplicationForm';
import { IError } from '../IError';
import { Dispatch } from 'redux';
import { handleError } from '../handleError';
import { ICreateApplicationFrom } from './ICreateApplicationFrom';

export const FETCH_APPLICATION_FORMS_REQUEST = 'FETCH_APPLICATION_FORMS_REQUEST';
export const FETCH_APPLICATION_FORMS_SUCCESS = 'FETCH_APPLICATION_FORMS_SUCCESS';
export const FETCH_APPLICATION_FORMS_FAILURE = 'FETCH_APPLICATION_FORMS_FAILURE';

export const FETCH_APPLICATION_FORM_REQUEST = 'FETCH_APPLICATION_FORM_REQUEST';
export const FETCH_APPLICATION_FORM_SUCCESS = 'FETCH_APPLICATION_FORM_SUCCESS';
export const FETCH_APPLICATION_FORM_FAILURE = 'FETCH_APPLICATION_FORM_FAILURE';

export const CREATE_APPLICATION_FORM_REQUEST = 'CREATE_APPLICATION_FORM_REQUEST';
export const CREATE_APPLICATION_FORM_SUCCESS = 'CREATE_APPLICATION_FORM_SUCCESS';
export const CREATE_APPLICATION_FORM_FAILURE = 'CREATE_APPLICATION_FORM_FAILURE';

const fetchApplicationFormsRequest = () => ({
    type: FETCH_APPLICATION_FORMS_REQUEST
});

const fetchApplicationFormsSuccess = (applicationForms: IApplicationForm[]) => ({
    type: FETCH_APPLICATION_FORMS_SUCCESS,
    applicationForms
});

const fetchApplicationFormsFailure = (error: IError) => ({
    type: FETCH_APPLICATION_FORMS_FAILURE,
    error
});

export const fetchApplicationForms = () => (dispatch: Dispatch) => {
    dispatch(fetchApplicationFormsRequest());

    return applicationFormsService
        .getApplicationForms()
        .then(
            resp => dispatch(fetchApplicationFormsSuccess(resp.data)),
            error => handleError(dispatch, error, fetchApplicationFormsFailure)
        );
};

const createApplicationFormRequest = () => ({
    type: CREATE_APPLICATION_FORM_REQUEST
});

const createApplicationFormSuccess = (applicationForm: IApplicationForm) => ({
    type: CREATE_APPLICATION_FORM_SUCCESS,
    applicationForm
});

const createApplicationFormFailure = (error: IError) => ({
    type: CREATE_APPLICATION_FORM_FAILURE,
    error
});

export const createApplicationForm = (body: ICreateApplicationFrom) => (dispatch: Dispatch) => {
    dispatch(createApplicationFormRequest());

    return applicationFormsService
        .createApplicationForm(body)
        .then(
            resp => dispatch(createApplicationFormSuccess(resp.data)),
            error => handleError(dispatch, error, createApplicationFormFailure)
        );
};

const fetchApplicationFormRequest = () => ({
    type: FETCH_APPLICATION_FORM_REQUEST
});

const fetchApplicationFormSuccess = (applicationForm: IApplicationForm) => ({
    type: FETCH_APPLICATION_FORM_SUCCESS,
    applicationForm
});

const fetchApplicationFormFailure = (error: IError) => ({
    type: FETCH_APPLICATION_FORM_FAILURE,
    error
});

export const fetchApplicationForm = (id: string) => (dispatch: Dispatch) => {
    dispatch(fetchApplicationFormRequest());

    return applicationFormsService
        .getApplicationForm(id)
        .then(
            resp => dispatch(fetchApplicationFormSuccess(resp.data)),
            error => handleError(dispatch, error, fetchApplicationFormFailure)
        );
}