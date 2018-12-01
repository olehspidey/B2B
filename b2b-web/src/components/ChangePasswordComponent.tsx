import * as React from 'react';
import TextFild from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { IChangePasswordComponentProps } from './Props/IChangePasswordComponentProps';
import { IChangePasswordComponentState } from './State/IChangePasswordComponentState';
import { createStyles, withStyles } from '@material-ui/core';

const styles = createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    }
});

class ChangePasswordComponent extends React.Component<IChangePasswordComponentProps, IChangePasswordComponentState> {
    constructor(props: IChangePasswordComponentProps) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: ''
        }
    }
    public render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} onSubmit={this.onSendResetEmailToken}>
                <TextFild
                    label="Old password"
                    placeholder="Input your old password"
                    value={this.state.oldPassword}
                    onChange={this.onChangeOldPassword}
                    required
                    margin="normal"
                />
                <TextFild
                    label="New password"
                    placeholder="Input your new password"
                    value={this.state.newPassword}
                    onChange={this.onChangeNewPassword}
                    required
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary">Change</Button>
            </form>
        );
    }

    private onChangeOldPassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => this.setState({ oldPassword: target.value });

    private onChangeNewPassword = ({ target }: React.ChangeEvent<HTMLInputElement>) => this.setState({ newPassword: target.value });

    private onSendResetEmailToken(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        alert('Ups! This functionality in developing');
    }
}

export default withStyles(styles)(ChangePasswordComponent);