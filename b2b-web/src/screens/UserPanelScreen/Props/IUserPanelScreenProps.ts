import { IUserResponseAction } from '../../../Actions/User/IUserResponseAction';
import { IUserState } from '../../../Reducers/User/IUserState';

export interface IUserPanelScreenProps {
    userState: IUserState,
    fetchCurrentUserRequest(): Promise<IUserResponseAction>
}