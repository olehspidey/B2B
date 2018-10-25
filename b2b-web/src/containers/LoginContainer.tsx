import * as React from 'react';
import LoginForm from '../components/LoginForm';

class LoginContainer extends React.Component {
    public onLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        console.log(e);
    }
    public render() {
        return (
            <LoginForm loading={false} onLogin={this.onLogin} />
        )
    }
}

export default LoginContainer;