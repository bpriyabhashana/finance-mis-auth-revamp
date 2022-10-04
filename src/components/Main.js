import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Typography,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemIcon,
  experimentalStyled,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { PowerSettingsNew } from "@mui/icons-material";
import { useAuthContext } from "@asgardeo/auth-react";

import logo from "../images/logo.png";
import { APP_NAME, PAGES } from "../Config";
import NavigationDrawer from "./NavigationDrawer";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../pages/NotFound";

const MainLayoutRoot = experimentalStyled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

const MainLayoutWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
}));

const MainLayoutContainer = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  padding: 20,
});

const Main = (props) => {
  const {
    state,
    signIn,
    signOut,
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken,
  } = useAuthContext();

  const [open, setOpen] = useState(false);
  const [hoverActive, setHoverActive] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = useState(PAGES.PAGE_ONE);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "popover" : undefined;

  useEffect(() => {
    setPage(props.page);
  }, [props.page]);

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

  return (
    <MainLayoutRoot>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            {open && !hoverActive ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <span>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "80px", marginTop: 4, paddingRight: 10 }}
            />
          </span>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4" noWrap style={{ flexGrow: 1 }}>
                {APP_NAME}
              </Typography>
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                spacing={1}
                justify="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="body2" display="block">
                    {props.derivedResponse?.decodedIDTokenPayload.email}
                  </Typography>
                </Grid>
                <Grid item onClick={handleClick} style={{ cursor: "pointer" }}>
                  {props.authData ? (
                    <Avatar
                      title={props.derivedResponse?.decodedIDTokenPayload.email}
                      src={props.derivedResponse?.decodedIDTokenPayload.email}
                    />
                  ) : (
                    <Avatar
                      title={props.derivedResponse?.decodedIDTokenPayload.email}
                    >
                      <PersonIcon />
                    </Avatar>
                  )}
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
                        {props.authData ? (
                          <Avatar
                            title={
                              props.derivedResponse?.decodedIDTokenPayload.email
                            }
                            src={
                              props.derivedResponse?.decodedIDTokenPayload.email
                            }
                          />
                        ) : (
                          <Avatar>
                            <PersonIcon />
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          props.derivedResponse?.decodedIDTokenPayload.email
                        }
                      />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      <ListItemIcon>
                        <PowerSettingsNew color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <MainLayoutWrapper>
        <div
          onMouseOver={handleDrawerHoverOver}
          onMouseOut={handleDrawerHoverOut}
        >
          <NavigationDrawer
            open={open}
            page={page}
            handleDrawerClose={handleDrawerClose}
          />
        </div>
        <MainLayoutContainer>
          <main>
            <Switch>
              {/* <Route
                exact
                path={PAGES.PAGE_ONE}
                render={({ match, location, history }) => {
                  return <ChildComponent />;
                }}
              />
              <Route
                exact
                path={PAGES.PAGE_TWO}
                render={({ match, location, history }) => {
                  return <ChildComponent2 />;
                }}
              /> */}
              <Redirect
                exact
                from={PAGES.CHILD_COMPONENT}
                to={PAGES.PAGE_ONE}
              />
              <Route component={NotFound} />
            </Switch>
          </main>
        </MainLayoutContainer>
      </MainLayoutWrapper>
    </MainLayoutRoot>
  );
};

export default Main;
