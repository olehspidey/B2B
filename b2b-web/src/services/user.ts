import { apiGet } from '../Api/api';

export default {
    fetchCurrentUser() {
        return apiGet('/api/user');
    }
}