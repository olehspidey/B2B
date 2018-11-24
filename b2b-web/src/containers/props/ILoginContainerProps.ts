import { IFetchToken } from '../../Actions/Token/IFetchToken';
import { ITokenResponseAction } from '../../Actions/Token/ITokenResponseAction';
import { ITokenState } from '../../Reducers/Token/ITokenState';

export interface ILoginContainerProps {
    accessToken: ITokenState;
    fetchToken(body: IFetchToken): Promise<ITokenResponseAction>;
}