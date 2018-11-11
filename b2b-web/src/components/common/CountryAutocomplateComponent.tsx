import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './CountryAutocomplateComponent.css';

import {
    SuggestionsFetchRequestedParams,
    InputProps,
    ChangeEvent,
    SuggestionSelectedEventData
} from 'react-autosuggest';
import { IAddressAutocomplateComponentState } from './States/IAddressAutocomplateComponentState';
import { withStyles, createStyles, Theme } from '@material-ui/core';
import { ICountryAutocomplateComponentProps } from './Props/ICountryAutocomplateComponentProps';

const styles = (theme: Theme) => createStyles({
    suggestion: {
        background: theme.palette.background.paper,
        boxShadow: theme.shadows["1"]
    }
});

const getSuggestionValue = (suggestion: google.maps.places.AutocompletePrediction) => suggestion.structured_formatting.main_text;


class CountryAutocomplateComponent extends React.Component<ICountryAutocomplateComponentProps, IAddressAutocomplateComponentState> {
    private autocompleteService: google.maps.places.AutocompleteService | null = null;

    constructor(props: ICountryAutocomplateComponentProps) {
        super(props);

        this.state = {
            countryName: '',
            suggestions: [],
            selected: null
        }
    }

    public componentDidMount() {
        this.autocompleteService = new google.maps.places.AutocompleteService();
    }

    public render() {
        const inputProps = {
            value: this.state.countryName,
            onChange: this.onChange
        } as InputProps<any>;

        return (
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
        );
    }

    private renderTextField = (inputProps: any) => {
        const { ref, ...otherProps } = inputProps;

        return (
            <TextField
                label={this.props.label}
                required={this.props.required}
                // onBlurCapture={this.onBlure}
                fullWidth
                {...otherProps}
                inputRef={ref} />
        );
    };

    // private onBlure = (e: React.FocusEvent<HTMLDivElement>) => {
    //     if (this.state.selected === null) {
    //         this.setState({ countryName: '', suggestions: [] });
    //     }
    // }

    private onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
        if (this.autocompleteService !== null) {
            this.autocompleteService.getPlacePredictions({
                input: value,
                types: ['(regions)'],

            }, (results: google.maps.places.AutocompletePrediction[],
                status: google.maps.places.PlacesServiceStatus) => {
                    if (results !== null) {
                        results = results.filter(result => result.types.some(type => type === 'country'));
                        this.setState({ suggestions: results });
                    }
                })
        }
    };

    private renderSuggestionsContainer = ({ containerProps, children }: any) => (
        <List {...containerProps}>
            {children}
        </List>
    );

    private renderSuggestion = (suggestion: google.maps.places.AutocompletePrediction) => (
        <ListItem
            className={this.props.classes.suggestion}
            component="div"
            button
            key={suggestion.place_id}>
            <ListItemText primary={suggestion.structured_formatting.main_text} />
        </ListItem>
    );

    private onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

    private onChange = (_: React.FormEvent<any>, params: ChangeEvent) => this.setState({ countryName: params.newValue });

    private onSelected = (_: any, { suggestion }: SuggestionSelectedEventData<google.maps.places.AutocompletePrediction>) => {
        if (suggestion !== null) {
            this.setState({ selected: suggestion });
            this.props.onSelected({
                placeId: suggestion.place_id,
                name: suggestion.structured_formatting.main_text,
                reference: suggestion.reference
            });
        }
    }
}

export default withStyles(styles)(CountryAutocomplateComponent);