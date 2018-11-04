import companiesService from '../../services/companies';

import { IError } from "../IError";
import { Dispatch } from "redux";
import { handleError } from '../handleError';
import { ICompany } from '../../Core/Models/ReducerModels/Companies/ICompany';
import { ICreateCompany } from './ICreateCompany';

export const FETCH_COMPANIES_REQUEST = 'FETCH_COMPANIES_REQUEST';
export const FETCH_COMPANIES_SUCCESS = 'FETCH_COMPANIES_SUCCESS';
export const FETCH_COMPANIES_FAILURE = 'FETCH_COMPANIES_FAILURE';

export const CREATE_COMPANY_REQUEST = 'CREATE_COMPANY_REQUEST';
export const CREATE_COMPANY_SUCCESS = 'CREATE_COMPANY_SUCCESS';
export const CREATE_COMPANY_FAILURE = 'CREATE_COMPANY_FAILURE';


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
};

const createComapanyRequest = () => ({
    type: CREATE_COMPANY_REQUEST
});

const createCompanySucess = (company: ICompany) => ({
    type: CREATE_COMPANY_SUCCESS,
    company
});

export const createCompany = (body: ICreateCompany) => (dispatch: Dispatch) => {
    dispatch(createComapanyRequest());

    return companiesService
        .createCompany(body)
        .then(
            resp => dispatch(createCompanySucess(resp.data)),
            error => handleError(dispatch, error, fetchCompaniesFailure)
        );
}