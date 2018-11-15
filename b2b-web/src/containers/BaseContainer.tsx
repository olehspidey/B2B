import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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

    // public componentWillUpdate(_: P, nextState: S) {
    //     if (nextState.canRenderErrorMessage === true) {
    //         setTimeout(() => this.setState({ canRenderErrorMessage: false, errorMessage: '' }), 2000);
    //     }
    //     if (nextState.canRenderAlertMessage === true) {
    //         setTimeout(() => this.setState({ canRenderAlertMessage: false, alertMessage: '' }), 20000);
    //     }
    // }

    public render() {

        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.canRenderErrorMessage}
                    onClose={this.onCloseErrorMessage}
                    autoHideDuration={2000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.errorMessage}</span>}
                    action={<IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.onCloseErrorMessage}
                    >
                        <CloseIcon />
                    </IconButton>}
                />
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