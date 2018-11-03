import { IUser } from "../../Core/Models/ReducerModels/User/IUser";

export interface IUserPanelScreenState {
    userLoading: boolean,
    currentUser: IUser | null
}