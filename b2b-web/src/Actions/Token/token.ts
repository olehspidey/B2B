import { IFetchToken } from './IFetchToken';
import { IError } from '../IError';
import { Dispatch } from 'redux';

import tokenService from '../../services/token';
import { IToken } from '../../Core/Models/ReducerModels/Token/IToken';
import { handleError } from '../handleError';

export const FETCH_TOKE_REQUEST = 'FETCH_TOKE_REQUEST';
export const FETCH_TOKE_FAILURE = 'FETCH_TOKE_FAILURE';
export const FETCH_TOKE_SUCCESS = 'FETCH_TOKE_SUCCESS';

const fetchTokenRequest = () => ({
    type: FETCH_TOKE_REQUEST
});

const fetchTokenSuccess = (token: IToken) => ({
    type: FETCH_TOKE_SUCCESS,
    token
});

const fetchTokenFailure = (error: IError) => ({
    type: FETCH_TOKE_FAILURE,
    error
});

export const fetchToken = (body: IFetchToken) => async (dispatch: Dispatch) => {
    dispatch(fetchTokenRequest());

    return tokenService.fetchToken(body)
        .then(
            resp => dispatch(fetchTokenSuccess(resp.data.accessToken)),
            error => handleError(dispatch, error.response, fetchTokenFailure)
        );
};