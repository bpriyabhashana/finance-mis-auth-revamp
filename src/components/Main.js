import { useEffect, useState, useCallback } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { PowerSettingsNew } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Button,
  Menu,
  MenuList,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { PAGES, APP_NAME, OAUTH_CONFIG } from "../Config";
import {
  setIdToken,
  setUserName,
  getUserName,
  setUserRoles,
  getUserRoles,
  setRefreshTokenFunction,
  getNewAPIToken,
  getToken,
  setUserPrivileges,
  getUserPrivileges,
} from "./utils/oauth";

import DrawerMenuVariant from "./DrawerMenuVariant";
import PersonIcon from "@mui/icons-material/Person";
import CircularProgressIndeterminate from "./CircularProgressIndeterminate";

import { useAuthContext } from "@asgardeo/auth-react";

import logo from "../images/logo.png";
import useStyles from "./MainStyle";

import NotFound from "./NotFound";
import EngagementNew from "./engagements/EngagementNew";
import Dashboard from "./dashboard/Dashboard";

import UserContext from "./UserContext";
import { AppConfig, Privileges } from "../Config";
import useHttp from "./utils/http";
import { isAccessGranted } from "./utils/utils";
import BackdropProgress from "./BackdropProgress";
import { QUERY_PARAMS_REGEX } from "./utils/AppConstants";

import Portal from "@mui/material/Portal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "./Alert";

import { useHistory } from "react-router-dom";

let theme = createTheme({
  palette: {
    primary: {
      light: "#465867",
      main: "#212a32",
      dark: "#465867",
    },
    secondary: {
      main: "#ff7300",
    },
    error: {
      main: "#e84118",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 4,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
      containedSecondary: {
        color: "#fff",
      },
      outlinedSizeSmall: {
        paddingTop: 1,
        paddingBottom: 1,
        paddingRight: 7,
        paddingLeft: 7,
      },
      containedSizeSmall: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 7,
        paddingLeft: 7,
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        maxWidth: 300,
        padding: 0,
        [theme.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0,
        },
        overflow: "visible",
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiBadge: {
      badge: {
        backgroundColor: "#465867",
        color: "#fff",
      },
    },
    MuiGrid: {
      item: {
        paddingRight: 1,
      },
    },
    MuiAccordionSummary: {
      root: {
        "&$expanded": {
          borderBottom: "0.5px solid #000",
          transition:
            "border 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        paddingLeft: 8,
      },
      content: {
        width: "100%",
        margin: "8px 0px",
        "&$expanded": {
          margin: "14px 0px",
        },
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: "0px 0px 0px",
      },
    },
    MuiAccordion: {
      root: {
        border: "2px solid transparent",
        "&$expanded": {
          border: "2px solid gray",
          transition: "border 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    MuiDialogTitle: {
      root: {
        padding: "16px 24px 0px 24px",
      },
    },
    MuiCollapse: {
      container: {
        width: "100%",
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        },
      },
    },
    MuiFab: {
      secondary: {
        color: "#fff",
        fontWeight: 500,
      },
    },
    MuiFormControlLabel: {
      root: {
        margin: "0px !important",
      },
    },
  },
};

const Main = (props) => {
  const { handleRequest } = useHttp();
  const history = useHistory();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hoverActive, setHoverActive] = useState(true);
  const [page, setPage] = useState(null);

  const [isMessageBarOpen, setIsMessageBarOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertMessageType, setAlertMessageType] = useState("error");

  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "popover" : undefined;

  const handleDrawerToggle = () => {
    if (open) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setHoverActive(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setHoverActive(false);
    setTimeout(() => {
      setHoverActive(true);
    }, 500);
  };

  const handleDrawerHoverOver = () => {
    if (hoverActive) {
      setOpen(true);
    }
  };

  const handleDrawerHoverOut = () => {
    if (hoverActive) {
      setOpen(false);
    }
  };

  useEffect(() => {
    setPage(props.page);
  }, [props.page]);

  const {
    state,
    signIn,
    signOut,
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken,
    refreshAccessToken,
  } = useAuthContext();

  const [loggedOutStatus, setLoggedOutStatus] = useState(""); // status msg
  const [loadApp, setLoadApp] = useState(false);
  const [authenticateState, setAuthenticateState] = useState(null);
  const [isUserPrivileged, setIsUserPrivileged] = useState(false);
  const [isAppInitializing, setIsAppInitializing] = useState(false);

  const setIsInitLogin = (value) => {
    sessionStorage.setItem("isInitLogin", value);
  };

  const getIsInitLogin = () => {
    if (sessionStorage.getItem("isInitLogin") === "true") {
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
    const endPointUrl = AppConfig.baseUrl + AppConfig.getUserPrivileges;

    handleRequest(
      endPointUrl,
      "GET",
      null,
      (privileges) => {
        let userPrivileges = [];

        privileges.forEach((privilege) => {
          userPrivileges.push(privilege.privilegeId);
        });

        setUserPrivileges(userPrivileges);

        setIsUserPrivileged(userPrivileges.length > 0);

        if (userPrivileges.length === 0) {
          setMessageBar(
            "You are not privileged to view this app",
            true,
            "error"
          );
        } else if (callbackFn) {
          callbackFn();
        }
      },
      () => {
        setMessageBar(
          "An error occurred in initializing the app! Try reloading the page. Please contact the Internal Apps Team if this issue continues.",
          true,
          "error"
        );
      },
      setIsAppInitializing
    );
  }, []);

  // const getLogInStatus = () => {
  //   return (state.isAuthenticated && loadApp);
  // };

  const handleLogin = () => {
    setIsInitLogin("true");
    setLoggedOutStatus("Redirecting to Asgardeo...");
    signIn();
  };

  const handleLogout = () => {
    signOut();
    setIsInitLogin("false");
  };

  const handleRefreshToken = () => {
    return refreshAccessToken()
      .then(async (e) => {
        const idToken = await getIDToken();
        return idToken;
      })
      .catch((err) => {
        if (err) {
          let expirationJWT =
            authenticateState && authenticateState.decodedIDTokenPayload
              ? authenticateState.decodedIDTokenPayload.exp
              : "";

          if (!expirationJWT || Date.now() >= expirationJWT * 1000) {
            handleLogout();
          }
        }
      });
  };

  useEffect(() => {
    setPathNameToRedirect();
  }, []);

  useEffect(() => {
    if (getIsInitLogin()) {
      signIn().catch((error) => {
        // setAuthenticationError(true);
        setLoggedOutStatus("Error while logging in!");
      });
    }
  }, []);

  useEffect(() => {
    if (state && state.isAuthenticated) {
      setRefreshTokenFunction(handleRefreshToken);
      const getUserData = async (callback) => {
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
          if (OAUTH_CONFIG.SKIP_TOKEN_EXCHANGE) {
            setLoadApp(true);
            if (callback) {
              callback();
            }
          } else {
            getNewAPIToken(() => {
              setLoadApp(true);

              if (callback) {
                callback();
              }
            });
          }
        }

        if (basicUserInfo && basicUserInfo.email) {
          setUserName(basicUserInfo.email);
        }
        if (basicUserInfo && basicUserInfo.groups) {
          setUserRoles(basicUserInfo.groups);
        }

        setAuthenticateState(authState);
      };

      getUserData(() => {
        // initUserPrivileges(redirectToPathName());
      });
    }
  }, [state.isAuthenticated]);

  useEffect(() => {
    // timedOutLogoutListener();
    if (state && state.isAuthenticated) {
      const getUserData = async (callback) => {
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

        if (callback) {
          callback();
        }

        if (idToken) {
          setLoadApp(true);
        }

        if (basicUserInfo && basicUserInfo.email) {
          setUserName(basicUserInfo.email);
        }

        if (basicUserInfo && basicUserInfo.groups) {
          setUserRoles(basicUserInfo.groups);
        }

        setAuthenticateState(authState);
      };

      getUserData(() => {
        // initUserPrivileges(redirectToPathName());
      });
    } else {
      if (!getToken()) {
        setIdToken(handleRefreshToken());
      }
    }
  }, []);

  const setMessageBar = (message, isOpen, type) => {
    setAlertMessage(message);
    setIsMessageBarOpen(isOpen);
    setAlertMessageType(type);
  };

  const handleMessageBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsMessageBarOpen(false);
    setAlertMessage("");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return state.isAuthenticated && loadApp ? (
    //   (state.isAuthenticated) ? (

    <UserContext.Provider
      value={{
        userName: getUserName(),
      }}
    >
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                className={classes.menuButton}
              >
                {open && !hoverActive ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              <span className={classes.logo}>
                <img src={logo} alt="Logo" style={{ width: "100%" }} />
              </span>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6" className={classes.title} noWrap>
                    Finance MIS
                  </Typography>
                </Grid>
                <Grid item></Grid>
                <Grid item xs={5}>
                  <Grid
                    container
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="body2" display="block">
                        {getUserName()}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Avatar onClick={handleClick} alt="e mail">
                        <PersonIcon />
                      </Avatar>
                    </Grid>
                    <Menu
                      id={id}
                      open={openPopover}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          width: 300,
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                    >
                      <MenuList>
                        <MenuItem>
                          <ListItemAvatar>
                            <Avatar>
                              <PersonIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={getUserName()} />
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          onClick={() => {
                            handleLogout();
                          }}
                        >
                          <ListItemIcon>
                            <PowerSettingsNew
                              color="primary"
                              fontSize="small"
                            />
                          </ListItemIcon>
                          <ListItemText primary="Logout" />
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    {/* <Grid item>
                      <Button
                        id="logout"
                        onClick={() => {
                          handleLogout();
                        }}
                        variant="contained"
                      >
                        Log Out
                      </Button>
                    </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <div
            onMouseOver={handleDrawerHoverOver}
            onMouseOut={handleDrawerHoverOut}
          >
            <DrawerMenuVariant
              open={open}
              handleDrawerClose={handleDrawerClose}
              page={page}
            />
          </div>

          <BackdropProgress open={isAppInitializing} />

          <Portal>
            <Snackbar
              open={isMessageBarOpen}
              autoHideDuration={6000}
              onClose={handleMessageBarClose}
            >
              <Alert
                onClose={handleMessageBarClose}
                severity={alertMessageType}
              >
                {alertMessage}
              </Alert>
            </Snackbar>
          </Portal>

          <main
            className={
              open ? classes.contentDrawerOpen : classes.contentDrawerClose
            }
          >
            <div className={classes.toolbar} />

            <Switch>
              <Route
                exact
                path={PAGES.DASHBOARD}
                render={() => {
                  return <Dashboard />;
                }}
              />

              <Route
                exact
                path={PAGES.NEW_ENGAGEMENT}
                render={() => {
                  return <EngagementNew key={"customer-engagement"} />;
                }}
              />

              <Redirect exact from="/" to={PAGES.DASHBOARD} />

              <Route
                render={() => {
                  return <NotFound />;
                }}
              />
            </Switch>
          </main>
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  ) : (
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
                  <Typography variant="h3">{APP_NAME}</Typography>
                </Grid>
                {/* Handle Error authenticationError */}
                {!(
                  getIsInitLogin() ||
                  state.isLoading ||
                  state.isAuthenticated
                ) && (
                  <Grid item xs={12}>
                    <Button
                      id="login"
                      onClick={() => {
                        handleLogin();
                      }}
                      variant="contained"
                      color="secondary"
                      disabled={
                        getIsInitLogin() ||
                        state.isLoading ||
                        state.isAuthenticated
                      }
                    >
                      Log In
                    </Button>
                  </Grid>
                )}

                {getIsInitLogin() ||
                state.isLoading ||
                state.isAuthenticated ? (
                  <Grid item xs={12}>
                    <Typography variant="caption">
                      <CircularProgressIndeterminate isLoading={true} />
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="caption">{loggedOutStatus}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </CardContent>
          <Divider />
        </Card>
      </Container>
    </Box>
  );
};

export default Main;
