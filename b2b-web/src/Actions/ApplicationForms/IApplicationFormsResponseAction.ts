import { Action } from 'redux';
import { IApplicationForm } from '../../Core/Models/ReducerModels/ApplicationForms/IApplicationForm';

export interface IApplicationFormsResponseAction extends Action {
    applicationForms: IApplicationForm[]
}