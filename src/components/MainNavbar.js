import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/styles";
import { Link as RouterLink, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  Divider,
  Hidden,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Link,
  Stack,
  Tooltip,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
import { PowerSettingsNew } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";

import { APP_CONFIG, APP_NAME, USER_CUSTOM_CONFIGS } from "../Config";
import Logo from "./Logo";
import UserContext from "../context/user-context";
import LaunchPad from "./launchpad/LaunchPad";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // ...(open && {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // }),
}));

const MainNavbar = ({
  open,
  hoverActive,
  handleDrawerOpen,
  handleDrawerClose,
  handleDrawerHoverOver,
  handleDrawerHoverOut,
  userData,
  ...rest
}) => {
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const openAccount = Boolean(accountAnchorEl);

  const handleClickAccount = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };
  const handleCloseAccount = () => {
    setAccountAnchorEl(null);
  };

  useEffect(() => {}, [open, hoverActive]);

  return (
    <UserContext.Consumer>
      {(context) => (
        <AppBar elevation={0} {...rest} open={true} style={{ zIndex: "10000" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => (open ? handleDrawerClose() : handleDrawerOpen())}
              onMouseOver={handleDrawerHoverOut}
              onMouseOut={handleDrawerHoverOver}
              edge="start"
              sx={{ ml: -1 }}
            >
              {open && !hoverActive ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <NavLink to={APP_CONFIG.PAGES.HOME}>
              <Logo />
            </NavLink>
            <Typography
              variant="h4"
              // className={classes.title}
              noWrap
            >
              {APP_NAME}
            </Typography>
            {/* </RouterLink> */}
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body2" display="block">
              {context.userName}
            </Typography>
            {/* {USER_CUSTOM_CONFIGS.LAUNCHPAD ? <LaunchPad /> : null} */}
            <IconButton
              onClick={handleClickAccount}
              size="small"
              sx={{ ml: 2 }}
            >
              {userData ? (
                <Avatar
                  alt={
                    (userData.FirstName ? userData.FirstName : "") +
                    " " +
                    (userData.LastName ? userData.LastName : "")
                  }
                  src={userData.ThumbnailURL}
                />
              ) : (
                <Avatar alt={userData && userData.userEmail}>
                  <PersonIcon />
                </Avatar>
              )}
            </IconButton>
            <Menu
              style={{ zIndex: 10001 }}
              anchorEl={accountAnchorEl}
              open={openAccount}
              onClose={handleCloseAccount}
              onClick={handleCloseAccount}
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
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuList>
                <Tooltip title={context.userName} arrow>
                  <NavLink
                    to={
                      APP_CONFIG.PAGES.MANAGE +
                      "?view=" +
                      APP_CONFIG.QUERY_VALUES.ACCOUNT
                    }
                  >
                    <MenuItem>
                      <ListItemAvatar>
                        {context.userName ? (
                          <Avatar
                            title={context.userName}
                            src={context.userName}
                          />
                        ) : (
                          <Avatar>
                            <PersonIcon />
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText primary={context.userName} />
                    </MenuItem>
                  </NavLink>
                </Tooltip>
                <Divider />
                <MenuItem onClick={context.handleLogout}>
                  <ListItemIcon>
                    <PowerSettingsNew color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </MenuList>
            </Menu>
          </Toolbar>
        </AppBar>
      )}
    </UserContext.Consumer>
  );
};

export default MainNavbar;
