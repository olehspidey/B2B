import { IPlace } from '../../../Core/Models/ReducerModels/Companies/IPlace';

export interface ICountryAutocomplateComponentProps {
    classes: {
        suggestion: string,
        list: string
    },
    required?: boolean,
    label?: string,
    onSelected: (country: IPlace) => void
}