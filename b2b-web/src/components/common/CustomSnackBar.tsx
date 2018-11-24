import * as React from 'react';
import green from '@material-ui/core/colors/green';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackBarContent from '@material-ui/core/SnackbarContent';
import InfoIcon from '@material-ui/icons/Info';
import classNames from 'classnames';

import { withStyles, createStyles, Theme } from '@material-ui/core';
import { ICustomSnackBarProps } from './Props/ICustomSnackBarProps';

const styles = (theme: Theme) => createStyles({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.main
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
});

const typeToClass = (type: string, { classes }: ICustomSnackBarProps) => {
    if (type === 'alert') {
        return classes.success;
    }
    if (type === 'error') {
        return classes.error
    };

    return classes.success;
}

class CustomSnackBar extends React.Component<ICustomSnackBarProps> {
    public render() {
        const { classes, open, message, autoHideDuration, type } = this.props;

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                onClose={this.onClose}
                autoHideDuration={autoHideDuration || 5000} >
                <SnackBarContent
                    className={type ? typeToClass(type, this.props) : classes.success}
                    message={<span
                        className={classes.message}
                        id="message-id">
                        <InfoIcon className={classNames(classes.icon, classes.iconVariant)} />
                        {message}</span>}
                    action={<IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.onClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>}
                />
            </Snackbar>
        );
    }

    private onClose = () => this.props.onClose();
}

export default withStyles(styles)(CustomSnackBar);