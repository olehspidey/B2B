import { ICreatePerson } from "../../Actions/Companies/ICreatePerson";
import { ICreateAddress } from './ICreateAddress';

export interface ICreateCompany {
    shortName: string,
    fullName: string,
    owner: ICreatePerson,
    description?: string,
    address: ICreateAddress
}