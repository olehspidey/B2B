import { apiGet, apiPost, apiPut } from "../Api/api";
import { ICreateCompany } from "../Actions/Companies/ICreateCompany";
import { IEditCompany } from '../Actions/Companies/IEditCompany';
import { IAddKeyWords } from '../Actions/Companies/IAddKeyWords';
import { IAddToSuggest } from '../Actions/Companies/IAddToSuggest';

export default {
    fetchCompanies() {
        return apiGet('/api/companies');
    },
    fetchCompany(id: string) {
        return apiGet(`/api/companies/${id}`);
    },
    fetchEditCompany(id: string, edit: boolean, moveToSuggests: boolean) {
        return apiGet(`/api/companies/${id}/${edit}/${moveToSuggests}`);
    },
    fetchByFilters(s: string, companyCategory: string | number, countryId: string, cityId: string) {
        return apiGet(`/api/companies/${s}/${companyCategory}/${countryId}/${cityId}/`);
    },
    createCompany(body: ICreateCompany) {
        return apiPost('/api/companies/createCompany', body);
    },
    editCompany(body: IEditCompany) {
        return apiPut('/api/companies/edit', body);
    },
    addKeyWords(body: IAddKeyWords) {
        return apiPut('/api/companies/addKeyWords', body);
    },
    addToSuggest(body: IAddToSuggest) {
        return apiPut('/api/companies/addToSuggest', body);
    },
    fetchKeyWordsByWord(word: string) {
        return apiGet(`/api/companies/keyWords/${word}`);
    }
}