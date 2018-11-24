import { ICompaniesReponseAction } from '../../Actions/Companies/ICompaniesReponseAction';
import { ICompaniesState } from '../../Reducers/Companies/ICompaniesState';

export interface ISearchCompaniesContainerProp {
    classes: {
        root: string,
        resultBlock: string,
        filterBlock: string,
        block: string,
        but: string
    },
    companyState: ICompaniesState,
    fetchCompaniesByFilters: (s: string, companyCategory: string | number, countryId: string, cityId: string) => Promise<ICompaniesReponseAction>
}