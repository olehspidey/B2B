import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CompanyCategorySelect from '../components/common/CompanyCategorySelect';
import classNames from 'classnames';
import CountryAutocomplateComponent from '../components/common/CountryAutocomplateComponent';
import CityAutocomplateComponent from '../components/common/CityAutocomplateComponent';
import Button from '@material-ui/core/Button';

import { withStyles, createStyles, Theme } from '@material-ui/core';
import { ISearchCompaniesContainerProp } from './props/ISearchCompaniesContainerProp';
import { ISearchCompaniesContainerState } from './states/ISearchCompaniesContainerState';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        padding: '0 20%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    block: {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column'
    },
    resultBlock: {
        flex: 2
    },
    filterBlock: {
        flex: 1
    },
    but: {
        marginTop: theme.spacing.unit
    }
});

class SearchCompaniesContainer extends React.Component<ISearchCompaniesContainerProp, ISearchCompaniesContainerState> {
    constructor(props: ISearchCompaniesContainerProp) {
        super(props);

        this.state = {
            filterQuery: ''
        }
    }
    
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
                        <CountryAutocomplateComponent
                            label="Choose the country"
                            onSelected={this.onCountrySelected} />
                        <CityAutocomplateComponent
                            label="Choose the city"
                            onSelected={this.onCitySelected} />
                        <Button
                            className={classes.but}
                            variant="contained"
                            color="primary"
                            onClick={this.onClickSearchBut}
                        >
                            Search
                        </Button>
                    </Paper>
                </div>
            </div>
        );
    }

    private onCountrySelected = () => {
        console.log();
    }

    private onCitySelected = () => {
        console.log();
    }

    private onClickSearchBut = () => {
        console.log();
    }
}

export default withStyles(styles)(SearchCompaniesContainer);