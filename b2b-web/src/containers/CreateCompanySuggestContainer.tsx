import * as React from 'react';
import BaseContainer from './BaseContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import InfoIcon from '@material-ui/icons/Info';
import PlusIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import KeyWordsMultiSelectComponent from '../components/common/KeyWordsMultiSelectComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { createStyles, withStyles, Theme } from '@material-ui/core';
import { ICreateCompanySuggestContainerProps } from './props/ICreateCompanySuggestContainerProps';
import { ICompaniesState } from '../Reducers/Companies/ICompaniesState';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { fetchEditCompany, addKeyWords, addToSuggest } from '../Actions/Companies/companies';
import { IError } from '../Actions/IError';
import { ICreateCompanySuggestContainerState } from './states/ICreateCompanySuggestContainerState';
import { Redirect } from 'react-router-dom';
import { IAddKeyWords } from '../Actions/Companies/IAddKeyWords';
import { IKeyWord } from '../Core/Models/ReducerModels/Companies/IKeyWord';
import { IAddToSuggest } from '../Actions/Companies/IAddToSuggest';
import Spinner from '../components/common/Spinner';

const styles = (theme: Theme) => createStyles({
    paper: {
        padding: '2rem'
    },
    warningMainTypography: {
        display: 'flex',
        alignItems: 'center',
    },
    infoIcon: {
        marginLeft: theme.spacing.unit
    },
    addKeyWordsBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

class CreateCompanySuggestContainer extends BaseContainer<ICreateCompanySuggestContainerProps, ICreateCompanySuggestContainerState> {
    constructor(props: ICreateCompanySuggestContainerProps) {
        super(props);

        this.state = {
            sureCheck: false,
            alertMessage: '',
            canForbidRedirect: false,
            canNotFoundRedirect: false,
            canRenderAlertMessage: false,
            canRenderErrorMessage: false,
            errorMessage: '',
            keyWordsDialogOpen: false,
            statusCode: NaN,
            keyWords: []
        }
    }
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
        const { classes, companiesState } = this.props;

        if (this.state.canForbidRedirect) {
            return (<Redirect to="/user/forbid" />);
        }

        if (this.state.canNotFoundRedirect) {
            return (<Redirect to="user/notFound" />);
        }

        if (companiesState.loading) {
            return (<Spinner />);
        }

        return (
            <Paper className={classes.paper}>
                {
                    this.renderWarningKeyWords()
                }
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.sureCheck}
                            color="primary"
                            onChange={this.onChangeSure} />
                    }
                    label="Are you sure add to suggests?" />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.sureCheck}
                    onClick={this.onAddToSuggest}>Add to suggest</Button>
                {
                    super.render()
                }
            </Paper>
        );
    }

    private renderWarningKeyWords = () => {
        const { companiesState, classes } = this.props;

        if (!companiesState.loading && companiesState.company && companiesState.company.keyWords.length === 0) {
            return (
                <div>
                    <Typography
                        variant="subtitle1"
                        color="error">
                        Your company havn't key words.
                    </Typography>
                    <div className={classes.addKeyWordsBox}>
                        <Typography
                            className={classes.warningMainTypography}
                            variant="subtitle2"
                            color="error">
                            This means that it will be difficult to find you in a search.
                            Please add keywords
                        <Tooltip
                                title="Info why?"
                                placement="bottom">
                                <InfoIcon
                                    className={classes.infoIcon}
                                    cursor="pointer"
                                    color="action" />
                            </Tooltip>
                        </Typography>
                        <Button
                            variant="fab"
                            color="primary"
                            onClick={this.onOpenKeyWordsDialog}
                        >
                            <PlusIcon />
                        </Button>
                    </div>
                    <Dialog open={this.state.keyWordsDialogOpen}>
                        <DialogTitle id="alert-dialog-title">Add new key words to your company</DialogTitle>
                        <DialogContent>
                            <KeyWordsMultiSelectComponent
                                keyWords={companiesState.company.keyWords}
                                onAddKeyWord={this.onAddKeyWord}
                                loading={false} />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="primary"
                                onClick={this.onSave}>Save</Button>
                            <Button
                                color="secondary"
                                onClick={this.onCloseKeyWordsDialog}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }

        return null;
    }

    private onChangeSure = (_: any, checked: boolean) => this.setState({ sureCheck: checked });

    private onOpenKeyWordsDialog = () => this.setState({ keyWordsDialogOpen: true });

    private onCloseKeyWordsDialog = () => this.setState({ keyWordsDialogOpen: false });

    private onSave = () => {
        const words = this.state.keyWords.map(keyWord => keyWord.word);

        this.props.addKeyWords({
            id: Number(this.props.match.params.id),
            words
        })
            .then(() => this.setState({
                keyWordsDialogOpen: false,
                canRenderAlertMessage: true,
                alertMessage: 'Success saved'
            }))
            .catch((error: IError) => this.setState({
                canRenderErrorMessage: true,
                errorMessage: error.message
            }));
    }

    private onAddKeyWord = (keyWords: IKeyWord[]) => this.setState({ keyWords });

    private onAddToSuggest = () => this
        .props
        .addToSuggest({ id: Number(this.props.match.params.id) })
        .then(() => this.setState({
            canRenderAlertMessage: true,
            alertMessage: 'Success added to suggests list'
        }))
        .catch((error: IError) => this.setState({
            canRenderErrorMessage: true,
            errorMessage: error.message
        }));
}

export default withStyles(styles)(connect(
    (state: any) => ({
        companiesState: state.companies as ICompaniesState
    }), (dispatch: ThunkDispatch<ICompaniesState, void, Action>) => ({
        fetchCompany: (id: string, edit: boolean, moveToSuggests: boolean) => dispatch(fetchEditCompany(id, edit, moveToSuggests)),
        addKeyWords: (body: IAddKeyWords) => dispatch(addKeyWords(body)),
        addToSuggest: (body: IAddToSuggest) => dispatch(addToSuggest(body))
    }))(CreateCompanySuggestContainer));