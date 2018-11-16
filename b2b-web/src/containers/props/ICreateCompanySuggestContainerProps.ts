import { ICompaniesState } from '../../Reducers/Companies/ICompaniesState';
import { ICompanyResponseAction } from '../../Actions/Companies/ICompanyResponseAction';
import { ICompanyRouteParams } from './ICompanyRouteParams';
import { RouteComponentProps } from 'react-router';

export interface ICreateCompanySuggestContainerProps extends RouteComponentProps<ICompanyRouteParams> {
    companiesState: ICompaniesState,
    fetchCompany: (id: string, edit: boolean, moveToSuggests: boolean) => Promise<ICompanyResponseAction>
}