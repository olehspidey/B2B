import {
    FETCH_CURRENT_USER_REQUEST,
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_CURRENT_USER_FAILURE,

    SEND_RESET_EMAIL_TOKEN_REQUEST,
    SEND_RESET_EMAIL_TOKEN_SUCCESS,
    SEND_RESET_EMAIL_TOKEN_FAILURE,

    CHANGE_EMAIL_REQUEST,
    CHANGE_EMAIL_SUCCESS,
    CHANGE_EMAIL_FAILURE,

    CREATE_USER_BY_FORM_REQUEST,
    CREATE_USER_BY_FORM_SUCCESS,
    CREATE_USER_BY_FORM_FAILURE
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
        case CREATE_USER_BY_FORM_REQUEST:
            return {
                ...state,
                loading: true
            };
        case SEND_RESET_EMAIL_TOKEN_REQUEST:
        case CHANGE_EMAIL_REQUEST:
            return {
                ...state,
                editLoading: true
            };
        case FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.currentUser
            };
        case CHANGE_EMAIL_SUCCESS:
        case SEND_RESET_EMAIL_TOKEN_SUCCESS:
            return {
                ...state,
                editLoading: false
            };
        case CREATE_USER_BY_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.user
            };
        case FETCH_CURRENT_USER_FAILURE:
        case CREATE_USER_BY_FORM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case CHANGE_EMAIL_FAILURE:
        case SEND_RESET_EMAIL_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                editLoading: false
            };
        default:
            return { ...state };
    }
}