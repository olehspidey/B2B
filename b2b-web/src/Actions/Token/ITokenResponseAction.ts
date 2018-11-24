import { Action } from 'redux';
import { IToken } from '../../Core/Models/ReducerModels/Token/IToken';

export interface ITokenResponseAction extends Action {
    token: IToken
}