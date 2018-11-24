import * as React from 'react';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';

import { withStyles, createStyles, Theme } from '@material-ui/core';

interface IApplicationFormStatusProps {
    classes: {
        root: string,
        new: string,
        confirmed: string,
        rejected: string,
        status: string
    },
    status: number,
    text?: string
}

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    status: {
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        boxShadow: theme.shadows[1],
        margin: '.5rem'
    },
    new: {
        background: green[500]
    },
    confirmed: {
        background: theme.palette.primary.main
    },
    rejected: {
        background: theme.palette.error.main
    }
});

const statusToClass = (status: number, classes: any) => {
    switch (status) {
        case 0:
            return classes.new;
        case 1:
            return classes.confirmed;
        case 2:
            return classes.rejected;
        default:
            return classes.rejected;
    }
}

export default withStyles(styles)(
    ({ classes, status, text }: IApplicationFormStatusProps) => (
        <div className={classes.root}>
            {
                text && <Typography variant="title">{text}</Typography>
            }
            <div className={classNames(statusToClass(status, classes), classes.status)} />
        </div>
    )
);