import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { IKeyWordsMultiSelectComponentProps } from './Props/IKeyWordsMultiSelectComponentProps';
import { IKeyWordsMultiSelectComponentState } from './States/IKeyWordsMultiSelectComponentState';
import { IKeyWord } from '../../Core/Models/ReducerModels/Companies/IKeyWord';
import { createStyles, withStyles, Theme } from '@material-ui/core';
import Spinner from './Spinner';

const styles = (theme: Theme) => createStyles({
    root: {
        padding: theme.spacing.unit
    },
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
    }
});

class KeyWordsMultiSelectComponent extends React.Component<IKeyWordsMultiSelectComponentProps, IKeyWordsMultiSelectComponentState> {
    constructor(props: IKeyWordsMultiSelectComponentProps) {
        super(props);

        this.state = {
            keyWords: [...props.keyWords],
            inputValue: ''
        }
    }

    public render() {
        const { classes, loading } = this.props;

        return (
            <div className={classes.root}>
                {
                    loading ? <Spinner /> : <div className={classes.chipesBox}>
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
                <br />
                <div className={classes.actions}>
                    <TextField
                        label="Key word"
                        placeholder="Input key word..."
                        value={this.state.inputValue}
                        onChange={this.onChangeInputValue}
                        disabled={loading} />
                    <Button
                        className={classes.but}
                        variant="contained"
                        color="primary"
                        onClick={this.onAddKeyWordButClick}
                        disabled={loading}>Add</Button>
                </div>
            </div>
        );
    }

    private onChangeInputValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => this.setState({ inputValue: target.value });

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

        if (this.props.onAddKeyWord) {
            this.props.onAddKeyWord(keyWords);
        }
    }
}

export default withStyles(styles)(KeyWordsMultiSelectComponent);