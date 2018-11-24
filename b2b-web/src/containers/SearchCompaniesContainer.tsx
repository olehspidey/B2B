import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CompanyCategorySelect from '../components/common/CompanyCategorySelect';
import classNames from 'classnames';
import CountryAutocomplateComponent from '../components/common/CountryAutocomplateComponent';
import CityAutocomplateComponent from '../components/common/CityAutocomplateComponent';
import Button from '@material-ui/core/Button';
import CompaniesList from '../components/common/CompaniesList';
import KeyWordsMultiSelectComponent from '../components/common/KeyWordsMultiSelectComponent';

import { withStyles, createStyles, Theme } from '@material-ui/core';
import { ISearchCompaniesContainerProp } from './props/ISearchCompaniesContainerProp';
import { ISearchCompaniesContainerState } from './states/ISearchCompaniesContainerState';
import { IPlace } from '../Core/Models/ReducerModels/Companies/IPlace';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { Action } from 'redux';
import { fetchCompaniesByFilters } from '../Actions/Companies/companies';

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

const queryParams = {
    s: ' ',
    companyCategory: ' ' as string | number,
    countryId: ' ',
    cityId: ' '
};

class SearchCompaniesContainer extends React.Component<ISearchCompaniesContainerProp, ISearchCompaniesContainerState> {
    constructor(props: ISearchCompaniesContainerProp) {
        super(props);

        this.state = {
            keyWords: []
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classNames(classes.resultBlock, classes.block)}>
                    <TextField
                        label="Key words"
                        fullWidth
                    // onChange={this.onChangeKeyWords} 
                    />
                    <CompaniesList
                        space
                        renderCreateBut={false}
                        companyState={this.props.companyState}
                        emptyListText="No match result" />
                </div>
                <div className={classNames(classes.filterBlock, classes.block)}>
                    <Paper
                        className={classes.block}
                        square>
                        <Typography variant="subtitle1">Filters:</Typography>
                        <CompanyCategorySelect onChange={this.onChangeCategory} />
                        <CountryAutocomplateComponent
                            label="Choose the country"
                            onSelected={this.onCountrySelected} />
                        <CityAutocomplateComponent
                            label="Choose the city"
                            onSelected={this.onCitySelected} />
                        <KeyWordsMultiSelectComponent
                            loading={false} />
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

    private onChangeCategory = (category: number) => {
        queryParams.companyCategory = category;
    }

    // private onChangeKeyWords = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ keyWords: e.target.value });

    private onCountrySelected = (country: IPlace) => {
        queryParams.countryId = country.placeId;
    }

    private onCitySelected = (city: IPlace) => {
        queryParams.cityId = city.placeId;
    }

    private onClickSearchBut = () => {
        const { s, cityId, companyCategory, countryId } = queryParams;
        this.props.fetchCompaniesByFilters(
            s,
            companyCategory,
            countryId,
            cityId
        );
    }
}

export default withStyles(styles)(connect(
    (state: any) => ({
        companyState: state.companies as ICompaniesState
    }),
    (dispatch: ThunkDispatch<ICompaniesState, void, Action>) => ({
        fetchCompaniesByFilters: (s: string, companyCategory: string | number, countryId: string, cityId: string) =>
            dispatch(fetchCompaniesByFilters(s, companyCategory, countryId, cityId))
    })
)(SearchCompaniesContainer));