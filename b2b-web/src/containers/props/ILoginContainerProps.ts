import { IFetchToken } from '../../Actions/Token/IFetchToken';
import { ITokenResponseAction } from '../../Actions/Token/ITokenResponseAction';

export interface ILoginContainerProps {
    accessToken: string | null;
    fetchToken(body: IFetchToken): Promise<ITokenResponseAction>;
}