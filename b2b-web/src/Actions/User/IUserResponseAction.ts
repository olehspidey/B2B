import { Action } from 'redux';
import { IUser } from './IUser';

export interface IUserResponseAction extends Action {
    currentUser: IUser | any
}