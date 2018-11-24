import { IPlace } from '../../../Core/Models/ReducerModels/Companies/IPlace';

export interface ICityAutocomplateComponentProps {
    classes: {
        suggestion: string
    },
    required?: boolean,
    label?: string,
    city?: google.maps.places.AutocompletePrediction,
    onSelected: (city: IPlace) => void
}