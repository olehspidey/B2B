import * as React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect, Link } from 'react-router-dom';
// import Spinner from '../components/Spinner';
import blue from '@material-ui/core/colors/blue';
// import ErrorMessageSnackBar from '../components/Common/ErrorMessageSnackBar';
import { ILoginFormProps } from '../screens/Login/Props/ILoginFormProps';
import { ILoginFormState } from '../screens/Login/States/ILoginFormState';

const styles = (theme: Theme) => createStyles({
    container: {
        padding: '5rem 25%'
    },
    textField: {
        marginTop: theme.spacing.unit,
    },
    button: {
        margin: '2rem 0'
    },
    formElems: {
        display: 'flex',
        flexDirection: 'column',
    },
    link: {
        marginTop: theme.spacing.unit,
        color: blue[500]
    }
});

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
    constructor(props: ILoginFormProps) {
        super(props);
        this.state = {
            login: '',
            password: '',
            canRedirect: false,
            isError: false
        }
    }

    public onLoginChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({ login: target.value });

    public onPasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({ password: target.value });

    public onLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        this.props.onLogin({
            password: this.state.password,
            userName: this.state.login
        });
    }

    // private onCloseErrorMessage = () => this.setState({ isError: false });

    public render() {
        const { classes } = this.props;
        const { login, password, canRedirect } = this.state;

        if (canRedirect) {
            return <Redirect to="/account/settings" />
        }

        return (
            <form onSubmit={this.onLogin} className={classes.container}>
                {
                    <div className={classes.formElems}>
                        <TextField
                            label="Login"
                            className={classes.textField}
                            helperText="Input your login"
                            value={login}
                            onChange={this.onLoginChange}
                            required={true}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            className={classes.textField}
                            helperText="Input your password"
                            value={password}
                            onChange={this.onPasswordChange}
                            required={true}
                        />
                        <Link to="/registration" className={classes.link}>Registration?</Link>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            type="submit">Login</Button>
                    </div>
                }
            </form>
        )
    }
}

export default withStyles(styles)(LoginForm);