import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles, createStyles } from '@material-ui/core/styles';
import { ICompanyCategorySelectProps } from './Props/ICompanyCategorySelectProps';
import { ICompanyCategorySelectState } from './States/ICompanyCategorySelectState';
import { mapCompanyType } from '../../utils/mappers/companyMappers';

const styles = createStyles({

});

const companyCategories = [0, 1, 2, 3, 4, 5, 6, 7, 8];

class CompanyCategorySelect extends React.Component<ICompanyCategorySelectProps, ICompanyCategorySelectState> {
    constructor(props: ICompanyCategorySelectProps) {
        super(props);

        this.state = {
            category: -1
        }
    }

    public onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = Number(e.target.value);

        this.setState({ category });
        if (this.props.onChange !== undefined) {
            this.props.onChange(category);
        }
    }

    public render() {
        // const { classes } = this.props;

        return (
            <FormControl fullWidth>
                <InputLabel htmlFor="companyCategory">Company category</InputLabel>
                <Select
                    value={this.state.category}
                    onChange={this.onChange}
                    inputProps={{
                        id: 'companyCategory',
                    }}
                >
                    <MenuItem value={-1}>
                        <em>None</em>
                    </MenuItem>
                    {
                        companyCategories
                            .map(category => (
                                <MenuItem value={category}>{mapCompanyType(category)}</MenuItem>
                            ))
                    }
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(CompanyCategorySelect);