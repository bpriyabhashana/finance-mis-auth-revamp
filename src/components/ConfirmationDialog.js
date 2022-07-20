import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import { DIALOG_TYPES } from './utils/AppConstants';

const ConfirmationDialog = ({ data, open, handleSubmit, dialogType, disableCloseOnClickOutside }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        handleSubmit(false);
    };

    const handleConfirm = () => {
        handleSubmit(true);
    };

    const isSubmisssion = () => {
        return dialogType === DIALOG_TYPES.SUBMIT_DIALOG;
    };

    const isConfirmation = () => {
        return dialogType === DIALOG_TYPES.CONFIRM_DIALOG;
    };

    const isYesNoConfirmation = () => {
        return dialogType === DIALOG_TYPES.YES_NO_DIALOG;
    };

    const isInfo = () => {
        return dialogType === DIALOG_TYPES.INFO_DIALOG;
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth
            open={open}
            onClose={!disableCloseOnClickOutside && handleClose}
            aria-labelledby="confirm-dialog-title"
        >
            <DialogTitle id='confirm-dialog-title'>
                {data.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {data.message}
                </DialogContentText>
                <DialogContentText>
                    {data.additionalMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {isSubmisssion() && (
                    <React.Fragment>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={handleConfirm} color="secondary" variant="outlined">
                            Submit
                        </Button>
                    </React.Fragment>
                )}

                {isConfirmation() && (
                    <React.Fragment>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} color="secondary" variant="outlined">
                            Confirm
                        </Button>
                    </React.Fragment>
                )}

                {isYesNoConfirmation() && (
                    <React.Fragment>
                        <Button onClick={handleClose} color="primary">
                            No
                        </Button>
                        <Button onClick={handleConfirm} color="secondary" variant="outlined">
                            Yes
                        </Button>
                    </React.Fragment>
                )}
                {isInfo() && (
                    <React.Fragment>
                        <Button onClick={handleConfirm} color="secondary" variant="outlined">
                            OK
                        </Button>
                    </React.Fragment>
                )}

            </DialogActions>
        </Dialog>
    );

};

export default ConfirmationDialog;