import * as React from 'react';
import CreateCompanyForm from '../components/CreateCompanyForm';

class CreateUserCompanyContainer extends React.Component {

    public onCreateCompany = () => {
        console.log();
    }

    public render() {
        return (<CreateCompanyForm onCreateCompany={this.onCreateCompany} />);
    }
}

export default CreateUserCompanyContainer;