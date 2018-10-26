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
import { ILoginContainerProps } from './props/ILoginContainerProps';
import { ILoginContainerState } from './states/ILoginContainerState';
import { Redirect } from 'react-router-dom';
import { logIn } from '../Api/api';

class LoginContainer extends BaseContainer<ILoginContainerProps, ILoginContainerState> {
    constructor(props: ILoginContainerProps) {
        super(props);
    }

    public componentDidUpdate(nextProps: ILoginContainerProps, nextState: ILoginContainerState) {
        super.componentWillUpdate(nextProps, nextState);
    }

    public onLogin = (body: IFetchToken) => {
        console.log(this.state.errorMessage);

        this.props.fetchToken(body)
            .then((resp) => {
                logIn(resp.token.accessToken);
                this.setState({ canRedirect: true });
            })
            .catch((err: IError) => this.setState({ canRenderErrorMessage: true, errorMessage: err.message }));
    }

    public render() {
        if (this.state.canRedirect === true) {
            return (<Redirect to="/user/settings" />)
        }

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