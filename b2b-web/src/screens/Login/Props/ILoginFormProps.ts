import { IFetchToken } from '../../../Actions/Token/IFetchToken';

export interface ILoginFormProps {
    classes: {
        container: string,
        textField: string,
        button: string,
        formElems: string,
        link: string
    },
    loading: boolean,
    onLogin(body: IFetchToken): void
}