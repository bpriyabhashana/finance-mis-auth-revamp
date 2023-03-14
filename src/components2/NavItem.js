import { Fragment, useEffect } from "react";
import { withStyles } from "@mui/styles";
import { useTheme } from "@mui/styles";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  ListItem,
  ListItemButton as MuiListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const NavItem = (props) => {
  const theme = useTheme();
  const { href, title, icon } = props;
  const location = useLocation();

  const ListItemButton = withStyles({
    root: {
      "&$selected": {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: `${theme.palette.primary.contrastText}`,
        "& .MuiListItemIcon-root": {
          color: `${theme.palette.primary.contrastText}`,
        },
      },
      "&$selected:hover": {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: `${theme.palette.primary.contrastText}`,
        "& .MuiListItemIcon-root": {
          color: `${theme.palette.primary.contrastText}`,
        },
      },
      // "&:hover": {
      //   backgroundColor: "blue",
      //   "& .MuiListItemIcon-root": {
      //     color: "white"
      //   }
      // }
    },
    selected: {},
  })(MuiListItemButton);

  const active = href
    ? !!matchPath(
        {
          path: href,
          end: false,
        },
        location.pathname
      )
    : false;

  useEffect(() => {}, [props.selected]);

  return (
    <RouterLink to={href}>
      <ListItem
        sx={{
          maxWidth: 300,
          overflow: "clip",
          textOverflow: "ellipsis",
          p: 0,
        }}
      >
        <ListItemButton
          selected={props.selected}
          sx={{ borderRadius: 1, mr: 0, mb: 0.5, mt: 0.5 }}
        >
          <ListItemIcon sx={{ mr: -1 }}>{icon()}</ListItemIcon>
          <ListItemText
            primary={
              <Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  noWrap
                >
                  {title}
                </Typography>
              </Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
    </RouterLink>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default NavItem;
