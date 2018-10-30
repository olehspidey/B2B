import { IUser } from '../../Core/Models/ReducerModels/User/IUser';
import { IError } from '../IError';
import { Dispatch } from 'redux';
import userService from '../../services/user';
import { handleError } from '../handleError';

export const FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER__REQUEST';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE';

const fetchCurrentUserRequest = () => ({
    type: FETCH_CURRENT_USER_REQUEST
});

const fetchCurrentUserSuccess = (user: IUser) => ({
    type: FETCH_CURRENT_USER_SUCCESS,
    user
});

const fetchCurrentUserFailure = (error: IError) => ({
    type: fetchCurrentUserFailure,
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