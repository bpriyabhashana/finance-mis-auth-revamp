import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "../../css/ConfirmationDialog.scss"

export default function ConfirmationDialog(props) {
    const [open, setOpen] = React.useState(props.confirmationDialogData.open);

    useEffect(() => {
        setOpen(props.confirmationDialogData.open)
    }, [props])

    const handleAccept = () => {
        setOpen(false);
        props.confirmationDialogData.acceptAlert()
    }

    const handleDecline = () => {
        setOpen(false);
        props.confirmationDialogData.declineAlert()
    }
    return (
        <div className='Confirmation-dialog-div'>
            <Dialog open={open} onClose={handleDecline} className='Confirmation-dialog-div'>
                <DialogTitle>
                    {props.confirmationDialogData.title}
                </DialogTitle >
                <DialogContent>
                    <DialogContentText>
                        {props.confirmationDialogData.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className='Accept-button' variant="contained" style={{textTransform: "none"}} color="secondary" size="small" onClick={handleAccept} autoFocus>{props.confirmationDialogData.acceptLabel}</Button>
                    <Button className='Decline-button' variant="outlined" style={{textTransform: "none"}} color="primary"  size="small" onClick={handleDecline}>{props.confirmationDialogData.declineLabel}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}