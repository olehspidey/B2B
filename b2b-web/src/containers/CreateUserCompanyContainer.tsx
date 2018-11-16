import * as React from 'react';
import CreateCompanyForm from '../components/CreateCompanyForm';
import BaseContainer from './BaseContainer';

import { ICreateCompany } from '../Actions/Companies/ICreateCompany';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createCompany } from '../Actions/Companies/companies';
import { Action } from 'redux';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { ICreateUserCompanyContainerProps } from './props/ICreateUserCompanyContainerProps';
import { IError } from '../Actions/IError';
import { withStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
    root: {
        width: '100%'
    }
});

class CreateUserCompanyContainer extends BaseContainer<ICreateUserCompanyContainerProps> {

    public onCreateCompany = (body: ICreateCompany) => this
        .props
        .createCompanyRequest(body)
        .then(() => this.setState({
            canRenderAlertMessage: true,
            alertMessage: 'Company success created'
        }))
        .catch((error: IError) => this.setState({
            canRenderErrorMessage: true,
            errorMessage: error.message
        }));

    public render() {
        const { companiesState, classes } = this.props;

        return (<div className={classes.root}>
            <CreateCompanyForm
                onCreateCompany={this.onCreateCompany}
                loading={companiesState.loading} />
            {
                super.render()
            }
        </div>);
    }
}

export default withStyles(styles)(connect(
    (state: any) => ({
        companiesState: state.companies as ICompaniesState
    }), (dispatch: ThunkDispatch<ICompaniesState, void, Action>) => ({
        createCompanyRequest: (body: ICreateCompany) => dispatch(createCompany(body))
    }))(CreateUserCompanyContainer));