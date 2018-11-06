import { apiGet, apiPost } from "../Api/api";
import { ICreateCompany } from "../Actions/Companies/ICreateCompany";

export default {
    fetchCompanies() {
        return apiGet('/api/companies');
    },
    fetchCompany(id: string) {
        return apiGet(`/api/companies/${id}`);
    },
    createCompany(body: ICreateCompany) {
        return apiPost('/api/companies/createCompany', body);
    }
}