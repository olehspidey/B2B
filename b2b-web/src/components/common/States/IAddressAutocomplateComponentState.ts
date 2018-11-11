export interface IAddressAutocomplateComponentState {
    countryName: string,
    suggestions: google.maps.places.AutocompletePrediction[],
    selected: google.maps.places.PlacesServiceStatus | null
}