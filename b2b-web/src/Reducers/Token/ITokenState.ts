import { IError } from '../../Actions/IError';

export interface ITokenState {
    accessToken: string | null,
    loading: boolean,
    error: IError | null
}