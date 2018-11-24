import { Action } from 'redux';

export interface IAction extends Action<string> {
    loading: boolean
}