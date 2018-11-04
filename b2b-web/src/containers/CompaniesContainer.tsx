import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Spinner from '../components/common/Spinner';

import { withStyles, createStyles, Theme } from '@material-ui/core';
import { ICompaniesContainerProps } from './props/ICompaniesContainerProps';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { Action } from 'redux';
import { fetchCompanies } from '../Actions/Companies/companies';
import { ICompany } from '../Core/Models/ReducerModels/Companies/ICompany';
import { Link } from 'react-router-dom';

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
    }
});

class CompaniesContainer extends React.Component<ICompaniesContainerProps> {

    public componentWillMount() {
        this.props.fetchCompanies();
    }

    public renderCompaniesList = () => {
        const { companyState, classes } = this.props;

        if (companyState.loading) {
            return (
                <Spinner />
            );
        }

        if (!companyState.loading && companyState.companies.length > 0) {
            return (
                <List>
                    {
                        (companyState
                            .companies as ICompany[])
                            .map(company => (
                                <ListItem
                                    className={classes.list}
                                    button>
                                    <ListItemText primary={company.shortName} />
                                </ListItem>
                            ))
                    }
                </List>
            );
        }

        return (
            <div className={classes.emptyBox}>
                <div>You havn't companies yet</div>
                <Link
                    className={classes.link}
                    to="/user/companies/create">
                    <Button
                        className={classes.but}
                        variant="outlined">Create new company</Button>
                </Link>
            </div>
        );
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {
                    this.renderCompaniesList()
                }
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