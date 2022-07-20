import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const CircularProgressIndeterminate = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {isLoading && (
        <div className={classes.root}>
          <CircularProgress size={30} />
        </div>
      )}
    </React.Fragment>
  );
};

export default CircularProgressIndeterminate;
