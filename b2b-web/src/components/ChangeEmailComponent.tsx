import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { IChangeEmailProps } from './Props/IChangeEmailProps';
import { withStyles, createStyles } from '@material-ui/core';
import { IChangeEmailComponentState } from './State/IChangeEmailComponentState';
import Spinner from './common/Spinner';

const styles = createStyles({
    root: {
        width: '100%'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    saveBut: {
        marginTop: '.5rem'
    }
});

class ChangeEmailComponent extends React.Component<IChangeEmailProps, IChangeEmailComponentState>{
    constructor(props: IChangeEmailProps) {
        super(props);

        this.state = {
            newEmail: '',
            canShowConfirmationForm: false,
            token: ''
        } as IChangeEmailComponentState;
    }

    public onSendEmailTokenClick = () => {
        const { newEmail } = this.state;

        this
            .props
            .onSendEmailTokenClick({ newEmail })
            .then(() => this.setState({ canShowConfirmationForm: true }));
    }

    public onConfirmEmailToken = () => {
        const { token, newEmail } = this.state;

        this.props.onConfirmEmailToken({
            newEmail,
            token
        })
            .then(() => this.setState({ canShowConfirmationForm: false }));
    }

    public onChangeNewEmail = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ newEmail: e.target.value });

    public onChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ token: e.target.value });

    public renderChangeEmailForm = () => {
        const { classes, loading } = this.props;
        const { canShowConfirmationForm } = this.state;

        if (loading) {
            return (<Spinner />)
        }

        if (!canShowConfirmationForm) {
            return (
                <div className={classes.form}>
                    <TextField
                        label="Old email"
                        value={this.props.oldEmail}
                        disabled />
                    <TextField
                        label="Input new email"
                        value={this.state.newEmail}
                        onChange={this.onChangeNewEmail} />
                    <Button
                        className={classes.saveBut}
                        color="primary"
                        variant="outlined"
                        onClick={this.onSendEmailTokenClick}>Change</Button>
                </div>
            );
        }

        if (canShowConfirmationForm) {
            return (
                <div className={classes.form} >
                    <TextField
                        label="Input confirmation token"
                        value={this.state.token}
                        onChange={this.onChangeToken} />
                    <Button
                        className={classes.saveBut}
                        color="primary"
                        variant="outlined"
                        onClick={this.onConfirmEmailToken}>Confirm</Button>
                </div >
            );
        }

        return null;
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {
                    this.renderChangeEmailForm()
                }
            </div>
        );
    }
}

export default withStyles(styles)(ChangeEmailComponent);