import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Spinner from '../Spinner';

import { withStyles, createStyles, Theme } from '@material-ui/core';
import { IApplicationFormsState } from '../../../Reducers/ApplicationForms/IApplicationFormsState';
import { IApplicationForm } from '../../../Core/Models/ReducerModels/ApplicationForms/IApplicationForm';
import { Link } from 'react-router-dom';

interface IApplicationFormsListProps {
    classes: {
        list: string,
        link: string
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
    }
});

export default withStyles(styles)(({ classes, applicationFormsState }: IApplicationFormsListProps) => {
    if (applicationFormsState.loading) {
        return (<Spinner />);
    }

    if (!applicationFormsState.loading) {
        return (
            <List className={classes.list}>
                {
                    (applicationFormsState
                        .applicationForms as IApplicationForm[])
                        .map(appForm => (
                            <Link
                                className={classes.link}
                                to={`/admin/application-form/${appForm.id}`}>
                                <ListItem
                                    key={appForm.id}
                                    button>
                                    <ListItemText primary={appForm.name} />
                                </ListItem>
                            </Link>
                        ))
                }
            </List>
        );
    }

    return null;
});