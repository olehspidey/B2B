import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles, createStyles } from '@material-ui/core';
import { IApplicationFormsState } from '../../../Reducers/ApplicationForms/IApplicationFormsState';
import Spinner from '../Spinner';
import { IApplicationForm } from '../../../Core/Models/ReducerModels/ApplicationForms/IApplicationForm';

interface IApplicationFormsListProps {
    classes: {

    },
    applicationFormsState: IApplicationFormsState
}

const styles = createStyles({

});

export default withStyles(styles)(({ classes, applicationFormsState }: IApplicationFormsListProps) => {
    if (applicationFormsState.loading) {
        return (<Spinner />);
    }

    if (!applicationFormsState.loading) {
        return (
            <List>
                {
                    (applicationFormsState
                        .applicationForms as IApplicationForm[])
                        .map(appForm => (
                            <ListItem>
                                <ListItemText primary={appForm.name} />
                            </ListItem>
                        ))
                }
            </List>
        );
    }

    return null;
});