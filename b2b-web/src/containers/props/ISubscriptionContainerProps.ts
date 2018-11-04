import { IUser } from "../../Core/Models/ReducerModels/User/IUser";

export interface ISubscriptionContainerProps {
    user: IUser | null,
    userLoading: boolean,
    classes: {
        paper: string,
        link: string,
        but: string,
        subTimer: string
    }
}