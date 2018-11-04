import companiesService from '../../services/companies';

import { IError } from "../IError";
import { Dispatch } from "redux";
import { handleError } from '../handleError';
import { ICompany } from '../../Core/Models/ReducerModels/Companies/ICompany';

export const FETCH_COMPANIES_REQUEST = 'FETCH_COMPANIES_REQUEST';
export const FETCH_COMPANIES_SUCCESS = 'FETCH_COMPANIES_SUCCESS';
export const FETCH_COMPANIES_FAILURE = 'FETCH_COMPANIES_FAILURE';

const fetchCompaniesRequest = () => ({
    type: FETCH_COMPANIES_REQUEST
});

const fetchCompaniesSuccess = (companies: ICompany[]) => ({
    type: FETCH_COMPANIES_SUCCESS,
    companies
});

const fetchCompaniesFailure = (error: IError) => ({
    type: FETCH_COMPANIES_FAILURE,
    error
});

export const fetchCompanies = () => (dispatch: Dispatch) => {
    dispatch(fetchCompaniesRequest());

    return companiesService
        .fetchCompanies()
        .then(
            resp => dispatch(fetchCompaniesSuccess(resp.data)),
            error => handleError(dispatch, error, fetchCompaniesFailure)
        );
}