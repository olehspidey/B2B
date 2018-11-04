import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE,

    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    CREATE_COMPANY_FAILURE
} from '../../Actions/Companies/companies';
import { ICompaniesState } from '../Companies/ICompaniesState';
import { ICompaniesAction } from '../../Actions/Companies/ICompaniesAction';

const initialState: ICompaniesState = {
    companies: [],
    company: null,
    loading: false,
    error: null
};

export default (state = initialState, action: ICompaniesAction): ICompaniesState => {
    switch (action.type) {
        case FETCH_COMPANIES_REQUEST:
        case CREATE_COMPANY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_COMPANIES_SUCCESS:
            return {
                ...state,
                loading: false,
                companies: action.companies
            };
        case CREATE_COMPANY_SUCCESS:
            return {
                ...state,
                loading: false,
                company: action.company
            };
        case FETCH_COMPANIES_FAILURE:
        case CREATE_COMPANY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return { ...state };
    }
}