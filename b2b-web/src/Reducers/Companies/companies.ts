import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE
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

        case FETCH_COMPANIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return { ...state };
    }
}