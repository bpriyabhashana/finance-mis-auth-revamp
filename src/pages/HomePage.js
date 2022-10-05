import CustomSnackbar from "../components/ui/Snackbars.js";
import IdleTimer from "../components/IdleTimer";
import LoadingButton from "@mui/lab/LoadingButton";
import MainLayout from "../components/MainLayout";
import NotFound from "./NotFound";
import UserContext from "../context/user-context";
import useHttp from "../utils/http";
import { Fragment } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  setIdToken,
  setUserName,
  getUserName,
  setUserRoles,
  getNewTokens,
  setUserPrivileges,
  revokeTokens,
  setRefreshTokenFunction,
  setSessionClearFunction,
} from "../utils/oauth";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { APP_NAME, APP_CONFIG, AUTH_CONFIG, OAUTH_CONFIG } from "../Config";
import { getPrivilegesByRoles } from "../utils/end-points";
import { QUERY_PARAMS_REGEX } from "../Config.js";
import { useHistory } from "react-router-dom";
import BackdropProgress from "../BackdropProgress.js";

const HomePage = () => {
  const history = useHistory();
  const {
    state,
    signIn,
    signOut,
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken,
    refreshAccessToken,
    getAccessToken,
    revokeAccessToken,
  } = useAuthContext();

  const [loggedOutStatus, setLoggedOutStatus] = useState("");
  const [loadApp, setLoadApp] = useState(false);
  const [loadPrivileges, setLoadPrivileges] = useState(false);
  const { handleRequest } = useHttp();

  //set backdrop for this
  const [isAppInitializing, setIsAppInitializing] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    severity: "",
    onClose: null,
  });

  const getIsInitLogin = () => {
    if (sessionStorage.getItem("isInitLogin") === "true") {
      return true;
    } else {
      // setLoggedOutStatus("Error while logging in!");
      return false;
    }
  };

  const setIsLoggedOut = (value) => {
    sessionStorage.setItem("isLoggedOut", value);

    setLoggedOutState(value === "true");
  };

  const getIsLoggedOut = () => {
    if (sessionStorage.getItem("isLoggedOut") === "true") {
      return true;
    } else {
      return false;
    }
  };

  const [loggedOutState, setLoggedOutState] = useState(getIsLoggedOut());

  const setIsSessionTimeOut = (value) => {
    sessionStorage.setItem("isSessionTimeOut", value);
  };

  const getIsSessionTimeOut = () => {
    if (sessionStorage.getItem("isSessionTimeOut") === "true") {
      return true;
    } else {
      return false;
    }
  };

  const setPathNameToRedirect = () => {
    if (
      !sessionStorage.getItem("pathNameToRedirect") &&
      history &&
      history.location &&
      history.location.pathname
    ) {
      if (validatePathName(history.location.pathname)) {
        sessionStorage.setItem("pathNameToRedirect", history.location.pathname);
      }
    }
  };

  const validatePathName = (pathname) => {
    let isValid = false;

    if (pathname !== "/") {
      if (pathname.split("/").length > 1) {
        let queryParams = pathname.split("/").pop();

        if (queryParams.length < 20 && QUERY_PARAMS_REGEX.test(queryParams)) {
          isValid = true;
        }
      } else {
        isValid = true;
      }
    }

    return isValid;
  };

  const getPathNameToRedirect = () => {
    return sessionStorage.getItem("pathNameToRedirect");
  };

  const redirectToPathName = () => {
    const pathNameToRedirect = getPathNameToRedirect();

    if (pathNameToRedirect != "null" && pathNameToRedirect) {
      sessionStorage.removeItem("pathNameToRedirect");
      history.push(pathNameToRedirect);
    }
  };

  const initUserPrivileges = useCallback(async (callbackFn) => {
    setIsAppInitializing(true);
    // handleRequest(
    //   getPrivilegesByRoles,
    //   "GET",
    //   null,
    //   (data) => {
    //     setUserPrivileges(data);
    //     if (data.length === 0) {
    //       setSnackbarData({
    //         message: "You are not privileged to view this app",
    //         open: true,
    //         severity: "error",
    //         onClose: onCloseSnackbar,
    //       });
    //     } else if (callbackFn) {
    //       callbackFn();
    //     }
    //     setLoadPrivileges(true);
    //   },
    //   () => {
    //     setSnackbarData({
    //       message:
    //         "An error occurred in initializing the app! Try reloading the page. Please contact the Internal Apps Team if this issue continues.",
    //       open: true,
    //       severity: "error",
    //       onClose: onCloseSnackbar,
    //     });
    //   },
    //   setIsAppInitializing
    // );
    setIsAppInitializing(false);
  }, []);

  const setIsInitLogin = (value) => {
    sessionStorage.setItem("isInitLogin", value);
  };

  const handleLogin = () => {
    setIsInitLogin("true");
    setIsSessionTimeOut("false");
    setIsLoggedOut("false");

    signIn().catch((e) => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    setIsAppInitializing(true);
    // revoke token is not working for choreo
    revokeTokens(() => {
      signOut().catch((e) => {
        console.error(e);
      });
      setIsInitLogin("false");
      setIsLoggedOut("true");
      setIsSessionTimeOut("false");
      setIsAppInitializing(false);
    });
  };

  useEffect(() => {
    if (!getIsLoggedOut() && !(state?.isLoading || state?.isAuthenticated)) {
      handleLogin();
    }
  }, [state.isLoading, state.isAuthenticated]);

  const handleTokenRefresh = () => {
    return refreshAccessToken()
      .then(async (e) => {
        const idToken = await getIDToken();
        return idToken;
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  };

  useEffect(() => {
    setPathNameToRedirect();
  }, []);

  useEffect(() => {
    if (state && state.isAuthenticated) {
      setRefreshTokenFunction(handleTokenRefresh);
      setSessionClearFunction(sessionClearFn);

      const getData = async (callback) => {
        const basicUserInfo = await getBasicUserInfo();
        const idToken = await getIDToken();
        const decodedIDToken = await getDecodedIDToken();

        const authState = {
          authenticateResponse: basicUserInfo,
          idToken: idToken.split("."),
          decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
          decodedIDTokenPayload: decodedIDToken,
        };
        setIdToken(idToken);

        if (idToken) {
          getNewTokens(() => {
            setLoadApp(true);

            if (callback) {
              callback();
            }
          }).catch((e) => {
            console.error(e);
            setSnackbarData({
              message:
                "An error occurred in initializing the app! Try reloading the page. Please contact the Internal Apps Team if this issue continues.",
              open: true,
              severity: "error",
              onClose: onCloseSnackbar,
            });
            sessionClearFn();
          });
        }

        if (basicUserInfo?.email) {
          setUserName(basicUserInfo.email);
        }
        if (basicUserInfo?.groups) {
          setUserRoles(basicUserInfo.groups);
        }
      };
      getData(() => {
        initUserPrivileges(redirectToPathName());
      });
    }
  }, [state.isAuthenticated, state.isLoading]);

  const onCloseSnackbar = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  const sessionClearFn = () => {
    setLoadApp(false);
    setIsInitLogin("false");
    setIsSessionTimeOut("true");
    setIsLoggedOut("true");

    revokeTokens();
    revokeAccessToken().catch((e) => {
      console.error(e);
    });
    history.push("");
  };

  return (
    <Fragment>
      <CustomSnackbar snackbar={snackbarData} />
      <BackdropProgress open={isAppInitializing} />

      {AUTH_CONFIG.clientID === "" ? (
        <div className="content">
          <h2>You need to update the Client ID to proceed.</h2>
          <p>
            Please open "src/config.json" file using an editor, and update the{" "}
            <code>clientID</code> value with the registered application's client
            ID.
          </p>
          <p>
            Visit repo{" "}
            <a href="https://github.com/asgardeo/asgardeo-auth-react-sdk/tree/master/samples/asgardeo-react-app">
              README
            </a>{" "}
            for more details.
          </p>
        </div>
      ) : state.isAuthenticated && loadApp ? (
        <UserContext.Provider
          value={{
            userName: getUserName(),
            handleLogout: handleLogout,
          }}
        >
          <BrowserRouter>
            <Switch>
              <Route
                path={APP_CONFIG.PAGES.APP}
                render={({ match, location, history }) => {
                  return <MainLayout page={location.pathname} />;
                }}
              />
              <Redirect exact from="/" to={APP_CONFIG.PAGES.APP} />
              <Route component={NotFound} />
            </Switch>
            <IdleTimer sessionClearFn={sessionClearFn} />
          </BrowserRouter>
        </UserContext.Provider>
      ) : (
        <>
          {/* <Helmet> */}
          <title>Login | {APP_NAME}</title>
          {/* </Helmet> */}
          <Box
            sx={{
              backgroundColor: "background.default",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Container maxWidth="md">
              <Card>
                <CardContent>
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
                        <img
                          alt="logo"
                          width="150"
                          height="auto"
                          src="https://wso2.cachefly.net/wso2/sites/images/brand/downloads/wso2-logo.png"
                        ></img>
                      </Grid>
                      <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="h2">{APP_NAME}</Typography>
                      </Grid>
                      {/* Handle Error authenticationError */}
                      <Grid item xs={12}>
                        <LoadingButton
                          id="login"
                          onClick={() => {
                            handleLogin();
                          }}
                          variant="contained"
                          color="secondary"
                          loading={getIsInitLogin()}
                          loadingPosition="center"
                        >
                          Log In
                        </LoadingButton>
                      </Grid>
                      {getIsInitLogin() && (
                        <Grid item xs={12}>
                          <Typography variant="caption">
                            Redirecting to Asgardeo...
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
              </Card>
            </Container>
          </Box>
        </>
      )}
    </Fragment>
  );
};

export default HomePage;
