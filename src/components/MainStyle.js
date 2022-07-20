import { makeStyles } from "@material-ui/core/styles";

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

  // Toolbar styles

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paper: {
    margin: 24,
  },
  MuiTypography: {
    root: {
      fontWeight: 300,
    },
  },

  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentDrawerOpen: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "calc(100% - 240px)",
  },
  contentDrawerClose: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "calc(100% - 73px)",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 80,
    paddingRight: 10,
    marginTop: 4,
  },
  appBarUser: {
    marginRight: 10,
  },
  menuButton: {
    marginRight: 12,
  },
  hide: {
    display: "none",
  },

  //   Nav drawer styles

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

  listItem: {
    borderRadius: 4,
    margin: 10,
    // border: '2px solid transparent',
  },
  listItemText: {
    // maxWidth: 166,
    overflow: "clip",
    textOverflow: "ellipsis",
    fontSize: "0.9rem",
  },
  icon: {
    height: 22,
    width: 22,
  },
  itemIcon: {
    minWidth: 50,
  },
  navLink: {
    textDecoration: "none",
    color: "#465867",
  },
}));

export default useStyles;
