import { ISendEmailToken } from '../../Actions/User/ISendEmailToken';
import { IChangeEmail } from '../../Actions/User/IChangeEmail';

export interface IChangeEmailProps {
    classes: {
        root: string,
        form: string,
        saveBut: string
    };
    oldEmail: string;
    newEmail?: string;
    loading: boolean;
    onSendEmailTokenClick(body: ISendEmailToken): Promise<any>;
    onConfirmEmailToken(body: IChangeEmail): Promise<any>;
}