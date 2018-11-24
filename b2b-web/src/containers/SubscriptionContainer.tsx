import * as React from 'react';
import Spinner from '../components/common/Spinner';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SubscriptionComponent from '../components/common/SubscriptionComponent';
import TimerDownComponent from '../components/common/TimerDownComponent';

import { ISubscriptionContainerProps } from './props/ISubscriptionContainerProps';
import { withStyles, createStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
    paper: {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '.5rem 0'
    },
    link: {
        color: theme.palette.primary.main,
        marginTop: '1rem'
    },
    but: {
        marginTop: '1rem'
    },
    subTimer: {
        marginTop: '1rem'
    }
})

class SubscriptionContainer extends React.Component<ISubscriptionContainerProps> {

    public renderUserBill = () => {
        const { user, userLoading, classes } = this.props;

        if (userLoading) {
            return (<Spinner />);
        }

        if (!userLoading && user !== null) {
            return (
                <Paper className={classes.paper}>
                    <Typography
                        component="h1"
                        variant="h5">{`Your bill is ${user.bill}$`}</Typography >
                    <Button
                        className={classes.but}
                        variant="outlined"
                        color="secondary">Refill</Button>
                </Paper>
            );
        }

        return null;
    }

    public renderUserSubscriptionInfo = () => {
        const { user, userLoading, classes } = this.props;

        if (userLoading) {
            return (<Spinner />);
        }

        if (!userLoading && user !== null) {
            return (
                <Paper className={classes.paper}>
                    <SubscriptionComponent
                        subscriptionType={user.subscription.subscriptionType}
                        text="Your subscription types is"
                        variant="h5" />
                    <TimerDownComponent
                        className={classes.subTimer}
                        endTime={new Date(user.subscription.end)} />
                    <Button
                        className={classes.but}
                        variant="outlined">Change</Button>
                    <Link
                        className={classes.link}
                        to={`/user/subscription/info/${user.subscription.subscriptionType}`} >More information about your subscription</Link>
                </Paper>
            );
        }

        return null;
    }

    public render() {
        return (
            <div>
                {
                    this.renderUserBill()
                }
                {
                    this.renderUserSubscriptionInfo()
                }
            </div>
        );
    }
}

export default withStyles(styles)(SubscriptionContainer);