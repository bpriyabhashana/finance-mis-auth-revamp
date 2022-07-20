import React, { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";

import {
  CssBaseline,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import clsx from "clsx";

import useStyles from "./MainStyle";
import { PAGES, Privileges } from "../Config";
import DashboardIcon from "../images/dashboard.png";
import EngagementIcon from "../images/engagement.png";
import InternalEngagementIcon from "../images/internal-engagement.png";
import TeamAllocationsIcon from "../images/team-allocations.png";
import ReportsIcon from "../images/reports.png";
import SettingsIcon from "../images/settings.png";
import { isAccessGranted } from "./utils/utils";

const DrawerMenuVariant = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
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
        <div className={classes.toolbar}></div>
        <Divider />
        <List>
          {/* {isAccessGranted([Privileges.DASHBOARD_PAGE]) && */}
          <NavLink to={PAGES.DASHBOARD} className={classes.navLink}>
            <ListItem
              button
              key={"dashboard"}
              selected={props.page === PAGES.DASHBOARD}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.itemIcon}>
                <img
                  src={DashboardIcon}
                  alt="dashboard"
                  className={classes.icon}
                />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </NavLink>

          <NavLink to={PAGES.NEW_ENGAGEMENT} className={classes.navLink}>
            <ListItem
              button
              key={"new_engagement"}
              selected={props.page === PAGES.NEW_ENGAGEMENT}
              className={classes.listItem}
            >
              <ListItemIcon className={classes.itemIcon}>
                <img
                  src={EngagementIcon}
                  alt="new-engagement"
                  className={classes.icon}
                />
              </ListItemIcon>
              <ListItemText
                primary="Customer Engagements"
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
    </div>
  );
};

export default DrawerMenuVariant;
