import { IKeyWord } from '../../../Core/Models/ReducerModels/Companies/IKeyWord';

export interface IKeyWordsMultiSelectComponentProps {
    classes: {
        root: string,
        actions: string,
        but: string,
        chipesBox: string,
        chip: string
    },
    keyWords: IKeyWord[],
    loading: boolean,
    onAddKeyWord?: (keyWords: IKeyWord[]) => void
}