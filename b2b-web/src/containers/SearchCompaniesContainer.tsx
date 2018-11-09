import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CompanyCategorySelect from '../components/common/CompanyCategorySelect';
import classNames from 'classnames';

import { withStyles, createStyles } from '@material-ui/core';
import { ISearchCompaniesContainerProp } from './props/ISearchCompaniesContainerProp';

const styles = createStyles({
    root: {
        width: '100%',
        padding: '0 20%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    block: {
        padding: '1rem'
    },
    resultBlock: {
        flex: 2
    },
    filterBlock: {
        flex: 1
    }
});

class SearchCompaniesContainer extends React.Component<ISearchCompaniesContainerProp> {
    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classNames(classes.resultBlock, classes.block)}>
                    <TextField
                        label="Company name"
                        fullWidth />
                </div>
                <div className={classNames(classes.filterBlock, classes.block)}>
                    <Paper
                        className={classes.block}
                        square>
                        <Typography variant="subtitle1">Filters:</Typography>
                        <CompanyCategorySelect />
                    </Paper>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SearchCompaniesContainer);