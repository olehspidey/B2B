import { ICompanyResponseAction } from '../../Actions/Companies/ICompanyResponseAction';
import { RouteComponentProps } from 'react-router-dom';
import { ICompaniesState } from '../../Reducers/Companies/ICompaniesState';

interface IParams {
    id: string
}

export interface ICompanyContainerProps extends RouteComponentProps<IParams> {
    companiesState: ICompaniesState,
    classes: {
        root: string,
        paper: string
    },
    fetchCompany: (id: string) => Promise<ICompanyResponseAction>
}