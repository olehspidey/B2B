import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { IBaseContainerState } from './states/IBaseContainerState';

class BaseContainer<P ={}, S extends IBaseContainerState = IBaseContainerState>
    extends React.Component<P, S> {
    constructor(props: P) {
        super(props);

        this.state = {
            errorMessage: '',
            canRenderErrorMessage: false
        } as S;
    }

    public componentWillUpdate(_: P, nextState: S) {
        if (nextState.canRenderErrorMessage === true) {
            setTimeout(() => {
                this.setState({ canRenderErrorMessage: false, errorMessage: '' });
            }, 2000);
        }
    }

    public render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.canRenderErrorMessage}
                    onClose={this.onCloseErroMessage}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.errorMessage}</span>}
                    action={<IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.onCloseErroMessage}
                    >
                        <CloseIcon />
                    </IconButton>}
                />
            </div>
        )
    }

    private onCloseErroMessage = () => this.setState({ canRenderErrorMessage: false });
}

export default BaseContainer;