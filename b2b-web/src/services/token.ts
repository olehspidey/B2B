import { publicApi } from '../Api/api';
import { IFetchToken } from '../Actions/Token/IFetchToken';

export default {
    fetchToken(body: IFetchToken) {
        return publicApi
            .post('/api/token', body);
    }
}