import * as React from 'react';
import BaseContainer from './BaseContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { createStyles, withStyles } from '@material-ui/core';
import { ICreateCompanySuggestContainerProps } from './props/ICreateCompanySuggestContainerProps';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { fetchEditCompany } from '../Actions/Companies/companies';
import { IError } from '../Actions/IError';
import { ICreateCompanySuggestContainerState } from './states/ICreateCompanySuggestContainerState';
import { Redirect } from 'react-router-dom';

const styles = createStyles({

});

class CreateCompanySuggestContainer extends BaseContainer<ICreateCompanySuggestContainerProps, ICreateCompanySuggestContainerState> {

    public componentWillMount() {
        this
            .props
            .fetchCompany(this.props.match.params.id, false, true)
            .catch((error: IError) => {
                if (error.status === 403) {
                    this.setState({ canForbidRedirect: true });

                    return;
                }

                if (error.status === 404) {
                    this.setState({ canNotFoundRedirect: true });

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
        if (this.state.canForbidRedirect) {
            return (<Redirect to="/user/forbid" />);
        }

        if (this.state.canNotFoundRedirect) {
            return (<Redirect to="user/notFound" />);
        }

        return (
            <Paper>
                <Typography variant="title">Are you sure?</Typography>
                {
                    super.render()
                }
            </Paper>
        );
    }
}

export default withStyles(styles)(connect(
    (state: any) => ({
        companiesState: state.companies as ICompaniesState
    }), (dispatch: ThunkDispatch<ICompaniesState, void, Action>) => ({
        fetchCompany: (id: string, edit: boolean, moveToSuggests: boolean) => dispatch(fetchEditCompany(id, edit, moveToSuggests))
    }))(CreateCompanySuggestContainer));