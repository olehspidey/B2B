import { Dispatch, AnyAction } from 'redux';
import { IError } from './IError';

export const handleError = (dispatch: Dispatch, error: any, failFunc: (e: IError | null) => AnyAction) => {
    console.error('error from handle', error);
    let errorVal: IError | null = null;

    if (error === undefined) {
        errorVal = {
            message: 'No internet connection',
            status: 0
        } as IError;
    }
    if (error.response) {
        errorVal = {
            message: error.response.data,
            status: error.response.status
        }
    }
    else {
        errorVal = {
            message: error.data,
            status: error.status
        }
    }

    if (error && error.status >= 400) {
        dispatch(failFunc(errorVal));
        return Promise.reject(errorVal);
    }

    dispatch(failFunc(errorVal));
    return Promise.reject(errorVal);
};