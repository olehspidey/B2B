import { Action } from "redux";
import { ICompany } from "../../Core/Models/ReducerModels/Companies/ICompany";

export interface ICompaniesReponseAction extends Action {
    companies: ICompany[]
}