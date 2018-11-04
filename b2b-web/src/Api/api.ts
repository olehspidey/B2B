import api from 'axios';
import { IBearerAuthorization } from './IBearerAuthorization';

export const ACCESS_TOKE = 'token';

const PROTOCOL = 'http';
const HOST_NAME = 'localhost';
const PORT = 5000;
const PROD_PROTOCOL = 'https';
const PROD_HOST_NAME = '';

const getApiUrl = () => {
    let apiUrl = `${PROTOCOL}://${HOST_NAME}:${PORT}`;

    if (!process || !process.env || process.env.NODE_ENV !== 'development') {
        apiUrl = `${PROD_PROTOCOL}://${PROD_HOST_NAME}`;
    }

    return apiUrl;
}

export const logIn = (token: string) => {
    localStorage.setItem(ACCESS_TOKE, token);
}

export const logOut = () => {
    localStorage.removeItem(ACCESS_TOKE);
    window.location.replace('/login');
}

export const API_URL = getApiUrl();

export const headerToken = (token: string | null): IBearerAuthorization => {
    if (token === null) {
        throw new Error('Token can not be null');
    }

    return {
        Authorization: `Bearer ${token}`
    };
}

const getPrivateApi = () => {
    if (localStorage.getItem(ACCESS_TOKE) === null) {
        window.location.replace(`/login`);
        return api;
    }
    else {
        return api.create({
            headers: headerToken(localStorage.getItem(ACCESS_TOKE))
        });
    }
};

export const authApi = api.create(
    {
        baseURL: API_URL
    }
);

export const apiGet = (url: string) => {
    return getPrivateApi()
        .get(`${API_URL}${url}`)
        .then(resp => resp, ({ response }) => {
            if (response.status === 401 || response.status === 403) {
                window.location.replace('/login');
                return response;
            }
            return Promise.reject(response);
        });
};

export const apiPost = (url: string, body: any) => {
    return getPrivateApi()
        .post(`${API_URL}${url}`, body)
        .then(resp => resp, ({ response }) => {
            if (response.status === 401 || response.status === 403) {
                window.location.replace('/login');
                return response;
            }
            return Promise.reject(response);
        });
};

export const apiPut = (url: string, body: any) => {
    return getPrivateApi()
        .put(`${API_URL}${url}`, body)
        .then(resp => resp, ({ response }) => {
            if (response.status === 401 || response.status === 403) {
                window.location.replace('/login');
                return response;
            }
            return Promise.reject(response);
        });
};

export const apiDelete = (url: string) => {
    return getPrivateApi()
        .delete(`${API_URL}${url}`)
        .then(resp => resp, ({ response }) => {
            if (response.status === 401 || response.status === 403) {
                window.location.replace('/login');
                return response;
            }
            return Promise.reject(response);
        });
};