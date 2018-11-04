import { ICreateCompany } from "../../Actions/Companies/ICreateCompany";
import { ICompanyResponseAction } from '../../Actions/Companies/ICompanyResponseAction';
import { ICompaniesState } from "../../Reducers/Companies/ICompaniesState";

export interface ICreateUserCompanyContainerProps {
    companiesState: ICompaniesState,
    createCompanyRequest: (body: ICreateCompany) => Promise<ICompanyResponseAction>
}