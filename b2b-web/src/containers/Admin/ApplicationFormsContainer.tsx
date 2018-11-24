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
import { withStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
    root: {
        width: '100%',
        padding: '0 20%'
    }
});

class ApplicationFormsContainer extends BaseContainer<IApplicationFormsContainerProps> {

    public componentWillMount() {
        this.props.fetchApplicationForms()
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppicationFormsList applicationFormsState={this.props.applicationFormsState} />
            </div>
        );
    }
}

export default withStyles(styles)(connect(
    (state: any) => ({
        applicationFormsState: state.applicationForms as IApplicationFormsState
    }),
    (dispatch: ThunkDispatch<IApplicationFormsState, void, Action>) => ({
        fetchApplicationForms: () => dispatch(fetchApplicationForms())
    })
)(ApplicationFormsContainer));