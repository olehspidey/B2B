    import * as React from 'react';
    import InputLabel from '@material-ui/core/InputLabel';
    import MenuItem from '@material-ui/core/MenuItem';
    import FormControl from '@material-ui/core/FormControl';
    import Select from '@material-ui/core/Select';

    import { IPersonTypeSelectProps } from '../common/Props/IPersonTypeSelectProps';
    import { IPersonTypeSelectState } from '../common/States/IPersonTypeSelectState';

    export default class PersonTypeSelect extends React.Component<IPersonTypeSelectProps, IPersonTypeSelectState> {
        constructor(props: IPersonTypeSelectProps) {
            super(props);

            this.state = {
                value: -1
            }
        }

        public onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = Number(e.target.value);

            this.setState({ value });
            this.props.onChange(value);
        }

        public render() {
            return (
                <FormControl>
                    <InputLabel htmlFor="demo-controlled-open-select">Age</InputLabel>
                    <Select
                        onChange={this.onChange}
                        value={this.state.value}
                        inputProps={{
                            name: 'Person type',
                            id: 'personType',
                        }}
                        required
                    >
                        <MenuItem value={-1}>
                            <em>Choose person type</em>
                        </MenuItem>
                        <MenuItem value={0}>Physical</MenuItem>
                        <MenuItem value={1}>Legal</MenuItem>
                    </Select>
                </FormControl>
            );
        }
    };