import { ICreatePerson } from "../../Actions/Companies/ICreatePerson";
import { IPlace } from '../../Core/Models/ReducerModels/Companies/IPlace';

export interface ICreateCompany {
    shortName: string,
    fullName: string,
    owner: ICreatePerson,
    description?: string,
    country: IPlace | null,
    city: IPlace | null
}