import { Action } from "redux";
import { ICompany } from "../../Core/Models/ReducerModels/Companies/ICompany";

export interface ICompanyResponseAction extends Action {
    company: ICompany
}