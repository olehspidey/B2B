import * as React from 'react';
import axios from 'axios';
import * as Autosuggest from 'react-autosuggest';

import { SuggestionsFetchRequestedParams, InputProps, ChangeEvent } from 'react-autosuggest';
import { IAddressAutocomplateComponentState } from './States/IAddressAutocomplateComponentState';
// import { IAddressResponse } from '../../Core/Models/Google/IAddressResponse';
import { IAddress } from '../../Core/Models/Google/IAddress';
// import { withStyles } from '@material-ui/core/styles';

// const getAutocomplateCountryUrl = (country: string) => `https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=AIzaSyCOAn0E4G4GEXQHZtEa12ctXyDow8k5QhE&types=country`;

const getAutocomplateCountryUrl = (country: string) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${country}&types=(regions)&key=AIzaSyCOAn0E4G4GEXQHZtEa12ctXyDow8k5QhE&sessiontoken=1234567890&language=uk`;

// const filterCountries = (data: IAddressResponse) => {
//     if (data.results && data.results.length) {
//         return data
//             .results[0]
//             .address_components
//             .filter(d => d.types.some(t => t === 'country'));
//     }

//     return [];
// }

const getSuggestionValue = (suggestion: IAddress) => suggestion.long_name;

const renderSuggestion = (suggestion: IAddress) => (<div>{suggestion.long_name}</div>);

class CountryAutocomplateComponent extends React.Component<{}, IAddressAutocomplateComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            country: '',
            suggestions: new Array<IAddress>()
        }
    }

    public onLoad = () => {
        console.log('loaded');
    }

    public render() {
        const inputProps = {
            value: this.state.country,
            onChange: this.onChange
        } as InputProps<any>;

        return (
            <div>
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps} />
            </div>
        );
    }

    private onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
        console.log('val', getAutocomplateCountryUrl(value))
        axios
            .get(getAutocomplateCountryUrl(value))
            .then(resp => {
                // const filteredData = filterCountries(resp.data);

                console.log('data', resp.data);
                // console.log('filtered', filteredData);

                this.setState({
                    suggestions: []
                });
            });
    };

    private onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

    private onChange = (event: React.FormEvent<any>, params: ChangeEvent) => this.setState({ country: params.newValue });
}

export default CountryAutocomplateComponent;