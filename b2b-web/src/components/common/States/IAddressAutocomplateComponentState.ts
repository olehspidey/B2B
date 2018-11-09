import { IAddress } from '../../../Core/Models/Google/IAddress';

export interface IAddressAutocomplateComponentState {
    country: string,
    suggestions: IAddress[]
}