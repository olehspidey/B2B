import { IPlace } from '../../../Core/Models/ReducerModels/Companies/IPlace';

export interface ICityAutocomplateComponentProps {
    classes: {
        suggestion: string
    },
    onSelected: (city: IPlace) => void
}