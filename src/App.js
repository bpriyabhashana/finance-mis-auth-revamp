import { AuthProvider } from "@asgardeo/auth-react";
import { AUTH_CONFIG } from "./Config";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import GlobalStyles from "./components/GlobalStyles";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider config={AUTH_CONFIG}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
