import { ICreatePerson } from "../../Actions/Companies/ICreatePerson";

export interface ICreateCompany {
    shortName: string,
    fullName: string,
    owner: ICreatePerson,
    description?: string
}