import { apiGet, apiPost } from '../Api/api';
import { ISendEmailToken } from '../Actions/User/ISendEmailToken';
import { IChangeEmail } from '../Actions/User/IChangeEmail';
import { ICreateUserByForm } from '../Actions/User/ICreateUserByForm';

export default {
    fetchCurrentUser() {
        return apiGet('/api/users');
    },
    sendResetEmailToken(body: ISendEmailToken) {
        return apiPost('/api/users/sendResetEmailToken', body);
    },
    changeEmail(body: IChangeEmail) {
        return apiPost('/api/users/changeEmail', body);
    },
    createUserByApplicationForm(body: ICreateUserByForm) {
        return apiPost('/api/users/createUserByForm', body);
    }
}