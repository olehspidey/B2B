import { IUser } from "../../Core/Models/ReducerModels/User/IUser";
import { ISendEmailToken } from "../../Actions/User/ISendEmailToken";
import { IChangeEmail } from "../../Actions/User/IChangeEmail";
import { IUserResponseAction } from '../../Actions/User/IUserResponseAction';
import { IUserState } from "../../Reducers/User/IUserState";

export interface IUserSettingsContainerProps {
    classes: {
        root: string
    },
    user: IUser | null,
    userLoading: boolean,
    sendResetEmailToken: (body: ISendEmailToken) => Promise<any>,
    changeEmail: (body: IChangeEmail) => Promise<IUserResponseAction>,
    userState: IUserState
}