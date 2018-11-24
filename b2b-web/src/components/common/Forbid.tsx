import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles, createStyles, Theme } from '@material-ui/core';
import { INotFoundProps } from './Props/INotFoundProps';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing.unit
    }
});

export default withStyles(styles)(({ classes }: INotFoundProps) => (
    <div className={classes.root}>
        <Typography variant="display3">Forbid</Typography>
    </div>
));