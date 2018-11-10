import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Spinner from '../components/common/Spinner';

import { withStyles, createStyles } from '@material-ui/core';
import { ICompanyContainerProps } from './props/ICompanyContainerProps'
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { Action } from 'redux';
import { fetchCompany } from '../Actions/Companies/companies';
import { mapPersonType } from '../utils/mappers/userMappers';
import { mapCompanyType } from '../utils/mappers/companyMappers';

const styles = createStyles({
    root: {
        width: '100%',
        padding: '0 20%'
    },
    paper: {
        padding: '1rem',
        marginBottom: '1rem'
    }
});

class CompanyContainer extends React.Component<ICompanyContainerProps> {

    public componentWillMount() {
        this.props.fetchCompany(this.props.match.params.id);
    }

    public render() {
        const { companiesState, classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    {
                        this.renderCompanyInfo(companiesState)
                    }
                </Paper>
                <Paper className={classes.paper}>
                    {
                        this.renderOwnerInfo(companiesState)
                    }
                </Paper>
            </div>
        );
    }

    private renderCompanyInfo = ({ company, loading }: ICompaniesState) => {
        if (loading) {
            return (<Spinner flex />);
        }

        if (!loading && company !== null) {
            return (
                <div>
                    <Typography variant="title">Company information:</Typography>
                    <Typography variant="subtitle1">{`Company full name: ${company.fullName}`}</Typography>
                    <Typography variant="subtitle1">{`Company short name: ${company.shortName}`}</Typography>
                    <Typography variant="subtitle1">{`Company category: ${mapCompanyType(company.category)}`}</Typography>
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
                    <Typography variant="subtitle1">{`Company owner name: ${company.owner.name}`}</Typography>
                    <Typography variant="subtitle1">{`Company owner last name: ${company.owner.lastName}`}</Typography>
                    <Typography variant="subtitle1">{`Company owner email: ${company.owner.email}`}</Typography>
                    <Typography variant="subtitle1">{`Company owner phone number: ${company.owner.phoneNumber}`}</Typography>
                    <Typography variant="subtitle1">{`Company owner person type: ${mapPersonType(company.owner.personType)}`}</Typography>
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