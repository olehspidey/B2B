import { IKeyWord } from '../../../Core/Models/ReducerModels/Companies/IKeyWord';

export interface IKeyWordsMultiSelectComponentProps {
    classes: {
        actions: string,
        but: string,
        chipesBox: string,
        chip: string,
        suggestion: string,
        padTop: string
    },
    keyWords?: IKeyWord[],
    loading: boolean,
    withButton?: boolean,
    onChangeKeyWords?: (keyWords: IKeyWord[]) => void
}