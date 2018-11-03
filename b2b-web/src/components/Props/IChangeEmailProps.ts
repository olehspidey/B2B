import { ISendEmailToken } from '../../Actions/User/ISendEmailToken';
import { IChangeEmail } from '../../Actions/User/IChangeEmail';

export interface IChangeEmailProps {
    classes: {
        form: string,
        saveBut: string
    },
    oldEmail: string,
    newEmail?: string,
    onSendEmailTokenClick(body: ISendEmailToken): void;
    onConfirmEmailToken(body: IChangeEmail): void;
}