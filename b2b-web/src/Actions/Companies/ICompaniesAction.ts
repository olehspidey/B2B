import { Action } from "redux";
import { ICompaniesState } from "../../Reducers/Companies/ICompaniesState";

export interface ICompaniesAction extends Action, ICompaniesState {

}