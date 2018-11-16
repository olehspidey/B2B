import { ICreateCompany } from './ICreateCompany';
import { IKeyWord } from '../../Core/Models/ReducerModels/Companies/IKeyWord';

export interface IEditCompany extends ICreateCompany {
    id: number,
    keyWords: IKeyWord[]
}