import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from '../components/common/Spinner';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';

import { ILoginFormProps } from '../screens/Login/Props/ILoginFormProps';
import { ILoginFormState } from '../screens/Login/States/ILoginFormState';
import { Redirect, Link } from 'react-router-dom';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    container: {
        padding: '5rem 25%'
    },
    textField: {
        marginTop: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit
    },
    formElems: {
        display: 'flex',
        flexDirection: 'column',
    },
    link: {
        color: blue[500],
        marginLeft: theme.spacing.unit
    },
    linkBox: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.spacing.unit * 2
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

    public render() {
        const { classes, loading } = this.props;
        const { login, password, canRedirect } = this.state;

        if (canRedirect) {
            return <Redirect to="/account/settings" />
        }

        return (
            <form onSubmit={this.onLogin} className={classes.container}>
                {
                    loading ? <Spinner /> : <div className={classes.formElems}>
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
                        <div className={classes.linkBox}>
                            <Typography variant="subtitle1">If you havn't account: </Typography>
                            <Link to="/registration" className={classes.link}>Registration</Link>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type="submit">Login</Button>
                        </div>
                    </div>
                }
            </form>
        )
    }
}

export default withStyles(styles)(LoginForm);