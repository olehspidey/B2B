import { IUser } from "../../Core/Models/ReducerModels/User/IUser";

export interface IUserSettingsContainerProps {
    classes: {
        form: string,
        saveBut: string
    },
    user: IUser | null,
    userLoading: boolean
}