import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { ISpinnerProps } from './Props/ISpinnerProps';

const styles = {
    root: {
        padding: '20% calc(50% - 1rem)'
    },
    progress: {
        height: "20rem"
    },
    rootFlex: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default withStyles(styles)(({ classes, color, flex }: ISpinnerProps) => (
    <div className={flex === true ? classes.rootFlex : classes.root}>
        <CircularProgress color={!color ? "primary" : color}
            className={classes.progress} />
    </div>
));