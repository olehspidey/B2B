import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Spinner from '../Spinner';
import Typography from '@material-ui/core/Typography';
import ApplicationFromsStatus from '../../../components/common/ApplicationFormStatus';

import { withStyles, createStyles, Theme } from '@material-ui/core';
import { IApplicationFormsState } from '../../../Reducers/ApplicationForms/IApplicationFormsState';
import { IApplicationForm } from '../../../Core/Models/ReducerModels/ApplicationForms/IApplicationForm';
import { Link } from 'react-router-dom';

interface IApplicationFormsListProps {
    classes: {
        list: string,
        link: string,
        emptyListText: string
    },
    applicationFormsState: IApplicationFormsState
}

const styles = (theme: Theme) => createStyles({
    list: {
        background: theme.palette.background.paper,
        boxShadow: theme.shadows["1"]
    },
    link: {
        textDecoration: 'none'
    },
    emptyListText: {
        textAlign: 'center'
    }
});

export default withStyles(styles)(({ classes, applicationFormsState }: IApplicationFormsListProps) => {
    if (applicationFormsState.loading) {
        return (<Spinner />);
    }

    if (!applicationFormsState.loading && !applicationFormsState.applicationForms.length) {
        return (
            <div className={classes.emptyListText}>
                <Typography variant="title">No application forms yet</Typography>
            </div>
        );
    }

    if (!applicationFormsState.loading) {
        return (
            <List className={classes.list}>
                {
                    (applicationFormsState
                        .applicationForms as IApplicationForm[])
                        .map(appForm => (
                            <Link
                                key={appForm.id}
                                className={classes.link}
                                to={`/admin/application-form/${appForm.id}`}>
                                <ListItem
                                    button>
                                    <ListItemText primary={appForm.name} />
                                    <ApplicationFromsStatus status={appForm.status} />
                                </ListItem>
                            </Link>
                        ))
                }
            </List>
        );
    }

    return null;
});