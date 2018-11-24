import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../components/common/Logo';

import { IAuthLayoutProps } from './Props/IAuthLayoutProps';
import { withStyles, createStyles } from '@material-ui/core/styles';

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
                            <Logo
                                url="/"
                                height="4rem"
                                width="7rem" />
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