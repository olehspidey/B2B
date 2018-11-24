import { IAction } from '../IAction';
import { ITokenState } from '../../Reducers/Token/ITokenState';

export interface ITokenAction extends IAction, ITokenState {
}