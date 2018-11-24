import { IKeyWord } from '../../../Core/Models/ReducerModels/Companies/IKeyWord';

export interface IKeyWordsMultiSelectComponentState {
    keyWords: IKeyWord[],
    inputValue: string,
    suggestions: IKeyWord[],
    selected: IKeyWord | null
}