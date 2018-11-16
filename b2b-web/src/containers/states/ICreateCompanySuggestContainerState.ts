import { IBaseContainerState } from './IBaseContainerState';

export interface ICreateCompanySuggestContainerState extends IBaseContainerState {
    canForbidRedirect: boolean,
    canNotFoundRedirect: boolean
}