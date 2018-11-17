import { IBaseContainerState } from './IBaseContainerState';
import { IKeyWord } from '../../Core/Models/ReducerModels/Companies/IKeyWord';

export interface ICreateCompanySuggestContainerState extends IBaseContainerState {
    canForbidRedirect: boolean,
    canNotFoundRedirect: boolean,
    sureCheck: boolean,
    keyWordsDialogOpen: boolean,
    keyWords: IKeyWord[]
}