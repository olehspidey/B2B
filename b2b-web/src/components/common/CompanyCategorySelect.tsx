import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { ICompanyCategorySelectProps } from './Props/ICompanyCategorySelectProps';
import { ICompanyCategorySelectState } from './States/ICompanyCategorySelectState';
import { mapCompanyType } from '../../utils/mappers/companyMappers';

const companyCategories = [0, 1, 2, 3, 4, 5, 6, 7, 8];

class CompanyCategorySelect extends React.Component<ICompanyCategorySelectProps, ICompanyCategorySelectState> {
    constructor(props: ICompanyCategorySelectProps) {
        super(props);

        this.state = {
            category: props.value !== undefined ? props.value : -1
        }
    }

    public componentWillReceiveProps(nextProps: ICompanyCategorySelectProps) {
        if (nextProps.value !== undefined) {
            this.setState({ category: nextProps.value });
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
                                <MenuItem
                                    key={category}
                                    value={category}>{mapCompanyType(category)}</MenuItem>
                            ))
                    }
                </Select>
            </FormControl>
        );
    }
}

export default CompanyCategorySelect;