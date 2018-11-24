import { ICompany } from '../../Core/Models/ReducerModels/Companies/ICompany';
import { IError } from '../../Actions/IError';

export interface ICompaniesState {
    loading: boolean,
    companies: ICompany[] | [],
    company: ICompany | null,
    error: IError | null
}