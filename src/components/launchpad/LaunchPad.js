import React from "react";
import { AppsOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
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
  ListItem,
  Button,
} from "@mui/material";
import LaunchPadController from "./LaunchPadController";
import { LAUNCHPAD_ITEMS } from "../../Config";

const LaunchPad = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick} sx={{ color: "white" }}>
        <AppsOutlined fontSize="medium" />
      </IconButton>

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
              //   ml: -0.5,
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
          {/* <MenuItem> */}
          <Grid container p={1} columns={{ md: 12 }}>
            {LAUNCHPAD_ITEMS.map((item, index) => (
              <>
                {item.isStared ? (
                  <Grid
                    style={{ textAlign: "center", cursor: "pointer" }}
                    my={1}
                    item
                    md={4}
                    key={index}
                    sx={{
                      "&:hover": {
                        background: "#84ffff",
                        borderRadius: "5px",
                      },
                    }}
                  >
                    <img src={item.icon} width="50" height="50" />
                    <Typography
                      style={{ fontWeight: "400", fontSize: "0.8em" }}
                    >
                      {item.title}
                    </Typography>
                  </Grid>
                ) : null}
              </>
            ))}
          </Grid>
          {/* </MenuItem> */}
          <Divider variant="middle" />
          {/* <MenuItem> */}
          <Grid mt={2} container justifyContent="center">
            <LaunchPadController />
          </Grid>
          {/* </MenuItem> */}
        </MenuList>
      </Menu>
    </>
  );
};

export default LaunchPad;
