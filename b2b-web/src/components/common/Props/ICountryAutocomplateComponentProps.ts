import { IPlace } from '../../../Core/Models/ReducerModels/Companies/IPlace';

export interface ICountryAutocomplateComponentProps {
    classes: {
        suggestion: string,
        list: string
    },
    required?: boolean,
    label?: string,
    country?: google.maps.places.AutocompletePrediction,
    onSelected: (country: IPlace) => void
}