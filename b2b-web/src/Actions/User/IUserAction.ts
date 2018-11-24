import { IAction } from '../IAction';
import { IUserState } from '../../Reducers/User/IUserState';

export interface IUserAction extends IAction, IUserState {

}