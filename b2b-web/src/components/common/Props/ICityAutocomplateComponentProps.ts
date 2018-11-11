import { IPlace } from '../../../Core/Models/ReducerModels/Companies/IPlace';

export interface ICityAutocomplateComponentProps {
    classes: {
        suggestion: string
    },
    required?: boolean,
    label?: string,
    onSelected: (city: IPlace) => void
}