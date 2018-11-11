import * as React from 'react';
import CompaneisList from '../components/common/CompaniesList';

import { withStyles, createStyles, Theme } from '@material-ui/core';
import { ICompaniesContainerProps } from './props/ICompaniesContainerProps';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { Action } from 'redux';
import { fetchCompanies } from '../Actions/Companies/companies';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        padding: '0 20%'
    },
    list: {
        background: theme.palette.background.paper,
        boxShadow: theme.shadows["1"]
    },
    emptyBox: {
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
    but: {
        marginTop: '1rem'
    },
    link: {
        textDecoration: 'none'
    },
    createBut: {
        display: 'flex',
        justifyContent: 'center'
    }
});

class CompaniesContainer extends React.Component<ICompaniesContainerProps> {

    public componentWillMount() {
        this.props.fetchCompanies();
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CompaneisList
                    renderCreateBut
                    companyState={this.props.companyState}
                    emptyListText="You havn't companies yet" />
            </div>
        );
    }
}

export default withStyles(styles)(connect(
    (state: any) => ({
        companyState: state.companies as ICompaniesState
    }),
    (dispatch: ThunkDispatch<ICompaniesState, void, Action>) => ({
        fetchCompanies: () => dispatch(fetchCompanies())
    })
)(CompaniesContainer));