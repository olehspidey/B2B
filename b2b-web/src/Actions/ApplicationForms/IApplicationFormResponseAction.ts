import { IApplicationForm } from '../../Core/Models/ReducerModels/ApplicationForms/IApplicationForm';
import { Action } from 'redux';

export interface IApplicationFormResponseAction extends Action {
    applicationForm: IApplicationForm
}