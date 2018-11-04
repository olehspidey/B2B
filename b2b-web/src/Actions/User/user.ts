import { IUser } from '../../Core/Models/ReducerModels/User/IUser';
import { IError } from '../IError';
import { Dispatch } from 'redux';
import userService from '../../services/user';
import { handleError } from '../handleError';
import { ISendEmailToken } from './ISendEmailToken';
import { IChangeEmail } from './IChangeEmail';

export const FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER_REQUEST';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE';

export const SEND_RESET_EMAIL_TOKEN_REQUEST = 'SEND_RESET_EMAIL_TOKEN_REQUEST';
export const SEND_RESET_EMAIL_TOKEN_SUCCESS = 'SEND_RESET_EMAIL_TOKEN_SUCCESS';
export const SEND_RESET_EMAIL_TOKEN_FAILURE = 'SEND_RESET_EMAIL_TOKEN_FAILURE';

export const CHANGE_EMAIL_REQUEST = 'CHANGE_EMAIL_REQUEST';
export const CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS';
export const CHANGE_EMAIL_FAILURE = 'CHANGE_EMAIL_FAILURE';

const fetchCurrentUserRequest = () => ({
    type: FETCH_CURRENT_USER_REQUEST
});

const fetchCurrentUserSuccess = (currentUser: IUser) => ({
    type: FETCH_CURRENT_USER_SUCCESS,
    currentUser
});

const fetchCurrentUserFailure = (error: IError) => ({
    type: FETCH_CURRENT_USER_FAILURE,
    error
});

export const fetchCurrentUser = () => async (dispatch: Dispatch) => {
    dispatch(fetchCurrentUserRequest());

    return userService
        .fetchCurrentUser()
        .then(
            response => dispatch(fetchCurrentUserSuccess(response.data)),
            error => handleError(dispatch, error, fetchCurrentUserFailure)
        );
};

const sendResetEmailTokenRequest = () => ({
    type: SEND_RESET_EMAIL_TOKEN_REQUEST
});

const sendResetEmailTokenSuccess = () => ({
    type: SEND_RESET_EMAIL_TOKEN_SUCCESS
});

const sendResetEmailTokenFailure = (error: IError) => ({
    type: SEND_RESET_EMAIL_TOKEN_FAILURE,
    error
});

export const sendResetEmailToken = (body: ISendEmailToken) => async (dispatch: Dispatch) => {
    dispatch(sendResetEmailTokenRequest());

    return userService
        .sendResetEmailToken(body)
        .then(
            () => (dispatch(sendResetEmailTokenSuccess())),
            error => handleError(dispatch, error.response, sendResetEmailTokenFailure)
        );
};

const changeEmailRequest = () => ({
    type: CHANGE_EMAIL_REQUEST
});

const changeEmailSuccess = (currentUser: IUser) => ({
    type: CHANGE_EMAIL_SUCCESS,
    currentUser
});

const changeEmailFailure = (error: IError) => ({
    type: CHANGE_EMAIL_FAILURE,
    error
});

export const changeEmail = (body: IChangeEmail) => async (dispatch: Dispatch) => {
    dispatch(changeEmailRequest());

    return userService
        .changeEmail(body)
        .then(
            resp => dispatch(changeEmailSuccess(resp.data)),
            error => handleError(dispatch, error, changeEmailFailure)
        );
}