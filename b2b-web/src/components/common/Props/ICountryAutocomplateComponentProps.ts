import { ICountry } from '../../../Core/Models/ReducerModels/Companies/ICountry';

export interface ICountryAutocomplateComponentProps {
    classes: {
        suggestion: string
    },
    onSelected: (country: ICountry) => void
}