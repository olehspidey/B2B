import companiesService from '../../services/companies';

import { IError } from "../IError";
import { Dispatch } from "redux";
import { handleError } from '../handleError';
import { ICompany } from '../../Core/Models/ReducerModels/Companies/ICompany';
import { ICreateCompany } from './ICreateCompany';

export const FETCH_COMPANIES_REQUEST = 'FETCH_COMPANIES_REQUEST';
export const FETCH_COMPANIES_SUCCESS = 'FETCH_COMPANIES_SUCCESS';
export const FETCH_COMPANIES_FAILURE = 'FETCH_COMPANIES_FAILURE';

export const FETCH_COMPANY_REQUEST = 'FETCH_COMPANY_REQUEST';
export const FETCH_COMPANY_SUCCESS = 'FETCH_COMPANY_SUCCESS';
export const FETCH_COMPANY_FAILURE = 'FETCH_COMPANY_FAILURE';

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

export const fetchCompaniesByFilters = (s: string, companyCategory: string | number, countryId: string, cityId: string) => (dispatch: Dispatch) => {
    dispatch(fetchCompaniesRequest());

    return companiesService
        .fetchByFilters(s, companyCategory, countryId, cityId)
        .then(
            resp => dispatch(fetchCompaniesSuccess(resp.data)),
            error => handleError(dispatch, error, fetchCompaniesFailure)
        );
}

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

const fetchCompanyRequest = () => ({
    type: FETCH_COMPANY_REQUEST
});

const fetchCompanySucccess = (company: ICompany) => ({
    type: FETCH_COMPANY_SUCCESS,
    company
});

const fetchCompanyFailure = (error: IError) => ({
    type: FETCH_COMPANY_FAILURE,
    error
});

export const fetchCompany = (id: string) => (dispatch: Dispatch) => {
    dispatch(fetchCompanyRequest());

    return companiesService
        .fetchCompany(id)
        .then(
            resp => dispatch(fetchCompanySucccess(resp.data)),
            error => handleError(dispatch, error, fetchCompanyFailure)
        );
};

export const fetchEditCompany = (id: string, edit: boolean) => (dispatch: Dispatch) => {
    dispatch(fetchCompanyRequest());

    return companiesService
        .fetchEditCompany(id, edit)
        .then(
            resp => dispatch(fetchCompanySucccess(resp.data)),
            error => handleError(dispatch, error, fetchCompanyFailure)
        );
} 