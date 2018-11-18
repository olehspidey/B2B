import * as React from 'react';

import AppicationFormsList from '../../components/common/Admin/ApplicationFormsList';
import BaseContainer from '../BaseContainer';

import { connect } from 'react-redux';
import { IApplicationFormsState } from '../../Reducers/ApplicationForms/IApplicationFormsState';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { fetchApplicationForms } from '../../Actions/ApplicationForms/applicationForms';
import { IApplicationFormsContainerProps } from './props/IApplicationFormsContainerProps';
import { IError } from '../../Actions/IError';

class ApplicationFormsContainer extends BaseContainer<IApplicationFormsContainerProps> {

    public componentWillMount() {
        this.props.fetchApplicationForms()
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
    }

    public render() {
        return (
            <AppicationFormsList applicationFormsState={this.props.applicationFormsState} />
        );
    }
}

export default connect(
    (state: any) => ({
        applicationFormsState: state.applicationForms as IApplicationFormsState
    }),
    (dispatch: ThunkDispatch<IApplicationFormsState, void, Action>) => ({
        fetchApplicationForms: () => dispatch(fetchApplicationForms())
    })
)(ApplicationFormsContainer);