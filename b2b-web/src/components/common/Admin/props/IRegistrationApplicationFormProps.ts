import { ICreateApplicationFrom } from '../../../../Actions/ApplicationForms/ICreateApplicationFrom';

export interface IRegistrationApplicationFormProps {
    classes: {
        root: string,
        butBox: string
    },
    onCreateApplicationForm: (body: ICreateApplicationFrom) => void
}