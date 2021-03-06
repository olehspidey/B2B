import { IApplicationFormsState } from '../../../Reducers/ApplicationForms/IApplicationFormsState';
import { IApplicationFormResponseAction } from '../../../Actions/ApplicationForms/IApplicationFormResponseAction';
import { RouteComponentProps } from 'react-router';
import { ICreateUserByForm } from '../../../Actions/User/ICreateUserByForm';
import { IEnotherUserReponseAction } from '../../../Actions/User/IEnotherUserReponseAction';
import { IUserState } from '../../../Reducers/User/IUserState';

interface IApplicationFormRouteParams {
    id: string
}

export interface IApplicationFormContainerProps extends RouteComponentProps<IApplicationFormRouteParams> {
    classes: {
        root: string,
        paper: string,
        editButBox: string
    }
    applicationFormsState: IApplicationFormsState,
    usersState: IUserState,
    fetchApplicationForm: (id: string) => Promise<IApplicationFormResponseAction>,
    createUserByForm: (body: ICreateUserByForm) => Promise<IEnotherUserReponseAction>
}