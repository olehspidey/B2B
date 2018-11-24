import { IUser } from '../../Core/Models/ReducerModels/User/IUser';
import { IError } from '../../Actions/IError';

export interface IUserState {
    currentUser: IUser | null,
    user: IUser | null,
    loading: boolean,
    editLoading: boolean,
    error: IError | null
}