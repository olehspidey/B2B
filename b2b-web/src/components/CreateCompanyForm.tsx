import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PersonTypeSelect from '../components/common/PersonTypeSelect';
import CountryAutocomplateComponent from './common/CountryAutocomplateComponent';
import CityAutocomplateComponent from './common/CityAutocomplateComponent';

import { ICreateCompanyComponentProps } from '../components/Props/ICreateCompanyComponentProps';
import { withStyles, createStyles } from '@material-ui/core';
import { ICreateCompany } from '../Actions/Companies/ICreateCompany';
import { IPlace } from '../Core/Models/ReducerModels/Companies/IPlace';

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

class CreateCompanyForm extends React.Component<ICreateCompanyComponentProps, ICreateCompany> {
    constructor(props: ICreateCompanyComponentProps) {
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
            }
        }
    }

    public onChangeCompanyFullName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ fullName: e.target.value });

    public onChangeCompanyShortName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ shortName: e.target.value });

    public onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ description: e.target.value });

    public onChangeOwnerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { owner } = { ...this.state };

        owner.name = e.target.value;
        this.setState({ owner });
    }

    public onChangeOwnerLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { owner } = { ...this.state };

        owner.lastName = e.target.value;
        this.setState({ owner });
    }

    public onChangeOwnerPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { owner } = { ...this.state };

        owner.phoneNumber = e.target.value;
        this.setState({ owner });
    }

    public onChangeOwnerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { owner } = { ...this.state };

        owner.email = e.target.value;
        this.setState({ owner });
    }

    public onChangePersonType = (personType: number) => {
        const { owner } = { ...this.state };

        owner.personType = personType;
        this.setState({ owner })
    }

    public onCountrySelected = (country: IPlace) => {
        console.log('sel', country);
        const { address } = { ...this.state };

        address.country = country.name;
        address.countryId = country.placeId;

        this.setState({ address });
    }

    public onCitySelected = (city: IPlace) => {
        console.log('city sel', city);
        const { address } = { ...this.state };

        address.city = city.name;
        address.cityId = city.placeId;

        this.setState({ address });
    }

    public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        this.props.onCreateCompany(this.state);
    }

    public render() {
        const { classes, loading } = this.props;

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
                        onChange={this.onChangeOwnerName} />
                    <TextField
                        label="Last name"
                        required
                        onChange={this.onChangeOwnerLastName} />
                    <TextField
                        label="Phone number"
                        required
                        onChange={this.onChangeOwnerPhone} />
                    <TextField
                        label="Email"
                        onChange={this.onChangeOwnerEmail} />
                    <PersonTypeSelect onChange={this.onChangePersonType} />
                </div>
                <div className={classes.info}>
                    <CountryAutocomplateComponent
                        label="Choose your country"
                        onSelected={this.onCountrySelected}
                        required />
                    <CityAutocomplateComponent
                        label="Choose the city"
                        onSelected={this.onCitySelected}
                        required />
                </div>
                <Button
                    className={classes.but}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}>Create</Button>
            </form>
        );
    }
}

export default withStyles(styles)(CreateCompanyForm);