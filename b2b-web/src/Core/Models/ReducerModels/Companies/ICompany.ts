import { IPerson } from '../../../Models/ReducerModels/Companies/IPerson';
import { IAddress } from './IAddress';
import { IKeyWord } from './IKeyWord';

export interface ICompany {
    id: number,
    shortName: string,
    fullName: string,
    owner: IPerson,
    description: string | null,
    category: number,
    address: IAddress,
    canEdit: boolean,
    canMoveToSuggests: boolean,
    keyWords: IKeyWord[],
    suggestion: boolean
}