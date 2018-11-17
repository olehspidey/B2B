import { ICompaniesState } from '../../Reducers/Companies/ICompaniesState';
import { ICompanyResponseAction } from '../../Actions/Companies/ICompanyResponseAction';
import { ICompanyRouteParams } from './ICompanyRouteParams';
import { RouteComponentProps } from 'react-router';
import { IAddKeyWords } from '../../Actions/Companies/IAddKeyWords';
import { IAddToSuggest } from '../../Actions/Companies/IAddToSuggest';

export interface ICreateCompanySuggestContainerProps extends RouteComponentProps<ICompanyRouteParams> {
    classes: {
        paper: string,
        warningMainTypography: string,
        infoIcon: string,
        addKeyWordsBox: string
    }
    companiesState: ICompaniesState,
    fetchCompany: (id: string, edit: boolean, moveToSuggests: boolean) => Promise<ICompanyResponseAction>,
    addKeyWords: (body: IAddKeyWords) => Promise<ICompanyResponseAction>,
    addToSuggest: (body: IAddToSuggest) => Promise<ICompanyResponseAction>
}