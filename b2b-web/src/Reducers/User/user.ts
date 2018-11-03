import {
    FETCH_CURRENT_USER_REQUEST,
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_CURRENT_USER_FAILURE
} from '../../Actions/User/user';
import { IUserState } from './IUserState';
import { IUserAction } from '../../Actions/User/IUserAction';

const userState: IUserState = {
    currentUser: null,
    user: null,
    loading: false,
    editLoading: false,
    error: null
};

export default (state = userState, action: IUserAction): IUserState => {
    switch (action.type) {
        case FETCH_CURRENT_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.currentUser
            };
        case FETCH_CURRENT_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return { ...state };
    }
}