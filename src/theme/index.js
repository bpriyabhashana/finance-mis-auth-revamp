import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import shadows from "./shadows";
import typography from "./typography";

const theme = createTheme({
  palette: {
    background: {
      default: "#F4F6F8",
      paper: colors.common.white,
    },
    primary: {
      contrastText: "#ffffff",
      main: "#212a32",
    },
    secondary: {
      contrastText: "#ffffff",
      main: "#ff7300",
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
    },
    success: {
      contrastText: "#ffffff",
      main: "#05c46b",
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
  },
  shadows,
  typography,
  components: {
    MuiCollapse: {
      styleOverrides: {
        wrapperInner: {
          width: "100%",
        },
      },
    },
  },
});

export default theme;
