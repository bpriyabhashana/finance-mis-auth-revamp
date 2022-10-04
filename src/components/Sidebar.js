import { useEffect } from "react";
import clsx from "clsx";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer as MuiDrawer,
  Hidden,
  IconButton,
  Link,
  List,
  Typography,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import HomeIcon from "@mui/icons-material/Home";
import NavItem from "./NavItem";
import { APP_CONFIG, PRIVILEGES } from "../Config";
import { getGmailMailTo } from "../utils/formatting";
import { isAccessGranted } from "../utils/oauth";

const items = [
  {
    href: APP_CONFIG.PAGES.HOME,
    icon: () => <HomeIcon />,
    title: "Home",
    checkPrivilege: true,
    privilege: [PRIVILEGES.HOME],
  },
  {
    href: APP_CONFIG.PAGES.MANAGE,
    icon: () => <FlightIcon />,
    title: "Manage",
    checkPrivilege: true,
    privilege: [PRIVILEGES.MANAGE],
  },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    zIndex: 500,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: "clip",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: "clip",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "clip",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  overflow: "clip",
  width: `calc(${theme.spacing(8)})`,
  //   [theme.breakpoints.up('sm')]: {
  //     width: `calc(${theme.spacing(9)} + 1px)`,
  //   },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  zIndex: 1,
}));

export default function MiniDrawer({ open, hoverActive, page, ...rest }) {
  const theme = useTheme();
  const classes = useStyles();

  useEffect(() => {}, [open, hoverActive]);

  useEffect(() => {}, [page]);

  const selectItem = (item) => {
    console.log(item);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <DrawerHeader></DrawerHeader>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Divider />
        <Box sx={{ pt: 1, pl: 1 }}>
          <List>
            {items.map((item, index) => {
              return (
                isAccessGranted(item.privilege) && (
                  <NavItem
                    selected={page && page.startsWith(item.href)}
                    href={item.href}
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                  />
                )
              );
            })}
            {/* <Divider />
            <NavItem
              selected={page && page.startsWith(APP_CONFIG.PAGES.MANAGE)}
              href={APP_CONFIG.PAGES.MANAGE}
              key={"manage-nav-item"}
              title={"Manage"}
              icon={() => <BuildIcon />}
            /> */}
          </List>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Collapse
          in={open}
          orientation="horizontal"
          classes={{ wrapperInner: { width: "100%" } }}
          timeout={2}
        >
          <Box
            sx={{
              backgroundColor: "background.default",
              m: 2,
              p: 2,
            }}
          >
            <Typography align="center" gutterBottom variant="h4" noWrap>
              Need help?
            </Typography>
            <Typography align="center" variant="body2" noWrap>
              Contact Internal Apps
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
              }}
            >
              <Link
                href={getGmailMailTo(
                  APP_CONFIG.EMAILS.GET_HELP_EMAIL_TO,
                  APP_CONFIG.EMAILS.GET_HELP_EMAIL_SUBJECT
                )}
                target="_blank"
                rel="noreferrer"
              >
                <Button color="primary" variant="contained">
                  Get Help
                </Button>
              </Link>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Drawer>
  );
}

// import React from "react";

// const Sidebar = () => {
//   return <div>test</div>;
// };

// export default Sidebar;
