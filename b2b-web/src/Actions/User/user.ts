import { IUser } from '../../Core/Models/ReducerModels/User/IUser';
import { IError } from '../IError';
import { Dispatch } from 'redux';
import userService from '../../services/user';
import { handleError } from '../handleError';

export const FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER_REQUEST';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE';

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
            response => fetchCurrentUserSuccess(response.data),
            error => handleError(dispatch, error.response, fetchCurrentUserFailure)
        );
}