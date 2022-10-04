import React, { useState, useEffect } from "react";
import { Alert, Snackbar, SnackbarContent } from "@mui/material";

export default function CustomSnackbar(props) {
  const [open, setOpen] = useState(props.snackbar?props.snackbar.open:false);
  const [severity, setSeverity] = useState(props.snackbar?props.snackbar.severity:"success");
  const [message, setMessage] = useState(props.snackbar?props.snackbar.message:"");
  // const [open, setOpen] = useState(true);
  // const [severity, setSeverity] = useState("success");
  // const [message, setMessage] = useState("");

  useEffect(() => {
    setOpen(props.snackbar?props.snackbar.open:false);
    setSeverity(props.snackbar?props.snackbar.severity:"success")
    setMessage(props.snackbar?props.snackbar.message:"")
  }, [props]);

  const handleClose = (event, reason) => {
    if( !(reason === "clickaway")) {
      setOpen(false);
      props.snackbar.onClose()
    }
  };

  return (
    <div>
      <Snackbar
        style={{zIndex:"10004"}}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        {message && severity ? (
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        ) : (
          <SnackbarContent message={message ? message : ""} />
        )}
      </Snackbar>
    </div>
  );
}
