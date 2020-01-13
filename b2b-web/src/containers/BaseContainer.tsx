import * as React from 'react';
import CustomSnackBar from '../components/common/CustomSnackBar';

import { IBaseContainerState } from './states/IBaseContainerState';

class BaseContainer<P, S extends IBaseContainerState = IBaseContainerState>
    extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            errorMessage: '',
            alertMessage: '',
            canRenderAlertMessage: false,
            canRenderErrorMessage: false
        } as S;
    }

    public render() {

        return (
            <div>
                <CustomSnackBar
                    message={this.state.errorMessage}
                    onClose={this.onCloseErrorMessage}
                    open={this.state.canRenderErrorMessage}
                    autoHideDuration={7000}
                    type="error" />
                <CustomSnackBar
                    message={this.state.alertMessage}
                    onClose={this.onCloseAlertMessage}
                    open={this.state.canRenderAlertMessage} />
            </div>
        )
    }

    private onCloseErrorMessage = () => this.setState({ canRenderErrorMessage: false });

    private onCloseAlertMessage = () => this.setState({ canRenderAlertMessage: false });
}

export default BaseContainer;