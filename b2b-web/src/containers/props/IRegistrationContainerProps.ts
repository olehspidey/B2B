import { IApplicationFormsState } from '../../Reducers/ApplicationForms/IApplicationFormsState';
import { ICreateApplicationFrom } from '../../Actions/ApplicationForms/ICreateApplicationFrom';
import { IApplicationFormResponseAction } from '../../Actions/ApplicationForms/IApplicationFormResponseAction';

export interface IRegistrationContainerProps {
    applicationFormsState: IApplicationFormsState,
    createApplicationForm: (body: ICreateApplicationFrom) => Promise<IApplicationFormResponseAction>
}