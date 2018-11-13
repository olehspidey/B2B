import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Spinner from '../components/common/Spinner';
import BaseContainer from './BaseContainer';
import Button from '@material-ui/core/Button';

import { withStyles, createStyles } from '@material-ui/core';
import { ICompanyContainerProps } from './props/ICompanyContainerProps'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { Action } from 'redux';
import { fetchCompany } from '../Actions/Companies/companies';
import { mapPersonType } from '../utils/mappers/userMappers';
import { mapCompanyType } from '../utils/mappers/companyMappers';
import { IError } from '../Actions/IError';
import { Redirect, Link } from 'react-router-dom';

const styles = createStyles({
    root: {
        width: '100%',
        padding: '0 20%'
    },
    paper: {
        padding: '1rem',
        marginBottom: '1rem'
    },
    editButBox: {
        display: 'flex',
        justifyContent: 'flex-end',
        textDecoration: 'none'
    }
});

//  todo need fix unmounted state
class CompanyContainer extends BaseContainer<ICompanyContainerProps> {
    public componentWillMount() {
        this.props.fetchCompany(this.props.match.params.id)
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message,
                statusCode: error.status
            }));
    }

    public componentWillUpdate(nextProps: ICompanyContainerProps, nextState: any) {
        super.componentWillUpdate(nextProps, nextState);
    }

    public render() {
        const { companiesState, classes } = this.props;

        if (this.state.statusCode !== null && this.state.statusCode === 404) {
            return (<Redirect to="/user/notFound" />);
        }

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    {
                        this.renderEditButton(companiesState)
                    }
                    {
                        this.renderCompanyInfo(companiesState)
                    }
                </Paper>
                <Paper className={classes.paper}>
                    {
                        this.renderOwnerInfo(companiesState)
                    }
                </Paper>
                <Paper className={classes.paper}>
                    {
                        this.renderAddressInfo(companiesState)
                    }
                </Paper>
                {
                    super.render()
                }
            </div>
        );
    }

    private renderEditButton = ({ company, loading }: ICompaniesState) => {
        if (!loading && company !== null) {
            return (
                <Link to={`${this.props.match.url}/edit`} className={this.props.classes.editButBox}>
                    <Button
                        variant="outlined"
                        color="primary">Edit</Button>
                </Link>
            );
        }

        return null;
    }

    private renderCompanyInfo = ({ company, loading }: ICompaniesState) => {
        if (loading) {
            return (<Spinner flex />);
        }

        if (!loading && company !== null) {
            return (
                <div>
                    <Typography variant="title">Company information:</Typography>
                    <Typography variant="subtitle1">{`Full name: ${company.fullName}`}</Typography>
                    <Typography variant="subtitle1">{`Short name: ${company.shortName}`}</Typography>
                    <Typography variant="subtitle1">{`Category: ${mapCompanyType(company.category)}`}</Typography>
                    <Typography variant="subtitle1">{`Description: ${company.description}`}</Typography>
                </div>
            );
        }

        return null;
    }

    private renderOwnerInfo = ({ company, loading }: ICompaniesState) => {
        if (loading) {
            return (<Spinner flex />);
        }

        if (!loading && company !== null) {
            return (
                <div>
                    <Typography variant="title">Company owner information:</Typography>
                    <Typography variant="subtitle1">{`Name: ${company.owner.name}`}</Typography>
                    <Typography variant="subtitle1">{`Last name: ${company.owner.lastName}`}</Typography>
                    <Typography variant="subtitle1">{`Email: ${company.owner.email}`}</Typography>
                    <Typography variant="subtitle1">{`Phone number: ${company.owner.phoneNumber}`}</Typography>
                    <Typography variant="subtitle1">{`Person type: ${mapPersonType(company.owner.personType)}`}</Typography>
                </div>
            );
        }

        return null;
    }

    private renderAddressInfo = ({ company, loading }: ICompaniesState) => {
        if (loading) {
            return (<Spinner flex />);
        }

        if (!loading && company !== null) {
            return (
                <div>
                    <Typography variant="title">Company address information:</Typography>
                    <Typography variant="subtitle1">{`Country: ${company.address.country}`}</Typography>
                    <Typography variant="subtitle1">{`City: ${company.address.city}`}</Typography>
                </div>
            );
        }

        return null;
    }
}

export default withStyles(styles)(connect(
    (state: any) => ({
        companiesState: state.companies as ICompaniesState
    }),
    (dispatch: ThunkDispatch<ICompaniesState, void, Action>) => ({
        fetchCompany: (id: string) => dispatch(fetchCompany(id))
    })
)(CompanyContainer));