import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { IUserSettingsContainerProps } from './props/IUserSettingsContainerProps';
import { withStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    saveBut: {
        marginTop: '.5rem'
    }
});

class UserSettingsContainer extends React.Component<IUserSettingsContainerProps> {
    public render() {
        const { classes } = this.props;

        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Change email</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.form}>
                            <TextField label="Old email" />
                            <TextField label="New email" />
                            <Button 
                            className={classes.saveBut}
                            color="primary"
                            variant="outlined">Save</Button>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(UserSettingsContainer);