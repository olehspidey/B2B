import * as React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IUserSettingsContainerProps } from './props/IUserSettingsContainerProps';
import { withStyles, createStyles } from '@material-ui/core';
import ChangeEmailComponent from '../components/ChangeEmailComponent';
import { ISendEmailToken } from '../Actions/User/ISendEmailToken';
import { IChangeEmail } from '../Actions/User/IChangeEmail';

const styles = createStyles({

});

class UserSettingsContainer extends React.Component<IUserSettingsContainerProps> {

    public onSendEmailTokenClick = (body: ISendEmailToken) => {
        console.log(body);
        this.props.fetchCurrentUser();
    }

    public onConfirmEmailToken = (body: IChangeEmail) => {
        console.log(body);
    }

    public render() {
        // const { classes } = this.props;

        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Change email</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ChangeEmailComponent
                            oldEmail="oldEmail@gmail.com"
                            onSendEmailTokenClick={this.onSendEmailTokenClick}
                            onConfirmEmailToken={this.onConfirmEmailToken} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(UserSettingsContainer);