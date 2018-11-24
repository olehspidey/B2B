import * as React from 'react';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CompanyIcon from '@material-ui/icons/Work';
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceWallet';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Tune';
import SearchIcon from '@material-ui/icons/Search';
import Spinner from '../components/common/Spinner';
import Button from '@material-ui/core/Button';

import { logOut } from '../Api/api';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { IUserPanelLayoutProps } from './Props/IUserPanelLayoutProps';
import { IUserPanelLayoutState } from './States/IUserPanelLayoutState';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        minWidth: '500px'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        backgroundColor: theme.palette.background.default,
        padding: '5rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
        // minHeight: '100vh'
    },
    link: {
        textDecoration: 'none'
    },
    toolbarActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingRight: '2rem'
    }
});

class UserPanelLayout extends React.Component<IUserPanelLayoutProps, IUserPanelLayoutState> {
    constructor(props: IUserPanelLayoutProps) {
        super(props);

        this.state = {
            open: false
        };
    }

    public renderUserInfo = () => {
        const { user, userLoading } = this.props;

        if (user !== null && !userLoading) {
            return (
                <Typography variant="title" color="inherit" noWrap>
                    {`${user.name} ${user.lastName}`}
                </Typography>
            );
        }

        if (userLoading) {
            return (<Spinner flex={true} color="secondary" />);
        }

        return null;
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.toolbarActions}>
                            {
                                this.renderUserInfo()
                            }
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.onLogout}>Logout</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to={`/user/companies`} className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <CompanyIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Companies" />
                            </ListItem>
                        </Link>
                        <Link to={`/user/search`} className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <SearchIcon />
                                </ListItemIcon>
                                <ListItemText primary="Search Companies" />
                            </ListItem>
                        </Link>
                        <Link to={`/user/subscription`} className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Subscription" />
                            </ListItem>
                        </Link>
                        <Link to={`/user/settings`} className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {
                        this.props.children
                    }
                </main>
            </div>
        );
    }

    private handleDrawerOpen = () => this.setState({ open: true });

    private handleDrawerClose = () => this.setState({ open: false });

    private onLogout = () => logOut();
}

export default withStyles(styles)(UserPanelLayout);