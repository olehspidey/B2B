import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import './CountryAutocomplateComponent.css';

import { SuggestionsFetchRequestedParams, InputProps, ChangeEvent, SuggestionSelectedEventData } from 'react-autosuggest';
import { IAddressAutocomplateComponentState } from './States/IAddressAutocomplateComponentState';
import { withStyles, createStyles } from '@material-ui/core';
import { ICountryAutocomplateComponentProps } from './Props/ICountryAutocomplateComponentProps';

const styles = createStyles({
    suggestion: {
        padding: '.5rem',
        cursor: 'pointer',
        'suggestion:hover': {
            background: 'red'
        }
    }
});

const getSuggestionValue = (suggestion: google.maps.places.AutocompletePrediction) => suggestion.structured_formatting.main_text;


class CountryAutocomplateComponent extends React.Component<ICountryAutocomplateComponentProps, IAddressAutocomplateComponentState> {
    private autocompleteService: google.maps.places.AutocompleteService | null = null;

    constructor(props: any) {
        super(props);

        this.state = {
            countryName: '',
            suggestions: []
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
                onSuggestionSelected={this.onSelected} />
        );
    }

    private renderTextField = (inputProps: any) => {
        const { ref, ...otherProps } = inputProps;

        return (
            <TextField
                label="Choose your country"
                required
                fullWidth
                {...otherProps}
                inputRef={ref} />
        );
    };

    private onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
        if (this.autocompleteService !== null) {
            this.autocompleteService.getPlacePredictions({
                input: value,
                types: ['(regions)'],

            }, (results: google.maps.places.AutocompletePrediction[],
                status: google.maps.places.PlacesServiceStatus) => {
                    results = results.filter(result => result.types.some(type => type === 'country'));

                    this.setState({ suggestions: results });
                })
        }
    };

    private renderSuggestion = (suggestion: google.maps.places.AutocompletePrediction) => (
        <Paper className={this.props.classes.suggestion}>{suggestion.structured_formatting.main_text}</Paper>
    );

    private onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

    private onChange = (_: React.FormEvent<any>, params: ChangeEvent) => this.setState({ countryName: params.newValue });

    private onSelected = (_: any, { suggestion }: SuggestionSelectedEventData<google.maps.places.AutocompletePrediction>) => {
        if (suggestion !== null) {
            this.props.onSelected({
                placeId: suggestion.place_id,
                name: suggestion.structured_formatting.main_text,
                reference: suggestion.reference
            });
        }
    }
}

export default withStyles(styles)(CountryAutocomplateComponent);