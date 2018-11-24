import { ICreateApplicationFrom } from '../../../../Actions/ApplicationForms/ICreateApplicationFrom';
import { IApplicationFormResponseAction } from '../../../../Actions/ApplicationForms/IApplicationFormResponseAction';

export interface IRegistrationApplicationFormProps {
    classes: {
        root: string,
        butBox: string,
        link: string,
        haveAccountBox: string
    },
    onCreateApplicationForm: (body: ICreateApplicationFrom) => Promise<IApplicationFormResponseAction | void>
}