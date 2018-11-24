import { apiGet, apiPost, publicApi } from '../Api/api';
import { ISendEmailToken } from '../Actions/User/ISendEmailToken';
import { IChangeEmail } from '../Actions/User/IChangeEmail';
import { ICreateUserByForm } from '../Actions/User/ICreateUserByForm';
import { IResetPassword } from '../Actions/User/IResetPassword';

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
    },
    resetPassword(body: IResetPassword) {
        return publicApi.post('/api/users/resetPassword', body);
    }
}