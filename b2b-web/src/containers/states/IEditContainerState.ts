import { IBaseContainerState } from './IBaseContainerState';

export interface IEditContainerState extends IBaseContainerState {
    canForbidRedirect: boolean
}