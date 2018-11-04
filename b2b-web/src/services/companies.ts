import { apiGet } from "../Api/api";

export default {
    fetchCompanies() {
        return apiGet('/api/companies');
    }
}