import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BatteryChargingIcon30 from '@material-ui/icons/BatteryCharging30';
import BatteryChargingIcon80 from '@material-ui/icons/BatteryCharging80';
import BatteryChargingIconFull from '@material-ui/icons/BatteryChargingFull';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import green from '@material-ui/core/colors/green';

import { withStyles, createStyles, Theme } from '@material-ui/core';
import { ISubscriptionSelectProps } from './Props/ISubscriptionSelectProps';
import { ISubscriptionSelectState } from './States/ISubscriptionSelectState';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    paper: {
        padding: '0 3rem 3rem 3rem',
        margin: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        width: '8rem',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    icon: {
        fontSize: '3rem'
    },
    lite: {
        border: `2px ${theme.palette.grey["500"]} solid`
    },
    base: {
        border: `2px ${theme.palette.primary.main} solid`
    },
    gold: {
        border: '2px #FFD700 solid'
    },
    green: {
        border: `2px ${green[500]} solid`
    },
    paddingTop: {
        paddingTop: '3rem'
    },
    margin: {
        margin: theme.spacing.unit / 2
    }
});

class SubscriptionSelect extends React.Component<ISubscriptionSelectProps, ISubscriptionSelectState>{
    constructor(props: ISubscriptionSelectProps) {
        super(props);

        this.state = {
            selects: [
                false,
                false,
                false,
                false
            ]
        }
    }
    public render() {
        const { classes } = this.props;
        const { selects } = this.state;

        return (
            (
                <div className={classes.root}>
                    <Paper className={classNames(classes.paper, classes.lite, !selects[0] ? classes.paddingTop : '')} >
                        {
                            selects[0] && <CheckIcon className={classes.icon} />
                        }
                        <Typography
                            variant="title"
                            color="textPrimary">Lite</Typography>
                        <BatteryChargingIcon30 className={classes.icon} />
                        <Typography
                            variant="headline"
                            color="textSecondary">5$</Typography>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            onClick={this.onClickLite}>Select<CheckIcon /></Button>
                        <Button
                            className={classes.margin}
                            variant="outlined">More info</Button>
                    </Paper>
                    <Paper className={classNames(classes.paper, classes.base, !selects[1] ? classes.paddingTop : '')}>
                        {
                            selects[1] && <CheckIcon className={classes.icon} />
                        }
                        <Typography
                            variant="title"
                            color="textPrimary">Base</Typography>
                        <BatteryChargingIcon80 className={classes.icon} />
                        <Typography
                            variant="headline"
                            color="textSecondary">15$</Typography>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            onClick={this.onClickBase}>Select<CheckIcon /></Button>
                        <Button
                            className={classes.margin}
                            variant="outlined">More info</Button>
                    </Paper>
                    <Paper className={classNames(classes.paper, classes.gold, !selects[2] ? classes.paddingTop : '')}>
                        {
                            selects[2] && <CheckIcon className={classes.icon} />
                        }
                        <Typography
                            variant="title"
                            color="textPrimary">Gold</Typography>
                        <BatteryChargingIconFull className={classes.icon} />
                        <Typography
                            variant="headline"
                            color="textSecondary">25$</Typography>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            onClick={this.onClickGold}>Select<CheckIcon /></Button>
                        <Button
                            className={classes.margin}
                            variant="outlined">More info</Button>
                    </Paper>
                    <Paper className={classNames(classes.paper, classes.green, !selects[3] ? classes.paddingTop : '')}>
                        {
                            selects[3] && <CheckIcon className={classes.icon} />
                        }
                        <Typography
                            variant="title"
                            color="textPrimary">Free</Typography>
                        <BatteryChargingIconFull className={classes.icon} />
                        <Typography
                            variant="headline"
                            color="textSecondary">0$</Typography>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary"
                            onClick={this.onClickFree}>Select<CheckIcon /></Button>
                        <Button
                            className={classes.margin}
                            variant="outlined">More info</Button>
                    </Paper>
                </div>
            )
        );
    }

    private onClickLite = () => {
        this.setState(({ selects }) => {
            selects[0] = !selects[0];
            selects[1] = false;
            selects[2] = false;
            selects[3] = false;

            return { selects };
        });
        this.props.onSelect(0);
    }

    private onClickBase = () => {
        this.setState(({ selects }) => {
            selects[0] = false;
            selects[1] = !selects[1];
            selects[2] = false;
            selects[3] = false;

            return { selects };
        });
        this.props.onSelect(1);
    }

    private onClickGold = () => {
        this.setState(({ selects }) => {
            selects[0] = false;
            selects[1] = false;
            selects[2] = !selects[2];
            selects[3] = false;

            return { selects };
        });
        this.props.onSelect(2);
    }

    private onClickFree = () => {
        this.setState(({ selects }) => {
            selects[0] = false;
            selects[1] = false;
            selects[2] = false;
            selects[3] = !selects[3];

            return { selects };
        });
        this.props.onSelect(3);
    }
}

export default withStyles(styles)(SubscriptionSelect);