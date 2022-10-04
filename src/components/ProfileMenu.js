import { Fragment, useState, useRef, useEffect } from 'react';
import {
    Divider,
    Avatar,
    ListItemText,
    ListItemIcon,
    Grid,
    Typography,
    IconButton
} from '@material-ui/core';
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { PowerSettingsNew } from "@mui/icons-material";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

const ProfileMenu = ({ userName, handleLogout }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleLogoutOption = (event) => {
        handleClose(event);
        handleLogout();
    }

    const handleUserGuideOption = (event) => {
        handleClose(event);
        // window.open(AppConfig.userGuideUrl, "_blank");
    }

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Fragment>
            <Grid item>
                <Typography variant="body2" display="block">
                    {userName}
                </Typography>
            </Grid>
            <Grid item>
                <IconButton
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Avatar
                        title={userName}
                    >
                        <PersonIcon />
                    </Avatar>
                </IconButton>

            </Grid>

            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper className={classes.paper}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleUserGuideOption}>
                                        <ListItemIcon>
                                            <MenuBookIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="User Guide" />
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleLogoutOption}>
                                        <ListItemIcon>
                                            <PowerSettingsNew fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Log Out" />
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>


    );
};

export default ProfileMenu;