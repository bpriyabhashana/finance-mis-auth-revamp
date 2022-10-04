import { useEffect } from "react";
import {
  Typography,
  DialogTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export default function ErrorDialog(props) {
  const handleClose = () => {
    props.handleOpen();
  };

  useEffect(() => {}, [props.open, props.message]);

  return (
    <Dialog
      fullWidth
      open={props.open}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title">
        <Typography variant="h4">{"Error"}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="error-dialog-description">
          {props.message ? props.message : "The application ran into an error!"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant={"contained"}
          color={"secondary"}
          autoFocus
        >
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
