import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';

import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spinner from './Spinner';
import companiesService from '../../services/companies';
import classNames from 'classnames';

import { IKeyWordsMultiSelectComponentProps } from './Props/IKeyWordsMultiSelectComponentProps';
import { IKeyWordsMultiSelectComponentState } from './States/IKeyWordsMultiSelectComponentState';
import { IKeyWord } from '../../Core/Models/ReducerModels/Companies/IKeyWord';
import { createStyles, withStyles, Theme, ListItem, ListItemText, List } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    actions: {
        display: 'flex',
        flexDirection: 'column'
    },
    but: {
        margin: theme.spacing.unit
    },
    chipesBox: {
        maxWidth: '20rem',
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing.unit / 2
    },
    suggestion: {
        background: theme.palette.background.paper,
        boxShadow: theme.shadows["1"]
    },
    padTop: {
        paddingTop: theme.spacing.unit
    }
});

const getSuggestionValue = (suggestion: IKeyWord) => suggestion.word;

class KeyWordsMultiSelectComponent extends React.Component<IKeyWordsMultiSelectComponentProps, IKeyWordsMultiSelectComponentState> {
    constructor(props: IKeyWordsMultiSelectComponentProps) {
        super(props);

        this.state = {
            keyWords: props.keyWords || [],
            inputValue: '',
            suggestions: [],
            selected: null
        }
    }

    public componentWillUpdate(_: any, { selected }: IKeyWordsMultiSelectComponentState) {
        if ((!this.state.selected && selected) || (this.state.selected && selected && selected.word !== this.state.selected.word)) {
            const { keyWords } = { ...this.state };

            keyWords.push(selected);
            this.setState({ keyWords, inputValue: '' });

            if (this.props.onChangeKeyWords) {
                this.props.onChangeKeyWords(keyWords);
            }
        }
    }

    public render() {
        const { classes, loading } = this.props;
        const inputProps = {
            value: this.state.inputValue,
            onChange: this.onChange
        } as Autosuggest.InputProps<any>;

        return (
            <div>
                {
                    loading ? <Spinner flex /> : <div className={classes.chipesBox}>
                        {
                            this.state.keyWords.map(keyWord => (
                                <Chip
                                    className={classes.chip}
                                    key={keyWord.id}
                                    label={keyWord.word}
                                    onDelete={this.onDelete(keyWord)}
                                />
                            ))
                        }
                    </div>
                }
                <div className={classNames(classes.actions, this.state.keyWords.length ? classes.padTop : '')}>
                    <Autosuggest
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                        renderInputComponent={this.renderTextField}
                        onSuggestionSelected={this.onSelected}
                        renderSuggestionsContainer={this.renderSuggestionsContainer} />
                    {
                        this.props.withButton && <Button
                            className={classes.but}
                            variant="contained"
                            color="primary"
                            onClick={this.onAddKeyWordButClick}
                            disabled={loading}>Add</Button>
                    }
                </div>
            </div>
        );
    }

    private onDelete = (keyWord: IKeyWord) => () => {
        const { keyWords } = { ...this.state };

        keyWords.splice(keyWords.findIndex((kWord) => kWord.id === keyWord.id), 1);
        this.setState({ keyWords });
    }

    private onAddKeyWordButClick = () => {
        const { keyWords } = { ...this.state };

        if (!this.state.inputValue ||
            this.state.inputValue === ' ' ||
            keyWords.some(keyWord => keyWord.word === this.state.inputValue)) {
            return;
        }

        keyWords.push({
            id: keyWords.length ? keyWords[keyWords.length - 1].id + 1 : 0,
            word: this.state.inputValue
        });
        this.setState({ keyWords, inputValue: '' });

        if (this.props.onChangeKeyWords) {
            this.props.onChangeKeyWords(keyWords);
        }
    }

    private onSuggestionsFetchRequested = ({ value }: Autosuggest.SuggestionsFetchRequestedParams) => {
        companiesService
            .fetchKeyWordsByWord(value)
            .then((resp) => this.setState({ suggestions: resp.data }));
    }

    private onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

    private renderSuggestion = (suggestion: IKeyWord) => (
        <ListItem
            className={this.props.classes.suggestion}
            component="div"
            button
            key={suggestion.id}>
            <ListItemText primary={suggestion.word} />
        </ListItem>
    );

    private onChange = (_: React.FormEvent<any>, params: Autosuggest.ChangeEvent) => this.setState({ inputValue: params.newValue });

    private renderTextField = (inputProps: any) => {
        const { ref, ...otherProps } = inputProps;

        return (
            <TextField
                label="Key word"
                placeholder="Input key word..."
                fullWidth
                {...otherProps}
                inputRef={ref}
                disabled={this.props.loading} />
        );
    };

    private onSelected = (_: any, { suggestion }: Autosuggest.SuggestionSelectedEventData<IKeyWord>) => {
        if (suggestion !== null) {
            this.setState({ selected: suggestion });
        }
    }

    private renderSuggestionsContainer = ({ containerProps, children }: any) => (
        <List {...containerProps}>
            {children}
        </List>
    );
}

export default withStyles(styles)(KeyWordsMultiSelectComponent);