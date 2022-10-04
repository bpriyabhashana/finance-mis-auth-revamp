import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import FOOTER_LOGOS from "../images/footer.png";
import { useAuthContext } from "@asgardeo/auth-react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

const useStyle = makeStyles(() => ({
  pageStyle: {
    width: "90vw",
    height: "90vh",
    display: "table-cell",
    textAlign: "center",
    verticalAlign: "middle",
    // backgroundColor: "rgb(244, 246, 248)",
    padding: 20,
  },
}));

const AuthError = () => {
  const { signOut } = useAuthContext();

  const handleLogout = () => {
    signOut();
  };

  const classes = useStyle();
  return (
    <div className={classes.pageStyle}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              p: 2,
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <Typography align="center" color="textPrimary" variant="h1">
                  Error: An error occured while authenticating
                </Typography>
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="subtitle2"
                  gutterBottom
                >
                  You are facing an error while authenticating. Please retry
                  later or contact administration
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  className="btn primary"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Retry
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <img width="60" src={FOOTER_LOGOS} className="footer-image" />
    </div>
  );
};

export default AuthError;
