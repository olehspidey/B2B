import { IAddress } from './IAddress';

export interface IAddressResult {
    address_components: IAddress[],
    formatted_address: string,
    place_id: string
}