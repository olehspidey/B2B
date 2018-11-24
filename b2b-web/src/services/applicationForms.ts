import { apiGet, apiPost } from '../Api/api';
import { ICreateApplicationFrom } from '../Actions/ApplicationForms/ICreateApplicationFrom';

export default {
    getApplicationForms() {
        return apiGet('/api/applicationForms');
    },
    createApplicationForm(body: ICreateApplicationFrom) {
        return apiPost('/api/onCreateApplicationForm/create', body);
    }
}