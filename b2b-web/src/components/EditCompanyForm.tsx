import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PersonTypeSelect from '../components/common/PersonTypeSelect';
import CountryAutocomplateComponent from './common/CountryAutocomplateComponent';
import CityAutocomplateComponent from './common/CityAutocomplateComponent';

import { withStyles, createStyles } from '@material-ui/core';
import { IPlace } from '../Core/Models/ReducerModels/Companies/IPlace';
import { IEditCompanyFormProps } from './Props/IEditCompanyFormProps';
import { IEditCompanyState } from './State/IEditCompanyState';

const styles = createStyles({
    root: {
        padding: '0 20%'
    },
    info: {
        display: 'flex',
        flexDirection: 'column'
    },
    but: {
        marginTop: '1rem'
    },
    infoText: {
        marginTop: '1rem'
    }
});

class EditCompanyForm extends React.Component<IEditCompanyFormProps, IEditCompanyState>{
    constructor(props: IEditCompanyFormProps) {
        super(props);

        this.state = {
            description: '',
            fullName: '',
            shortName: '',
            owner: {
                email: '',
                lastName: '',
                name: '',
                personType: -1,
                phoneNumber: ''
            },
            address: {
                city: '',
                cityId: '',
                country: '',
                countryId: ''
            },
            keyWords: []
        }
    }

    public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        this.props.onEditCompany(this.state);
    }

    public componentWillReceiveProps({ companiesState }: IEditCompanyFormProps) {
        const { company } = companiesState;

        if (this.props.companiesState.loading && !companiesState.loading && company !== null) {
            this.setState({
                address: company.address,
                fullName: company.fullName,
                keyWords: company.keyWords,
                owner: company.owner,
                shortName: company.shortName,
                description: company.description
            });
        }
    }

    public render() {
        const { classes, companiesState } = this.props;

        return (
            <form className={classes.root} onSubmit={this.onSubmit}>
                <div className={classes.info}>
                    <div className={classes.infoText}>Main information about company</div>
                    <TextField
                        label="Enter full company name"
                        required
                        value={this.state.fullName}
                        onChange={this.onChangeCompanyFullName} />
                    <TextField
                        label="Enter short company name"
                        required
                        value={this.state.shortName}
                        onChange={this.onChangeCompanyShortName} />
                    <TextField
                        label="Enter description"
                        value={this.state.description || ''}
                        onChange={this.onChangeDescription} />
                </div>
                <div className={classes.info}>
                    <div className={classes.infoText}>Information about owner of company</div>
                    <TextField
                        label="Name"
                        required
                        value={this.state.owner.name}
                        onChange={this.onChangeOwnerName} />
                    <TextField
                        label="Last name"
                        required
                        value={this.state.owner.lastName}
                        onChange={this.onChangeOwnerLastName} />
                    <TextField
                        label="Phone number"
                        required
                        value={this.state.owner.phoneNumber}
                        onChange={this.onChangeOwnerPhone} />
                    <TextField
                        label="Email"
                        value={this.state.owner.email}
                        onChange={this.onChangeOwnerEmail} />
                    <PersonTypeSelect onChange={this.onChangePersonType} />
                </div>
                <div className={classes.info}>
                    <CountryAutocomplateComponent
                        label="Choose your country"
                        onSelected={this.onCountrySelected}
                        country={{
                            description: '',
                            matched_substrings: [],
                            place_id: this.state.address.countryId,
                            reference: '',
                            structured_formatting: {
                                main_text: this.state.address.country,
                                main_text_matched_substrings: [],
                                secondary_text: ''
                            },
                            terms: [],
                            types: []
                        }}
                        required />
                    <CityAutocomplateComponent
                        label="Choose the city"
                        onSelected={this.onCitySelected}
                        city={{
                            description: '',
                            matched_substrings: [],
                            place_id: this.state.address.cityId,
                            reference: '',
                            structured_formatting: {
                                main_text: this.state.address.city,
                                main_text_matched_substrings: [],
                                secondary_text: ''
                            },
                            terms: [],
                            types: []
                        }}
                        required />
                </div>
                <Button
                    className={classes.but}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={companiesState.loading}>Edit</Button>
            </form>
        );
    }

    private onChangeCompanyFullName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ fullName: e.target.value });

    private onChangeCompanyShortName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ shortName: e.target.value });

    private onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ description: e.target.value });

    private onChangeOwnerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { owner } = { ...this.state };

        owner.name = e.target.value;
        this.setState({ owner });
    }

    private onChangeOwnerLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { owner } = { ...this.state };

        owner.lastName = e.target.value;
        this.setState({ owner });
    }

    private onChangeOwnerPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { owner } = { ...this.state };

        owner.phoneNumber = e.target.value;
        this.setState({ owner });
    }

    private onChangeOwnerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { owner } = { ...this.state };

        owner.email = e.target.value;
        this.setState({ owner });
    }

    private onChangePersonType = (personType: number) => {
        const { owner } = { ...this.state };

        owner.personType = personType;
        this.setState({ owner })
    }

    private onCountrySelected = (country: IPlace) => {
        console.log('sel', country);
        const { address } = { ...this.state };

        address.country = country.name;
        address.countryId = country.placeId;

        this.setState({ address });
    }

    private onCitySelected = (city: IPlace) => {
        console.log('city sel', city);
        const { address } = { ...this.state };

        address.city = city.name;
        address.cityId = city.placeId;

        this.setState({ address });
    }
}

export default withStyles(styles)(EditCompanyForm);