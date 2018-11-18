import { apiGet } from '../Api/api';

export default {
    getApplicationForms() {
        return apiGet('/api/applicationForms');
    }
}