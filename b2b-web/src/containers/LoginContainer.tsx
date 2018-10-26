import * as React from 'react';
import LoginForm from '../components/LoginForm';
import BaseContainer from './BaseContainer';
import { IFetchToken } from '../Actions/Token/IFetchToken';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { fetchToken } from '../Actions/Token/token';
import { ITokenState } from '../Reducers/Token/ITokenState';
import { ThunkDispatch } from 'redux-thunk';
import { IError } from '../Actions/IError';
import { ITokenResponseAction } from '../Actions/Token/ITokenResponseAction';
import { IBaseContainerState } from './states/IBaseContainerState';

interface ILoginContainerProps {
    accessToken: string | null;
    fetchToken(body: IFetchToken): Promise<ITokenResponseAction>;
}

class LoginContainer extends BaseContainer<ILoginContainerProps> {
    constructor(props: ILoginContainerProps) {
        super(props);
    }

    public componentDidUpdate(nextProps: ILoginContainerProps, nextState: IBaseContainerState) {
        super.componentWillUpdate(nextProps, nextState);
    }

    public onLogin = (body: IFetchToken) => {
        console.log(this.state.errorMessage);

        this.props.fetchToken(body)
            .then((resp) => console.log('r', resp.token))
            .catch((err: IError) => this.setState({ canRenderErrorMessage: true, errorMessage: err.message }));
    }

    public render() {
        return (
            <div>
                <LoginForm loading={false} onLogin={this.onLogin} />
                {
                    super.render()
                }
            </div>
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