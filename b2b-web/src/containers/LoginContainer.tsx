import * as React from 'react';
import LoginForm from '../components/LoginForm';
import { IFetchToken } from '../Actions/Token/IFetchToken';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { fetchToken } from '../Actions/Token/token';
import { ITokenState } from '../Reducers/Token/ITokenState';
import { ThunkDispatch } from 'redux-thunk';
import { IError } from '../Actions/IError';
import { ITokenResponseAction } from '../Actions/Token/ITokenResponseAction';

interface ILoginContainerProps {
    accessToken: string | null;
    fetchToken(body: IFetchToken): Promise<ITokenResponseAction>;
}

class LoginContainer extends React.Component<ILoginContainerProps> {
    constructor(props: ILoginContainerProps) {
        super(props);
    }

    public onLogin = (body: IFetchToken) => {
        console.log(this.props);

        this.props.fetchToken(body)
            .then((resp) => console.log('r', resp.token))
            .catch((err: IError) => console.log('err', err.status));
    }

    public render() {
        return (
            <LoginForm loading={false} onLogin={this.onLogin} />
        )
    }
}

const mapStateToProps = (state: ITokenState) => {
    return {
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<ITokenState, void, Action>) => {
    return {
        fetchToken: (body: IFetchToken) => dispatch(fetchToken(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);