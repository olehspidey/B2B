import { IPerson } from '../../../Models/ReducerModels/Companies/IPerson';

export interface ICompany {
    id: number,
    shortName: string,
    fullName: string,
    owner: IPerson,
    description: string | null,
    category: number
}