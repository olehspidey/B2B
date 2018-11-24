import { apiGet, publicApi, apiPut } from '../Api/api';
import { ICreateApplicationFrom } from '../Actions/ApplicationForms/ICreateApplicationFrom';
import { IRejectApplicationForm } from '../Actions/ApplicationForms/IRejectApplicationForm';

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
    },
    rejectApplicationForm(body: IRejectApplicationForm) {
        return apiPut('/api/applicationForms/reject', body);
    }
}