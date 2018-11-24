import { RouteComponentProps } from 'react-router';
import { IResetPassword } from '../../Actions/User/IResetPassword';
import { IUserResponseAction } from '../../Actions/User/IUserResponseAction';
import { IUserState } from '../../Reducers/User/IUserState';
import { IFetchToken } from '../../Actions/Token/IFetchToken';
import { ITokenResponseAction } from '../../Actions/Token/ITokenResponseAction';
import { ITokenState } from '../../Reducers/Token/ITokenState';

interface ISetPasswordContainerRouteParams {
    token: string,
    userId: string
}

export interface ISetPasswordContainerProps extends RouteComponentProps<ISetPasswordContainerRouteParams> {
    classes: {
        root: string,
        form: string
    },
    usersState: IUserState,
    tokenState: ITokenState,
    resetPassword: (body: IResetPassword) => Promise<IUserResponseAction>
    fetchToken: (body: IFetchToken) => Promise<ITokenResponseAction>
}