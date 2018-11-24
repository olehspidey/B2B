import * as React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SubscriptionSelect from '../../common/SubscriptionSelect';
import Typography from '@material-ui/core/Typography';

import { createStyles, withStyles, Theme } from '@material-ui/core';
import { IRegistrationApplicationFormProps } from './props/IRegistrationApplicationFormProps';
import { IRegistrationApplicationFormState } from './states/IRegistrationApplicationFormState';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 20%'
    },
    butBox: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        justifyContent: 'center'
    },
    link: {
        color: theme.palette.primary.main
    },
    haveAccountBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing.unit
    }
});

class RegistrationApplicationForm extends React.Component<IRegistrationApplicationFormProps, IRegistrationApplicationFormState> {
    constructor(props: IRegistrationApplicationFormProps) {
        super(props);

        this.state = {
            email: '',
            lastName: '',
            name: '',
            phoneNumber: '',
            subscriptionType: -1
        }
    }
    public render() {
        const { classes } = this.props;

        return (
            <form
                className={classes.root}
                onSubmit={this.onSend}>
                <TextField
                    label="Name"
                    placeholder="Input your name"
                    required
                    onChange={this.onNameChange}
                    value={this.state.name}
                />
                <TextField
                    label="Last name"
                    placeholder="Input your last name"
                    required
                    onChange={this.onChangeLastName}
                    value={this.state.lastName}
                />
                <TextField
                    label="Email"
                    placeholder="Input your email"
                    required
                    onChange={this.onChangeEmail}
                    type="email"
                    value={this.state.email}
                />
                <TextField
                    label="Phone number"
                    placeholder="Input your phone number"
                    required
                    onChange={this.onChangePhone}
                    value={this.state.phoneNumber}
                />
                <SubscriptionSelect onSelect={this.onSubscriptionTypeSelect} />
                <div className={classes.butBox}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit">Registration</Button>
                </div>
                <Typography
                    className={classes.haveAccountBox}
                    variant="subtitle1">
                    <div>If you already have account:</div>
                    <Link
                        className={classes.link}
                        to="/login">Log in</Link>
                </Typography>
            </form>
        );
    }

    private onNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: target.value });

    private onChangeLastName = ({ target }: React.ChangeEvent<HTMLInputElement>) => this.setState({ lastName: target.value });

    private onChangeEmail = ({ target }: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: target.value });

    private onChangePhone = ({ target }: React.ChangeEvent<HTMLInputElement>) => this.setState({ phoneNumber: target.value });

    private onSubscriptionTypeSelect = (subscriptionType: number) => this.setState({ subscriptionType });

    private onSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this
            .props
            .onCreateApplicationForm(this.state)
            .then(() => {
                this.setState({
                    name: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    subscriptionType: -1
                });
            })
    }
}

export default withStyles(styles)(RegistrationApplicationForm);