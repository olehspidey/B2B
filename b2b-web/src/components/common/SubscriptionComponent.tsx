import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import { ISubscriptionComponentProps, ISubscriptionComponentPropsClasses } from './Props/ISubscriptionComponentProps';
import { mapSubscriptionType } from '../../utils/mappers/userMappers';
import { withStyles, createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    subType: {
        padding: '.2rem',
        borderRadius: '5px',
        boxShadow: theme.shadows["1"],
        color: theme.palette.common.white
    },
    lite: {
        background: theme.palette.grey["500"]
    },
    base: {
        background: theme.palette.primary.main
    },
    gold: {
        background: '#FFD700'
    }
});

const subTypeToClass = (subscriptionType: number, classes: ISubscriptionComponentPropsClasses) => {
    if (subscriptionType === 0) {
        return classes.lite;
    }
    if (subscriptionType === 1) {
        return classes.base;
    }
    if (subscriptionType === 2) {
        return classes.gold;
    }

    return -1;
}

export default withStyles(styles)(({ subscriptionType, text, variant, classes, subTypePadding }: ISubscriptionComponentProps) => (
    <div className={classes.root}>
        <Typography
            component="h1"
            variant={variant}>{text}</Typography>
        <div style={subTypePadding ? {
            padding: subTypePadding
        } : {}} className={classNames(classes.subType, subTypeToClass(subscriptionType, classes))}>
            {mapSubscriptionType(subscriptionType)}
        </div>
    </div>
));