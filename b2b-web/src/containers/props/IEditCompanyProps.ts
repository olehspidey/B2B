import { ICompaniesState } from '../../Reducers/Companies/ICompaniesState';
import { RouteComponentProps } from 'react-router';
import { ICompanyRouteParams } from './ICompanyRouteParams';
import { ICompanyResponseAction } from '../../Actions/Companies/ICompanyResponseAction';

export interface IEditCompanyProps extends RouteComponentProps<ICompanyRouteParams> {
    classes: {
        root: string
    },
    companiesState: ICompaniesState,
    fetchCompany: (id: string, edit: boolean) => Promise<ICompanyResponseAction>
}