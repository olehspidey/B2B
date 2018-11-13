import * as React from 'react';
import BaseContainer from './BaseContainer';
import EditCompanyForm from '../components/EditCompanyForm';

import { IEditCompanyProps } from './props/IEditCompanyProps';
import { withStyles, createStyles } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { fetchEditCompany } from '../Actions/Companies/companies';
import { IError } from '../Actions/IError';
import { IEditCompany } from '../Actions/Companies/IEditCompany';

const styles = createStyles({
    root: {
        width: '100%'
    }
});

class EditCompanyContainer extends BaseContainer<IEditCompanyProps>{

    public componentWillMount() {
        this
            .props
            .fetchCompany(this.props.match.params.id, true)
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message,
                statusCode: error.status
            }));
    }

    public componentWillUpdate(nextProps: IEditCompanyProps, nextState: any) {
        super.componentWillUpdate(nextProps, nextState);
    }

    public render() {
        const { companiesState, classes } = this.props;

        return (
            <div className={classes.root}>
                <EditCompanyForm
                    companiesState={companiesState}
                    onEditCompany={this.onEditCompany} />
            </div>
        );
    }

    private onEditCompany = (body: IEditCompany) => {
        console.log('edit', body);
    }
}

export default withStyles(styles)(connect(
    (state: any) => ({
        companiesState: state.companies as ICompaniesState
    }), (dispatch: ThunkDispatch<ICompaniesState, void, Action>) => ({
        fetchCompany: (id: string, edit = true) => dispatch(fetchEditCompany(id, edit))
        // createCompanyRequest: (body: ICreateCompany) => dispatch(createCompany(body))
    }))(EditCompanyContainer));