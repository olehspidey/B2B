import { IBaseContainerState } from './IBaseContainerState';

export interface ISetPasswordContainerState extends IBaseContainerState {
    newPassword: string,
    canRedirect: boolean
}