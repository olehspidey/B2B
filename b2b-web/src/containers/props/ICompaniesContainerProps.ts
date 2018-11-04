import { ICompaniesReponseAction } from '../../Actions/Companies/ICompaniesReponseAction';
import { ICompaniesState } from '../../Reducers/Companies/ICompaniesState';

export interface ICompaniesContainerProps {
    classes: {
        root: string,
        list: string,
        emptyBox: string,
        but: string,
        link: string
    },
    companyState: ICompaniesState,
    fetchCompanies: () => Promise<ICompaniesReponseAction>
}