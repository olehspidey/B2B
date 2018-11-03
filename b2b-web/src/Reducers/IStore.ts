import { ITokenState } from "./Token/ITokenState";
import { IUserState } from "./User/IUserState";
import { ITokenAction } from "../Actions/Token/ITokenAction";
import { IUserAction } from "../Actions/User/IUserAction";

export interface IStore {
    token: (state: ITokenState, action: ITokenAction) => ITokenState,
    users: (state: IUserState, action: IUserAction) => IUserState
}