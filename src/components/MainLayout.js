import React, { useState, useEffect, useRef } from "react";
import useHttp from "../utils/http";
import { Route, Switch, Redirect } from "react-router-dom";
import { experimentalStyled } from "@mui/material";
import MainNavbar from "./MainNavbar";
import SideBar from "./Sidebar";
import NotFound from "../pages/NotFound";
import { APP_CONFIG, PRIVILEGES } from "../Config.js";
import { isAccessGranted } from "../utils/oauth";
import ErrorDialog from "./dialog/ErrorDialog";
import PageOne from "./main_pages/PageOne";

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
});

const MainLayoutContent = experimentalStyled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

const MainLayout = (props) => {
  const { isLoading, data, error, sendRequest, reqExtra, isOpen } = useHttp();
  const [appInitialized, setAppInitialized] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(null);
  const [hoverActive, setHoverActive] = useState(true);
  const [errorDialog, setErrorDialog] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const sidebarTimer = useRef(true);

  const loadData = () => {
    sendRequest(
      APP_CONFIG.APIS.INITIALIZE_APP,
      "GET",
      null,
      APP_CONFIG.APIS.INITIALIZE_APP
    );
  };

  const handleDrawerToggle = () => {
    if (open) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  };

  const handleErrorDialog = (errorContent) => {
    setErrorDialog(errorContent ? errorContent : null);
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
    }, 250);
  };

  const handleDrawerHoverOver = () => {
    sidebarTimer.current = true;
    if (hoverActive && !open) {
      setTimeout(() => {
        if (sidebarTimer.current) {
          setOpen(true);
        }
      }, 100);
    }
  };

  const handleDrawerHoverOut = () => {
    sidebarTimer.current = false;
    if (hoverActive && open) {
      setOpen(false);
    }
  };

  const handleSetIntializedApp = () => {
    setAppInitialized(true);
  };

  useEffect(() => {
    setPage(props.page);
  }, [props.page]);

  return (
    <React.Fragment>
      <MainLayoutRoot>
        <MainNavbar
          open={open}
          hoverActive={hoverActive}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerHoverOver={handleDrawerHoverOver}
          handleDrawerHoverOut={handleDrawerHoverOut}
        />
        <div onMouseOver={handleDrawerHoverOver}>
          <SideBar open={open} hoverActive={hoverActive} page={page} />
        </div>
        <MainLayoutWrapper onMouseOver={handleDrawerHoverOut}>
          <MainLayoutContainer>
            <MainLayoutContent>
              <Switch>
                // sample previlage request
                {/* {isAccessGranted([PRIVILEGES.ADMIN_ACCESS]) && ( */}
                <Route
                  exact
                  path={APP_CONFIG.PAGES.HOME}
                  render={({ match, location, history }) => {
                    return <PageOne />;
                  }}
                />
                {/* )} */}
                <Route
                  path={APP_CONFIG.PAGES.NOT_FOUND}
                  render={({ match, location, history }) => {
                    return <NotFound />;
                  }}
                />
                <Redirect
                  exact
                  from={APP_CONFIG.PAGES.APP}
                  to={APP_CONFIG.PAGES.HOME}
                />
                <Route component={NotFound} />
              </Switch>
            </MainLayoutContent>

            {errorDialog && (
              <ErrorDialog
                open={Boolean(errorDialog)}
                message={errorDialog?.message}
                handleOpen={handleErrorDialog}
              />
            )}
          </MainLayoutContainer>
        </MainLayoutWrapper>
      </MainLayoutRoot>
    </React.Fragment>
  );
};

export default MainLayout;
