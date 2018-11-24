import { ICompanyResponseAction } from '../../Actions/Companies/ICompanyResponseAction';
import { RouteComponentProps } from 'react-router-dom';
import { ICompaniesState } from '../../Reducers/Companies/ICompaniesState';
import { ICompanyRouteParams } from './ICompanyRouteParams';

export interface ICompanyContainerProps extends RouteComponentProps<ICompanyRouteParams> {
    companiesState: ICompaniesState,
    classes: {
        root: string,
        paper: string,
        editButBox: string
    },
    fetchCompany: (id: string) => Promise<ICompanyResponseAction>
}