import { Dispatch, AnyAction } from 'redux';
import { IError } from './IError';

export const handleError = (dispatch: Dispatch, error: any, failFunc: (e: IError) => AnyAction) => {
    console.error('error from handle', error);
    const errorVal = {
        message: error.data,
        status: error.status
    };

    if (error && error.status >= 400) {
        dispatch(failFunc(errorVal));
        return Promise.reject(errorVal);
    }

    dispatch(failFunc(errorVal));
    return Promise.reject(errorVal);
};