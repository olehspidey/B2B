import { IAddressResult } from './IAddressResult';

export interface IAddressResponse {
    results: IAddressResult[],
    status: string
}