export interface ICityAutocomplateComponentState {
    cityName: string,
    suggestions: google.maps.places.AutocompletePrediction[],
    selected: google.maps.places.AutocompletePrediction | null
}