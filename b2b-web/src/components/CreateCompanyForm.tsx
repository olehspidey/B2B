import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PersonTypeSelect from '../components/common/PersonTypeSelect';

import { ICreateCompanyComponentProps } from '../components/Props/ICreateCompanyComponentProps';
import { withStyles, createStyles } from '@material-ui/core';
// import { ICreateCompanyComponentState } from './State/ICreateCompanyComponentState';
import {ICreateCompany} from '../Actions/Companies/ICreateCompany';

const styles = createStyles({
    root: {
        width: '100%',
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
            }
        }
    }

    public onChangeCompanyFullName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ fullName: e.target.value });

    public onChangeCompanyShortName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ shortName: e.target.value });

    public onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ description: e.target.value });

    public onChangePersonType = (personType: number) => {
        const { owner } = { ...this.state };

        owner.personType = personType;
        this.setState({ owner })
    }

    public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        this.props.onCreateCompany(this.state);
    }

    public render() {
        const { classes } = this.props;

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
                        value={this.state.description}
                        onChange={this.onChangeDescription} />
                </div>
                <div className={classes.info}>
                    <div className={classes.infoText}>Information about owner of company</div>
                    <TextField
                        label="Name"
                        required />
                    <TextField
                        label="Last name"
                        required />
                    <TextField
                        label="Phone number"
                        required />
                    <TextField
                        label="Email"
                        required />
                    <PersonTypeSelect onChange={this.onChangePersonType} />
                </div>
                <Button
                    className={classes.but}
                    type="submit"
                    variant="contained"
                    color="primary">Create</Button>
            </form>
        );
    }
}

export default withStyles(styles)(CreateCompanyForm);