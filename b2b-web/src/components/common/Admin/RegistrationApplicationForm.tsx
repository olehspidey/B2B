import * as React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SubscriptionSelect from '../../common/SubscriptionSelect';

import { createStyles, withStyles, Theme } from '@material-ui/core';
import { IRegistrationApplicationFormProps } from './props/IRegistrationApplicationFormProps';
import { IRegistrationApplicationFormState } from './states/IRegistrationApplicationFormState';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 20%'
    },
    butBox: {
        marginTop: theme.spacing.unit
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
                    value={this.state.name}
                />
                <TextField
                    label="Last name"
                    placeholder="Input your last name"
                    required
                    value={this.state.lastName}
                />
                <TextField
                    label="Email"
                    placeholder="Input your email"
                    required
                    type="email"
                    value={this.state.email}
                />
                <TextField
                    label="Phone number"
                    placeholder="Input your phone number"
                    required
                    value={this.state.phoneNumber}
                />
                <SubscriptionSelect onSelect={this.onSubscriptionTypeSelect} />
                <div className={classes.butBox}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit">Send</Button>
                </div>
            </form>
        );
    }

    private onSubscriptionTypeSelect = (subscriptionType: number) => this.setState({ subscriptionType });

    private onSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onCreateApplicationForm(this.state);
    }
}

export default withStyles(styles)(RegistrationApplicationForm);