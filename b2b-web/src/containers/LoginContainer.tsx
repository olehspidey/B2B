import * as React from 'react';
import LoginForm from '../components/LoginForm';
import { IFetchToken } from '../Actions/Token/IFetchToken';

class LoginContainer extends React.Component {
    public onLogin(body: IFetchToken) {
        console.log(body);
    }
    public render() {
        return (
            <LoginForm loading={false} onLogin={this.onLogin} />
        )
    }
}

export default LoginContainer;