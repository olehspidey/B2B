import * as React from 'react';
import CreateCompanyForm from '../components/CreateCompanyForm';
import { ICreateCompany } from '../Actions/Companies/ICreateCompany';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createCompany } from '../Actions/Companies/companies';
import { Action } from 'redux';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { ICreateUserCompanyContainerProps } from './props/ICreateUserCompanyContainerProps';

class CreateUserCompanyContainer extends React.Component<ICreateUserCompanyContainerProps> {

    public onCreateCompany = (body: ICreateCompany) => this.props.createCompanyRequest(body);

    public render() {
        const { companiesState } = this.props;

        return (<CreateCompanyForm
            onCreateCompany={this.onCreateCompany}
            loading={companiesState.loading} />);
    }
}

export default connect(
    (state: any) => ({
        companiesState: state.companies as ICompaniesState
    }), (dispatch: ThunkDispatch<ICompaniesState, void, Action>) => ({
        createCompanyRequest: (body: ICreateCompany) => dispatch(createCompany(body))
    }))(CreateUserCompanyContainer);