import { IEditCompany } from '../../Actions/Companies/IEditCompany';
import { ICompaniesState } from '../../Reducers/Companies/ICompaniesState';

export interface IEditCompanyFormProps {
    classes: {
        root: string,
        info: string,
        but: string,
        infoText: string
    },
    companiesState: ICompaniesState
    onEditCompany: (body: IEditCompany) => void
}