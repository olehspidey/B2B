import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IAuthLayoutProps } from './Props/IAuthLayoutProps';

const styles = createStyles({
    root: {
        flexGrow: 1,
    }
});

class AuthLayout extends React.Component<IAuthLayoutProps> {
    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="title" color="inherit">
                            B2B
                        </Typography>
                    </Toolbar>
                </AppBar>
                {
                    this.props.children
                }
            </div>
        )
    }
}

export default withStyles(styles)(AuthLayout);