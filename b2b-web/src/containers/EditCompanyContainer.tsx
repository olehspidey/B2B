import * as React from 'react';
import BaseContainer from './BaseContainer';
import EditCompanyForm from '../components/EditCompanyForm';

import { IEditCompanyProps } from './props/IEditCompanyProps';
import { withStyles, createStyles } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { fetchEditCompany, editCompany } from '../Actions/Companies/companies';
import { IError } from '../Actions/IError';
import { IEditCompany } from '../Actions/Companies/IEditCompany';
import { Redirect } from 'react-router-dom';
import { IEditContainerState } from './states/IEditContainerState';

const styles = createStyles({
    root: {
        width: '100%'
    }
});

class EditCompanyContainer extends BaseContainer<IEditCompanyProps, IEditContainerState>{

    public componentWillMount() {
        this
            .props
            .fetchCompany(this.props.match.params.id, true, false)
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
                    {
                        super.render()
                    }
            </div>
        );
    }

    private onEditCompany = (body: IEditCompany) => {
        body.id = Number(this.props.match.params.id);
        console.log('edit', body);

        this.props.editCompany(body)
            .then(() => this.setState({
                canRenderAlertMessage: true,
                alertMessage: 'Success updated'
            }))
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
    }
}

export default withStyles(styles)(connect(
    (state: any) => ({
        companiesState: state.companies as ICompaniesState
    }), (dispatch: ThunkDispatch<ICompaniesState, void, Action>) => ({
        fetchCompany: (id: string, edit: boolean, moveToSuggests: boolean) => dispatch(fetchEditCompany(id, edit, moveToSuggests)),
        editCompany: (body: IEditCompany) => dispatch(editCompany(body))
    }))(EditCompanyContainer));