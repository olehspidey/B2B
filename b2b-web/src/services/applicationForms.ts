import { apiGet, publicApi } from '../Api/api';
import { ICreateApplicationFrom } from '../Actions/ApplicationForms/ICreateApplicationFrom';

export default {
    getApplicationForms() {
        return apiGet('/api/applicationForms');
    },
    getApplicationForm(id: string) {
        return apiGet(`/api/applicationForms/${id}`);
    },
    createApplicationForm(body: ICreateApplicationFrom) {
        return publicApi
            .post('/api/applicationForms/create', body);
    }
}