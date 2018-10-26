import { authApi } from '../Api/api';
import { IFetchToken } from '../Actions/Token/IFetchToken';

export default {
    fetchToken(body: IFetchToken) {
        return authApi
            .post('/api/token', body);
    }
}