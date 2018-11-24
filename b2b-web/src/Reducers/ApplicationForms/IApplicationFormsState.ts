import { IApplicationForm } from '../../Core/Models/ReducerModels/ApplicationForms/IApplicationForm';
import { IError } from '../../Actions/IError';

export interface IApplicationFormsState {
    applicationForm: IApplicationForm | null,
    applicationForms: IApplicationForm[] | [],
    loading: boolean,
    error: IError | null
}