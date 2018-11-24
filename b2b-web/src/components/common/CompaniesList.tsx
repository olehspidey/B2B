import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Spinner from './Spinner';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import { ICompaniesListProps } from './Props/ICompaniesListProps';
import { ICompany } from '../../Core/Models/ReducerModels/Companies/ICompany';
import { withStyles, createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
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
    },
    space: {
        marginTop: theme.spacing.unit
    }
});

const renderCreateCompanyBut = (link: string, createBut: string, but: string) => (
    <Link
        className={classNames(link, createBut)}
        to="/user/companies/create">
        <Button
            className={but}
            variant="outlined">Create new company</Button>
    </Link>
);

export default withStyles(styles)(({ classes, companyState, renderCreateBut, emptyListText, space }: ICompaniesListProps) => {
    if (classes == null) {
        return null;
    }

    if (companyState.loading) {
        return (
            <Spinner />
        );
    }

    if (!companyState.loading && companyState.companies.length > 0) {
        return (
            <>
                {
                    renderCreateBut && renderCreateCompanyBut(classes.link, classes.createBut, classes.but)
                }
                <List>
                    {
                        (companyState
                            .companies as ICompany[])
                            .map(company => (
                                <Link
                                    className={classes.link}
                                    to={`/user/company/${company.id}`}
                                    key={company.id}>
                                    <ListItem
                                        className={classes.list}
                                        button>
                                        <ListItemText primary={company.shortName} />
                                    </ListItem>
                                </Link>
                            ))
                    }
                </List>
            </>
        );
    }

    return (
        <div className={classNames(classes.emptyBox, space !== null && space ? classes.space : '')}>
            <div>{emptyListText}</div>
            {
                renderCreateBut && renderCreateCompanyBut(classes.link, classes.createBut, classes.but)
            }
        </div>
    );
});