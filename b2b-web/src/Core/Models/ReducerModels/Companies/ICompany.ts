import { IPerson } from '../../../Models/ReducerModels/Companies/IPerson';
import { IAddress } from './IAddress';

export interface ICompany {
    id: number,
    shortName: string,
    fullName: string,
    owner: IPerson,
    description: string | null,
    category: number,
    address: IAddress,
    canEdit: boolean
}