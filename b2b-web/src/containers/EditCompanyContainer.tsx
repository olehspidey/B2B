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
import { IBaseContainerState } from './states/IBaseContainerState';
import { Redirect } from 'react-router-dom';

const styles = createStyles({
    root: {
        width: '100%'
    }
});

interface IEditContainerState extends IBaseContainerState {
    canForbidRedirect: boolean
}

class EditCompanyContainer extends BaseContainer<IEditCompanyProps, IEditContainerState>{

    public componentWillMount() {
        this
            .props
            .fetchCompany(this.props.match.params.id, true)
            .then(() => this.setState({
                canRenderAlertMessage: true,
                alertMessage: 'Success updated'
            }))
            .catch((error: IError) => {
                if (error.status === 403) {
                    this.setState({ canForbidRedirect: true });

                    return;
                }

                this.setState({
                    canRenderErrorMessage: true,
                    errorMessage: error.message,
                    statusCode: error.status
                });
            });
    }

    public render() {
        const { companiesState, classes } = this.props;

        if (this.state.canForbidRedirect) {
            return (<Redirect to='/user/forbid' />);
        }

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