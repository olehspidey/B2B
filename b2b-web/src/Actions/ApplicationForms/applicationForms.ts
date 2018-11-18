import applicationFormsService from '../../services/applicationForms';

import { IApplicationForm } from '../../Core/Models/ReducerModels/ApplicationForms/IApplicationForm';
import { IError } from '../IError';
import { Dispatch } from 'redux';
import { handleError } from '../handleError';

export const FETCH_APPLICATION_FORMS_REQUEST = 'FETCH_APPLICATION_FORMS_REQUEST';
export const FETCH_APPLICATION_FORMS_SUCCESS = 'FETCH_APPLICATION_FORMS_SUCCESS';
export const FETCH_APPLICATION_FORMS_FAILURE = 'FETCH_APPLICATION_FORMS_FAILURE';

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
}