import "./App.css";
import { AuthProvider } from "@asgardeo/auth-react";
import Main from "./components/Main";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AUTH_CONFIG } from "./Config";
import GlobalStyles from "./components/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import NotFoundPage from "./components/NotFound";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider config={AUTH_CONFIG}>
        <GlobalStyles />
        <BrowserRouter>
          <Switch>
            <Route
              path={"/"}
              render={({ match, location, history }) => {
                return <Main page={location.pathname} />;
              }}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
