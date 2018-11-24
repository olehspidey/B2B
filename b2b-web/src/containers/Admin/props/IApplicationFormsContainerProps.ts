import { IApplicationFormsState } from '../../../Reducers/ApplicationForms/IApplicationFormsState';
import { IApplicationFormsResponseAction } from '../../../Actions/ApplicationForms/IApplicationFormsResponseAction';

export interface IApplicationFormsContainerProps {
    classes: {
        root: string
    }
    applicationFormsState: IApplicationFormsState,
    fetchApplicationForms: () => Promise<IApplicationFormsResponseAction>
}